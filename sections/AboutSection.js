import Image from 'next/image';
import Link from 'next/link';
import SectionHeader from '@/components/ui/SectionHeader';
import Reveal from '@/components/motion/Reveal';
import { personalInfo } from '@/data/personal';
import { aboutParagraphs } from '@/data/about';
import { educationData } from '@/data/education';
import { highlightItems } from '@/utils/galleryLoader';
import { splitByHighlights } from '@/utils/highlight';
import styles from './AboutSection.module.css';

// About: portrait, bio from data/about.js (highlights emphasised), quick facts and a "beyond code" strip.
export default function AboutSection({ headingLevel = 'h2' }) {
  const current = educationData.find((entry) => entry.status) || educationData[0];
  const pill = personalInfo.statusPill || '';
  const facts = [
    { label: 'Based in', value: personalInfo.location },
    current && { label: current.status ? 'Studying' : 'Education', value: `${current.title}, ${current.institutionName}` },
    { label: 'Focus', value: personalInfo.title },
    pill && { label: 'Availability', value: pill.includes(':') ? pill.slice(pill.indexOf(':') + 1).trim() : pill }
  ].filter(Boolean);
  const photos = highlightItems.filter((item) => !item.isVideo).slice(0, 4);

  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHeader as={headingLevel} eyebrow="About me" title="Research-grade ideas, turned into working software" />

        <div className={styles.layout}>
          <Reveal className={styles.portraitWrap}>
            <div className={styles.portrait}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={personalInfo.avatarUrl} alt={personalInfo.name} width="400" height="400" loading="lazy" />
            </div>
          </Reveal>

          <div className={styles.text}>
            {aboutParagraphs.map((paragraph) => (
              <Reveal as="p" key={paragraph.text.slice(0, 24)} className={styles.paragraph}>
                {splitByHighlights(paragraph.text, paragraph.highlights).map((segment, index) =>
                  segment.match ? (
                    <mark key={index} className={styles.mark}>
                      {segment.text}
                    </mark>
                  ) : (
                    <span key={index}>{segment.text}</span>
                  )
                )}
              </Reveal>
            ))}

            <Reveal as="dl" className={styles.facts}>
              {facts.map((fact) => (
                <div key={fact.label} className={styles.fact}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </Reveal>
          </div>
        </div>

        <Reveal className={`card ${styles.beyond}`}>
          <div className={styles.beyondText}>
            <span className="eyebrow">Beyond code</span>
            <p>Volunteering at university events, exhibitions and the ICT lab, plus moments from the journey so far.</p>
            <div className={styles.beyondLinks}>
              <Link href="/volunteer" className="btn btn-ghost btn-sm">
                Volunteer work <i className="fas fa-arrow-right btn-arrow" aria-hidden="true"></i>
              </Link>
              <Link href="/gallery" className="btn btn-ghost btn-sm">
                Gallery <i className="fas fa-arrow-right btn-arrow" aria-hidden="true"></i>
              </Link>
            </div>
          </div>
          <Link href="/gallery" className={styles.photos} aria-label="Open the gallery">
            {photos.map((photo, index) => (
              <span key={photo.id} className={styles.photo} style={{ '--i': index }}>
                <Image src={photo.src} alt={photo.title} fill sizes="160px" />
              </span>
            ))}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
