'use client';

import { useContext } from 'react';
import { motion } from 'framer-motion';
import { EASE_OUT, DUR, VIEWPORT } from '@/theme/motion';
import usePrefersReducedMotion from '@/utils/usePrefersReducedMotion';
import { RevealGroupContext } from '@/components/motion/RevealGroupContext';

const HIDDEN = {
  up: { opacity: 0, y: 28, filter: 'blur(6px)' },
  left: { opacity: 0, x: -40 },
  right: { opacity: 0, x: 40 },
  scale: { opacity: 0, scale: 0.92 },
  fade: { opacity: 0 },
  rise: { opacity: 0, y: 50 }
};

const SHOWN = {
  up: { opacity: 1, y: 0, filter: 'blur(0px)', transitionEnd: { filter: 'none' } }, // no lingering filter (keeps backdrop-filter children working)
  left: { opacity: 1, x: 0 },
  right: { opacity: 1, x: 0 },
  scale: { opacity: 1, scale: 1 },
  fade: { opacity: 1 },
  rise: { opacity: 1, y: 0 }
};

// Scroll-reveal wrapper. Alone it animates when it enters the viewport; inside a <RevealGroup> the group
// triggers it and staggers it. `viewport` can be overridden for very tall blocks (use a small `amount`).
// With prefers-reduced-motion the final state is applied with no transition.
export default function Reveal({ as = 'div', variant = 'up', delay = 0, className, style, viewport, children, ...rest }) {
  const Tag = motion[as] || motion.div;
  const inGroup = useContext(RevealGroupContext);
  const reduce = usePrefersReducedMotion();
  const kind = HIDDEN[variant] ? variant : 'up';

  const variants = {
    hidden: HIDDEN[kind],
    show: { ...SHOWN[kind], transition: { duration: reduce ? 0 : kind === 'rise' ? DUR.slow : DUR.base, ease: EASE_OUT, delay: reduce ? 0 : delay } }
  };
  const trigger = inGroup ? {} : { initial: 'hidden', whileInView: 'show', viewport: viewport || VIEWPORT };

  return (
    <Tag className={className} style={style} variants={variants} {...trigger} animate={reduce ? 'show' : undefined} {...rest}>
      {children}
    </Tag>
  );
}
