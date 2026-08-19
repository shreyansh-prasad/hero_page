import { useEffect, useRef } from 'react';

/**
 * useScrollEarth — ref-based, zero-setState scroll animation.
 *
 * Returns refs to attach to:
 *  - earthRef: the fixed Earth container div
 *  - hudRef:   the HUD overlay div (for opacity fade)
 *
 * The RAF loop writes directly to element.style — no React re-renders,
 * no WebGL context loss, no canvas remounting.
 *
 * Earth anchor (center of the 820px container):
 *   scroll=0 → left:50%, top:100%  (only top hemisphere visible above fold)
 *   scroll=1 → left:72%, top:50%   (full sphere on right of About section)
 */

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}
function clamp(v: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, v));
}
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function useScrollEarth() {
  const earthRef = useRef<HTMLDivElement>(null);
  const hudRef   = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const initIsMobile = window.innerWidth < 768;
    // Initialise Earth position immediately (before first scroll event)
    if (earthRef.current) {
      // Mobile uses px centering (see animation loop comment for why % doesn't work)
      earthRef.current.style.left      = initIsMobile ? `${window.innerWidth / 2}px` : '50%';
      // Mobile: Earth sits at bottom, just crown visible; Desktop: deeper below fold
      earthRef.current.style.top       = initIsMobile ? '106%' : '108%';
      earthRef.current.style.transform = `translate(-50%, -50%) scale(${initIsMobile ? 0.32 : 1})`;
    }
    if (hudRef.current) {
      hudRef.current.style.opacity = '1';
    }

    let rafId: number;
    // Current animated values (lerp targets)
    let curLeft  = 50;
    let curTop   = initIsMobile ? 106 : 108;
    let curScale = initIsMobile ? 0.32 : 1;
    let curHud   = 1;

    const LERPF = 0.12; // slightly snappier response

    const tick = () => {
      const scrollY = window.scrollY;
      const vh      = window.innerHeight;

      // progress 0 → 1 over one viewport-height of scroll
      const raw = clamp(scrollY / Math.max(vh, 1), 0, 1);
      const isMobile = window.innerWidth < 768;
      const t   = easeInOutCubic(raw);

      // Earth animation targets
      // Mobile Hero  → scale 0.32, crown peeking at bottom (top 106%)
      // Mobile About → scale 0.42, Earth below text, well clear of metadata (top 88%)
      // Desktop Hero  → full size (scale 1) below fold
      // Desktop About → left side (left 28%, top 55%), scale 0.60
      const tgtLeft  = isMobile ? lerp(50, 50, t)       : lerp(48.5, 28, t);
      const tgtTop   = isMobile ? lerp(106, 88, t)      : lerp(108, 55, t);
      const tgtScale = isMobile ? lerp(0.32, 0.42, t)   : lerp(1, 0.60, t);
      const tgtHud   = 1 - clamp(raw / 0.45, 0, 1); // fades to 0 at scroll=0.45

      // Lerp toward targets
      curLeft  += (tgtLeft  - curLeft)  * LERPF;
      curTop   += (tgtTop   - curTop)   * LERPF;
      curScale += (tgtScale - curScale) * LERPF;
      curHud   += (tgtHud   - curHud)   * LERPF;

      // Write directly to DOM — no React re-render
      if (earthRef.current) {
        if (isMobile) {
          // On mobile, left% would be wrong because translate(-50%) shifts by half
          // of the 820px container (410px), not half the scaled visual size.
          // Use px so the Earth truly centers on screen.
          earthRef.current.style.left      = `${window.innerWidth / 2}px`;
        } else {
          earthRef.current.style.left      = `${curLeft}%`;
        }
        earthRef.current.style.top       = `${curTop}%`;
        earthRef.current.style.transform = `translate(-50%, -50%) scale(${curScale})`;
      }
      if (hudRef.current) {
        hudRef.current.style.opacity = `${clamp(curHud, 0, 1)}`;
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []); // runs once — no deps needed since we read from DOM directly

  return { earthRef, hudRef };
}
