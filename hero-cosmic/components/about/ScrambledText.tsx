'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface ScrambledTextProps {
  radius?: number;
  duration?: number;
  speed?: number;
  scrambleChars?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const ScrambledText: React.FC<ScrambledTextProps> = ({
  radius = 100,
  duration = 1.2,
  speed = 0.5,
  scrambleChars = '.:',
  className = '',
  style = {},
  children
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<HTMLElement[]>([]);
  // eslint-disable-next-line react-hooks/refs
  charsRef.current = []; // Clear refs on render

  useEffect(() => {
    if (!rootRef.current) return;

    // Cache char positions
    let charPositions: { x: number; y: number }[] = [];
    
    const updatePositions = () => {
      charPositions = charsRef.current.map((c) => {
        return {
          x: c.offsetLeft + c.offsetWidth / 2,
          y: c.offsetTop + c.offsetHeight / 2
        };
      });
    };
    
    // Slight delay to ensure layout is done before capturing positions
    const timeout = setTimeout(updatePositions, 100);
    window.addEventListener('resize', updatePositions);

    // ── Premium Typewriter Intro Animation ──
    let hasAnimated = false;
    gsap.set(charsRef.current, { opacity: 0 });

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasAnimated) {
        hasAnimated = true;
        observer.disconnect();

        // ── Pure Typewriter Intro Animation ──
        const tl = gsap.timeline();
        
        let cumulativeDelay = 0;
        
        charsRef.current.forEach((c) => {
          // Base speed ~5ms, with random variation up to +10ms for fast organic human typing rhythm
          const randomDelay = 0.005 + Math.random() * 0.01;
          cumulativeDelay += randomDelay;
          
          // Instant snap to visible (true typewriter)
          tl.set(c, { opacity: 1 }, cumulativeDelay);
        });
      }
    }, { threshold: 0.25 });

    observer.observe(rootRef.current);

    const handleMove = (e: PointerEvent) => {
      if (!rootRef.current) return;
      const rect = rootRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      charsRef.current.forEach((c, i) => {
        const pos = charPositions[i];
        if (!pos) return;

        const dx = mouseX - pos.x;
        const dy = mouseY - pos.y;
        const dist = Math.hypot(dx, dy);

        if (dist < radius) {
          if (!gsap.isTweening(c)) {
            const original = c.dataset.content || '';
            const proxy = { p: 0 };
            const animDuration = Math.max(0.1, duration * (1 - dist / radius));
            
            gsap.to(proxy, {
              p: 1,
              duration: animDuration,
              ease: 'none',
              onUpdate: () => {
                if (proxy.p < 0.9) {
                  if (Math.random() > speed) {
                    c.innerHTML = scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
                  }
                } else {
                  c.innerHTML = original;
                }
              },
              onComplete: () => {
                c.innerHTML = original;
              }
            });
            gsap.to(c, { duration: animDuration });
          }
        }
      });
    };

    const el = rootRef.current;
    el.addEventListener('pointermove', handleMove);

    return () => {
      clearTimeout(timeout);
      el.removeEventListener('pointermove', handleMove);
      window.removeEventListener('resize', updatePositions);
      observer.disconnect();
    };
  }, [radius, duration, speed, scrambleChars]);

  if (typeof children !== 'string') {
    return <div className={className} style={style}>{children}</div>;
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .scramble-char {
          will-change: transform;
          display: inline-block;
        }
      `}} />
      <div ref={rootRef} className={`text-block ${className}`} style={{ position: 'relative', ...style }}>
        <p style={{ margin: 0 }}>
          {children.split(' ').map((word, wIdx, wordsArr) => (
            <React.Fragment key={wIdx}>
              <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                {word.split('').map((char, cIdx) => (
                  <span
                    key={cIdx}
                    ref={(el) => { if (el) charsRef.current.push(el); }}
                    className="scramble-char"
                    data-content={char}
                  >
                    {char}
                  </span>
                ))}
              </span>
              {wIdx < wordsArr.length - 1 && ' '}
            </React.Fragment>
          ))}
        </p>
      </div>
    </>
  );
};

export default ScrambledText;
