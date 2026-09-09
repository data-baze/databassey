import { createClient } from '@supabase/supabase-js';

export type BlogSource = 'portfolio' | 'medium' | 'linkedin';
export type BlogPost = {
  id: string; slug: string; title: string; excerpt: string; content: string;
  source: BlogSource; external_url: string; thumbnail_url: string;
  status: 'draft' | 'published'; published_at: string; updated_at?: string;
};
export const sourceLabels = { portfolio: 'On this site', medium: 'Medium', linkedin: 'LinkedIn' };
const url = import.meta.env.VITE_SUPABASE_URL?.trim();
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim();
export const blogClient = url && key ? createClient(url, key) : null;
export const mediumProfile = 'https://medium.com/@_databaze';
export const linkedInProfile = 'https://www.linkedin.com/in/data-bassey/';

export function safeHttps(value: string): string {
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'https:' && !parsed.username && !parsed.password ? parsed.href : '';
  } catch { return ''; }
}
export function slugify(value: string) {
  return value.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 120).replace(/-$/, '');
}
export function validatePost(post: Partial<BlogPost>) {
  if (!post.title?.trim() || post.title.length > 180) return 'Add a title of up to 180 characters.';
  if (!post.slug || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(post.slug) || post.slug.length > 120) return 'Use a short URL with lowercase letters, numbers, and hyphens.';
  if (!post.source || !['portfolio', 'medium', 'linkedin'].includes(post.source)) return 'Choose a post source.';
  if ((post.excerpt || '').length > 360 || (post.content || '').length > 100000) return 'The excerpt or article is too long.';
  if (post.thumbnail_url && !safeHttps(post.thumbnail_url)) return 'Use an HTTPS thumbnail URL or upload an image.';
  if (post.source !== 'portfolio') {
    const external = safeHttps(post.external_url || '');
    if (!external) return 'Add the original post’s HTTPS link.';
    const link = new URL(external);
    if (post.source === 'medium' && !/(^|\.)medium\.com$/.test(link.hostname)) return 'Use a Medium post link.';
    if (post.source === 'linkedin' && (!/^(www\.)?linkedin\.com$/.test(link.hostname) || !/^\/(posts\/|feed\/update\/|pulse\/)/.test(link.pathname))) return 'Use a LinkedIn post or article link, not a profile link.';
  }
  if (!post.published_at || !Number.isFinite(new Date(post.published_at).getTime())) return 'Choose a valid publication date.';
  if (post.status === 'published' && (!post.excerpt?.trim() || (post.source === 'portfolio' && !post.content?.trim()))) return 'Add an excerpt and article text before publishing.';
  return '';
}
export function mergePosts(local: BlogPost[], medium: BlogPost[]) {
  const keyFor = (post: BlogPost) => {
    if (!post.external_url) return post.id;
    const url = new URL(post.external_url);
    return url.origin + url.pathname.replace(/\/$/, '');
  };
  const seen = new Set<string>();
  return [...local, ...medium].filter(post => {
    if (post.external_url && !safeHttps(post.external_url)) return false;
    const key = keyFor(post);
    if (seen.has(key)) return false;
    seen.add(key); return true;
  }).sort((a, b) => Date.parse(b.published_at) - Date.parse(a.published_at));
}

export async function loadPublicPosts(signal?: AbortSignal) {
  const localRequest = blogClient
    ? blogClient.from('blog_posts').select('id,slug,title,excerpt,source,external_url,thumbnail_url,status,published_at').eq('status', 'published').lte('published_at', new Date().toISOString()).order('published_at', { ascending: false }).limit(100)
    : Promise.resolve({ data: [], error: null });
  const results = await Promise.allSettled([
    localRequest,
    fetch('/api/medium', { signal }).then(async response => { if (!response.ok) throw new Error('Medium unavailable'); return response.json(); }),
  ]);
  const local = results[0];
  const medium = results[1];
  const localPosts = local.status === 'fulfilled' && !local.value.error ? local.value.data || [] : [];
  const mediumPosts = medium.status === 'fulfilled' && Array.isArray(medium.value.posts) ? medium.value.posts : [];
  return {
    posts: mergePosts(localPosts as BlogPost[], mediumPosts as BlogPost[]),
    mediumUnavailable: medium.status === 'rejected',
    localUnavailable: local.status === 'rejected' || Boolean(local.status === 'fulfilled' && local.value.error),
  };
}
