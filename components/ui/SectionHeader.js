import Reveal from '@/components/motion/Reveal';
import styles from './SectionHeader.module.css';

// Icon for each section, matched by its eyebrow text (pass `icon` to override). Font Awesome classes;
// any class used here is picked up automatically by scripts/build-icons.mjs.
const ICONS = {
  'Selected work': 'fa-solid fa-layer-group',
  Services: 'fa-solid fa-briefcase',
  'Technical expertise': 'fa-solid fa-microchip',
  Experience: 'fa-solid fa-route',
  'About me': 'fa-solid fa-user-astronaut',
  'Technology stack': 'fa-solid fa-toolbox',
  'Education & certifications': 'fa-solid fa-graduation-cap',
  Education: 'fa-solid fa-graduation-cap',
  Certifications: 'fa-solid fa-award',
  Community: 'fa-solid fa-hands-holding-circle',
  'How I work': 'fa-solid fa-compass-drafting',
  'Quick facts': 'fa-solid fa-circle-info'
};

// Heading used by every section: icon, mono eyebrow, large title, optional lead paragraph and action.
// Centred by default; align="left" keeps the older left-aligned layout.
export default function SectionHeader({ eyebrow, title, lead, action, icon, as: Heading = 'h2', align = 'center' }) {
  const iconClass = icon === undefined ? ICONS[eyebrow] : icon;
  return (
    <Reveal className={`${styles.header} ${align === 'center' ? styles.center : ''}`}>
      <div className={styles.text}>
        {iconClass && (
          <span className={styles.icon} aria-hidden="true">
            <i className={iconClass}></i>
          </span>
        )}
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <Heading className={styles.title}>{title}</Heading>
        {lead && <p className={styles.lead}>{lead}</p>}
      </div>
      {action && <div className={styles.action}>{action}</div>}
    </Reveal>
  );
}
