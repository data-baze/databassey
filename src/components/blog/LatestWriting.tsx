import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { loadPublicPosts } from '../../lib/blog';
import type { BlogPost } from '../../lib/blog';
import PostCard from './PostCard';

export default function LatestWriting() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  useEffect(() => {
    const controller = new AbortController();
    loadPublicPosts(controller.signal).then(result => { if (!controller.signal.aborted) setPosts(result.posts.slice(0, 2)); }).catch(() => {});
    return () => controller.abort();
  }, []);
  return <section className="container section latest-writing">
    <div className="section-heading"><div><p className="eyebrow">04 / Writing</p><h2>Notes from<br /><span className="serif">the work.</span></h2></div><Link className="text-link" to="/blog">Explore the blog<ArrowUpRight size={18} aria-hidden="true" /></Link></div>
    {posts.length ? <div className="post-grid">{posts.map(post => <PostCard post={post} key={post.id} />)}</div> : <p className="muted">Articles and updates on frontend engineering, fintech, and building software—collected from this site, Medium, and LinkedIn.</p>}
  </section>;
}
