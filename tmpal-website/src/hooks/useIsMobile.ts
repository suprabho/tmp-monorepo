'use client';
import { useEffect, useState } from 'react';

/**
 * Returns true on touch-first / small viewports. SSR-safe: returns false
 * on first render then hydrates to the correct value.
 *
 * The query intentionally combines `hover: none` with the width breakpoint
 * so we treat tablets-with-mice as desktop.
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(hover: none) and (max-width: 1024px)');
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  return isMobile;
}
