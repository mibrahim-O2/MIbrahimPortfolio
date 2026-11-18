import Link from 'next/link';
import Reveal from '@/components/motion/Reveal';
import styles from './PageIntro.module.css';

// Header of a standalone page (/projects, /experience, ...): back link, eyebrow, H1 and lead.
export default function PageIntro({ eyebrow, title, lead, back = { href: '/', label: 'Home' } }) {
  return (
    <header className={`container page-top ${styles.intro}`}>
      <Reveal className={styles.inner}>
        {back && (
          <Link href={back.href} className={styles.back}>
            <i className="fas fa-arrow-left" aria-hidden="true"></i> {back.label}
          </Link>
        )}
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1 className={styles.title}>{title}</h1>
        {lead && <p className={styles.lead}>{lead}</p>}
      </Reveal>
    </header>
  );
}
