'use client';

import { useEffect, useMemo, useRef } from 'react';
import { aboutParagraphs } from '@/data/about';
import { buildHighlightedParagraphs } from '@/utils/highlight';

const TONE_CLASSES = {
  soft: 'about-v2-mark--soft',
  teal: 'about-v2-mark--teal',
  accent: 'about-v2-mark--accent'
};

const REVEAL_STAGGER_MS = 120; // delay between blocks that enter the viewport together
const COUNT_STEP_MS = 90; // step of the 00 -> 0N badge count-up

const pad = (value) => String(value).padStart(2, '0');

export default function AboutBioCard() {
  const cardRef = useRef(null);
  const railRef = useRef(null);
  const blockRefs = useRef([]);
  const nodeRefs = useRef([]);
  const badgeRefs = useRef([]);

  const paragraphs = useMemo(() => buildHighlightedParagraphs(aboutParagraphs), []);

  useEffect(() => {
    const card = cardRef.current;
    const rail = railRef.current;
    if (!card || !rail) return undefined;

    const blocks = blockRefs.current.filter(Boolean);
    const nodes = nodeRefs.current.filter(Boolean);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Reduced motion: show everything immediately, no observers, no listeners, no spotlight.
    if (reduceMotion) {
      blocks.forEach((block) => block.classList.add('is-visible'));
      nodes.forEach((node) => node.classList.add('is-lit'));
      card.style.setProperty('--about-v2-p', '1');
      return undefined;
    }

    const timers = [];
    let scrollFrame = 0;
    let spotFrame = 0;
    let observer = null;

    // --- Reveal (once per block) + badge count-up -------------------------------------------
    const reveal = (block, index, delayMs) => {
      block.style.transitionDelay = `${delayMs}ms`;
      block.classList.add('is-visible');

      const badge = badgeRefs.current[index];
      if (!badge) return;
      badge.textContent = '00';
      for (let step = 1; step <= index + 1; step += 1) {
        timers.push(
          window.setTimeout(() => {
            badge.textContent = pad(step);
          }, delayMs + 250 + step * COUNT_STEP_MS)
        );
      }
    };

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          const entering = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => blocks.indexOf(a.target) - blocks.indexOf(b.target));
          entering.forEach((entry, order) => {
            reveal(entry.target, blocks.indexOf(entry.target), order * REVEAL_STAGGER_MS);
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.25 }
      );
      blocks.forEach((block) => observer.observe(block));
    } else {
      blocks.forEach((block) => block.classList.add('is-visible'));
    }

    // --- Rail fill + node lighting (passive scroll, rAF throttled) ---------------------------
    const updateProgress = () => {
      scrollFrame = 0;
      const railRect = rail.getBoundingClientRect();
      if (railRect.height <= 0) return;
      const progress = Math.min(1, Math.max(0, (window.innerHeight * 0.7 - railRect.top) / railRect.height));
      card.style.setProperty('--about-v2-p', progress.toFixed(3));
      const filled = progress * railRect.height;
      nodes.forEach((node) => {
        const nodeRect = node.getBoundingClientRect();
        const nodeY = nodeRect.top + nodeRect.height / 2 - railRect.top;
        node.classList.toggle('is-lit', filled >= nodeY);
      });
    };
    const scheduleProgress = () => {
      if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateProgress);
    };
    window.addEventListener('scroll', scheduleProgress, { passive: true });
    window.addEventListener('resize', scheduleProgress);
    updateProgress();

    // --- Mouse-follow spotlight (fine pointers only; CSS also hides it on touch) --------------
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    let pointerX = 0;
    let pointerY = 0;
    const onPointerMove = (event) => {
      if (event.pointerType && event.pointerType !== 'mouse') return;
      const rect = card.getBoundingClientRect();
      pointerX = event.clientX - rect.left;
      pointerY = event.clientY - rect.top;
      if (spotFrame) return;
      spotFrame = window.requestAnimationFrame(() => {
        spotFrame = 0;
        card.style.setProperty('--mx', `${pointerX}px`);
        card.style.setProperty('--my', `${pointerY}px`);
        card.classList.add('is-spot');
      });
    };
    const onPointerLeave = () => card.classList.remove('is-spot');
    if (finePointer) {
      card.addEventListener('pointermove', onPointerMove);
      card.addEventListener('pointerleave', onPointerLeave);
    }

    return () => {
      window.removeEventListener('scroll', scheduleProgress);
      window.removeEventListener('resize', scheduleProgress);
      card.removeEventListener('pointermove', onPointerMove);
      card.removeEventListener('pointerleave', onPointerLeave);
      if (observer) observer.disconnect();
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
      if (spotFrame) window.cancelAnimationFrame(spotFrame);
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  return (
    <div className="about-v2-card" ref={cardRef}>
      <div className="about-v2-spot" aria-hidden="true"></div>

      <div className="about-v2-head">
        <span className="about-v2-label">// core.profile</span>
        <span className="about-v2-status">System Online</span>
      </div>

      <div className="about-v2-blocks">
        <div className="about-v2-rail" ref={railRef} aria-hidden="true">
          <div className="about-v2-rail-fill"></div>
        </div>

        {paragraphs.map((paragraph, index) => (
          <div className="about-v2-block" key={index} ref={(el) => (blockRefs.current[index] = el)}>
            <span className="about-v2-node" ref={(el) => (nodeRefs.current[index] = el)} aria-hidden="true"></span>
            <span className="about-v2-index" ref={(el) => (badgeRefs.current[index] = el)} aria-hidden="true">
              {pad(index + 1)}
            </span>
            <p className="about-v2-text">
              {paragraph.segments.map((segment, segmentIndex) =>
                segment.match ? (
                  <mark
                    className={`about-v2-mark ${TONE_CLASSES[segment.tone]}`}
                    style={{ '--k': segment.order }}
                    key={segmentIndex}
                  >
                    {segment.text}
                  </mark>
                ) : (
                  segment.text
                )
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
