import { useEffect, useRef } from 'react';
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import MotionEffects from '../motion/MotionEffects';
import MagneticInteractions from '../motion/MagneticInteractions';

export default function Layout() {
  const { pathname } = useLocation();
  const previousPath = useRef(pathname);
  useEffect(() => {
    if (previousPath.current !== pathname) {
      document.getElementById('main-content')?.focus({ preventScroll: true });
      previousPath.current = pathname;
    }
  }, [pathname]);
  return <>
    <a href="#main-content" className="skip-link">Skip to content</a>
    <ScrollRestoration />
    <MotionEffects />
    <MagneticInteractions />
    <Header />
    <main id="main-content" tabIndex={-1}><div className="route-surface" key={pathname}><Outlet /></div></main>
    <Footer />
  </>;
}
