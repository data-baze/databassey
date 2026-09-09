import { useEffect, useState } from 'react';
import { ArrowUpRight, RefreshCw } from 'lucide-react';
import Seo from '../../components/Seo';
import PostCard from '../../components/blog/PostCard';
import { linkedInProfile, loadPublicPosts, mediumProfile } from '../../lib/blog';
import type { BlogPost } from '../../lib/blog';

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [warning, setWarning] = useState('');
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    loadPublicPosts(controller.signal).then(result => {
      if (controller.signal.aborted) return;
      setPosts(result.posts);
      setWarning(result.localUnavailable ? 'Some articles could not be loaded. Please try again.' : result.mediumUnavailable ? 'Medium posts are temporarily unavailable. You can still read them on Medium.' : '');
      setLoading(false);
    }).catch(() => { if (!controller.signal.aborted) { setWarning('Posts could not be loaded. Please try again.'); setLoading(false); } });
    return () => controller.abort();
  }, [retry]);
  const filtered = posts.filter(post => filter === 'all' || post.source === filter);
  return <div className="container">
    <Seo title="Blog" description="Writing by Data Bassey on frontend engineering, fintech, and building software. Articles from this portfolio, Medium, and LinkedIn." />
    <section className="page-intro"><p className="eyebrow">Blog / Notes from the work</p><h1>Ideas, decisions,<br /><span className="serif">and things learned.</span></h1><p>Writing about frontend engineering, fintech, and the details that make software better.</p><div className="blog-profile-links"><a className="text-link" href={mediumProfile} target="_blank" rel="noreferrer">Follow on Medium<ArrowUpRight size={16} aria-hidden="true" /></a><a className="text-link" href={linkedInProfile} target="_blank" rel="noreferrer">Follow on LinkedIn<ArrowUpRight size={16} aria-hidden="true" /></a></div></section>
    <section className="section blog-section" aria-label="Blog posts">
      <div className="blog-filters" role="group" aria-label="Filter posts by source">{[['all', 'All posts'], ['portfolio', 'On this site'], ['medium', 'Medium'], ['linkedin', 'LinkedIn']].map(([value, label]) => <button type="button" key={value} aria-pressed={filter === value} onClick={() => setFilter(value)}>{label}</button>)}</div>
      {warning && <div className="blog-notice" role="status"><p>{warning}</p><button className="text-link" onClick={() => { setLoading(true); setRetry(retry + 1); }} disabled={loading}><RefreshCw size={15} aria-hidden="true" />Retry</button></div>}
      {loading ? <p className="blog-empty" role="status">Loading articles…</p> : filtered.length ? <div className="post-grid">{filtered.map(post => <PostCard key={post.id} post={post} />)}</div> : <div className="blog-empty"><h2>{filter === 'all' ? 'More writing is on the way.' : 'No posts here yet.'}</h2><p>{filter === 'all' ? 'In the meantime, explore my writing and updates on Medium and LinkedIn.' : 'Try another source or check back for new articles.'}</p></div>}
    </section>
  </div>;
}
