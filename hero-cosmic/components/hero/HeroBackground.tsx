'use client';

import React from 'react';
import { useParallax } from '@/hooks/useParallax';
import Image from 'next/image';
import HeroEarth from './HeroEarth';

/**
 * HeroBackground — Cinematic Layered Depth System.
 *
 * z-index stack:
 *   z-2   Stars
 *   z-3   Nebula
 *   z-6   SHUNYA logo + taglines  ← ABOVE earth
 *   z-5   Earth 3D WebGL globe
 *   z-11  Vignette
 */
export default function HeroBackground() {
  const { x, y } = useParallax();

  return (
    <div
      className="fixed inset-0 bg-black overflow-hidden pointer-events-none"
      style={{ perspective: '1200px' }}
    >
      <style>{`
        @keyframes drift {
          0%   { transform: scale(1.1) translate3d(0, 0, 0) rotate(0deg); }
          50%  { transform: scale(1.15) translate3d(14px, -14px, 0) rotate(0.8deg); }
          100% { transform: scale(1.1) translate3d(0, 0, 0) rotate(0deg); }
        }
        @keyframes breathe {
          0%, 100% { opacity: 0.6; }
          50%       { opacity: 0.85; }
        }
        .animate-drift   { animation: drift   30s ease-in-out infinite; }
        .animate-breathe { animation: breathe 16s ease-in-out infinite; }
      `}</style>

      {/* ── 1. Star field (z-2) ── */}
      <div className="absolute inset-0 z-[2]">
        <Image
          src="/cosmic/stars_cinematic.png"
          alt="Stars"
          fill
          priority
          className="object-cover opacity-50 mix-blend-screen"
          unoptimized
        />
      </div>

      {/* ── 2. Nebula (z-3) ── */}
      <div
        className="absolute inset-0 z-[3]"
        style={{ transform: `translate3d(${x * -50}px, ${y * -50}px, 0)` }}
      >
        <div className="absolute inset-0 animate-drift">
          <Image
            src="/cosmic/rich_green_nebula.png"
            alt="Nebula"
            fill
            priority
            className="object-cover opacity-70 mix-blend-screen animate-breathe"
            style={{ filter: 'contrast(1.5) saturate(1.2) brightness(0.8)' }}
            unoptimized
          />
        </div>
      </div>

      {/* ── 3. Earth 3D Globe (z-5) — rises from bottom ── */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[5] pointer-events-none flex justify-center"
        style={{ transform: `translate3d(${x * -18}px, ${y * -18}px, 0)` }}
      >
        {/*
          Container is a square. translateY(50%) hides the bottom half,
          so you see a clean hemisphere rising from the lower edge of the screen.
          Size tuned so it occupies roughly 55% of screen width.
        */}
        <div
          style={{
            position: 'relative',
            width: 'min(85vw, 820px)',
            height: 'min(85vw, 820px)',
            transform: 'translateY(50%)',
            flexShrink: 0,
          }}
        >
          {/* Transparent WebGL canvas */}
          <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', overflow: 'hidden' }}>
            <HeroEarth />
          </div>

          {/* Atmospheric halo ring */}
          <div
            style={{
              position: 'absolute',
              inset: '-12px',
              borderRadius: '50%',
              boxShadow: '0 0 50px 15px rgba(60,130,255,0.22), 0 0 120px 40px rgba(20,70,200,0.12)',
              pointerEvents: 'none',
            }}
          />

          {/* Bottom blend into black page */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '35%',
              background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.9) 70%, black 100%)',
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>

      {/* ── 4. SHUNYA + Taglines (z-6, above Earth) ── */}
      <div
        className="absolute inset-0 z-[6] pointer-events-none"
        style={{ transform: `translate3d(${x * -35}px, ${y * -35}px, 0)` }}
      >
        {/* Pre-headline */}
        <div className="absolute top-[3vh] left-0 right-0 flex flex-col items-center px-6 space-y-2">
          <p
            className="max-w-4xl"
            style={{
              fontFamily: 'var(--font-corpta), sans-serif',
              fontWeight: 700,
              fontSize: '0.95rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'rgba(230,240,255,0.95)',
              textShadow: '0 0 24px rgba(100,180,255,0.6), 0 2px 10px rgba(0,0,0,0.95)',
              textAlign: 'center',
            }}
          >
            For decades, we built machines to master nature.
          </p>
          <p
            className="max-w-3xl"
            style={{
              fontFamily: 'var(--font-corpta), sans-serif',
              fontWeight: 600,
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              lineHeight: '1.6',
              textTransform: 'uppercase',
              color: 'rgba(180,210,255,0.75)',
              textShadow: '0 0 16px rgba(80,160,255,0.4), 0 2px 8px rgba(0,0,0,0.95)',
              textAlign: 'center',
            }}
          >
            Now, at the edge of intelligence, we realize the ultimate technology isn't silicon—it's the ecosystem itself. Welcome to the convergence
          </p>
        </div>

        {/* SHUNYA Logo — large main heading, pure white */}
        <div
          style={{
            position: 'absolute',
            top: '3vh',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100vw',
            height: 'clamp(200px, 35vw, 550px)',
            /*
              brightness(0) = makes every pixel black.
              invert(1)     = flips to pure white.
              clipPath      = crops bottom 12% to remove logo's background artifacts.
            */
            filter: 'brightness(0) invert(1) drop-shadow(0 0 18px rgba(255,255,255,0.35)) drop-shadow(0 0 50px rgba(100,180,255,0.18))',
            clipPath: 'polygon(0 0, 100% 0, 100% 88%, 0 88%)',
          }}
        >
          <Image
            src="/cosmic/shunya-logo.png"
            alt="SHUNYA"
            fill
            className="object-contain object-center"
            priority
            unoptimized
          />
        </div>

        {/* Taglines — positioned just above the Earth's horizon */}
        <div
          className="absolute left-0 right-0 px-12 flex justify-between items-center"
          style={{
            top: '48vh',
            fontFamily: 'var(--font-corpta), sans-serif',
          }}
        >
          <span style={{
            fontSize: '0.78rem',
            fontWeight: 600,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.88)',
            textShadow: '0 0 14px rgba(80,160,255,0.7), 0 2px 8px rgba(0,0,0,1)',
          }}>
            Logic · Life · Convergence
          </span>
          <span style={{
            fontSize: '0.78rem',
            fontWeight: 600,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.88)',
            textShadow: '0 0 14px rgba(80,160,255,0.7), 0 2px 8px rgba(0,0,0,1)',
          }}>
            Is technology the apex predator?
          </span>
        </div>
      </div>

      {/* ── Vignette (z-11, always on top) ── */}
      <div
        className="absolute inset-0 z-[11] pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 150px rgba(0,0,0,0.9), inset 0 0 60px rgba(0,0,0,0.65)',
        }}
      />
    </div>
  );
}
