'use client';

import { motion } from 'framer-motion';
import { STAGGER, VIEWPORT } from '@/theme/motion';
import usePrefersReducedMotion from '@/utils/usePrefersReducedMotion';
import { RevealGroupContext } from '@/components/motion/RevealGroupContext';

// Triggers once when it enters the viewport and staggers its <Reveal> children by STAGGER seconds.
export default function RevealGroup({ as = 'div', stagger = STAGGER, delay = 0, className, style, viewport, children, ...rest }) {
  const Tag = motion[as] || motion.div;
  const reduce = usePrefersReducedMotion();

  const variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : stagger, delayChildren: reduce ? 0 : delay } }
  };

  return (
    <RevealGroupContext.Provider value>
      <Tag
        className={className}
        style={style}
        variants={variants}
        initial="hidden"
        whileInView="show"
        viewport={viewport || VIEWPORT}
        animate={reduce ? 'show' : undefined}
        {...rest}
      >
        {children}
      </Tag>
    </RevealGroupContext.Provider>
  );
}
