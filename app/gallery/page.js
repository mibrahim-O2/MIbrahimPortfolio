'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GalleryLightbox from '@/components/GalleryLightbox';
import PageIntro from '@/components/PageIntro';
import { fallbackGalleryItems } from '@/utils/galleryLoader';
import { galleryCategories } from '@/data/gallery';

export default function GalleryPage() {
  const [items, setItems] = useState(fallbackGalleryItems);
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);
  const [tiltStyles, setTiltStyles] = useState({});

  // Filter pills: "All" plus every category that actually has photos (definitions in data/gallery.js)
  const categories = [
    { key: 'all', label: 'All Gallery', icon: 'fas fa-images' },
    ...galleryCategories.filter((cat) => items.some((item) => item.category === cat.key))
  ];
  const categoryCount = categories.length - 1;


  // Dynamically load items from API route if available
  useEffect(() => {
    async function loadGallery() {
      try {
        const res = await fetch('/api/gallery');
        if (res.ok) {
          const data = await res.json();
          if (data.items && data.items.length > 0) {
            setItems(data.items);
          }
        }
      } catch (err) {
        console.warn('API gallery scan fallback used:', err);
      }
    }

    loadGallery();
  }, []);

  // Filter items
  const filteredItems = activeCategory === 'all'
    ? items
    : items.filter((item) => item.category === activeCategory);

  // Lightbox handlers
  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === 0 ? filteredItems.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === filteredItems.length - 1 ? 0 : prev + 1));
  };

  // 3D Tilt calculation
  const handleMouseMove = (e, id) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    setTiltStyles((prev) => ({
      ...prev,
      [id]: {
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
        transition: 'transform 0.1s ease-out'
      }
    }));
  };

  const handleMouseLeave = (id) => {
    setHoveredId(null);
    setTiltStyles((prev) => ({
      ...prev,
      [id]: {
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
      }
    }));
  };

  return (
    <div className="gallery-main-wrapper" style={{ minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>

      <PageIntro
        eyebrow="Beyond code"
        title="Gallery"
        lead="Moments from university, exhibitions, sports galas, volunteering and trips."
        back={{ href: '/about', label: 'About' }}
      />
      <p className="container mono" style={{ color: 'var(--text-muted)', fontSize: '0.8rem', paddingBottom: '2rem' }}>
        {items.length} photos · {categoryCount} categories
      </p>

      {/* Main Gallery Section */}
      <section className="container" style={{ paddingBottom: 'var(--space-section)', position: 'relative', zIndex: 2 }}>
        {/* Category Filter Pills */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem',
            marginBottom: '2.5rem'
          }}
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <motion.button
                key={cat.key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setActiveCategory(cat.key);
                  setLightboxIndex(null);
                }}
                aria-pressed={isActive}
                style={{
                  minHeight: '42px',
                  padding: '0.5rem 1rem',
                  borderRadius: '999px',
                  border: isActive ? '1px solid rgba(var(--accent-rgb), 0.45)' : '1px solid var(--border)',
                  background: isActive ? 'rgba(var(--accent-rgb), 0.14)' : 'transparent',
                  color: isActive ? 'var(--text)' : 'var(--text-muted)',
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s, border-color 0.2s, color 0.2s',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <i className={cat.icon} aria-hidden="true" style={{ fontSize: '0.8rem', color: 'var(--accent)' }}></i>
                {cat.label}
              </motion.button>
            );
          })}
        </div>

        {/* Loading Spinner Skeleton */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--muted-foreground)' }}>
            <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '1rem' }}></i>
            <p>Loading curated gallery moments...</p>
          </div>
        ) : (
          /* Intelligent Masonry Grid */
          <motion.div
            layout
            className="gallery-masonry-grid"
            style={{
              columnCount: 'auto',
              columnWidth: '320px',
              columnGap: '1.5rem',
              width: '100%'
            }}
          >
            <AnimatePresence>
              {filteredItems.map((item, index) => {
                const isHovered = hoveredId === item.id;
                const tiltStyle = tiltStyles[item.id] || {};

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 35, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.4), ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      breakInside: 'avoid',
                      marginBottom: '1.5rem',
                      display: 'inline-block',
                      width: '100%',
                      transformStyle: 'preserve-3d',
                      ...tiltStyle
                    }}
                    onMouseMove={(e) => handleMouseMove(e, item.id)}
                    onMouseEnter={() => setHoveredId(item.id)}
                    onMouseLeave={() => handleMouseLeave(item.id)}
                    onClick={() => setLightboxIndex(index)}
                  >
                    {/* Glass Card Container */}
                    <div
                      style={{
                        position: 'relative',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        background: 'rgba(var(--surface-rgb), 0.85)',
                        backdropFilter: 'blur(16px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                        border: isHovered
                          ? '1px solid rgba(var(--accent-rgb), 0.45)'
                          : '1px solid var(--border)',
                        boxShadow: isHovered
                          ? '0 20px 40px rgba(var(--accent-rgb), 0.25), 0 0 20px rgba(var(--accent-soft-rgb), 0.15)'
                          : '0 8px 24px rgba(0, 0, 0, 0.5)',
                        cursor: 'pointer',
                        transition: 'box-shadow 0.35s ease, border-color 0.35s ease'
                      }}
                    >
                      {/* Image / Video Media Box */}
                      <div style={{ position: 'relative', width: '100%', overflow: 'hidden', backgroundColor: 'var(--surface-2)' }}>
                        {item.isVideo ? (
                          <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}>
                            <video
                              src={item.src}
                              muted
                              loop
                              playsInline
                              autoPlay
                              style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                              }}
                            />
                            <div
                              style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                background: 'rgba(var(--surface-rgb), 0.7)',
                                backdropFilter: 'blur(8px)',
                                color: 'var(--text)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.2rem',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
                              }}
                            >
                              <i className="fas fa-play" style={{ marginLeft: '3px' }}></i>
                            </div>
                          </div>
                        ) : (
                          <img
                            src={item.src || item.image}
                            alt={item.title}
                            loading="lazy"
                            style={{
                              width: '100%',
                              height: 'auto',
                              display: 'block',
                              objectFit: 'cover',
                              transform: isHovered ? 'scale(1.06)' : 'scale(1)',
                              transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                            }}
                          />
                        )}

                        {/* Top Category Badge */}
                        <div
                          style={{
                            position: 'absolute',
                            top: '0.85rem',
                            right: '0.85rem',
                            background: 'rgba(var(--surface-rgb), 0.72)',
                            backdropFilter: 'blur(10px)',
                            WebkitBackdropFilter: 'blur(10px)',
                            color: 'var(--text)',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            letterSpacing: '0.5px',
                            textTransform: 'uppercase',
                            padding: '0.3rem 0.75rem',
                            borderRadius: '20px',
                            border: '1px solid rgba(var(--text-rgb), 0.2)',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)'
                          }}
                        >
                          {item.categoryLabel || item.category}
                        </div>

                        {/* Glass Reflection Sheen on Hover */}
                        {isHovered && (
                          <div
                            style={{
                              position: 'absolute',
                              inset: 0,
                              background: 'linear-gradient(135deg, rgba(var(--text-rgb), 0.25) 0%, rgba(var(--text-rgb), 0) 60%)',
                              pointerEvents: 'none'
                            }}
                          />
                        )}
                      </div>

                      {/* Card Content Footer */}
                      <div style={{ padding: '1.25rem 1.35rem', background: 'var(--card)' }}>
                        <h2
                          style={{
                            fontSize: '1.1rem',
                            fontWeight: 700,
                            color: 'var(--foreground)',
                            marginBottom: '0.35rem',
                            lineHeight: 1.3
                          }}
                        >
                          {item.title}
                        </h2>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                          <span style={{ fontSize: '0.82rem', color: 'var(--primary)', fontWeight: 600 }}>
                            {item.location ? <i className="fas fa-location-dot" style={{ marginRight: '0.35rem', color: 'var(--accent-soft)' }}></i> : null}
                            {item.location}
                          </span>
                          <span style={{ fontSize: '0.78rem', color: 'var(--muted-foreground)', fontWeight: 500 }}>
                            <i className="fas fa-arrow-up-right-from-square" style={{ opacity: isHovered ? 1 : 0.4, transition: 'opacity 0.2s ease' }}></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <GalleryLightbox
          item={filteredItems[lightboxIndex]}
          currentIndex={lightboxIndex}
          totalCount={filteredItems.length}
          onClose={() => setLightboxIndex(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}

    </div>
  );
}
