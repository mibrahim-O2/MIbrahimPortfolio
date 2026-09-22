'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { softSkills } from '@/data/skills';
import usePrefersReducedMotion from '@/utils/usePrefersReducedMotion';
import useFinePointer from '@/utils/useFinePointer';

const EASE = [0.16, 1, 0.3, 1];
const CARD_STAGGER_S = 0.08;

// Pointer-following spotlight for one card (fine pointer only, rAF throttled)
function useSpotlight(enabled) {
  const ref = useRef(null);
  const frame = useRef(0);

  useEffect(() => () => window.cancelAnimationFrame(frame.current), []);

  const onPointerMove = (event) => {
    if (!enabled || event.pointerType !== 'mouse') return;
    const { clientX, clientY } = event;
    if (frame.current) return;
    frame.current = window.requestAnimationFrame(() => {
      frame.current = 0;
      const card = ref.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${clientX - rect.left}px`);
      card.style.setProperty('--my', `${clientY - rect.top}px`);
    });
  };

  return { ref, onPointerMove };
}

// Soft skills block shown on /skills
export default function SoftSkills() {
  const reduce = usePrefersReducedMotion();
  const finePointer = useFinePointer();
  const effects = finePointer && !reduce;

  return (
    <div className="skills-v2-soft-grid">
      {softSkills.map((skill, index) => (
        <SoftCard key={skill.id} skill={skill} index={index} reduce={reduce} effects={effects} />
      ))}
    </div>
  );
}

function SoftCard({ skill, index, reduce, effects }) {
  const spotlight = useSpotlight(effects);

  return (
    <motion.article
      ref={spotlight.ref}
      className={`skills-v2-card skills-v2-card--soft${effects ? ' has-effects' : ''}`}
      tabIndex={0}
      onPointerMove={spotlight.onPointerMove}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      animate={reduce ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reduce ? 0 : 0.6, ease: EASE, delay: reduce ? 0 : (index % 3) * CARD_STAGGER_S }}
    >
      <div className="skills-v2-head">
        <span className="skills-v2-icon">
          <i className={skill.icon} aria-hidden="true"></i>
        </span>
        <h3 className="skills-v2-title">{skill.title}</h3>
      </div>
      <p className="skills-v2-desc">{skill.description}</p>
    </motion.article>
  );
}
