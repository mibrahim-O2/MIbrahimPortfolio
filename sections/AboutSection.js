import Image from 'next/image';
import Link from 'next/link';
import SectionHeader from '@/components/ui/SectionHeader';
import Reveal from '@/components/motion/Reveal';
import { aboutParagraphs } from '@/data/about';
import { highlightItems } from '@/utils/galleryLoader';
import { splitByHighlights } from '@/utils/highlight';
import styles from './AboutSection.module.css';

// About: bio from data/about.js (highlights emphasised) and a "beyond code" strip.
// The portrait, title, availability, location and education are shown in other sections, so they are not repeated here.
export default function AboutSection({ headingLevel = 'h2' }) {
  const photos = highlightItems.filter((item) => !item.isVideo).slice(0, 4);

  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHeader as={headingLevel} eyebrow="About me" title="Autonomous software, with accountability built in" />

        <div className={styles.layout}>
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
