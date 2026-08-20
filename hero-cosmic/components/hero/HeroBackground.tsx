'use client';

import React from 'react';
import { useParallax } from '@/hooks/useParallax';
import Image from 'next/image';

interface HeroBackgroundProps {
  hudRef?: React.RefObject<HTMLDivElement | null>;
}

/**
 * HeroBackground — Cinematic Layered Depth System.
 *
 * z-index stack:
 *   z-2   Stars
 *   z-3   Nebula
 *   z-6   SHUNYA logo + taglines  ← ABOVE earth
 *   z-11  Vignette
 */
export default function HeroBackground({ hudRef }: HeroBackgroundProps) {
  useParallax();

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

      {/* ── 1. Star field (z-2) — Dual Parallax Layers ── */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        {/* Layer 1: Deep stars (slower parallax) */}
        <div aria-hidden style={{
          position: 'absolute', inset: '-10%', zIndex: 0,
          transform: `translate3d(calc(var(--mouse-x, 0) * 12px), calc(var(--mouse-y, 0) * 12px), 0)`,
          willChange: 'transform',
          pointerEvents: 'none',
          backgroundImage: 'url(/cosmic/stars_deep.png)',
          backgroundSize: 'cover', backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          opacity: 0.15,
        }} />
        
        {/* Layer 2: Near stars (faster parallax) */}
        <div aria-hidden style={{
          position: 'absolute', inset: '-8%', zIndex: 0,
          transform: `translate3d(calc(var(--mouse-x, 0) * 24px), calc(var(--mouse-y, 0) * 24px), 0)`,
          willChange: 'transform',
          pointerEvents: 'none',
          backgroundImage: 'url(/cosmic/stars_cinematic.png)',
          backgroundSize: 'cover', backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          opacity: 0.12,
          mixBlendMode: 'screen',
        }} />
      </div>

      {/* ── 2. Nebula (z-3) ── */}
      <div
        className="absolute inset-0 z-[3]"
        style={{ transform: `translate3d(calc(var(--mouse-x, 0) * -50px), calc(var(--mouse-y, 0) * -50px), 0)` }}
      >
        <div className="absolute inset-0 animate-drift">
          <Image
            src="/cosmic/rich_green_nebula.png"
            alt="Nebula"
            fill
            className="object-cover opacity-70 mix-blend-screen animate-breathe"
            style={{ filter: 'contrast(1.5) saturate(1.2) brightness(0.8)' }}
            unoptimized
          />
        </div>
      </div>

      {/* ── Bottom-edge nebula fade — transitions hero bg into About's #00050d ── */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 z-[4] pointer-events-none"
        style={{
          height: '35vh',
          background: 'linear-gradient(to bottom, transparent 0%, rgba(0,5,13,0.7) 60%, #00050d 100%)',
        }}
      />

      {/* ── 4. SHUNYA + Taglines (z-6, above Earth) — fades on scroll ── */}
      {/*
        hudRef is attached here. The parent component writes opacity/transform directly.
        The parallax transform is handled separately via useParallax.
      */}
      <div
        ref={hudRef}
        className="absolute inset-0 z-[6] pointer-events-none"
        style={{ transform: `translate3d(calc(var(--mouse-x, 0) * -35px), calc(var(--mouse-y, 0) * -35px), 0)` }}
      >
        {/* ──── HUD DATA PANELS (4 Corners) ──── */}
        
        {/* Top Left: Origin Statement */}
        <div className="hidden md:flex absolute top-[8vh] left-[5vw] flex-col pointer-events-none z-[15]">
          <div className="flex items-center gap-3 mb-3 opacity-70">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="animate-pulse"><rect width="3" height="3" fill="#60A5FA"/><rect y="7" width="3" height="3" fill="#60A5FA"/></svg>
            <span style={{ fontFamily: 'var(--font-corpta), sans-serif' }} className="text-[0.55rem] tracking-[0.4em] text-blue-300 uppercase">Archive // 01</span>
          </div>
          <p className="max-w-[260px] pl-4 border-l border-blue-400/40"
             style={{
               fontFamily: 'var(--font-corpta), sans-serif',
               fontSize: '0.65rem',
               fontWeight: 600,
               letterSpacing: '0.25em',
               lineHeight: '1.8',
               color: 'rgba(230,240,255,0.9)',
               textTransform: 'uppercase',
               textShadow: '0 0 12px rgba(96, 165, 250, 0.4)'
             }}>
            For decades, we built machines to master nature.
          </p>
        </div>

        {/* Top Right: Apex Query */}
        <div className="hidden md:flex absolute top-[8vh] right-[5vw] flex-col items-end pointer-events-none z-[15]">
          <div className="flex items-center gap-3 mb-3 opacity-70">
            <span style={{ fontFamily: 'var(--font-corpta), sans-serif' }} className="text-[0.55rem] tracking-[0.4em] text-blue-300 uppercase">Query // 99</span>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><circle cx="5" cy="5" r="2" fill="#60A5FA"/><circle cx="5" cy="5" r="4.5" stroke="#60A5FA" strokeWidth="1"/></svg>
          </div>
          <p className="max-w-[260px] pr-4 border-r border-blue-400/40 text-right"
             style={{
               fontFamily: 'var(--font-corpta), sans-serif',
               fontSize: '0.65rem',
               fontWeight: 600,
               letterSpacing: '0.25em',
               lineHeight: '1.8',
               color: 'rgba(230,240,255,0.9)',
               textTransform: 'uppercase',
               textShadow: '0 0 12px rgba(96, 165, 250, 0.4)'
             }}>
            Is technology the apex predator?
          </p>
        </div>

        {/* SHUNYA Logo */}
        <div
          style={{
            position: 'absolute',
            top: '3vh',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100vw',
            height: 'clamp(200px, 35vw, 550px)',
            filter: 'brightness(0) invert(1) drop-shadow(0 0 18px rgba(255,255,255,0.35)) drop-shadow(0 0 50px rgba(100,180,255,0.18))',
            clipPath: 'polygon(0 0, 100% 0, 100% 88%, 0 88%)',
          }}
        >
          <Image
            src="/cosmic/shunya-logo.png"
            alt="SHUNYA"
            fill
            className="object-contain object-center"
            unoptimized
          />
        </div>

        {/* Bottom Left: Core Values */}
        <div className="hidden md:flex absolute bottom-[8vh] left-[5vw] flex-col pointer-events-none z-[15]">
          <p className="max-w-[280px] pl-4 border-l border-blue-400/40"
             style={{
               fontFamily: 'var(--font-corpta), sans-serif',
               fontSize: '0.65rem',
               fontWeight: 600,
               letterSpacing: '0.35em',
               lineHeight: '2',
               color: 'rgba(230,240,255,0.9)',
               textTransform: 'uppercase',
               textShadow: '0 0 12px rgba(96, 165, 250, 0.4)'
             }}>
            Logic <br/>
            Life <br/>
            Convergence
          </p>
          <div className="flex items-center gap-3 mt-3 opacity-70">
            <div className="w-10 h-[1px] bg-blue-400/60"></div>
            <span style={{ fontFamily: 'var(--font-corpta), sans-serif' }} className="text-[0.55rem] tracking-[0.4em] text-blue-300 uppercase">Parameters</span>
          </div>
        </div>

        {/* Bottom Right: Convergence Statement */}
        <div className="hidden md:flex absolute bottom-[8vh] right-[5vw] flex-col items-end pointer-events-none z-[15]">
          <p className="max-w-[340px] pr-4 border-r border-blue-400/40 text-right"
             style={{
               fontFamily: 'var(--font-corpta), sans-serif',
               fontSize: '0.6rem',
               fontWeight: 500,
               letterSpacing: '0.2em',
               lineHeight: '2',
               color: 'rgba(180,210,255,0.85)',
               textTransform: 'uppercase',
               textShadow: '0 0 12px rgba(96, 165, 250, 0.3)'
             }}>
            Now, at the edge of intelligence, we realize the ultimate technology isn&apos;t silicon—it&apos;s the ecosystem itself. Welcome to the convergence.
          </p>
          <div className="flex items-center gap-3 mt-3 opacity-70">
            <span style={{ fontFamily: 'var(--font-corpta), sans-serif' }} className="text-[0.55rem] tracking-[0.4em] text-blue-300 uppercase">Conclusion</span>
            <div className="w-10 h-[1px] bg-blue-400/60"></div>
          </div>
        </div>

        {/* ──── MOBILE HUD LAYOUT ──── */}
        
        {/* Mobile Left Data Block (below logo) */}
        <div className="flex md:hidden absolute top-[42vh] left-[6vw] right-[6vw] flex-col z-[15] pointer-events-none">
          <div className="flex flex-col relative pl-4 py-1 border-l border-blue-400/40">
            <div className="absolute -left-[1px] top-0 w-[2px] h-2 bg-blue-400"></div>
            <div className="absolute -left-[1px] bottom-0 w-[2px] h-2 bg-blue-400"></div>
            
            <div className="flex items-center gap-2 mb-2 opacity-80">
              <svg width="6" height="6" viewBox="0 0 10 10" fill="none" className="animate-pulse"><rect width="3" height="3" fill="#60A5FA"/><rect y="7" width="3" height="3" fill="#60A5FA"/></svg>
              <span style={{ fontFamily: 'var(--font-corpta), sans-serif' }} className="text-[0.45rem] tracking-[0.4em] text-blue-300 uppercase">Archive // 01</span>
            </div>

            <p className="text-left"
               style={{
                 fontFamily: 'var(--font-corpta), sans-serif',
                 fontSize: '0.65rem',
                 fontWeight: 600,
                 letterSpacing: '0.2em',
                 lineHeight: '1.6',
                 color: 'rgba(230,240,255,0.95)',
                 textTransform: 'uppercase',
                 textShadow: '0 0 12px rgba(96, 165, 250, 0.4)'
               }}>
              For decades, we built machines<br/>to master nature.
            </p>
            <p className="text-left mt-2 max-w-[280px]"
               style={{
                 fontFamily: 'var(--font-corpta), sans-serif',
                 fontSize: '0.55rem',
                 fontWeight: 500,
                 letterSpacing: '0.15em',
                 lineHeight: '1.8',
                 color: 'rgba(160,200,255,0.7)',
                 textTransform: 'uppercase',
               }}>
              Now, we realize the ultimate technology is the ecosystem itself. Welcome to the convergence.
            </p>
          </div>
        </div>

        {/* Mobile Bottom Status Bar */}
        <div className="flex md:hidden absolute bottom-[5vh] left-[6vw] right-[6vw] justify-between items-end z-[15] pointer-events-none border-b border-blue-400/20 pb-2">
          <div className="flex flex-col gap-1.5 relative">
            <div className="absolute -bottom-[9px] left-0 w-1 h-[2px] bg-blue-400/60"></div>
            <span style={{ fontFamily: 'var(--font-corpta), sans-serif' }} className="text-[0.45rem] tracking-[0.4em] text-blue-400 uppercase">Status</span>
            <span style={{ fontFamily: 'var(--font-corpta), sans-serif', fontSize: '0.55rem', fontWeight: 600, letterSpacing: '0.25em', color: 'rgba(230,240,255,0.9)', textShadow: '0 0 10px rgba(96,165,250,0.5)', textTransform: 'uppercase' }}>
              Convergence
            </span>
          </div>
          
          <div className="flex flex-col items-end gap-1.5 relative text-right">
            <div className="absolute -bottom-[9px] right-0 w-1 h-[2px] bg-blue-400/60"></div>
            <span style={{ fontFamily: 'var(--font-corpta), sans-serif' }} className="text-[0.45rem] tracking-[0.4em] text-blue-400 uppercase">Parameters</span>
            <span style={{ fontFamily: 'var(--font-corpta), sans-serif', fontSize: '0.5rem', fontWeight: 600, letterSpacing: '0.25em', color: 'rgba(230,240,255,0.9)', textShadow: '0 0 10px rgba(96,165,250,0.5)', textTransform: 'uppercase' }}>
              Logic · Life
            </span>
          </div>
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
