import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const links = [{ to: '/work', label: 'Work' }, { to: '/about', label: 'About' }, { to: '/resume', label: 'Resume' }, { to: '/contact', label: 'Contact' }];

export default function Header() {
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); toggle.current?.focus(); }
    };
    const outside = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setOpen(false);
    };
    const media = window.matchMedia('(min-width: 760px)');
    const resize = () => { if (media.matches) setOpen(false); };
    document.addEventListener('keydown', escape);
    document.addEventListener('pointerdown', outside);
    media.addEventListener('change', resize);
    return () => {
      document.removeEventListener('keydown', escape);
      document.removeEventListener('pointerdown', outside);
      media.removeEventListener('change', resize);
    };
  }, [open]);

  return <header className="site-header" ref={header}>
    <div className="container header-inner">
      <Link to="/" className="wordmark" aria-label="Data Bassey home" onClick={() => setOpen(false)}>Data<span className="wordmark-dot">.</span><span className="wordmark-surname">Bassey</span></Link>
      <nav className="desktop-nav" aria-label="Main navigation">{links.map(link => <NavLink key={link.to} to={link.to} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>{link.label}{link.to === '/contact' && <ArrowUpRight size={16} aria-hidden="true" />}</NavLink>)}</nav>
      <button ref={toggle} className="menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}<span>Menu</span></button>
    </div>
    <nav id="mobile-navigation" className="mobile-nav container" aria-label="Mobile navigation" hidden={!open}>
      {links.map(link => <NavLink key={link.to} to={link.to} onClick={() => { setOpen(false); if (pathname === link.to) toggle.current?.focus(); }}>{link.label}<ArrowUpRight size={18} aria-hidden="true" /></NavLink>)}
    </nav>
  </header>;
}
