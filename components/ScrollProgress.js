'use client';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import usePrefersReducedMotion from '@/utils/usePrefersReducedMotion';

// Thin reading-progress bar at the top of every page. Rendered once in app/layout.js.
export default function ScrollProgress() {
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();
  const spring = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });
  const progress = reduce ? scrollYProgress : spring;
  const headLeft = useTransform(progress, (value) => `${value * 100}%`);

  return (
    <div className="sp-root" aria-hidden="true">
      <motion.div className="sp-bar" style={{ scaleX: progress }} />
      <motion.span className="sp-head" style={{ left: headLeft }} />
    </div>
  );
}
