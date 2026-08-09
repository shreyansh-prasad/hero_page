'use client';

import React, { useState, useCallback } from 'react';
import HeroBackground from '@/components/hero/HeroBackground';
import HudLayer from '@/components/hero/HudLayer';
import HeroBorder from '@/components/hero/HeroBorder';
import { usePointerTracker } from '@/hooks/usePointerTracker';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export default function Home() {
  const reducedMotion = useReducedMotion();
  const [hudVisible, setHudVisible] = useState(false);

  const handleEnter = useCallback((_x: number, _y: number) => {
    setHudVisible(true);
  }, []);

  const handleLeave = useCallback(() => {
    setHudVisible(false);
  }, []);

  const handleTap = useCallback((_x: number, _y: number) => {
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
    <main className="relative w-screen h-screen overflow-hidden bg-black">
      {/* Layer 1: Idle cosmic background (2D DOM layered parallax) */}
      <HeroBackground />

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
    </main>
  );
}
