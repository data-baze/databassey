import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import type { Session } from '@supabase/supabase-js';
import { Link } from 'react-router-dom';
import Seo from '../../components/Seo';
import { blogClient } from '../../lib/blog';
import type { BlogPost } from '../../lib/blog';
import PostEditor from './components/PostEditor';

function ConnectedStudio() {
  const [session, setSession] = useState<Session | null>(null);
  const [access, setAccess] = useState<'checking' | 'login' | 'allowed' | 'denied'>('checking');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selected, setSelected] = useState<BlogPost | null>(null);
  const [editing, setEditing] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);
  const [revision, setRevision] = useState(0);
  const [editorVersion, setEditorVersion] = useState(0);
  const userId = session?.user.id;

  useEffect(() => {
    let active = true;
    blogClient!.auth.getSession().then(({ data }) => { if (active) { setSession(data.session); if (!data.session) setAccess('login'); } });
    const { data: listener } = blogClient!.auth.onAuthStateChange((_event, next) => {
      setSession(next);
      if (!next) { setAccess('login'); setPosts([]); setEditing(false); }
    });
    return () => { active = false; listener.subscription.unsubscribe(); };
  }, []);

  useEffect(() => {
    if (!userId) return;
    let active = true;
    setAccess('checking');
    blogClient!.from('blog_admins').select('user_id').eq('user_id', userId).maybeSingle().then(({ data, error }) => {
      if (!active) return;
      if (error || !data) { setAccess('denied'); return; }
      setAccess('allowed');
    });
    return () => { active = false; };
  }, [userId]);

  useEffect(() => {
    if (access !== 'allowed') return;
    let active = true;
    blogClient!.from('blog_posts').select('*').order('updated_at', { ascending: false }).then(result => {
      if (!active) return;
      if (result.error) setNotice('Your posts could not be loaded. Try signing in again.');
      else setPosts(result.data || []);
    });
    return () => { active = false; };
  }, [access, revision]);

  const login = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (busy) return;
    const values = new FormData(event.currentTarget);
    setBusy(true); setNotice('');
    try {
      const { error } = await blogClient!.auth.signInWithPassword({ email: String(values.get('email')).trim(), password: String(values.get('password')) });
      if (error) setNotice('Sign-in failed. Check your email and password.');
    } catch { setNotice('Sign-in is unavailable. Please try again.'); }
    finally { setBusy(false); }
  };
  const open = (post: BlogPost | null) => {
    if (dirty && !window.confirm('Discard the unsaved changes?')) return;
    setDirty(false); setSelected(post); setEditorVersion(value => value + 1); setEditing(true); setNotice('');
  };
  const signOut = async () => {
    if (dirty && !window.confirm('Discard unsaved changes and sign out?')) return;
    const { error } = await blogClient!.auth.signOut();
    if (error) setNotice('Could not sign out. Please try again.');
    else { setDirty(false); setNotice(''); }
  };

  if (access === 'checking') return <p className="blog-empty" role="status">Checking editor access…</p>;
  if (access === 'login') return <form className="studio-login contact-form-card" onSubmit={login}><h2>Sign in to your editor.</h2><p className="muted">Only your approved editor account can publish.</p><div className="field"><label htmlFor="studio-email">Email</label><input id="studio-email" name="email" type="email" autoComplete="username" required /></div><div className="field"><label htmlFor="studio-password">Password</label><input id="studio-password" name="password" type="password" autoComplete="current-password" required /></div><button className="button primary" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button><p role="status">{notice}</p></form>;
  if (access === 'denied') return <div className="blog-empty"><h2>This account is not an editor.</h2><p>Ask the site owner to approve your account before continuing.</p><button className="button secondary" onClick={signOut}>Sign out</button></div>;
  return <>
    <div className="studio-toolbar"><div><p className="eyebrow">Your writing workspace</p><p className="muted">{session?.user.email}</p></div><div className="actions"><button className="button primary" onClick={() => open(null)}>New post</button><button className="button secondary" onClick={signOut}>Sign out</button></div></div>
    <p className="studio-notice" role="status">{notice}</p>
    <div className="studio-layout">
      <aside className="studio-post-list" aria-label="Your posts"><h2>Posts <span className="muted">({posts.length})</span></h2>{!posts.length && <p className="muted">Start with a draft or add a post from LinkedIn.</p>}{posts.map(post => <button key={post.id} className={selected?.id === post.id ? 'selected' : ''} onClick={() => open(post)}><span className="post-status">{post.status}</span><strong>{post.title}</strong><span className="muted">{post.source === 'portfolio' ? 'On this site' : post.source}</span></button>)}</aside>
      <div>{editing ? <PostEditor key={editorVersion} post={selected} onDirty={setDirty} onSaved={post => { setSelected(post); setDirty(false); setRevision(value => value + 1); setNotice(post.status === 'published' ? Date.parse(post.published_at) > Date.now() ? 'Post scheduled. It will appear on its publication date.' : 'Post published. It is now available to readers.' : 'Draft saved. Only editors can read it.'); }} /> : <div className="studio-welcome"><h2>A place for your next idea.</h2><p>Write an original article, add a Medium link, or share a LinkedIn post with your own excerpt and cover.</p><p className="muted">Medium also appears automatically from your RSS feed. LinkedIn posts are added here by link.</p><button className="button primary" onClick={() => open(null)}>Create your first post</button></div>}</div>
    </div>
  </>;
}

export default function Studio() {
  return <div className="container studio-page">
    <Seo title="Blog editor" description="Private writing workspace for Data Bassey." noIndex />
    <header className="page-intro"><p className="eyebrow">Private editor</p><h1>Your words.<br /><span className="serif">Your space.</span></h1><Link className="text-link" to="/blog">View the public blog</Link></header>
    {blogClient ? <ConnectedStudio /> : <div className="studio-welcome"><h2>The editor needs its one-time connection.</h2><p>Connect this website to your Supabase project and approve your editor account to start writing. The setup instructions are included with the project.</p><p className="muted">The public blog can still show Medium posts while the editor is being connected.</p></div>}
  </div>;
}
