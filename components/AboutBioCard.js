'use client';

import { useEffect, useRef } from 'react';
import { aboutParagraphs } from '@/data/about';
import { buildHighlightedParagraphs } from '@/utils/highlight';

const TONE_CLASSES = {
  soft: 'about-v3-mark--soft',
  teal: 'about-v3-mark--teal',
  accent: 'about-v3-mark--accent'
};

export default function AboutBioCard() {
  const cardRef = useRef(null);

  const paragraphs = buildHighlightedParagraphs(aboutParagraphs);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return undefined;

    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    let frame = 0;

    const onPointerMove = (event) => {
      if (event.pointerType && event.pointerType !== 'mouse') return;
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        card.style.setProperty('--mx', `${x}px`);
        card.style.setProperty('--my', `${y}px`);
        card.classList.add('is-spot');
      });
    };
    const onPointerLeave = () => {
      card.classList.remove('is-spot');
    };

    if (finePointer) {
      card.addEventListener('pointermove', onPointerMove);
      card.addEventListener('pointerleave', onPointerLeave);
    }

    return () => {
      card.removeEventListener('pointermove', onPointerMove);
      card.removeEventListener('pointerleave', onPointerLeave);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="about-v3-card" ref={cardRef}>
      <div className="about-v3-header">
        <div className="about-v3-dots" aria-hidden="true">
          <span className="about-v3-dot"></span>
          <span className="about-v3-dot"></span>
          <span className="about-v3-dot"></span>
        </div>
        <span className="about-v3-label">// core.profile</span>
        <span className="about-v3-status">System Online</span>
      </div>

      <span className="about-v3-bracket about-v3-bracket--tl" aria-hidden="true"></span>
      <span className="about-v3-bracket about-v3-bracket--br" aria-hidden="true"></span>
      <div className="about-v3-scanline" aria-hidden="true"></div>
      <div className="about-v3-spot" aria-hidden="true"></div>

      <div className="about-v3-body">
        <div className="about-v3-blocks">
          {paragraphs.map((paragraph, index) => (
            <p className="about-v3-text" key={index}>
              {paragraph.segments.map((segment, segmentIndex) =>
                segment.match ? (
                  <mark
                    className={`about-v3-mark ${TONE_CLASSES[segment.tone]}`}
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
          ))}
        </div>
      </div>
    </div>
  );
}