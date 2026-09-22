'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { volunteerData } from '@/data/volunteer';
import usePrefersReducedMotion from '@/utils/usePrefersReducedMotion';
import useFinePointer from '@/utils/useFinePointer';

const EASE = [0.16, 1, 0.3, 1];
const CARD_STAGGER_S = 0.12;
const YEAR_STAGGER_S = 0.12;

function VolunteerCard({ item, index, reduce, effects }) {
  const ref = useRef(null);
  const frame = useRef(0);

  useEffect(() => () => window.cancelAnimationFrame(frame.current), []);

  // Pointer spotlight (fine pointer only, rAF throttled)
  const onPointerMove = (event) => {
    if (!effects || event.pointerType !== 'mouse' || frame.current) return;
    const { clientX, clientY } = event;
    frame.current = window.requestAnimationFrame(() => {
      frame.current = 0;
      const card = ref.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${clientX - rect.left}px`);
      card.style.setProperty('--my', `${clientY - rect.top}px`);
    });
  };

  const hasLogos = item.logos && item.logos.length > 0;

  return (
    <motion.article
      ref={ref}
      className={`vol-v2-card${effects ? ' has-effects' : ''}`}
      tabIndex={0}
      onPointerMove={onPointerMove}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      animate={reduce ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reduce ? 0 : 0.6, ease: EASE, delay: reduce ? 0 : (index % 3) * CARD_STAGGER_S }}
    >
      <div className="vol-v2-top">
        {hasLogos ? (
          <div className="vol-v2-logos">
            {item.logos.map((logo) => (
              <span className="vol-v2-plate" key={logo.src}>
                <img src={logo.src} alt={logo.alt} loading="lazy" decoding="async" />
              </span>
            ))}
          </div>
        ) : (
          <span className="vol-v2-icon">
            <i className={item.icon} aria-hidden="true"></i>
          </span>
        )}
        <span className="vol-v2-period">
          <i className="fa-solid fa-calendar-days" aria-hidden="true"></i>
          {item.period}
        </span>
      </div>

      <h3 className="vol-v2-role">{item.role}</h3>
      {item.organization ? <p className="vol-v2-org">{item.organization}</p> : null}
      <p className="vol-v2-desc">{item.description}</p>

      {item.years && item.years.length > 0 ? (
        <ul className="vol-v2-years" aria-label="Years volunteered">
          {item.years.map((year, i) => (
            <motion.li
              className="vol-v2-year"
              key={year}
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              animate={reduce ? { opacity: 1, scale: 1 } : undefined}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ type: 'spring', stiffness: 380, damping: 18, delay: reduce ? 0 : 0.35 + i * YEAR_STAGGER_S }}
            >
              {year}
            </motion.li>
          ))}
        </ul>
      ) : null}
    </motion.article>
  );
}

export default function VolunteerCards() {
  const reduce = usePrefersReducedMotion();
  const finePointer = useFinePointer();
  const effects = finePointer && !reduce;

  return (
    <div className="vol-v2-grid">
      {volunteerData.map((item, index) => (
        <VolunteerCard key={item.id} item={item} index={index} reduce={reduce} effects={effects} />
      ))}
    </div>
  );
}
