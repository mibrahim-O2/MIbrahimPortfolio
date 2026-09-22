'use client';

import { createRef, useEffect, useMemo, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform, animate } from 'framer-motion';
import { skillCategories } from '@/data/skills';
import SkillChip from '@/components/SkillChip';
import usePrefersReducedMotion from '@/utils/usePrefersReducedMotion';
import useFinePointer from '@/utils/useFinePointer';

// Same sticky-stack scroll technique as components/ExperienceStack.js (later cards climb up the page and
// cover/scale/dim the earlier ones), with a different visual design: a top gradient bar instead of a left
// strip, an inline icon + count-up badge instead of a duration tag, a large translucent index numeral, and
// a staggered chip cloud instead of a checklist.
const STICKY_BASE_PX = 96;
const STICKY_STEP_PX = 20;
const SCALE_END = 0.96;
const DIM_END = 0.35;
const EASE = [0.16, 1, 0.3, 1];
const CHIP_STAGGER_S = 0.035;
const pad2 = (n) => String(n).padStart(2, '0');

function useDesktopStack() {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(min-width: 768px)');
    const update = () => setDesktop(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return desktop;
}

// 0 -> N once the badge scrolls into view; final value immediately under reduced motion
function CountBadge({ count, reduce }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (reduce) {
      el.textContent = String(count);
      return undefined;
    }
    if (!inView) {
      el.textContent = '0';
      return undefined;
    }
    const controls = animate(0, count, {
      duration: 0.8,
      ease: 'easeOut',
      onUpdate: (value) => {
        el.textContent = String(Math.round(value));
      }
    });
    return () => controls.stop();
  }, [inView, reduce, count]);

  return (
    <span className="skl-v4-badge">
      <span ref={ref} aria-hidden="true" suppressHydrationWarning>{count}</span>
      <span className="skl-v4-badge-label">tech</span>
    </span>
  );
}

function SkillStackCard({ category, index, itemRef, nextRef, stack, reduce, effects }) {
  const cardRef = useRef(null);
  const frameRef = useRef(0);
  const isLast = index === skillCategories.length - 1;
  const top = STICKY_BASE_PX + index * STICKY_STEP_PX;

  const nextTop = STICKY_BASE_PX + (index + 1) * STICKY_STEP_PX;
  const { scrollYProgress } = useScroll({
    target: isLast ? itemRef : nextRef,
    offset: ['start end', `start ${nextTop}px`]
  });
  const animated = stack && !reduce && !isLast;
  const scale = useTransform(scrollYProgress, [0, 1], [1, animated ? SCALE_END : 1]);
  const dim = useTransform(scrollYProgress, [0, 1], [0, animated ? DIM_END : 0]);

  useEffect(() => () => window.cancelAnimationFrame(frameRef.current), []);

  const onPointerMove = (event) => {
    if (!effects || event.pointerType !== 'mouse') return;
    const { clientX, clientY } = event;
    if (frameRef.current) return;
    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = 0;
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${clientX - rect.left}px`);
      card.style.setProperty('--my', `${clientY - rect.top}px`);
    });
  };

  const listVariants = useMemo(
    () => ({ hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : CHIP_STAGGER_S, delayChildren: reduce ? 0 : 0.1 } } }),
    [reduce]
  );
  const chipVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: reduce ? 0 : 10 },
      show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.4, ease: EASE } }
    }),
    [reduce]
  );

  return (
    <div className="skl-v4-item" ref={itemRef} style={stack ? { top: `${top}px` } : undefined}>
      <motion.div className="skl-v4-scale" style={{ scale }}>
        <article ref={cardRef} className={`skl-v4-card${effects ? ' has-effects' : ''}`} onPointerMove={onPointerMove}>
          <span className="skl-v4-index" aria-hidden="true">{pad2(index + 1)}</span>

          <div className="skl-v4-head">
            <span className="skl-v4-icon">
              <i className={category.icon} aria-hidden="true"></i>
            </span>
            <div className="skl-v4-head-text">
              <h3 className="skl-v4-title">
                {category.title}
                {category.live ? (
                  <span className="skl-v4-live" role="img" aria-label="Live, active workflows">
                    <span className="skl-v4-live-ring" aria-hidden="true"></span>
                    <span className="skl-v4-live-dot" aria-hidden="true"></span>
                  </span>
                ) : null}
              </h3>
              <span className="skl-v4-eyebrow">{category.id.replace(/-/g, ' ').toUpperCase()}</span>
            </div>
            <CountBadge count={category.items.length} reduce={reduce} />
          </div>

          <span className="skl-v4-divider" aria-hidden="true"></span>

          <motion.ul
            className="skl-v4-chips"
            variants={listVariants}
            initial="hidden"
            whileInView="show"
            animate={reduce ? 'show' : undefined}
            viewport={{ once: true, amount: 0.2 }}
          >
            {category.items.map((item) => (
              <SkillChip key={item.name} item={item} variants={chipVariants} />
            ))}
          </motion.ul>

          <motion.div className="skl-v4-dim" style={{ opacity: dim }} aria-hidden="true" />
        </article>
      </motion.div>
    </div>
  );
}

export default function SkillsStack() {
  const reduce = usePrefersReducedMotion();
  const stack = useDesktopStack();
  const finePointer = useFinePointer();
  const effects = finePointer && !reduce;
  const itemRefs = useMemo(() => skillCategories.map(() => createRef()), []);

  return (
    <div className={`skl-v4-stack${stack ? ' is-stacked' : ''}`}>
      {skillCategories.map((category, index) => (
        <SkillStackCard
          key={category.id}
          category={category}
          index={index}
          itemRef={itemRefs[index]}
          nextRef={itemRefs[index + 1]}
          stack={stack}
          reduce={reduce}
          effects={effects}
        />
      ))}
    </div>
  );
}
