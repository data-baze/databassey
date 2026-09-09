import { useEffect, useRef, useState } from 'react';
import { useBlocker } from 'react-router-dom';
import type { ChangeEvent, FormEvent } from 'react';
import ArticleBody from '../../../components/blog/ArticleBody';
import PostCover from '../../../components/blog/PostCover';
import { blogClient, slugify, validatePost } from '../../../lib/blog';
import type { BlogPost, BlogSource } from '../../../lib/blog';

const emptyPost = (): BlogPost => ({ id: '', slug: '', title: '', excerpt: '', content: '', source: 'portfolio', external_url: '', thumbnail_url: '', status: 'draft', published_at: new Date().toISOString() });

export default function PostEditor({ post, onDirty, onSaved }: { post: BlogPost | null; onDirty: (value: boolean) => void; onSaved: (post: BlogPost) => void }) {
  const [draft, setDraft] = useState<BlogPost>(post || emptyPost);
  const [dirty, setDirty] = useState(false);
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(false);
  const [message, setMessage] = useState('');
  const guard = useRef(false);
  const blocker = useBlocker(dirty);
  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = ''; };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);
  const change = (values: Partial<BlogPost>) => {
    setDraft(current => ({ ...current, ...values }));
    setDirty(true); onDirty(true); setMessage('');
  };
  const save = async (status: 'draft' | 'published') => {
    if (guard.current || uploading) return;
    const value = { ...draft, title: draft.title.trim(), excerpt: draft.excerpt.trim(), status, external_url: draft.source === 'portfolio' ? '' : draft.external_url.trim(), thumbnail_url: draft.thumbnail_url.trim() };
    const issue = validatePost(value);
    if (issue) { setMessage(issue); return; }
    guard.current = true; setBusy(true); setMessage('');
    try {
      const { id, slug, title, excerpt, content, source, external_url, thumbnail_url, published_at } = value;
      const payload = { slug, title, excerpt, content, source, external_url, thumbnail_url, published_at, status };
      const query = id ? blogClient!.from('blog_posts').update(payload).eq('id', id) : blogClient!.from('blog_posts').insert(payload);
      const { data, error } = await query.select().single();
      if (error) { setMessage(error.code === '23505' ? 'That URL is already used. Choose a different URL slug.' : 'The post could not be saved. Your changes are still here.'); return; }
      setDraft(data); setDirty(false); onDirty(false); onSaved(data);
    } catch { setMessage('The post could not be saved. Please try again.'); }
    finally { guard.current = false; setBusy(false); }
  };
  const submit = (event: FormEvent) => { event.preventDefault(); void save(draft.status); };
  const upload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 5 * 1024 * 1024) { setMessage('Choose a JPG, PNG, or WebP image under 5 MB.'); return; }
    setUploading(true); setMessage('');
    try {
      const extension = file.type === 'image/jpeg' ? 'jpg' : file.type.split('/')[1];
      const path = crypto.randomUUID() + '.' + extension;
      const { error } = await blogClient!.storage.from('blog-thumbnails').upload(path, file, { contentType: file.type, upsert: false });
      if (error) throw error;
      const { data } = blogClient!.storage.from('blog-thumbnails').getPublicUrl(path);
      change({ thumbnail_url: data.publicUrl });
    } catch { setMessage('The image could not be uploaded. Try again or use an HTTPS image URL.'); }
    finally { setUploading(false); }
  };
  return <div className="post-editor">
    {blocker.state === 'blocked' && <div className="unsaved-dialog" role="alertdialog" aria-modal="false" aria-labelledby="unsaved-title"><h2 id="unsaved-title">Keep your unsaved changes?</h2><p>Save your draft before leaving, or discard these changes.</p><div className="actions"><button className="button primary" onClick={() => blocker.reset()}>Keep editing</button><button className="button secondary" onClick={() => blocker.proceed()}>Discard and leave</button></div></div>}
    <div className="editor-heading"><h2>{post ? 'Edit post' : 'New post'}</h2><span className="muted">{dirty ? 'Unsaved changes' : draft.id ? 'Saved' : 'New draft'}</span><button className="text-link" type="button" aria-pressed={preview} onClick={() => setPreview(!preview)}>{preview ? 'Return to editing' : 'Preview post'}</button></div>
    {preview ? <div className="editor-preview"><PostCover post={draft} /><h2>{draft.title || 'Your article title'}</h2><p>{draft.excerpt}</p>{draft.source === 'portfolio' ? <ArticleBody content={draft.content} /> : <p className="muted">Readers will follow the original post link on {draft.source === 'linkedin' ? 'LinkedIn' : 'Medium'}.</p>}</div> :
    <form onSubmit={submit}>
      <fieldset disabled={busy || uploading}>
        <div className="field"><label htmlFor="post-source">Where is the post published?</label><select id="post-source" value={draft.source} onChange={event => change({ source: event.target.value as BlogSource })}><option value="portfolio">On this portfolio</option><option value="medium">Medium</option><option value="linkedin">LinkedIn</option></select></div>
        <div className="field"><label htmlFor="post-title">Title</label><input id="post-title" value={draft.title} maxLength={180} required onChange={event => change({ title: event.target.value, ...(!draft.id && draft.slug === slugify(draft.title) ? { slug: slugify(event.target.value) } : {}) })} /></div>
        <div className="field"><label htmlFor="post-slug">URL slug</label><input id="post-slug" value={draft.slug} maxLength={120} required pattern="[a-z0-9]+(-[a-z0-9]+)*" onChange={event => change({ slug: event.target.value })} /><p className="small muted">{draft.source === 'portfolio' ? '/blog/' + draft.slug : 'A unique identifier for this post in your editor.'}</p></div>
        {draft.source !== 'portfolio' && <div className="field"><label htmlFor="post-link">Original {draft.source === 'linkedin' ? 'LinkedIn' : 'Medium'} post link</label><input id="post-link" type="url" required value={draft.external_url} onChange={event => change({ external_url: event.target.value })} /></div>}
        <div className="field"><label htmlFor="post-excerpt">Short excerpt</label><textarea id="post-excerpt" rows={3} maxLength={360} value={draft.excerpt} onChange={event => change({ excerpt: event.target.value })} /><p className="small muted">{draft.excerpt.length}/360 characters. This appears on the card.</p></div>
        <div className="editor-cover"><PostCover post={draft} /><div><div className="field"><label htmlFor="post-cover-file">Upload thumbnail</label><input id="post-cover-file" type="file" accept="image/jpeg,image/png,image/webp" onChange={upload} /><p className="small muted">JPG, PNG, or WebP · up to 5 MB · landscape images work best.</p></div><div className="field"><label htmlFor="post-cover-url">Or use an HTTPS image URL</label><input id="post-cover-url" type="url" value={draft.thumbnail_url} onChange={event => change({ thumbnail_url: event.target.value })} /></div>{draft.thumbnail_url && <button className="text-link" type="button" onClick={() => change({ thumbnail_url: '' })}>Use the default cover</button>}</div></div>
        {draft.source === 'portfolio' && <div className="field"><label htmlFor="post-content">Article</label><textarea id="post-content" className="markdown-input" rows={18} maxLength={100000} value={draft.content} onChange={event => change({ content: event.target.value })} /><p className="small muted">Markdown is supported: ## headings, **bold**, lists, links, and fenced code blocks. Use Preview to check the result.</p></div>}
        <div className="field"><label htmlFor="post-date">Publication date</label><input id="post-date" type="date" required value={draft.published_at.slice(0, 10)} onChange={event => change({ published_at: event.target.value ? event.target.value + 'T00:00:00.000Z' : '' })} /><p className="small muted">Future-dated published posts appear from that date, in UTC.</p></div>
        <div className="editor-save-actions"><button className="button primary" type="submit">{busy ? 'Saving…' : draft.status === 'published' ? 'Save changes' : 'Save draft'}</button>{draft.status === 'draft' ? <button className="button secondary" type="button" onClick={() => void save('published')}>Publish post</button> : <button className="button secondary" type="button" onClick={() => void save('draft')}>Unpublish</button>}</div>
      </fieldset>
    </form>}
    <p className="editor-feedback" role="status" aria-live="polite">{uploading ? 'Uploading thumbnail…' : message}</p>
  </div>;
}
