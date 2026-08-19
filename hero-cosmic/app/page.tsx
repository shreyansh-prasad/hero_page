'use client';

import React, { useState, useCallback } from 'react';
import HeroBackground from '@/components/hero/HeroBackground';
import HudLayer from '@/components/hero/HudLayer';
import HeroBorder from '@/components/hero/HeroBorder';
import AboutSection from '@/components/about/AboutSection';
import HeroEarth from '@/components/hero/HeroEarth';
import DynamicIsland from '@/components/navigation/DynamicIsland';
import { usePointerTracker } from '@/hooks/usePointerTracker';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useScrollEarth } from '@/hooks/useScrollEarth';

export default function Home() {
  const reducedMotion = useReducedMotion();
  const [hudVisible, setHudVisible] = useState(false);
  const { earthRef, hudRef } = useScrollEarth();

  const handleEnter = useCallback(() => {
    setHudVisible(true);
  }, []);

  const handleLeave = useCallback(() => {
    setHudVisible(false);
  }, []);

  const handleTap = useCallback(() => {
    setHudVisible(true);
    // Touch auto-fade is handled inside the hook (2.5s timeout calls onLeave)
  }, []);

  const { containerRef, onPointerMove, onPointerEnter, onPointerLeave, onPointerDown } =
    usePointerTracker({
      lerp: 0.18,
      snap: reducedMotion,
      onEnter: handleEnter,
      onLeave: handleLeave,
      onTap: handleTap,
    });

  return (
    <main className="relative w-screen bg-black">
      {/* ── Dynamic Island Navigation ── */}
      <DynamicIsland />

      {/* ── Fixed cosmic background (stars, nebula, HUD) ── */}
      <HeroBackground hudRef={hudRef} />

      {/* ── Fixed Earth (z-30) — above About Section and HeroBackground ── */}
      <div
        ref={earthRef}
        className="fixed z-[30] pointer-events-none"
        style={{
          width: '820px',
          height: '820px',
          /* left/top/transform are set immediately by useScrollEarth hook on mount */
          left: '50%',
          top: '200%',
          transform: 'translate(-50%, -50%) scale(0)',
          willChange: 'transform, left, top',
        }}
      >
        {/* Atmospheric glow halo — sits behind the sphere, positioned slightly larger */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: '-18px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(40,100,255,0.18) 0%, rgba(20,60,200,0.08) 50%, transparent 75%)',
            filter: 'blur(16px)',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />
        {/* WebGL canvas */}
        <div
          style={{
            position: 'relative',
            width:  '100%',
            height: '100%',
            zIndex: 1,
          }}
        >
          <HeroEarth />
        </div>
      </div>

      {/* ── Hero viewport (100vh spacer) ── */}
      <div className="relative w-full z-10" style={{ height: '100vh' }}>
        {/* Layer 2: HUD reveal mask container */}
        <div
          ref={containerRef}
          className={`hud-mask-container ${hudVisible ? 'hud-visible' : ''}`}
          onPointerMove={onPointerMove}
          onPointerEnter={onPointerEnter}
          onPointerLeave={onPointerLeave}
          onPointerDown={onPointerDown}
        >
          <HudLayer reducedMotion={reducedMotion} />
        </div>

        {/* Layer 3: Premium architectural framing overlay */}
        <HeroBorder />
      </div>

      {/* ── About Shunya section (100vh, seamless continuation) ── */}
      <AboutSection />
    </main>
  );
}
