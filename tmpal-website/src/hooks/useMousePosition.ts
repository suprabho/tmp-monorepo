'use client';
import { useEffect, useRef, useState } from 'react';

/**
 * Normalised mouse position over the viewport: each axis in [-1, 1] with
 * (0,0) at the centre. Updated on rAF for cheapness.
 *
 * Returns {0,0} on touch devices and when prefers-reduced-motion is set,
 * so callers can wire mouse-parallax freely without extra guards.
 */
export function useMousePosition(): { x: number; y: number } {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const touch = window.matchMedia('(hover: none)').matches;
    if (reduced || touch) return;

    const handle = (e: MouseEvent) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = (e.clientY / window.innerHeight) * 2 - 1;
      if (raf.current == null) {
        raf.current = requestAnimationFrame(tick);
      }
    };

    const tick = () => {
      raf.current = null;
      setPos({ x: target.current.x, y: target.current.y });
    };

    window.addEventListener('mousemove', handle, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handle);
      if (raf.current != null) cancelAnimationFrame(raf.current);
    };
  }, []);

  return pos;
}
