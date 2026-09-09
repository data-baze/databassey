import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Seo from '../../components/Seo';
import ArticleBody from '../../components/blog/ArticleBody';
import PostCover from '../../components/blog/PostCover';
import { blogClient } from '../../lib/blog';
import type { BlogPost } from '../../lib/blog';
import NotFound from '../not-found/NotFound';

export default function Article() {
  const { slug } = useParams();
  return <ArticlePage key={slug} slug={slug} />;
}

function ArticlePage({ slug }: { slug?: string }) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [state, setState] = useState<'loading' | 'ready' | 'missing' | 'error'>(blogClient ? 'loading' : 'missing');
  useEffect(() => {
    let active = true;
    if (!blogClient) return;
    blogClient.from('blog_posts').select('*').eq('slug', slug).eq('source', 'portfolio').eq('status', 'published').lte('published_at', new Date().toISOString()).maybeSingle().then(({ data, error }) => {
      if (!active) return;
      setPost(data);
      setState(error ? 'error' : data ? 'ready' : 'missing');
    });
    return () => { active = false; };
  }, [slug]);
  if (state === 'missing') return <NotFound />;
  if (state !== 'ready' || !post) return <section className="container section"><Seo title="Article" description="Read Data Bassey's engineering articles." /><p role="status">{state === 'error' ? 'This article could not be loaded. Please try again later.' : 'Loading article…'}</p><Link className="text-link" to="/blog">Back to the blog</Link></section>;
  return <article className="container blog-article">
    <Seo title={post.title} description={post.excerpt} />
    <Link className="text-link back-link" to="/blog"><ArrowLeft size={16} aria-hidden="true" />All articles</Link>
    <header className="page-intro"><p className="eyebrow">Data Bassey / On this site</p><h1>{post.title}</h1><p>{post.excerpt}</p><p className="post-meta"><time dateTime={post.published_at}>{new Date(post.published_at).toLocaleDateString('en-GB', { dateStyle: 'long', timeZone: 'UTC' })}</time><span>{Math.max(1, Math.ceil(post.content.split(/\s+/).length / 220))} min read</span></p></header>
    <PostCover post={post} />
    <ArticleBody content={post.content} />
  </article>;
}
