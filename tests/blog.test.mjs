import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';
import { createServer as createHttpServer } from 'node:http';
import { parseMediumFeed, fetchMediumPosts, mediumHandler } from '../server/medium.mjs';

const feed = `<rss><channel><item><title><![CDATA[KYC &amp; frontend decisions]]></title><link>https://medium.com/@_databaze/kyc</link><pubDate>Tue, 01 Sep 2026 09:00:00 GMT</pubDate><content:encoded><![CDATA[<p>Build <strong>clear</strong> flows.</p><script>bad()</script><img src="https://cdn.example.com/cover.jpg?a=1&amp;b=2" />]]></content:encoded></item></channel></rss>`;

test('Medium RSS supplies plain-text cards and a safe thumbnail', () => {
  const [post] = parseMediumFeed(feed);
  assert.equal(post.title, 'KYC & frontend decisions');
  assert.equal(post.excerpt, 'Build clear flows.');
  assert.equal(post.thumbnail_url, 'https://cdn.example.com/cover.jpg?a=1&b=2');
  assert.equal(post.published_at, '2026-09-01T09:00:00.000Z');
  assert.equal(post.id, parseMediumFeed(feed)[0].id);
  assert.deepEqual(parseMediumFeed(feed.replace('https://medium.com/@_databaze/kyc', 'javascript:alert(1)')), []);
  assert.equal(parseMediumFeed(feed.replace('https://cdn.example.com/cover.jpg?a=1&amp;b=2', 'data:image/svg+xml,bad'))[0].thumbnail_url, '');
});

test('Medium parser rejects entity declarations and oversized or invalid feeds', () => {
  assert.throws(() => parseMediumFeed('<!DOCTYPE rss [<!ENTITY x "y">]>' + feed));
  assert.throws(() => parseMediumFeed('x'.repeat(2_000_001)));
  assert.throws(() => parseMediumFeed('<html>Not a feed</html>'));
  assert.deepEqual(parseMediumFeed('<rss><channel></channel></rss>'), []);
});

test('feed fetch is bounded and cannot be pointed at arbitrary servers', async () => {
  let requested;
  const posts = await fetchMediumPosts('_databaze', async (url, options) => {
    requested = url;
    assert.equal(options.redirect, 'error');
    assert.ok(options.signal instanceof AbortSignal);
    return new Response(feed);
  });
  assert.equal(requested, 'https://medium.com/feed/@_databaze');
  assert.equal(posts.length, 1);
  await assert.rejects(fetchMediumPosts('https://localhost', () => { throw new Error('should not fetch'); }), /Invalid Medium username/);
  await assert.rejects(fetchMediumPosts('_databaze', async () => new Response('', { status: 503 })));
  await assert.rejects(fetchMediumPosts('_databaze', async () => new Response('x'.repeat(2_000_001))), /Feed too large/);
});

test('the public Medium endpoint refuses mutations', async () => {
  const headers = {};
  const res = { setHeader: (key, value) => { headers[key] = value; }, end() {} };
  await mediumHandler({ method: 'POST' }, res);
  assert.equal(res.statusCode, 405);
  assert.equal(headers.Allow, 'GET');
});

test('publishing validates required content, source URLs, and safe Markdown', async () => {
  const server = await createServer({ server: { middlewareMode: true, hmr: { server: createHttpServer() } }, optimizeDeps: { noDiscovery: true, include: [] }, appType: 'custom', logLevel: 'error' });
  try {
    const { validatePost, slugify, mergePosts } = await server.ssrLoadModule('/src/lib/blog.ts');
    const draft = { id: '1', title: 'A useful article', slug: 'a-useful-article', source: 'portfolio', status: 'draft', published_at: '2026-09-01T00:00:00Z', content: '', excerpt: '', external_url: '', thumbnail_url: '' };
    assert.equal(validatePost(draft), '');
    assert.ok(validatePost({ ...draft, status: 'published' }));
    assert.equal(validatePost({ ...draft, status: 'published', content: 'Article', excerpt: 'Summary' }), '');
    assert.ok(validatePost({ ...draft, slug: '../../oops' }));
    assert.ok(validatePost({ ...draft, thumbnail_url: 'javascript:alert(1)' }));
    assert.ok(validatePost({ ...draft, source: 'linkedin', external_url: 'https://www.linkedin.com/in/data-bassey/' }));
    assert.ok(validatePost({ ...draft, source: 'linkedin', external_url: 'https://linkedin.com.attacker.test/posts/anything' }));
    assert.equal(validatePost({ ...draft, source: 'linkedin', external_url: 'https://www.linkedin.com/posts/data-bassey_example' }), '');
    assert.equal(slugify('  Better KYC & onboarding!  '), 'better-kyc-onboarding');
    const medium = parseMediumFeed(feed)[0];
    const curated = { ...medium, id: 'curated', title: 'Custom title', external_url: medium.external_url + '?source=profile' };
    assert.deepEqual(mergePosts([curated], [medium]).map(post => post.id), ['curated']);
    const { default: ArticleBody } = await server.ssrLoadModule('/src/components/blog/ArticleBody.tsx');
    const html = renderToStaticMarkup(React.createElement(ArticleBody, { content: '# Title\n\n<script>alert(1)</script>\n\n[Bad](javascript:alert(1))\n\n[Good](https://example.com)' }));
    assert.ok(!html.includes('<script') && !html.includes('javascript:') && !html.includes('<h1'));
    assert.ok(html.includes('href="https://example.com/"'));
  } finally { await server.close(); }
});
