import { useEffect } from 'react';
import { useReducedMotion } from './useReducedMotion';

export function useParallax() {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    let rafId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let isAnimating = false;

    const animate = () => {
      const diffX = targetX - currentX;
      const diffY = targetY - currentY;

      // Stop the animation loop if the mouse hasn't moved and we've reached the target
      if (Math.abs(diffX) < 0.001 && Math.abs(diffY) < 0.001) {
        isAnimating = false;
        return;
      }

      // Lerp for smooth damping
      currentX += diffX * 0.05;
      currentY += diffY * 0.05;

      // Update global CSS variables to avoid React state re-renders
      document.documentElement.style.setProperty('--mouse-x', currentX.toFixed(4));
      document.documentElement.style.setProperty('--mouse-y', currentY.toFixed(4));

      rafId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to -1 to 1
      targetX = (e.clientX / window.innerWidth) * 2 - 1;
      targetY = (e.clientY / window.innerHeight) * 2 - 1;
      
      if (!isAnimating) {
        isAnimating = true;
        animate();
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [prefersReducedMotion]);

  // Return nothing, consumers will use CSS variables var(--mouse-x) and var(--mouse-y)
  return {};
}
