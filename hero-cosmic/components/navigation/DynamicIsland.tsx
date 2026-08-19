'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LINKS = [
  { name: 'Home', href: '#' },
  { name: 'About', href: '#' },
  { name: 'Timeline', href: '#' },
  { name: 'Sponsors', href: '#' },
];

export default function DynamicIsland() {
  const [isHovered, setIsHovered] = useState(false);

  // Apple-like tight, fluid spring physics
  const springTransition = {
    type: 'spring' as const,
    stiffness: 400,
    damping: 30,
    mass: 1,
  };

  return (
    <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] pointer-events-auto">
      <motion.nav
        layout
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={() => setIsHovered(!isHovered)}
        initial={{ borderRadius: 9999 }}
        className="flex items-center justify-center overflow-hidden cursor-pointer"
        style={{
          background: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.08), 0 10px 40px rgba(0,0,0,0.5)',
          borderRadius: 9999,
        }}
        transition={springTransition}
      >
        <AnimatePresence mode="wait">
          {!isHovered ? (
            // ── COLLAPSED STATE (Wide Pill) ──
            <motion.div
              key="collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-center justify-center px-10 py-4 min-w-[180px]"
            >
              <span
                style={{ fontFamily: 'var(--font-corpta)' }}
                className="text-[0.75rem] tracking-[0.4em] font-medium text-white/90 uppercase mt-[2px]"
              >
                Shunya
              </span>
            </motion.div>
          ) : (
            // ── EXPANDED STATE (Large Nav Bar) ──
            <motion.div
              key="expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, delay: 0.05 }}
              className="flex items-center gap-10 px-12 py-5 hidden md:flex min-w-[650px] justify-between"
            >
              <div className="flex items-center">
                <span
                  style={{ fontFamily: 'var(--font-corpta)' }}
                  className="text-[0.8rem] tracking-[0.3em] font-semibold text-white uppercase mt-[2px]"
                >
                  Shunya
                </span>
              </div>

              <div className="flex items-center gap-8">
                {LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    style={{ fontFamily: 'var(--font-corpta)' }}
                    className="text-[0.65rem] tracking-[0.25em] uppercase text-white/60 hover:text-white transition-all duration-300"
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              <div>
                <button
                  style={{ fontFamily: 'var(--font-corpta)' }}
                  className="px-6 py-2.5 rounded-full bg-white/10 border border-white/10 text-[0.6rem] tracking-[0.2em] uppercase text-white hover:bg-white hover:text-black transition-all duration-300 font-semibold"
                >
                  Connect
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Mobile Expanded State Fallback */}
        <AnimatePresence>
           {isHovered && (
             <motion.div
               key="mobile-expanded"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.2 }}
               className="flex md:hidden flex-col items-center gap-5 px-10 py-8 min-w-[280px]"
             >
               <div className="flex items-center pb-4 border-b border-white/10 w-full justify-center">
                 <span
                   style={{ fontFamily: 'var(--font-corpta)' }}
                   className="text-[0.85rem] tracking-[0.3em] font-semibold text-white uppercase mt-[2px]"
                 >
                   Shunya
                 </span>
               </div>
               {LINKS.map((link) => (
                 <a
                   key={link.name}
                   href={link.href}
                   style={{ fontFamily: 'var(--font-corpta)' }}
                   className="text-[0.7rem] tracking-[0.25em] uppercase text-white/60"
                 >
                   {link.name}
                 </a>
               ))}
             </motion.div>
           )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}
