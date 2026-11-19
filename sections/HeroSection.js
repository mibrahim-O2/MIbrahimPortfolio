import { Fragment } from 'react';
import Link from 'next/link';
import HeroGraph from '@/components/hero/HeroGraph';
import { personalInfo } from '@/data/personal';
import { publishedProjects } from '@/data/projects';
import { certificatesData } from '@/data/certificates';
import styles from './HeroSection.module.css';

// Hero (a Server Component: its HTML is complete without JavaScript).
// Left: availability badge, H1 (name and role, then the headline), intro, buttons, social icons.
// Right: portrait card with counts, with the decorative 3D agent graph (components/hero/HeroGraph.js) behind it.

// Icons shown under the hero buttons, in this order (all come from personalInfo.socialLinks)
const HERO_SOCIALS = ['GitHub', 'LinkedIn', 'Email'];
const heroSocials = HERO_SOCIALS
  .map((name) => personalInfo.socialLinks.find((social) => social.name === name))
  .filter((social) => social && social.url && social.icon);

// Splits the headline into words; words that belong to `headlineAccent` get the copper gradient.
function headlineWords() {
  const words = (personalInfo.headline || personalInfo.title).split(' ');
  const norm = (word) => word.toLowerCase().replace(/[^a-z0-9-]/g, '');
  const accent = (personalInfo.headlineAccent || '').split(' ').filter(Boolean).map(norm);
  const start = accent.length ? words.findIndex((_, i) => accent.every((a, j) => norm(words[i + j] || '') === a)) : -1;
  return words.map((word, index) => ({ word, isAccent: start > -1 && index >= start && index < start + accent.length }));
}

export default function HeroSection() {
  const words = headlineWords();

  // Status badge: the part before the first colon ("Open to Work:") is highlighted
  const pill = personalInfo.statusPill || '';
  const colon = pill.indexOf(':');
  const pillLabel = colon > -1 ? pill.slice(0, colon) : '';
  const pillText = colon > -1 ? pill.slice(colon + 1).trim() : pill;

  // Counts come from the data files, so they stay accurate. "Live demos" = projects with a public link
  // you can open (websites, demo dashboards, the PyPI package page).
  const stats = [
    { value: publishedProjects.length, label: 'Projects' },
    { value: publishedProjects.filter((project) => project.demoUrl).length, label: 'Live demos' },
    { value: certificatesData.length, label: 'Certifications' }
  ];

  return (
    <section id="home" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.backdrop} aria-hidden="true">
        <div className={styles.glow} />
        <div className={styles.grid} />
      </div>

      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <p className={`${styles.badge} ${styles.enter}`}>
            <span className={styles.badgeDot} aria-hidden="true" />
            {pillLabel && <strong>{pillLabel}</strong>}
            <span>{pillText}</span>
          </p>

          <h1 id="hero-title" className={styles.h1}>
            <span className={`${styles.intro} ${styles.enter}`} style={{ '--d': '80ms' }}>
              <span className={styles.name}>{personalInfo.name}</span>
              <span className={styles.sep} aria-hidden="true">/</span>
              <span>{personalInfo.title}</span>
              <span className="sr-only">: </span>
            </span>
            <span className={styles.title}>
              {words.map(({ word, isAccent }, index) => (
                <Fragment key={index}>
                  <span className={styles.wordMask}>
                    <span className={`${styles.word} ${isAccent ? 'text-gradient' : ''}`} style={{ '--d': `${150 + index * 50}ms` }}>
                      {word}
                    </span>
                  </span>{' '}
                </Fragment>
              ))}
            </span>
          </h1>

          {/* Visible from the first paint (transform-only entrance), so it never delays the largest contentful paint */}
          <p className={`${styles.lead} ${styles.enterSoft}`} style={{ '--d': '200ms' }}>
            {personalInfo.intro}
          </p>

          <div className={`${styles.ctas} ${styles.enter}`} style={{ '--d': '450ms' }}>
            <Link href="/#projects" className="btn btn-primary">
              View selected work <i className="fas fa-arrow-down btn-arrow" aria-hidden="true"></i>
            </Link>
            <Link href="/services" className="btn btn-ghost">
              Services
            </Link>
            {personalInfo.resumeUrl && (
              <a href={personalInfo.resumeUrl} className="btn btn-ghost" target="_blank" rel="noopener noreferrer">
                <i className="fas fa-file-arrow-down" aria-hidden="true"></i> Résumé
              </a>
            )}
          </div>

          <ul className={`${styles.socials} ${styles.enter}`} style={{ '--d': '600ms' }}>
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
          </ul>
        </div>

        <div className={`${styles.visual} ${styles.fadeIn}`}>
          <HeroGraph />
          <div className={styles.card}>
            <div className={styles.portrait}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={personalInfo.avatarUrl} alt={`Portrait of ${personalInfo.name}`} width="460" height="460" fetchPriority="high" />
            </div>
            <div className={styles.cardBody}>
              <dl className={styles.stats}>
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <dt>{stat.label}</dt>
                    <dd>{stat.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>

      <a href="#projects" className={styles.scrollCue} aria-label="Scroll to projects">
        <span />
      </a>
    </section>
  );
}
