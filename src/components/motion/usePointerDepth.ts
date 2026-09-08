import { useEffect, useRef } from 'react';
import type { PointerEvent } from 'react';

/** Pointer effects update CSS variables once per frame, without React rerenders. */
export function usePointerDepth<T extends HTMLElement>(strength = 3) {
  const ref = useRef<T>(null);
  const frame = useRef<number | null>(null);
  const enabled = useRef(false);

  const reset = () => {
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = null;
    const element = ref.current;
    if (!element) return;
    element.style.setProperty('--rotate-x', '0deg');
    element.style.setProperty('--rotate-y', '0deg');
    element.style.setProperty('--pointer-x', '50%');
    element.style.setProperty('--pointer-y', '50%');
    element.removeAttribute('data-pointing');
  };

  useEffect(() => {
    const preference = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    const sync = () => { enabled.current = preference.matches; if (!preference.matches) reset(); };
    sync();
    preference.addEventListener('change', sync);
    return () => {
      preference.removeEventListener('change', sync);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, []);

  const onPointerMove = (event: PointerEvent<T>) => {
    if (!enabled.current || event.pointerType !== 'mouse') return;
    const { clientX, clientY } = event;
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const element = ref.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const x = Math.min(1, Math.max(0, (clientX - rect.left) / Math.max(rect.width, 1)));
      const y = Math.min(1, Math.max(0, (clientY - rect.top) / Math.max(rect.height, 1)));
      element.style.setProperty('--rotate-x', `${(0.5 - y) * strength}deg`);
      element.style.setProperty('--rotate-y', `${(x - 0.5) * strength}deg`);
      element.style.setProperty('--pointer-x', `${x * 100}%`);
      element.style.setProperty('--pointer-y', `${y * 100}%`);
      element.setAttribute('data-pointing', 'true');
      frame.current = null;
    });
  };

  return { ref, onPointerMove, onPointerLeave: reset, onPointerCancel: reset };
}
