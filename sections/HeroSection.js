'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { personalInfo } from '@/data/personal';

export default function HeroSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  // Badge text: the part before the first colon ("Open to Work:") gets its own color
  const pill = personalInfo.statusPill || '';
  const colonIndex = pill.indexOf(':');
  const pillLabel = colonIndex > -1 ? pill.slice(0, colonIndex + 1) : '';
  const pillText = colonIndex > -1 ? pill.slice(colonIndex + 1).trim() : pill;

  // Name: last word gets the gradient ("Muhammad" + "Ibrahim")
  const nameParts = (personalInfo.name || '').trim().split(' ');
  const lastName = nameParts.length > 1 ? nameParts.pop() : '';
  const firstName = nameParts.join(' ');

  return (
    <section id="home" className="hero hero-animated-bg">
      {/* Animated background glowing orbs */}

      <div id="particles-js" className="hero-particles"></div>

      <div className="container">
        <div className="hero-grid">
          <div className="hero-content">
            <div className="status-pill animated-status-pill" data-aos="rise-blur" data-aos-delay="0">
              <span className="status-dot"></span>
              <span>
                {pillLabel && (
                  <span style={{ color: 'var(--accent-soft)', fontWeight: 700 }}>
                    {pillLabel}
                  </span>
                )}{' '}
                <span style={{ color: 'var(--text-muted)' }}>{pillText}</span>
              </span>
            </div>

            <p className="hero-greeting" data-aos="rise-blur" data-aos-delay="70">{personalInfo.greeting}</p>

            <h1 className="hero-title" data-aos="rise-blur" data-aos-delay="140">
              {firstName}{' '}
              {lastName && (
                <span className="text-gradient animated-gradient-text">{lastName}</span>
              )}
            </h1>

            <h2 className="hero-subtitle" data-aos="rise-blur" data-aos-delay="210">{personalInfo.title}</h2>

            <div className="hero-description" data-aos="rise-blur" data-aos-delay="280">
              <img
                src={personalInfo.typingSvgUrl}
                alt={`${personalInfo.name} - Typing Intro`}
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </div>

            <div className="hero-buttons" data-aos="rise-blur" data-aos-delay="350">
              <Link href="/contact" className="btn btn-primary btn-pulse-glow">
                Get In Touch
              </Link>
              <Link href="/projects" className="btn btn-outline btn-glass-hover">
                View Projects
              </Link>
            </div>

            <div className="social-links" data-aos="rise-blur" data-aos-delay="350">
              <a
                href="https://github.com/mibrahim-O2"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="GitHub"
              >
                <i className="fab fa-github"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/muhammad-ibrahim-o2"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="mailto:mibrahimkhalid306@gmail.com" className="social-link" aria-label="Email">
                <i className="fas fa-envelope"></i>
              </a>
              <a href="tel:+923242991303" className="social-link" aria-label="Phone">
                <i className="fas fa-phone"></i>
              </a>
            </div>
          </div>

          <div className="hero-image-container" data-aos="clip-up">
            <div className="hero-image-wrapper hero-video-glow-frame">
              <div className="hero-image-bg"></div>
              <video
                ref={videoRef}
                id="heroVideo"
                src="/IntroVideo.mp4"
                className="hero-image"
                playsInline
              ></video>
            </div>

            <button
              id="introVideoBtn"
              className="intro-video-btn"
              type="button"
              aria-label="Play Introduction Video"
              onClick={toggleVideo}
            >
              <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
              <span>{isPlaying ? 'Pause Introduction' : 'click here for Introduction'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}