'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';

// Dark modal that shows one image (used by the Certificates wall and the About highlights).
// Esc or a click on the backdrop closes it, the body cannot scroll while it is open, focus moves into the dialog,
// stays inside it (Tab cycles through the buttons) and returns to the element that opened it.
// Optional: onPrev / onNext (arrow buttons + ArrowLeft / ArrowRight), a caption and a counter.
// Rendered in a portal so no transformed ancestor can break `position: fixed`.
export default function ImageLightbox({ src, alt, label, closeLabel = 'Close', caption, category, counter, onClose, onPrev, onNext, reduce }) {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const handlers = useRef({});
  handlers.current = { onClose, onPrev, onNext };

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    if (closeButtonRef.current) closeButtonRef.current.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        handlers.current.onClose();
      } else if (event.key === 'ArrowLeft' && handlers.current.onPrev) {
        event.preventDefault();
        handlers.current.onPrev();
      } else if (event.key === 'ArrowRight' && handlers.current.onNext) {
        event.preventDefault();
        handlers.current.onNext();
      } else if (event.key === 'Tab') {
        // keep focus inside the dialog: cycle through its buttons
        const focusable = dialogRef.current ? [...dialogRef.current.querySelectorAll('button')] : [];
        if (!focusable.length) return;
        event.preventDefault();
        const index = focusable.indexOf(document.activeElement);
        const next = event.shiftKey ? (index <= 0 ? focusable.length - 1 : index - 1) : (index + 1) % focusable.length;
        focusable[next].focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previouslyFocused && typeof previouslyFocused.focus === 'function') previouslyFocused.focus();
    };
  }, []);

  const duration = reduce ? 0 : 0.25;

  return createPortal(
    <motion.div
      ref={dialogRef}
      className="cert-v2-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={label}
      data-lenis-prevent
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.div
        className="cert-v2-lightbox-inner"
        initial={{ opacity: 0, scale: reduce ? 1 : 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
        transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
      >
        <button type="button" className="cert-v2-lightbox-close" ref={closeButtonRef} onClick={onClose} aria-label={closeLabel}>
          <i className="fas fa-xmark" aria-hidden="true"></i>
        </button>
        <img className="cert-v2-lightbox-img" src={src} alt={alt} decoding="async" />
        {caption || counter ? (
          <div className="cert-v2-lightbox-caption">
            <span className="cert-v2-lightbox-caption-text">{caption}</span>
            {category ? <span className="cert-v2-lightbox-chip">{category}</span> : null}
            {counter ? <span className="cert-v2-lightbox-counter">{counter}</span> : null}
          </div>
        ) : null}
      </motion.div>

      {onPrev ? (
        <button type="button" className="cert-v2-lightbox-nav is-prev" onClick={onPrev} aria-label="Previous photo">
          <i className="fas fa-chevron-left" aria-hidden="true"></i>
        </button>
      ) : null}
      {onNext ? (
        <button type="button" className="cert-v2-lightbox-nav is-next" onClick={onNext} aria-label="Next photo">
          <i className="fas fa-chevron-right" aria-hidden="true"></i>
        </button>
      ) : null}
    </motion.div>,
    document.body
  );
}
