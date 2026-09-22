'use client';

import { createRef, useEffect, useMemo, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { experienceData } from '@/data/experience';
import usePrefersReducedMotion from '@/utils/usePrefersReducedMotion';
import useFinePointer from '@/utils/useFinePointer';

const STICKY_BASE_PX = 96; // sticky top of the first card
const STICKY_STEP_PX = 18; // each following card sits this much lower, so the previous one peeks out
const SCALE_END = 0.96;
const DIM_END = 0.35; // opacity of the dark scrim over a covered card
const EASE = [0.16, 1, 0.3, 1];
const POINT_STAGGER_S = 0.09;

// "5 mo", "1 mo", "< 1 mo", "1 yr 2 mo". Returns null when either date is missing.
function durationLabel(start, end) {
  if (!start || !end) return null;
  const days = (new Date(end) - new Date(start)) / 86400000;
  if (!(days >= 0)) return null;
  if (days < 30) return '< 1 mo';
  const months = Math.round(days / 30.44);
  if (months < 12) return `${months} mo`;
  const years = Math.floor(months / 12);
  const rest = months % 12;
  return rest ? `${years} yr ${rest} mo` : `${years} yr`;
}

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

function CheckMark({ variants }) {
  return (
    <svg className="exp-v2-check" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
      <circle cx="8" cy="8" r="7" className="exp-v2-check-ring" />
      <motion.path d="M4.6 8.4l2.3 2.3 4.5-4.9" className="exp-v2-check-tick" variants={variants} />
    </svg>
  );
}

function ExperienceCard({ item, index, itemRef, nextRef, stack, reduce, effects }) {
  const cardRef = useRef(null);
  const frameRef = useRef(0);
  const duration = durationLabel(item.start, item.end);
  const isLast = index === experienceData.length - 1;
  const top = STICKY_BASE_PX + index * STICKY_STEP_PX;

  // Progress of the NEXT card travelling up to its own sticky position: 0 = far below, 1 = covering this card
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
    () => ({ hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : POINT_STAGGER_S, delayChildren: reduce ? 0 : 0.15 } } }),
    [reduce]
  );
  const pointVariants = useMemo(
    () => ({
      hidden: { opacity: 0, x: reduce ? 0 : -14 },
      show: { opacity: 1, x: 0, transition: { duration: reduce ? 0 : 0.5, ease: EASE } }
    }),
    [reduce]
  );
  const tickVariants = useMemo(
    () => ({
      hidden: { pathLength: reduce ? 1 : 0 },
      show: { pathLength: 1, transition: { duration: reduce ? 0 : 0.45, ease: 'easeOut' } }
    }),
    [reduce]
  );

  return (
    <div className="exp-v2-item" ref={itemRef} style={stack ? { top: `${top}px` } : undefined}>
      <motion.div className="exp-v2-scale" style={{ scale }}>
        <article ref={cardRef} className={`exp-v2-card${effects ? ' has-effects' : ''}`} onPointerMove={onPointerMove}>
          <div className="exp-v2-side">
            {item.logo ? (
              <span className="exp-v2-plate">
                <img src={item.logo} alt={item.company} loading="lazy" decoding="async" />
              </span>
            ) : (
              <span className="exp-v2-icontile">
                <i className={item.icon} aria-hidden="true"></i>
              </span>
            )}
            {duration && <span className="exp-v2-duration">{duration}</span>}
          </div>

          <div className="exp-v2-main">
            <h3 className="exp-v2-project">{item.project}</h3>
            <p className="exp-v2-company">{item.company}</p>
            <p className="exp-v2-role">{item.role}</p>
            <span className="exp-v2-period">
              <i className="fa-regular fa-calendar" aria-hidden="true"></i> {item.period}
            </span>

            <motion.ul
              className="exp-v2-points"
              variants={listVariants}
              initial="hidden"
              whileInView="show"
              animate={reduce ? 'show' : undefined}
              viewport={{ once: true, amount: 0.3 }}
            >
              {item.points.map((point) => (
                <motion.li className="exp-v2-point" key={point} variants={pointVariants}>
                  <CheckMark variants={tickVariants} />
                  <span>{point}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          <motion.div className="exp-v2-dim" style={{ opacity: dim }} aria-hidden="true" />
        </article>
      </motion.div>
    </div>
  );
}

export default function ExperienceStack() {
  const reduce = usePrefersReducedMotion();
  const stack = useDesktopStack();
  const finePointer = useFinePointer();
  const effects = finePointer && !reduce;
  const itemRefs = useMemo(() => experienceData.map(() => createRef()), []);

  return (
    <div className={`exp-v2-stack${stack ? ' is-stacked' : ''}`}>
      {experienceData.map((item, index) => (
        <ExperienceCard
          key={item.id}
          item={item}
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
