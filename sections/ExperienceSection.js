'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useSpring } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import Reveal from '@/components/motion/Reveal';
import { experienceData } from '@/data/experience';
import styles from './ExperienceSection.module.css';

// Duration chip from ISO dates ("2026-06-10"); hidden when a date is missing
function durationLabel(start, end) {
  if (!start || !end) return null;
  const days = (new Date(end) - new Date(start)) / 86400000;
  if (!(days >= 0)) return null;
  if (days < 30) return '< 1 mo';
  const months = Math.round(days / 30.44);
  if (months < 12) return `${months} mo`;
  const years = Math.floor(months / 12);
  const rest = months % 12;
  return rest ? `${years} yr ${rest} mo` : `${years} yr`;
}

// Professional experience as a vertical timeline; the copper line fills in as you scroll.
export default function ExperienceSection({ headingLevel = 'h2' }) {
  const listRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 60%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });

  return (
    <section id="experience" className="section">
      <div className="container">
        <SectionHeader as={headingLevel}
          eyebrow="Experience"
          title="Where I've shipped real systems"
          lead="Department-level automation, client software and team leadership, newest first."
        />

        <ol ref={listRef} className={styles.list}>
          <span className={styles.rail} aria-hidden="true">
            <motion.span className={styles.railFill} style={{ scaleY: progress }} />
          </span>

          {experienceData.map((item) => {
            const duration = durationLabel(item.start, item.end);
            return (
              <li key={item.id} className={styles.item}>
                <span className={styles.dot} aria-hidden="true" />
                <Reveal className={styles.when}>
                  <span className={styles.period}>{item.period}</span>
                  {duration && <span className={styles.duration}>{duration}</span>}
                </Reveal>
                <Reveal className={`card ${styles.card}`} delay={0.05}>
                  <div className={styles.head}>
                    <span className={styles.logo}>
                      {item.logo ? (
                        <Image src={item.logo} alt={`${item.company} logo`} width={44} height={44} />
                      ) : (
                        <i className={item.icon || 'fa-solid fa-briefcase'} aria-hidden="true"></i>
                      )}
                    </span>
                    <div>
                      <h3 className={styles.role}>{item.role}</h3>
                      <p className={styles.company}>
                        {item.company}
                        {item.project && <span className={styles.project}> · {item.project}</span>}
                      </p>
                    </div>
                  </div>
                  <ul className={styles.points}>
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
