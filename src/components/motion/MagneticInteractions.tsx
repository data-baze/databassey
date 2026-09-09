import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const targets = [
  '.project-card', '.post-card', '.button', '.text-link', '.nav-link', '.wordmark',
  '.menu-toggle', '.system-controls button', '.capabilities article',
  '.approach-grid article', '.cv-card', '.experience-list > li',
  '.contact-form-card', '.project-feature-row', '.next-project',
  '.course-list a', '.diagram-flow li', '.system-identity',
].join(',');

/** Fixed hit areas; only a target's inner content moves towards the pointer. */
export default function MagneticInteractions() {
  const { pathname } = useLocation();
  useEffect(() => {
    const preference = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    let current: HTMLElement | null = null;
    let frame: number | null = null;
    let bounds: DOMRect | null = null;

    const reset = () => {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      if (current) {
        current.style.setProperty('--magnet-x', '0px');
        current.style.setProperty('--magnet-y', '0px');
        current.removeAttribute('data-magnetic');
      }
      current = null;
      bounds = null;
    };
    const move = (event: PointerEvent) => {
      if (!preference.matches || event.pointerType !== 'mouse' || event.buttons) { reset(); return; }
      const element = event.target instanceof Element ? event.target : null;
      if (element?.closest('input, textarea, select, [contenteditable="true"], :disabled')) { reset(); return; }
      const target = element?.closest<HTMLElement>(targets) ?? null;
      if (target !== current) {
        reset();
        current = target;
        bounds = target?.getBoundingClientRect() ?? null;
      }
      if (!current || !bounds) return;
      const { clientX, clientY } = event;
      if (frame !== null) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        frame = null;
        if (!current || !bounds) return;
        const x = Math.min(1, Math.max(-1, ((clientX - bounds.left) / Math.max(1, bounds.width) - .5) * 2));
        const y = Math.min(1, Math.max(-1, ((clientY - bounds.top) / Math.max(1, bounds.height) - .5) * 2));
        const distance = current.matches('article, .experience-list > li, .contact-form-card') ? 2 : 3;
        current.style.setProperty('--magnet-x', x * distance + 'px');
        current.style.setProperty('--magnet-y', y * distance + 'px');
        current.setAttribute('data-magnetic', 'true');
      });
    };
    const leave = (event: PointerEvent) => { if (!event.relatedTarget) reset(); };
    const visibility = () => { if (document.hidden) reset(); };
    document.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerout', leave, { passive: true });
    document.addEventListener('pointercancel', reset, { passive: true });
    document.addEventListener('visibilitychange', visibility);
    window.addEventListener('scroll', reset, { passive: true });
    window.addEventListener('resize', reset, { passive: true });
    window.addEventListener('blur', reset);
    preference.addEventListener('change', reset);
    return () => {
      reset();
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerout', leave);
      document.removeEventListener('pointercancel', reset);
      document.removeEventListener('visibilitychange', visibility);
      window.removeEventListener('scroll', reset);
      window.removeEventListener('resize', reset);
      window.removeEventListener('blur', reset);
      preference.removeEventListener('change', reset);
    };
  }, [pathname]);
  return null;
}
