'use client';

import { Fragment, useRef } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { personalInfo } from '@/data/personal';
import { publishedProjects, featuredProjects } from '@/data/projects';
import { certificatesData } from '@/data/certificates';
import { experienceData } from '@/data/experience';
import styles from './HeroSection.module.css';

// Icons shown under the hero buttons, in this order (all come from personalInfo.socialLinks)
const HERO_SOCIALS = ['GitHub', 'LinkedIn', 'Email', 'Phone'];
const heroSocials = HERO_SOCIALS
  .map((name) => personalInfo.socialLinks.find((social) => social.name === name))
  .filter((social) => social && social.url && social.icon);

const EASE = [0.22, 1, 0.36, 1];

// Splits the headline into words; words that belong to `headlineAccent` get the copper gradient.
function headlineWords() {
  const words = (personalInfo.headline || personalInfo.title).split(' ');
  const norm = (word) => word.toLowerCase().replace(/[^a-z0-9-]/g, '');
  const accent = (personalInfo.headlineAccent || '').split(' ').filter(Boolean).map(norm);
  const start = accent.length ? words.findIndex((_, i) => accent.every((a, j) => norm(words[i + j] || '') === a)) : -1;
  return words.map((word, index) => ({ word, isAccent: start > -1 && index >= start && index < start + accent.length }));
}

export default function HeroSection() {
  const sectionRef = useRef(null);
  const words = headlineWords();
  const spotlight = featuredProjects[0];

  // Pointer position -> spotlight (CSS variables) + gentle tilt of the portrait card. Mouse only.
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltX, { stiffness: 120, damping: 18 });
  const rotateY = useSpring(tiltY, { stiffness: 120, damping: 18 });

  const onPointerMove = (event) => {
    if (event.pointerType !== 'mouse' || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    sectionRef.current.style.setProperty('--hx', `${x}px`);
    sectionRef.current.style.setProperty('--hy', `${y}px`);
    tiltY.set((x / rect.width - 0.5) * 8);
    tiltX.set(-(y / rect.height - 0.5) * 8);
  };
  const onPointerLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  // Light parallax while scrolling past the hero
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const visualY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.25]);

  // Status badge: the part before the first colon ("Open to Work:") is highlighted
  const pill = personalInfo.statusPill || '';
  const colon = pill.indexOf(':');
  const pillLabel = colon > -1 ? pill.slice(0, colon) : '';
  const pillText = colon > -1 ? pill.slice(colon + 1).trim() : pill;

  const stats = [
    { value: publishedProjects.length, label: 'Projects' },
    { value: experienceData.length, label: 'Roles' },
    { value: certificatesData.length, label: 'Certifications' }
  ];

  return (
    <section id="home" ref={sectionRef} className={styles.hero} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
      <motion.div className={styles.backdrop} style={{ y: glowY }} aria-hidden="true">
        <div className={styles.aurora} />
        <div className={styles.aurora2} />
        <div className={styles.grid} />
      </motion.div>
      <div className={styles.spot} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <motion.div className={styles.content} style={{ opacity: contentOpacity }}>
          <motion.p
            className={styles.badge}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span className={styles.badgeDot} aria-hidden="true" />
            {pillLabel && <strong>{pillLabel}</strong>}
            <span>{pillText}</span>
          </motion.p>

          <motion.p
            className={styles.intro}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
          >
            <span className={styles.name}>{personalInfo.name}</span>
            <span className={styles.sep} aria-hidden="true">/</span>
            <span>{personalInfo.title}</span>
          </motion.p>

          <h1 className={styles.title} aria-label={personalInfo.headline}>
            {words.map(({ word, isAccent }, index) => (
              <Fragment key={index}>
                <span className={styles.wordMask} aria-hidden="true">
                  <motion.span
                    className={`${styles.word} ${isAccent ? 'text-gradient' : ''}`}
                    initial={{ y: '105%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 0.8, ease: EASE, delay: 0.15 + index * 0.05 }}
                  >
                    {word}
                  </motion.span>
                </span>{' '}
              </Fragment>
            ))}
          </h1>

          <motion.p
            className={styles.lead}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.55 }}
          >
            {personalInfo.intro}
          </motion.p>

          <motion.div
            className={styles.ctas}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.65 }}
          >
            <Link href="/#projects" className="btn btn-primary">
              View selected work <i className="fas fa-arrow-down btn-arrow" aria-hidden="true"></i>
            </Link>
            <Link href="/#contact" className="btn btn-ghost">
              Get in touch
            </Link>
            {personalInfo.resumeUrl && (
              <a href={personalInfo.resumeUrl} className="btn btn-ghost" target="_blank" rel="noopener noreferrer">
                <i className="fas fa-file-arrow-down" aria-hidden="true"></i> Résumé
              </a>
            )}
          </motion.div>

          <motion.ul
            className={styles.socials}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            {heroSocials.map((social) => {
              const external = social.url.startsWith('http');
              return (
                <li key={social.name}>
                  <a
                    href={social.url}
                    className={styles.social}
                    aria-label={social.name}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    <i className={social.icon} aria-hidden="true"></i>
                  </a>
                </li>
              );
            })}
          </motion.ul>
        </motion.div>

        <motion.div
          className={styles.visual}
          style={{ y: visualY }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
        >
          <motion.div className={styles.card} style={{ rotateX, rotateY }}>
            <div className={styles.portrait}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={personalInfo.avatarUrl} alt={personalInfo.name} width="400" height="400" fetchPriority="high" />
            </div>
            <div className={styles.cardBody}>
              <span className={styles.cardLabel}>
                <i className="fas fa-location-dot" aria-hidden="true"></i> {personalInfo.location}
              </span>
              <dl className={styles.stats}>
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <dt>{stat.label}</dt>
                    <dd>{stat.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </motion.div>

          {spotlight && (
            <Link href={`/projects/${spotlight.id}`} className={styles.floating}>
              <span className={styles.floatingLabel}>Featured project</span>
              <span className={styles.floatingTitle}>
                {spotlight.title} <i className="fas fa-arrow-right" aria-hidden="true"></i>
              </span>
              {spotlight.highlight && <span className={styles.floatingMeta}>{spotlight.highlight}</span>}
            </Link>
          )}
        </motion.div>
      </div>

      <a href="#projects" className={styles.scrollCue} aria-label="Scroll to projects">
        <span />
      </a>
    </section>
  );
}
