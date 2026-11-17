import Reveal from '@/components/motion/Reveal';
import styles from './SectionHeader.module.css';

// Heading used by every section: mono eyebrow, large title, optional lead paragraph and action (e.g. a link).
export default function SectionHeader({ eyebrow, title, lead, action, as: Heading = 'h2', align = 'left' }) {
  return (
    <Reveal className={`${styles.header} ${align === 'center' ? styles.center : ''}`}>
      <div className={styles.text}>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <Heading className={styles.title}>{title}</Heading>
        {lead && <p className={styles.lead}>{lead}</p>}
      </div>
      {action && <div className={styles.action}>{action}</div>}
    </Reveal>
  );
}
