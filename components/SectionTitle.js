'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { EASE_OUT, DUR } from '@/theme/motion';
import usePrefersReducedMotion from '@/utils/usePrefersReducedMotion';

const WORD_STAGGER = 0.06;
const VIEW = { once: true, amount: 0.6 };

// Single heading for every section: words rise out of a masked line, the underline draws left to right,
// and an optional outlined `ghost` word sits behind the title with a light scroll parallax.
export default function SectionTitle({ icon, subtitle, title, titleIcon, description, extraClass = '', ghost }) {
  const headingText = title || subtitle;
  const words = String(headingText || '').split(' ').filter(Boolean);
  const reduce = usePrefersReducedMotion();

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
  const ghostY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [30, -30]);

  const dur = reduce ? 0 : DUR.base;
  const headingVariants = { hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : WORD_STAGGER } } };
  const wordVariants = { hidden: { top: '115%' }, show: { top: '0%', transition: { duration: dur, ease: EASE_OUT } } };
  const lineVariants = { hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: reduce ? 0 : DUR.slow, ease: EASE_OUT, delay: reduce ? 0 : 0.25 } } };

  return (
    <div ref={containerRef} className={`section-title-container ${extraClass}`}>
      {ghost ? (
        <div className="st-ghost-wrap" aria-hidden="true">
          <motion.span className="st-ghost" style={{ y: ghostY }}>{ghost}</motion.span>
        </div>
      ) : null}

      <motion.h2
        className="section-title shiny-3d-title st-v2"
        variants={headingVariants}
        initial="hidden"
        whileInView="show"
        viewport={VIEW}
        animate={reduce ? 'show' : undefined}
      >
        {icon && <i className={icon} style={{ marginRight: '0.5rem' }}></i>}
        {titleIcon && <span className="education-title-icon"><i className={titleIcon}></i></span>}
        {words.map((word, index) => (
          <span key={`${word}-${index}`}>
            <span className="st-mask">
              <motion.span className="st-word" variants={wordVariants}>{word}</motion.span>
            </span>
            {index < words.length - 1 ? ' ' : null}
          </span>
        ))}
        <motion.span className="st-underline" variants={lineVariants} aria-hidden="true" />
      </motion.h2>

      {description && <p className="section-description">{description}</p>}
    </div>
  );
}
