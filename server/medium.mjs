import { XMLParser } from 'fast-xml-parser';
import { createHash } from 'node:crypto';

const decode = text => String(text || '').replace(/&#(x[0-9a-f]+|\d+);/gi, (_, n) => {
  const point = n[0].toLowerCase() === 'x' ? parseInt(n.slice(1), 16) : Number(n);
  return point > 0 && point <= 0x10ffff ? String.fromCodePoint(point) : '';
}).replace(/&(amp|lt|gt|quot|apos|nbsp);/g, (_, name) => ({ amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' }[name]));
const plain = text => decode(String(text || '').replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, '').replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
const https = value => { try { const url = new URL(String(value)); return url.protocol === 'https:' && !url.username && !url.password ? url.href : ''; } catch { return ''; } };

export function parseMediumFeed(xml) {
  if (xml.length > 2_000_000 || /<!DOCTYPE|<!ENTITY/i.test(xml)) throw new Error('Unsupported feed');
  const parsed = new XMLParser({ ignoreAttributes: false, processEntities: false, parseTagValue: false }).parse(xml);
  if (!parsed.rss || !Object.hasOwn(parsed.rss, 'channel')) throw new Error('Invalid RSS');
  const entries = parsed.rss.channel.item || [];
  return (Array.isArray(entries) ? entries : [entries]).slice(0, 20).flatMap(item => {
    const external_url = https(item.link);
    const title = plain(item.title);
    const date = new Date(item.pubDate);
    if (!external_url || !title || !Number.isFinite(date.getTime())) return [];
    const html = String(item['content:encoded'] || item.description || '');
    const rawImage = html.match(/<img\b[^>]*\bsrc\s*=\s*["']([^"']+)["']/i)?.[1] || '';
    const thumbnail_url = https(decode(rawImage));
    return [{
      id: 'medium-' + createHash('sha256').update(external_url).digest('hex').slice(0, 20),
      slug: '', title: title.slice(0, 180), excerpt: plain(html).slice(0, 220),
      source: 'medium', external_url, thumbnail_url, published_at: date.toISOString(),
      status: 'published', content: '',
    }];
  });
}

export async function fetchMediumPosts(username = '_databaze', fetcher = fetch) {
  if (!/^[a-zA-Z0-9_.-]{1,60}$/.test(username)) throw new Error('Invalid Medium username');
  const response = await fetcher('https://medium.com/feed/@' + encodeURIComponent(username), {
    headers: { Accept: 'application/rss+xml, application/xml, text/xml' },
    signal: AbortSignal.timeout(10000), redirect: 'error',
  });
  if (!response.ok || Number(response.headers.get('content-length') || 0) > 2_000_000) throw new Error('Feed unavailable');
  const reader = response.body?.getReader();
  if (!reader) throw new Error('Empty feed');
  const decoder = new TextDecoder();
  let bytes = 0;
  let xml = '';
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > 2_000_000) { await reader.cancel(); throw new Error('Feed too large'); }
      xml += decoder.decode(value, { stream: true });
    }
  } finally { reader.releaseLock(); }
  return parseMediumFeed(xml + decoder.decode());
}

export async function mediumHandler(req, res) {
  if (req.method !== 'GET') { res.setHeader('Allow', 'GET'); res.statusCode = 405; res.end(); return; }
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  try {
    const posts = await fetchMediumPosts(process.env.MEDIUM_USERNAME || '_databaze');
    res.setHeader('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=86400, stale-if-error=86400');
    res.end(JSON.stringify({ posts }));
  } catch {
    res.statusCode = 503;
    res.setHeader('Cache-Control', 'no-store');
    res.end(JSON.stringify({ error: 'Medium posts are temporarily unavailable.' }));
  }
}
