'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GalleryLightbox({ item, currentIndex, totalCount, onClose, onPrev, onNext }) {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef(null);

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    const originalStyle = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalStyle;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, onPrev, onNext]);

  // Touch Swipe Handler for Mobile
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && onNext) {
      onNext();
    } else if (isRightSwipe && onPrev) {
      onPrev();
    }
  };

  if (!item) return null;

  const isVideo = item.isVideo || (item.src && (item.src.endsWith('.mp4') || item.src.endsWith('.webm')));

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(var(--surface-rgb), 0.92)',
          backdropFilter: 'blur(25px) saturate(180%)',
          WebkitBackdropFilter: 'blur(25px) saturate(180%)',
          zIndex: 999999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.25rem'
        }}
        onClick={onClose}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        role="dialog"
        data-lenis-prevent
        aria-modal="true"
        aria-label={`Gallery Lightbox: ${item.title}`}
      >
        {/* Top Header Bar */}
        <div
          style={{
            position: 'absolute',
            top: '1.25rem',
            left: '1.5rem',
            right: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 20
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Counter Badge */}
          <div
            style={{
              padding: '0.4rem 1rem',
              borderRadius: '30px',
              background: 'rgba(var(--text-rgb), 0.1)',
              border: '1px solid rgba(var(--text-rgb), 0.18)',
              backdropFilter: 'blur(12px)',
              color: 'var(--text)',
              fontSize: '0.85rem',
              fontWeight: 600,
              letterSpacing: '0.5px'
            }}
          >
            {currentIndex + 1} / {totalCount}
          </div>

          {/* Action Buttons: Download & Close */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <a
              href={item.src}
              download
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: 'rgba(var(--text-rgb), 0.1)',
                border: '1px solid rgba(var(--text-rgb), 0.2)',
                color: 'var(--text)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem',
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
              aria-label="Download high resolution media"
              title="Download Original Media"
            >
              <i className="fas fa-download"></i>
            </a>

            <button
              onClick={onClose}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: 'rgba(var(--text-rgb), 0.12)',
                border: '1px solid rgba(var(--text-rgb), 0.25)',
                color: 'var(--text)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              aria-label="Close Lightbox"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>

        {/* Previous Navigation Button */}
        {onPrev && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            style={{
              position: 'absolute',
              left: '1.5rem',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              background: 'rgba(var(--text-rgb), 0.12)',
              border: '1px solid rgba(var(--text-rgb), 0.2)',
              backdropFilter: 'blur(12px)',
              color: 'var(--text)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.3rem',
              cursor: 'pointer',
              zIndex: 20,
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
              transition: 'all 0.2s ease'
            }}
            aria-label="Previous image"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
        )}

        {/* Main Lightbox Content Card */}
        <motion.div
          key={item.id}
          initial={{ scale: 0.94, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.94, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            maxWidth: '1100px',
            maxHeight: '85vh',
            width: '92%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 10,
            cursor: 'default'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Media Container */}
          <div
            style={{
              position: 'relative',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 35px rgba(var(--accent-rgb), 0.2)',
              border: '1px solid rgba(var(--text-rgb), 0.15)',
              background: 'rgba(var(--surface-rgb), 0.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              maxWidth: '100%',
              maxHeight: '68vh'
            }}
          >
            {isVideo ? (
              <video
                ref={videoRef}
                src={item.src}
                controls
                autoPlay
                loop
                playsInline
                style={{
                  maxHeight: '68vh',
                  maxWidth: '100%',
                  width: 'auto',
                  objectFit: 'contain',
                  borderRadius: '24px'
                }}
              />
            ) : (
              <img
                src={item.src || item.image}
                alt={item.title}
                onLoad={() => setIsLoaded(true)}
                style={{
                  maxHeight: '68vh',
                  maxWidth: '100%',
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                  borderRadius: '24px',
                  opacity: isLoaded ? 1 : 0.8,
                  transition: 'opacity 0.3s ease'
                }}
              />
            )}
          </div>

          {/* Caption & Metadata Floating Glass Card */}
          <div
            style={{
              marginTop: '1.25rem',
              width: '100%',
              maxWidth: '800px',
              padding: '1.1rem 1.75rem',
              background: 'rgba(var(--surface-rgb), 0.75)',
              backdropFilter: 'blur(20px) saturate(180%)',
              border: '1px solid rgba(var(--text-rgb), 0.15)',
              borderRadius: '20px',
              color: 'var(--text)',
              boxShadow: '0 15px 35px rgba(0, 0, 0, 0.4)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 700, margin: 0, color: 'var(--text)', letterSpacing: '-0.2px' }}>
                {item.title}
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span
                  style={{
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    letterSpacing: '1px',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '20px',
                    background: 'linear-gradient(135deg, rgba(var(--accent-rgb), 0.3) 0%, rgba(var(--accent-soft-rgb), 0.3) 100%)',
                    border: '1px solid rgba(var(--text-rgb), 0.2)',
                    color: 'var(--text)'
                  }}
                >
                  {item.categoryLabel || item.category}
                </span>
                {item.date ? (
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                    <i className="fas fa-calendar-alt" style={{ marginRight: '0.35rem', color: 'var(--accent)' }}></i>
                    {item.date}
                  </span>
                ) : null}
              </div>
            </div>

            {item.location && (
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: '0 0 0.4rem 0', fontWeight: 500 }}>
                <i className="fas fa-location-dot" style={{ marginRight: '0.4rem', color: 'var(--accent-soft)' }}></i>
                {item.location}
              </p>
            )}

            {item.description && (
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.55 }}>
                {item.description}
              </p>
            )}
          </div>
        </motion.div>

        {/* Next Navigation Button */}
        {onNext && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            style={{
              position: 'absolute',
              right: '1.5rem',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              background: 'rgba(var(--text-rgb), 0.12)',
              border: '1px solid rgba(var(--text-rgb), 0.2)',
              backdropFilter: 'blur(12px)',
              color: 'var(--text)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.3rem',
              cursor: 'pointer',
              zIndex: 20,
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
              transition: 'all 0.2s ease'
            }}
            aria-label="Next image"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
