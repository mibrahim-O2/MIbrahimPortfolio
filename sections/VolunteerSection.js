import Image from 'next/image';
import SectionHeader from '@/components/ui/SectionHeader';
import Reveal from '@/components/motion/Reveal';
import { volunteerData } from '@/data/volunteer';
import styles from './VolunteerSection.module.css';

// Volunteer work from data/volunteer.js (shown on /volunteer).
export default function VolunteerSection({ headingLevel = 'h2' }) {
  return (
    <section id="volunteer" className="section">
      <div className="container">
        <SectionHeader as={headingLevel} eyebrow="Community" title="Volunteer experience" lead="Events, exhibitions and lab work at university, alongside studies and projects." />

        <ul className={styles.grid}>
          {volunteerData.map((item, index) => (
            <Reveal as="li" key={item.id} delay={(index % 3) * 0.06} className={`card ${styles.card}`}>
              <div className={styles.top}>
                {item.logos && item.logos.length > 0 ? (
                  <span className={styles.logos}>
                    {item.logos.map((logo) => (
                      <span key={logo.src} className={styles.logo}>
                        <Image src={logo.src} alt={logo.alt} width={36} height={36} />
                      </span>
                    ))}
                  </span>
                ) : (
                  <span className={styles.icon} aria-hidden="true">
                    <i className={item.icon}></i>
                  </span>
                )}
                <span className={styles.period}>{item.period}</span>
              </div>
              <h3 className={styles.role}>{item.role}</h3>
              {item.organization && <p className={styles.org}>{item.organization}</p>}
              <p className={styles.desc}>{item.description}</p>
              {item.years && item.years.length > 0 && (
                <ul className={styles.years} aria-label="Years volunteered">
                  {item.years.map((year) => (
                    <li key={year} className="tag">
                      {year}
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
