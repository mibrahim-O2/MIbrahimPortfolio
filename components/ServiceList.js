import Link from 'next/link';
import Reveal from '@/components/motion/Reveal';
import { servicesData } from '@/data/services';
import styles from '@/app/services/services.module.css';

// The three services as linked cards (used on /services and the homepage). Data: data/services.js
export default function ServiceList({ headingLevel: H = 'h3' }) {
  return (
    <ul className={styles.list}>
      {servicesData.map((service, index) => (
        <Reveal as="li" key={service.slug} delay={index * 0.06} className={`card fx ${styles.item}`}>
          <span className={styles.itemIcon} aria-hidden="true">
            <i className={service.icon}></i>
          </span>
          <H className={styles.itemTitle}>
            <Link href={`/services/${service.slug}`}>{service.name}</Link>
          </H>
          <p className={styles.itemText}>{service.short}</p>
          <span className={styles.itemMore} aria-hidden="true">
            Learn more <i className="fas fa-arrow-right"></i>
          </span>
        </Reveal>
      ))}
    </ul>
  );
}
