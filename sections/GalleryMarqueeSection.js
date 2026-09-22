'use client';

import Link from 'next/link';
import SectionTitle from '@/components/SectionTitle';
import Reveal from '@/components/motion/Reveal';
import { fallbackGalleryItems, highlightItems } from '@/utils/galleryLoader';

export default function GalleryMarqueeSection() {
  // Same 11 highlights as the About deck (order comes from data/gallery.js)
  const photos = highlightItems.map((item) => ({ src: item.src, alt: item.title, aspect: item.aspect }));
  // Duplicate photos 3x for seamless infinite marquee loop
  const infinitePhotos = [...photos, ...photos, ...photos];

  return (
    <section id="gallery-marquee-section" className="gallery-marquee-section section">
      <div className="container" style={{ marginBottom: '2rem' }}>
        <SectionTitle
          icon="fas fa-camera-retro"
          title="Moments & Gallery Highlights"
          description="An infinite visual stream of university milestones, hackathon wins, leadership events, and tech visits."
        />
      </div>

      {/* Infinite Seamless Marquee Strip */}
      <Reveal variant="fade" className="photo-marquee-container">
        <div className="photo-marquee-track">
          {infinitePhotos.map((photo, index) => {
            const isLandscape = photo.aspect === 'landscape';
            return (
              <Link
                key={index}
                href="/gallery"
                className={`marquee-photo-card ${isLandscape ? 'landscape' : 'portrait'}`}
              >
                <img src={photo.src} alt={photo.alt} loading="lazy" />
                <div className="marquee-photo-overlay">
                  <span className="marquee-photo-tag"><i className="fas fa-camera" style={{ marginRight: '0.4rem' }}></i>{photo.alt}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </Reveal>

      {/* CTA Button to Full Gallery Page */}
      <Reveal style={{ textAlign: 'center', marginTop: '2.5rem' }}>
        <Link href="/gallery" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', padding: '0.8rem 2rem', borderRadius: '30px' }}>
          <i className="fas fa-images"></i>
          <span>Explore Full Gallery ({fallbackGalleryItems.length} Moments)</span>
          <i className="fas fa-arrow-right"></i>
        </Link>
      </Reveal>
    </section>
  );
}
