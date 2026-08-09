import { useState, useEffect } from 'react';
import { useReducedMotion } from './useReducedMotion';

export function useParallax() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    let rafId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to -1 to 1
      targetX = (e.clientX / window.innerWidth) * 2 - 1;
      targetY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      // Lerp for smooth damping
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      setOffset({ x: currentX, y: currentY });
      rafId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [prefersReducedMotion]);

  return offset;
}
