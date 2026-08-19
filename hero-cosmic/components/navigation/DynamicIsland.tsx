'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Menu } from 'lucide-react';

const LINKS = [
  { name: 'Home', href: '#' },
  { name: 'About', href: '#' },
  { name: 'Timeline', href: '#' },
  { name: 'Sponsors', href: '#' },
];

export default function DynamicIsland() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] pointer-events-auto">
      <motion.nav
        layout
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={() => setIsHovered(!isHovered)}
        initial={{ borderRadius: 32 }}
        className="flex items-center justify-center overflow-hidden cursor-pointer"
        style={{
          background: 'rgba(5, 10, 20, 0.45)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(96, 165, 250, 0.15)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 20px rgba(96, 165, 250, 0.1), inset 0 0 12px rgba(255, 255, 255, 0.02)',
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 25,
          mass: 0.8,
        }}
      >
        <AnimatePresence mode="wait">
          {!isHovered ? (
            // ── COLLAPSED STATE ──
            <motion.div
              key="collapsed"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-3 px-6 py-3"
            >
              <div className="relative flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <div className="absolute inset-0 bg-blue-400/40 blur-md rounded-full" />
              </div>
              <span
                style={{ fontFamily: 'var(--font-corpta), sans-serif' }}
                className="text-[0.65rem] tracking-[0.3em] font-semibold text-blue-50 uppercase mt-[2px]"
              >
                Shunya
              </span>
              <Menu className="w-3.5 h-3.5 text-blue-400/50 ml-1" />
            </motion.div>
          ) : (
            // ── EXPANDED STATE ──
            <motion.div
              key="expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.05 }}
              className="flex items-center gap-8 px-8 py-3.5 hidden md:flex"
            >
              <div className="flex items-center gap-2 pr-4 border-r border-blue-500/20">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span
                  style={{ fontFamily: 'var(--font-corpta), sans-serif' }}
                  className="text-[0.7rem] tracking-[0.25em] font-bold text-white uppercase mt-[2px]"
                >
                  Shunya
                </span>
              </div>

              <div className="flex items-center gap-6">
                {LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    style={{ fontFamily: 'var(--font-corpta), sans-serif' }}
                    className="text-[0.55rem] tracking-[0.2em] uppercase text-blue-100/70 hover:text-white hover:text-shadow-[0_0_8px_rgba(96,165,250,0.8)] transition-all duration-300"
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              <div className="pl-2">
                <button
                  style={{ fontFamily: 'var(--font-corpta), sans-serif' }}
                  className="px-5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-[0.55rem] tracking-[0.2em] uppercase text-blue-300 hover:bg-blue-500/20 hover:border-blue-400/50 hover:text-white transition-all duration-300"
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
               className="flex md:hidden flex-col items-center gap-4 px-8 py-6"
             >
               <div className="flex items-center gap-2 pb-3 border-b border-blue-500/20 w-full justify-center">
                 <Sparkles className="w-4 h-4 text-blue-400" />
                 <span
                   style={{ fontFamily: 'var(--font-corpta), sans-serif' }}
                   className="text-[0.7rem] tracking-[0.25em] font-bold text-white uppercase mt-[2px]"
                 >
                   Shunya
                 </span>
               </div>
               {LINKS.map((link) => (
                 <a
                   key={link.name}
                   href={link.href}
                   style={{ fontFamily: 'var(--font-corpta), sans-serif' }}
                   className="text-[0.6rem] tracking-[0.2em] uppercase text-blue-100/70"
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
