import { useState } from 'react';
import { ArrowUpRight, Code2, Linkedin, NotebookPen } from 'lucide-react';
import { safeHttps, sourceLabels } from '../../lib/blog';
import type { BlogPost } from '../../lib/blog';

export default function PostCover({ post }: { post: Pick<BlogPost, 'source' | 'thumbnail_url' | 'title'> }) {
  const [failed, setFailed] = useState('');
  const url = safeHttps(post.thumbnail_url);
  const Icon = post.source === 'linkedin' ? Linkedin : post.source === 'medium' ? NotebookPen : Code2;
  return <div className={`post-cover cover-${post.source}`}>
    {url && failed !== url ? <img src={url} alt="" loading="lazy" width="800" height="450" referrerPolicy="no-referrer" onError={() => setFailed(url)} /> : <div className="cover-fallback"><span className="cover-label">Data Bassey / Writing</span><Icon size={46} strokeWidth={1.1} aria-hidden="true" /><span className="cover-footer">{sourceLabels[post.source]}<ArrowUpRight size={20} aria-hidden="true" /></span></div>}
  </div>;
}
