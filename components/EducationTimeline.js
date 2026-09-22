'use client';

import { useEffect, useRef } from 'react';
import { animate, motion, useInView, useScroll, useSpring, useTransform } from 'framer-motion';
import { educationData } from '@/data/education';
import { DUR, EASE_OUT, SPRING, VIEWPORT } from '@/theme/motion';
import usePrefersReducedMotion from '@/utils/usePrefersReducedMotion';

const COUNTABLE = /^\d+(\.\d+)?%$/; // "94%", "82.6%"
const SLIDE_PX = 40;

const formatPercent = (number, decimals) => `${number.toFixed(decimals)}%`;

// Counts a percentage from 0 to its target once, when the tile scrolls into view
function CountUp({ value, reduce }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const target = parseFloat(value);
  const decimals = (value.split('.')[1] || '').replace('%', '').length;

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    if (reduce) {
      element.textContent = value;
      return undefined;
    }
    if (!inView) {
      element.textContent = formatPercent(0, decimals);
      return undefined;
    }

    const controls = animate(0, target, {
      duration: 0.9,
      ease: 'easeOut',
      onUpdate: (latest) => {
        element.textContent = formatPercent(latest, decimals);
      },
      onComplete: () => {
        element.textContent = value;
      }
    });
    return () => controls.stop();
  }, [inView, reduce, value, target, decimals]);

  return (
    <span ref={ref} suppressHydrationWarning>
      {value}
    </span>
  );
}

function MetaTile({ meta, reduce }) {
  const countable = COUNTABLE.test(meta.value.trim());
  return (
    <div className="edu-v4-tile">
      <span className="edu-v4-tile-label">{meta.label}</span>
      <span className={`edu-v4-tile-value${countable ? ' is-number' : ''}`}>
        {countable ? (
          <>
            <span aria-hidden="true">
              <CountUp value={meta.value.trim()} reduce={reduce} />
            </span>
            <span className="edu-v4-sr">{meta.value}</span>
          </>
        ) : (
          meta.value
        )}
      </span>
    </div>
  );
}

// One timeline entry: a node on the center line, a short connector, and the card itself. The card slides in
// from its own side (left card from the left, right card from the right) and fades in, once, when it scrolls
// into view; reduced motion skips the slide and shows the final position immediately.
function TimelineRow({ entry, side, reduce }) {
  const fromX = reduce ? 0 : side === 'left' ? -SLIDE_PX : SLIDE_PX;

  return (
    <div className={`edu-v4-row edu-v4-row--${side}`}>
      <span className="edu-v4-node" aria-hidden="true"></span>

      <motion.article
        className="edu-v4-card"
        aria-label={`${entry.degree}, ${entry.period}`}
        initial={{ opacity: 0, x: fromX }}
        whileInView={{ opacity: 1, x: 0 }}
        animate={reduce ? { opacity: 1, x: 0 } : undefined}
        viewport={VIEWPORT}
        transition={{ duration: reduce ? 0 : DUR.base, ease: EASE_OUT }}
      >
        <div className="edu-v4-media">
          <div className="edu-v4-banner">
            <img
              className="edu-v4-banner-img"
              src={entry.campusImage}
              alt={`${entry.institutionName} campus`}
              loading="lazy"
              decoding="async"
            />
          </div>
          <span className="edu-v4-dock">
            {entry.logos.map((logo) => (
              <span className="edu-v4-plate" key={logo.src} title={logo.alt}>
                <img src={logo.src} alt={logo.alt} loading="lazy" decoding="async" />
              </span>
            ))}
          </span>
        </div>

        <div className="edu-v4-body">
          <div className="edu-v4-top">
            <span className="edu-v4-period">{entry.period}</span>
            {entry.status && (
              <span className="edu-v4-status">
                <span className="edu-v4-status-dot" aria-hidden="true"></span>
                {entry.status}
              </span>
            )}
            <span className="edu-v4-chip">
              <i className="fas fa-location-dot" aria-hidden="true"></i> {entry.chip}
            </span>
          </div>

          <p className="edu-v4-degree">{entry.degree}</p>
          <h3 className="edu-v4-title">{entry.title}</h3>
          <p className="edu-v4-institution">{entry.institutionName}</p>
          <p className="edu-v4-summary">{entry.summary}</p>

          <div className="edu-v4-metas">
            {entry.metas.map((meta) => (
              <MetaTile key={meta.label} meta={meta} reduce={reduce} />
            ))}
          </div>
        </div>
      </motion.article>
    </div>
  );
}

// Alternating vertical timeline: a center line (left-aligned below 1024px) that fills progressively as the
// section scrolls, with a glowing node and a short connector per entry, cards zig-zagging left/right.
export default function EducationTimeline() {
  const reduce = usePrefersReducedMotion();
  const rowsRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: rowsRef, offset: ['start center', 'end center'] });
  const fillProgress = useSpring(scrollYProgress, SPRING);
  const scaleY = useTransform(fillProgress, (value) => Math.min(1, Math.max(0, value)));

  return (
    <div className="edu-v4-timeline">
      <div className="edu-v4-rows" ref={rowsRef}>
        <span className="edu-v4-line" aria-hidden="true">
          <motion.span className="edu-v4-line-fill" style={{ scaleY: reduce ? 1 : scaleY }} />
        </span>

        {educationData.map((entry, index) => (
          <TimelineRow key={entry.id} entry={entry} side={index % 2 === 0 ? 'left' : 'right'} reduce={reduce} />
        ))}
      </div>
    </div>
  );
}
