import { useEffect, useRef } from 'react';

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
    if (!earthRef.current) return;
    const el = earthRef.current;
    const inner = el.querySelector('[data-earth-inner]') as HTMLElement | null;

    if (hudRef.current) hudRef.current.style.opacity = '1';

    let rafId: number;
    const LERPF = 0.12;

    let curY = 0;
    let curX = 0;
    let curScale = 1;
    let curHud = 1;

    // We start off-screen to prevent flash, then snap on first tick.
    let firstTick = true;

    const tick = () => {
      const scrollY  = window.scrollY;
      const curVh    = window.innerHeight;
      const isMobile = window.innerWidth < 768;

      const raw    = clamp(scrollY / Math.max(curVh, 1), 0, 1);
      const t      = easeInOutCubic(raw);
      const tgtHud = 1 - clamp(raw / 0.45, 0, 1);

      let tgtX, tgtY, tgtScale;

      if (isMobile) {
        // MOBILE LOGIC
        // "upper part of earth should be at bottom centre , covering 80 % of bottom area"
        const heroScale = 1.0; 
        
        // At t=0 (Hero): We want the top of the 820px Earth to be at 80% of the viewport height.
        // Screen center is curVh / 2.
        // We want: (curVh / 2) + heroY - 410 = curVh * 0.8
        // heroY = curVh * 0.8 + 410 - curVh / 2 = curVh * 0.3 + 410
        const heroY = (curVh * 0.3) + 410;

        // At t=1 (About): Earth shrinks and moves up.
        const aboutScale = 0.45;
        // Let's place it slightly above center for the About section
        const aboutY = -curVh * 0.1;

        tgtScale = lerp(heroScale, aboutScale, t);
        tgtX = 0; // Always perfectly horizontally centered
        tgtY = lerp(heroY, aboutY, t);

        // "earth should not be static": make it scroll up naturally as the user reads About section
        if (scrollY > curVh) {
          tgtY -= (scrollY - curVh) * 0.85; // Slight parallax scroll away
        }
      } else {
        // DESKTOP LOGIC
        tgtX = lerp(0, -22, t); // Moves left in vw
        tgtY = lerp(curVh * 0.6, -curVh * 0.04, t); // Moves from bottom-center to center-left
        tgtScale = lerp(1, 0.60, t);

        if (scrollY > curVh) {
          tgtY -= (scrollY - curVh);
        }
      }

      if (firstTick) {
        curX = tgtX;
        curY = tgtY;
        curScale = tgtScale;
        curHud = tgtHud;
        firstTick = false;
      } else {
        curX     += (tgtX - curX) * LERPF;
        curY     += (tgtY - curY) * LERPF;
        curScale += (tgtScale - curScale) * LERPF;
        curHud   += (tgtHud - curHud) * LERPF;
      }

      if (earthRef.current) {
        // Master positioning logic:
        // Div is at left:50%, top:50%. 
        // We use translate(-50%, -50%) to perfectly center it.
        // Then we add our X (vw) and Y (px) offsets.
        const xOffset = isMobile ? '0px' : `${curX}vw`;
        earthRef.current.style.transform = `translate(-50%, -50%) translate(${xOffset}, ${curY}px)`;
      }

      if (inner) {
        // Inner scales from the center without affecting layout
        inner.style.transform = `translate(-50%, -50%) scale(${curScale})`;
      }

      if (hudRef.current) {
        hudRef.current.style.opacity = `${clamp(curHud, 0, 1)}`;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return { earthRef, hudRef };
}
