'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { focusAreas } from '@/data/focusAreas';
import usePrefersReducedMotion from '@/utils/usePrefersReducedMotion';
import useFinePointer from '@/utils/useFinePointer';

const VISIBLE_CHIPS = 5;
const STAGGER_S = 0.1;
const MAX_TILT_DEG = 4;
const EASE = [0.16, 1, 0.3, 1];

const pad = (value) => String(value).padStart(2, '0');

function FocusCard({ area, index, reduce, effects }) {
  const cardRef = useRef(null);
  const frameRef = useRef(0);
  const lastPointerType = useRef('mouse');
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const [pinned, setPinned] = useState(false); // tap / click on touch devices

  const expanded = hover || focus || pinned;
  const visible = area.technologies.slice(0, VISIBLE_CHIPS);
  const extra = area.technologies.slice(VISIBLE_CHIPS);

  // Cancel any pending frame when the card unmounts
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
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      card.style.setProperty('--mx', `${x}px`);
      card.style.setProperty('--my', `${y}px`);
      card.style.setProperty('--ry', `${((x / rect.width - 0.5) * 2 * MAX_TILT_DEG).toFixed(2)}deg`);
      card.style.setProperty('--rx', `${((0.5 - y / rect.height) * 2 * MAX_TILT_DEG).toFixed(2)}deg`);
    });
  };

  const resetTilt = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
  };

  return (
    <motion.div
      className="focus-v2-cell"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      animate={reduce ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reduce ? 0 : 0.6, ease: EASE, delay: reduce ? 0 : index * STAGGER_S }}
    >
      <article
        ref={cardRef}
        className={`focus-v2-card${expanded ? ' is-expanded' : ''}${effects ? ' has-effects' : ''}`}
        tabIndex={0}
        onPointerDown={(event) => {
          lastPointerType.current = event.pointerType;
        }}
        onClick={() => {
          if (lastPointerType.current !== 'mouse') setPinned((value) => !value);
        }}
        onPointerEnter={(event) => {
          if (event.pointerType === 'mouse') setHover(true);
        }}
        onPointerLeave={(event) => {
          if (event.pointerType === 'mouse') setHover(false);
          resetTilt();
        }}
        onPointerMove={onPointerMove}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      >
        <div className="focus-v2-top">
          <span className="focus-v2-icon">
            <i className={area.icon} aria-hidden="true"></i>
          </span>
          <span className="focus-v2-index" aria-hidden="true">
            {pad(index + 1)}
          </span>
        </div>

        <h3 className="focus-v2-title">{area.category}</h3>
        <p className="focus-v2-desc">{area.description}</p>

        <ul className="focus-v2-chips" aria-label="Technologies">
          {visible.map((tech) => (
            <li className="focus-v2-chip" key={tech}>
              {tech}
            </li>
          ))}
          {extra.length > 0 && !expanded && <li className="focus-v2-chip focus-v2-chip--more">+{extra.length} more</li>}
        </ul>

        {extra.length > 0 && (
          <div className="focus-v2-extra" aria-hidden={!expanded}>
            <ul className="focus-v2-chips focus-v2-extra-list">
              {extra.map((tech) => (
                <li className="focus-v2-chip" key={tech}>
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="focus-v2-foot">
          <span className="focus-v2-evidence">
            <i className="fa-solid fa-code-branch" aria-hidden="true"></i> Built in · {area.evidence}
          </span>
        </div>
      </article>
    </motion.div>
  );
}

export default function FocusAreas() {
  const reduce = usePrefersReducedMotion();
  const finePointer = useFinePointer();
  const effects = finePointer && !reduce; // spotlight + tilt: desktop mouse only, never with reduced motion

  return (
    <div className="focus-v2-grid">
      {focusAreas.map((area, index) => (
        <FocusCard key={area.category} area={area} index={index} reduce={reduce} effects={effects} />
      ))}
    </div>
  );
}
