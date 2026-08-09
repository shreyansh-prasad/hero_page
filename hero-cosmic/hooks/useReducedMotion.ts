'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Returns true when the user prefers reduced motion.
 * Listens for changes (e.g. toggling the OS setting at runtime).
 */
export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);
  const queryRef = useRef<MediaQueryList | null>(null);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    queryRef.current = mql;
    setPrefersReduced(mql.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return prefersReduced;
}
