import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PostCover from './PostCover';
import { safeHttps, sourceLabels } from '../../lib/blog';
import type { BlogPost } from '../../lib/blog';

export default function PostCard({ post }: { post: BlogPost }) {
  const external = post.source !== 'portfolio';
  const href = external ? safeHttps(post.external_url) : '/blog/' + post.slug;
  return <article className="post-card glow-card">
    <PostCover post={post} />
    <div className="post-card-copy">
      <div className="post-meta"><span>{sourceLabels[post.source]}</span><time dateTime={post.published_at}>{new Date(post.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })}</time></div>
      <h3>{external ? <a href={href} target="_blank" rel="noreferrer">{post.title}<span className="sr-only"> (opens in a new tab)</span></a> : <Link to={href}>{post.title}</Link>}</h3>
      <p>{post.excerpt}</p>
      {external ? <a className="text-link" href={href} target="_blank" rel="noreferrer">Read on {sourceLabels[post.source]}<ArrowUpRight size={17} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a> : <Link className="text-link" to={href}>Read article<ArrowRight size={17} aria-hidden="true" /></Link>}
    </div>
  </article>;
}
