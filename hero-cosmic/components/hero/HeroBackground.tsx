'use client';

import React from 'react';
import { useParallax } from '@/hooks/useParallax';
import Image from 'next/image';

/**
 * HeroBackground — Cinematic Layered Depth System.
 *
 * Earth rendering:
 *   Uses earth-diffuse.jpg (4096×2048 equirectangular map) scrolled
 *   horizontally inside a rounded-full sphere mask to simulate true
 *   Y-axis left-to-right rotation. Cinematic directional lighting
 *   overlays simulate a real sun angle.
 */
export default function HeroBackground() {
  const { x, y } = useParallax();

  return (
    <div
      className="fixed inset-0 bg-black overflow-hidden pointer-events-none"
      style={{ perspective: '1200px' }}
    >
      <style>{`
        /* Nebula drift */
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

        /*
          True Y-axis Earth rotation:
          background-size: 200% 100% means the full equirectangular map occupies
          twice the container width (covers 360° of longitude).
          Animating background-position-x from 0% to 100% slides the map
          exactly one full container width = 180° → at repeat-x this loops
          seamlessly once per 90s for one full rotation.
          We go 0% → 200% to cover the full 360°.
        */
        @keyframes earth-y-rotate {
          from { background-position: 0% center; }
          to   { background-position: 200% center; }
        }
        .earth-texture {
          animation: earth-y-rotate 90s linear infinite;
          background-image: url('/cosmic/earth-diffuse.jpg');
          background-size: 200% 100%;
          background-repeat: repeat-x;
          background-position: 0% center;
        }
      `}</style>

      {/* ── 1. Star field ── */}
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

      {/* ── 2. Nebula ── */}
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

      {/* ── 3. SHUNYA Wordmark layer (behind Earth, z-5) ── */}
      <div
        className="absolute inset-0 z-[5] pointer-events-none flex flex-col items-center"
        style={{ transform: `translate3d(${x * -35}px, ${y * -35}px, 0)` }}
      >
        {/* Pre-headline — cinematic quote */}
        <div className="mt-[9vh] w-full flex justify-center px-6">
          <p
            style={{
              fontFamily: 'var(--font-space-grotesk), sans-serif',
              fontWeight: 700,
              fontSize: '1rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'rgba(220,235,255,0.85)',
              textShadow: '0 0 24px rgba(100,180,255,0.55), 0 2px 10px rgba(0,0,0,0.95)',
            }}
          >
            For decades, we built machines to master nature
          </p>
        </div>

        {/* SHUNYA — massive, metallic, clearly readable */}
        <div className="mt-[3vh]" style={{ position: 'relative' }}>
          {/* Subtle backdrop glow behind text to separate it from nebula */}
          <div
            style={{
              position: 'absolute',
              inset: '-20px -40px',
              background: 'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.45) 0%, transparent 75%)',
              filter: 'blur(12px)',
              zIndex: 0,
            }}
          />
          <h1
            style={{
              position: 'relative',
              zIndex: 1,
              fontFamily: 'var(--font-space-grotesk), sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(90px, 17vw, 200px)',
              lineHeight: 1,
              letterSpacing: '-0.01em',
              background: 'linear-gradient(170deg, #ffffff 0%, #f0f6ff 20%, #c8ddf0 50%, #7a9ab5 80%, #4a6275 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: [
                'drop-shadow(0 0 70px rgba(120,190,255,0.4))',
                'drop-shadow(0 0 25px rgba(80,160,255,0.3))',
                'drop-shadow(0 6px 20px rgba(0,0,0,0.98))',
              ].join(' '),
              userSelect: 'none',
            }}
          >
            SHUNYA
          </h1>
        </div>

        {/* Flanking taglines — increased contrast */}
        <div
          className="mt-[5vh] w-full max-w-5xl px-10 flex justify-between"
          style={{
            fontFamily: 'var(--font-space-grotesk), sans-serif',
          }}
        >
          <span style={{
            fontSize: '0.85rem',
            fontWeight: 600,
            letterSpacing: '0.26em',
            textTransform: 'uppercase',
            color: 'rgba(215,232,255,0.75)',
            textShadow: '0 0 14px rgba(80,160,255,0.45), 0 2px 8px rgba(0,0,0,0.95)',
          }}>Logic · Life · Convergence</span>
          <span style={{
            fontSize: '0.85rem',
            fontWeight: 600,
            letterSpacing: '0.26em',
            textTransform: 'uppercase',
            color: 'rgba(215,232,255,0.75)',
            textShadow: '0 0 14px rgba(80,160,255,0.45), 0 2px 8px rgba(0,0,0,0.95)',
          }}>Is technology the apex predator?</span>
        </div>
      </div>

      {/* ── 4. Earth (foreground hero, z-7) ── */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[7] pointer-events-none flex justify-center"
        style={{ transform: `translate3d(${x * -18}px, ${y * -18}px, 0)` }}
      >
        <div
          style={{
            position: 'relative',
            flexShrink: 0,
            width:  'min(108vw, 950px)',
            height: 'min(108vw, 950px)',
            transform: 'translateY(62%)',
          }}
        >
          {/* ── Sphere mask ── */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              overflow: 'hidden',
              /*
                Outer atmosphere glow — subtle blue ring visible outside the sphere.
                Because this box-shadow is on the clipping container, it renders
                OUTSIDE the rounded-full boundary, creating a halo in space.
              */
              boxShadow: [
                '0 0 0 1px rgba(80,160,255,0.25)',
                '0 0 30px 8px rgba(50,120,220,0.35)',
                '0 0 80px 20px rgba(30,80,180,0.20)',
              ].join(', '),
            }}
          >
            {/* Equirectangular texture — scrolls L→R to simulate Y-axis rotation */}
            <div
              className="earth-texture"
              style={{
                position: 'absolute',
                inset: 0,
                filter: 'saturate(1.45) contrast(1.12) brightness(1.05)',
              }}
            />

            {/* ── Cinematic lighting overlays ── */}

            {/*
              Layer B (clouds): A cloud texture scrolls slightly faster than
              the surface, making rotation look physically real.
              mix-blend-mode: screen → only bright clouds show through.
            */}
            <div
              className="earth-texture"
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: "url('/cosmic/earth_clouds.png')",
                backgroundSize: '200% 100%',
                backgroundRepeat: 'repeat-x',
                animationDuration: '75s', /* slightly faster than surface */
                mixBlendMode: 'screen',
                opacity: 0.55,
                filter: 'brightness(1.8) contrast(1.1)',
              }}
            />

            {/*
              Layer C (specular): Ocean glitter — specular map highlights
              water surfaces with a subtle bright sheen.
            */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: "url('/cosmic/earth-specular.jpg')",
                backgroundSize: '200% 100%',
                backgroundRepeat: 'repeat-x',
                backgroundPosition: '0% center',
                mixBlendMode: 'screen',
                opacity: 0.18,
                filter: 'brightness(2) saturate(0.3)',
              }}
            />

            {/*
              Layer A: Directional sunlit highlight (warm, gentle, upper-left)
            */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(ellipse at 35% 30%, rgba(255,245,210,0.12) 0%, transparent 55%)',
                mixBlendMode: 'screen',
                pointerEvents: 'none',
              }}
            />

            {/*
              Layer B: Night-side shadow (right + bottom go dark)
              This sells the 3D sphere illusion — the hemisphere facing away from
              the sun fades toward deep space black.
            */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: [
                  /* Edge darkening (sphere volume) */
                  'radial-gradient(ellipse at 50% 50%, transparent 48%, rgba(0,0,0,0.6) 72%, rgba(0,0,0,0.95) 92%)',
                ].join(', '),
                pointerEvents: 'none',
              }}
            />

            {/*
              Layer C: Directional night shadow — right hemisphere darker
            */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to right, transparent 35%, rgba(0,0,10,0.30) 65%, rgba(0,0,10,0.65) 100%)',
                mixBlendMode: 'multiply',
                pointerEvents: 'none',
              }}
            />

            {/*
              Layer D: Atmospheric scattering rim — a thin bright blue-white halo
              on the sunlit limb (upper-left edge)
            */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: [
                  'radial-gradient(ellipse at 18% 18%, rgba(180,220,255,0.22) 0%, transparent 42%)',
                ].join(', '),
                mixBlendMode: 'screen',
                pointerEvents: 'none',
              }}
            />

            {/* Layer E: Bottom blend — planet fades into space */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '38%',
                background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.75) 60%, black 100%)',
                pointerEvents: 'none',
              }}
            />
          </div>

          {/* ── Outer atmosphere halo (outside the sphere mask) ── */}
          <div
            style={{
              position: 'absolute',
              inset: '-6px',
              borderRadius: '50%',
              background: 'radial-gradient(ellipse at 35% 30%, rgba(120,190,255,0.10) 0%, transparent 60%)',
              filter: 'blur(8px)',
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>

      {/* ── Vignette (always on top) ── */}
      <div
        className="absolute inset-0 z-[11] pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 150px rgba(0,0,0,0.92), inset 0 0 60px rgba(0,0,0,0.7)',
        }}
      />
    </div>
  );
}
