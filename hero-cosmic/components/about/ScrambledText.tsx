'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
// @ts-expect-error
import { SplitText } from 'gsap/SplitText';
// @ts-expect-error
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(SplitText, ScrambleTextPlugin);
}

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
  const charsRef = useRef<Element[]>([]);

  useEffect(() => {
    if (!rootRef.current) return;
    console.log('ScrambledText mounted, SplitText:', !!SplitText, 'ScrambleTextPlugin:', !!ScrambleTextPlugin);

    // Wait for a tick to ensure children are rendered
    const split = new SplitText(rootRef.current.querySelector('p'), {
      type: 'chars',
      charsClass: 'char'
    });
    charsRef.current = split.chars;
    console.log('SplitText created chars:', split.chars.length);

    charsRef.current.forEach((c) => {
      gsap.set(c, {
        display: 'inline-block',
        attr: { 'data-content': c.innerHTML }
      });
    });

    const charPositions = charsRef.current.map((c) => {
      const el = c as HTMLElement;
      return {
        x: el.offsetLeft + el.offsetWidth / 2,
        y: el.offsetTop + el.offsetHeight / 2
      };
    });

    const handleMove = (e: PointerEvent) => {
      if (!rootRef.current) return;
      
      // 1 DOM read per move instead of N (prevents layout thrashing)
      const rect = rootRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      charsRef.current.forEach((c, i) => {
        const pos = charPositions[i];
        const dx = mouseX - pos.x;
        const dy = mouseY - pos.y;
        const dist = Math.hypot(dx, dy);

        if (dist < radius) {
          if (!gsap.isTweening(c)) {
            gsap.to(c, {
              duration: duration * (1 - dist / radius),
              scrambleText: {
                text: (c as HTMLElement).dataset.content || '',
                chars: scrambleChars,
                speed
              },
              ease: 'none'
            });
          }
        }
      });
    };

    const el = rootRef.current;
    el.addEventListener('pointermove', handleMove);

    return () => {
      el.removeEventListener('pointermove', handleMove);
      split.revert();
    };
  }, [radius, duration, speed, scrambleChars]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .char {
          will-change: transform;
          display: inline-block;
        }
      `}} />
      <div ref={rootRef} className={`text-block ${className}`} style={{ position: 'relative', ...style }}>
        <p style={{ margin: 0 }}>{children}</p>
      </div>
    </>
  );
};

export default ScrambledText;
