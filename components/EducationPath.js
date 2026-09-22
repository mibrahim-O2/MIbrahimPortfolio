'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, animate, motion, useInView } from 'framer-motion';
import { educationData } from '@/data/education';
import usePrefersReducedMotion from '@/utils/usePrefersReducedMotion';

const COUNTABLE = /^\d+(\.\d+)?%$/; // "94%", "82.6%"
const AUTO_ADVANCE_MS = 7000;
const EASE = [0.16, 1, 0.3, 1];
const PANEL_ID = 'edu-v3-panel';

const formatPercent = (number, decimals) => `${number.toFixed(decimals)}%`;
const startYear = (period) => period.split(/\s*[–-]\s*/)[0];
const tabLabel = (entry) => entry.short || entry.degree;

// Counts from 0 to the value on every selection (about 900 ms, ease-out)
function CountUp({ value, reduce }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
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

function LogoPlates({ logos, className, size }) {
  return (
    <span className={className}>
      {logos.map((logo) => (
        <span className="edu-v3-plate" style={{ width: size, height: size }} key={logo.src} title={logo.alt}>
          <img src={logo.src} alt={logo.alt} loading="lazy" decoding="async" />
        </span>
      ))}
    </span>
  );
}

function EducationDetail({ entry, reduce }) {
  return (
    <>
      <div className="edu-v3-media">
        <div className="edu-v3-banner">
          <img
            className="edu-v3-banner-img"
            src={entry.campusImage}
            alt={entry.institutionName}
            loading="lazy"
            decoding="async"
          />
        </div>
        <LogoPlates logos={entry.logos} className="edu-v3-dock" size={48} />
      </div>

      <div className="edu-v3-body">
        <div className="edu-v3-top">
          <span className="edu-v3-period">{entry.period}</span>
          {entry.status && (
            <span className="edu-v3-status">
              <span className="edu-v3-status-dot" aria-hidden="true"></span>
              {entry.status}
            </span>
          )}
          <span className="edu-v3-chip">
            <i className="fas fa-location-dot" aria-hidden="true"></i> {entry.chip}
          </span>
        </div>

        <p className="edu-v3-degree">{entry.degree}</p>
        <h3 className="edu-v3-title">{entry.title}</h3>
        <p className="edu-v3-institution">{entry.institutionName}</p>
        <p className="edu-v3-summary">{entry.summary}</p>

        <div className="edu-v3-metas">
          {entry.metas.map((meta) => {
            const countable = COUNTABLE.test(meta.value.trim());
            return (
              <div className="edu-v3-tile" key={meta.label}>
                <span className="edu-v3-tile-label">{meta.label}</span>
                <span className={`edu-v3-tile-value${countable ? ' is-number' : ''}`}>
                  {countable ? (
                    <>
                      <span aria-hidden="true">
                        <CountUp value={meta.value.trim()} reduce={reduce} />
                      </span>
                      <span className="edu-v3-sr">{meta.value}</span>
                    </>
                  ) : (
                    meta.value
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default function EducationPath() {
  const reduce = usePrefersReducedMotion();
  const rootRef = useRef(null);
  const tabRefs = useRef([]);
  const inView = useInView(rootRef, { amount: 0.3 });

  const [activeIndex, setActiveIndex] = useState(0); // 0 = newest
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false); // hover or focus inside
  const [interacted, setInteracted] = useState(false);
  const [vertical, setVertical] = useState(false);

  const total = educationData.length;
  const active = educationData[activeIndex];
  // Meter fills from the oldest entry (bottom, empty) to the newest (top, full)
  const progress = total > 1 ? 1 - activeIndex / (total - 1) : 1;

  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px)');
    const update = () => setVertical(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  const select = (index, byUser) => {
    if (byUser) setInteracted(true);
    setActiveIndex((current) => {
      if (current !== index) setDirection(index > current ? 1 : -1);
      return index;
    });
  };

  // Small screens: keep the active pill centred inside the scrolling row (does not scroll the page)
  useEffect(() => {
    if (vertical) return;
    const tab = tabRefs.current[activeIndex];
    const list = tab && tab.parentElement;
    if (!tab || !list) return;
    list.scrollTo({ left: tab.offsetLeft - (list.clientWidth - tab.offsetWidth) / 2, behavior: reduce ? 'auto' : 'smooth' });
  }, [activeIndex, vertical, reduce]);

  // Auto-advance until the user interacts; paused on hover/focus, off-screen and for reduced motion
  useEffect(() => {
    if (reduce || interacted || paused || !inView) return undefined;
    const timer = window.setInterval(() => {
      setDirection(1);
      setActiveIndex((current) => (current + 1) % total);
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(timer);
  }, [reduce, interacted, paused, inView, total]);

  const moveTo = (index) => {
    const next = (index + total) % total;
    select(next, true);
    if (tabRefs.current[next]) tabRefs.current[next].focus();
  };

  const onKeyDown = (event) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault();
      moveTo(activeIndex + 1);
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      event.preventDefault();
      moveTo(activeIndex - 1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      moveTo(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      moveTo(total - 1);
    }
  };

  const slide = reduce ? 0 : 28;
  const variants = {
    enter: (dir) => ({ opacity: 0, x: dir * slide }),
    center: { opacity: 1, x: 0, transition: { duration: reduce ? 0 : 0.2, ease: EASE } },
    exit: (dir) => ({ opacity: 0, x: -dir * slide, transition: { duration: reduce ? 0 : 0.15, ease: 'easeIn' } })
  };

  return (
    <div
      className="edu-v3-layout"
      ref={rootRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
      onPointerDown={() => setInteracted(true)}
    >
      <div className="edu-v3-nav">
        <div className="edu-v3-meter" aria-hidden="true">
          <motion.span
            className="edu-v3-meter-fill"
            initial={false}
            animate={{ scaleY: progress }}
            transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
          />
        </div>

        <div
          className="edu-v3-tabs"
          role="tablist"
          aria-label="Education"
          aria-orientation={vertical ? 'vertical' : 'horizontal'}
          onKeyDown={onKeyDown}
        >
          {educationData.map((entry, index) => {
            const selected = index === activeIndex;
            return (
              <button
                key={entry.id}
                type="button"
                role="tab"
                id={`edu-v3-tab-${entry.id}`}
                aria-selected={selected}
                aria-controls={PANEL_ID}
                tabIndex={selected ? 0 : -1}
                ref={(element) => {
                  tabRefs.current[index] = element;
                }}
                className={`edu-v3-tab${selected ? ' is-active' : ''}`}
                onClick={() => select(index, true)}
                onFocus={() => select(index, true)}
              >
                {selected && (
                  <motion.span
                    layoutId="edu-v3-highlight"
                    className="edu-v3-highlight"
                    transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 34 }}
                  />
                )}
                <LogoPlates logos={entry.logos} className="edu-v3-mini-plates" size={28} />
                <span className="edu-v3-tab-text">
                  <span className="edu-v3-tab-degree">{entry.degree}</span>
                  <span className="edu-v3-tab-period">{entry.period}</span>
                </span>
                <i className="fas fa-chevron-right edu-v3-chevron" aria-hidden="true"></i>
                <span className="edu-v3-tab-short">
                  {tabLabel(entry)} <span className="edu-v3-tab-year">{startYear(entry.period)}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="edu-v3-panel" role="tabpanel" id={PANEL_ID} aria-labelledby={`edu-v3-tab-${active.id}`} tabIndex={0}>
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={active.id}
            className="edu-v3-panel-inner"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <EducationDetail entry={active} reduce={reduce} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
