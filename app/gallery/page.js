'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import GalleryLightbox from '@/components/GalleryLightbox';
import FooterSection from '@/sections/FooterSection';
import ScrollToTop from '@/components/ScrollToTop';
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
    <main className="gallery-main-wrapper" style={{ minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
      <Navbar />

      {/* Hero Section */}
      <section className="gallery-hero-section" style={{ position: 'relative', paddingTop: '130px', paddingBottom: '4rem', overflow: 'hidden' }}>

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ textAlign: 'center', maxWidth: '860px', margin: '0 auto' }}
          >
            {/* Subtitle Pill */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.45rem 1.25rem',
                borderRadius: '30px',
                background: 'rgba(var(--accent-rgb), 0.12)',
                border: '1px solid rgba(var(--accent-rgb), 0.3)',
                boxShadow: '0 0 20px rgba(var(--accent-rgb), 0.15)',
                color: 'var(--primary)',
                fontSize: '0.9rem',
                fontWeight: 700,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                marginBottom: '1.25rem'
              }}
            >
              <i className="fas fa-camera-retro" style={{ fontSize: '1rem', color: 'var(--accent-soft)' }}></i>
              Gallery Showcase
            </motion.div>

            {/* Main Title */}
            <h1
              style={{
                fontSize: 'clamp(2.8rem, 6vw, 4.5rem)',
                fontWeight: 800,
                lineHeight: 1.1,
                marginBottom: '1.25rem',
                letterSpacing: '-1px',
                color: 'var(--foreground)'
              }}
            >
              Ibrahim <span className="brand-accent" style={{ background: 'var(--gradient-text)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Gallery</span>
            </h1>

            {/* Description */}
            <p
              style={{
                fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
                lineHeight: 1.65,
                color: 'var(--muted-foreground)',
                maxWidth: '750px',
                margin: '0 auto 2.5rem'
              }}
            >
              "A collection of memorable moments from my academic journey, internships, competitions, leadership roles, travels, achievements, and professional experiences."
            </p>

            {/* Quick Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              style={{
                display: 'inline-flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '1.75rem',
                padding: '1rem 2rem',
                borderRadius: '50px',
                background: 'rgba(var(--text-rgb), 0.05)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid var(--border)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary)' }}>{items.length}</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)', fontWeight: 600 }}>Captured Moments</span>
              </div>
              <div style={{ width: '1px', height: '24px', background: 'var(--border)', alignSelf: 'center' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-soft)' }}>{categoryCount}</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)', fontWeight: 600 }}>Categories</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Gallery Section */}
      <section className="container" style={{ paddingBottom: '6rem', position: 'relative', zIndex: 2 }}>
        {/* Category Filter Pills */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem',
            justifyContent: 'center',
            marginBottom: '3.5rem'
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
                style={{
                  padding: '0.65rem 1.35rem',
                  borderRadius: '30px',
                  border: isActive ? '1px solid rgba(var(--accent-rgb), 0.6)' : '1px solid var(--border)',
                  background: isActive
                    ? 'var(--gradient-button)'
                    : 'rgba(var(--text-rgb), 0.06)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  color: isActive ? 'var(--text)' : 'var(--foreground)',
                  fontWeight: isActive ? 700 : 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  boxShadow: isActive
                    ? '0 8px 25px rgba(var(--accent-rgb), 0.35), 0 0 15px rgba(var(--accent-soft-rgb), 0.2)'
                    : '0 4px 12px rgba(0, 0, 0, 0.5)',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <i className={cat.icon} style={{ fontSize: '0.85rem', color: isActive ? 'var(--text)' : 'var(--primary)' }}></i>
                {cat.label}
              </motion.button>
            );
          })}
        </div>

        {/* Section Heading */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--foreground)' }}>
            Gallery Showcase
          </h2>
          <div
            style={{
              width: '60px',
              height: '3px',
              background: 'var(--gradient-accent)',
              borderRadius: '3px',
              margin: '0.5rem auto 0'
            }}
          />
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
                        <h4
                          style={{
                            fontSize: '1.1rem',
                            fontWeight: 700,
                            color: 'var(--foreground)',
                            marginBottom: '0.35rem',
                            lineHeight: 1.3
                          }}
                        >
                          {item.title}
                        </h4>

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

      <FooterSection />
      <ScrollToTop />
    </main>
  );
}
