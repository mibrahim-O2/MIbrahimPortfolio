import Image from 'next/image';
import Link from 'next/link';
import SectionHeader from '@/components/ui/SectionHeader';
import Reveal from '@/components/motion/Reveal';
import { aboutParagraphs, aboutSummary } from '@/data/about';
import { personalInfo } from '@/data/personal';
import { highlightItems } from '@/utils/galleryLoader';
import { splitByHighlights } from '@/utils/highlight';
import styles from './AboutSection.module.css';

function Highlighted({ text, highlights }) {
  return splitByHighlights(text, highlights).map((segment, index) =>
    segment.match ? (
      <mark key={index} className={styles.mark}>
        {segment.text}
      </mark>
    ) : (
      <span key={index}>{segment.text}</span>
    )
  );
}

// About: portrait on the left, a card with the short bio (data/about.js aboutSummary) on the right.
// With `full` (the /about page) the complete bio paragraphs follow. Then the "beyond code" strip.
export default function AboutSection({ headingLevel = 'h2', full = false }) {
  const photos = highlightItems.filter((item) => !item.isVideo).slice(0, 4);

  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHeader as={headingLevel} eyebrow="About me" title="Autonomous software, with accountability built in" />

        <div className={styles.layout}>
          <Reveal variant="left" className={styles.portraitWrap}>
            <div className={styles.portrait}>
              <Image src={personalInfo.avatarUrl} alt={`Portrait of ${personalInfo.name}`} fill sizes="(min-width: 960px) 360px, 80vw" />
            </div>
            <div className={styles.nameTag}>
              <strong>{personalInfo.name}</strong>
              <span>{personalInfo.title}</span>
            </div>
          </Reveal>

          <Reveal variant="right" className={`card fx ${styles.bioCard}`}>
            <span className={styles.quote} aria-hidden="true">
              <i className="fa-solid fa-quote-left"></i>
            </span>
            <p className={styles.summary}>
              <Highlighted text={aboutSummary.text} highlights={aboutSummary.highlights} />
            </p>
            <ul className={styles.points}>
              {aboutSummary.points.map((point) => (
                <li key={point.label}>
                  <i className={point.icon} aria-hidden="true"></i>
                  {point.label}
                </li>
              ))}
            </ul>
            <div className={styles.bioActions}>
              <Link href="/#projects" className="btn btn-primary btn-sm">
                See the projects <i className="fas fa-arrow-right btn-arrow" aria-hidden="true"></i>
              </Link>
              {!full && (
                <Link href="/about" className="btn btn-ghost btn-sm">
                  More about me
                </Link>
              )}
            </div>
          </Reveal>
        </div>

        {full && (
          <div className={styles.text}>
            {aboutParagraphs.map((paragraph) => (
              <Reveal as="p" key={paragraph.text.slice(0, 24)} className={styles.paragraph}>
                <Highlighted text={paragraph.text} highlights={paragraph.highlights} />
              </Reveal>
            ))}
          </div>
        )}

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
