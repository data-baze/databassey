import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function MotionEffects() {
  const { pathname } = useLocation();
  useEffect(() => {
    let frame: number | null = null;
    const updateProgress = () => {
      frame = null;
      const root = document.documentElement;
      const length = root.scrollHeight - window.innerHeight;
      root.style.setProperty('--reading-progress', String(length > 0 ? Math.min(1, Math.max(0, window.scrollY / length)) : 0));
      root.toggleAttribute('data-scrolled', window.scrollY > 24);
    };
    const scheduleProgress = () => {
      if (frame === null) frame = requestAnimationFrame(updateProgress);
    };
    updateProgress();
    window.addEventListener('scroll', scheduleProgress, { passive: true });
    window.addEventListener('resize', scheduleProgress, { passive: true });
    const resize = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(scheduleProgress) : null;
    resize?.observe(document.body);
    return () => {
      resize?.disconnect();
      if (frame !== null) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleProgress);
      window.removeEventListener('resize', scheduleProgress);
    };
  }, [pathname]);
  return <div className="reading-progress" aria-hidden="true" />;
}
