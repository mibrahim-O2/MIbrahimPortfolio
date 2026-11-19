import Link from 'next/link';
import SectionHeader from '@/components/ui/SectionHeader';
import Reveal from '@/components/motion/Reveal';
import { focusAreas } from '@/data/focusAreas';
import { publishedProjects } from '@/data/projects';
import styles from './ExpertiseSection.module.css';

// "Technical Expertise": one card per focus area in data/focusAreas.js, each linked to the project that proves it.
export default function ExpertiseSection({ headingLevel = 'h2' }) {
  return (
    <section id="expertise" className="section">
      <div className="container">
        <SectionHeader as={headingLevel}
          eyebrow="Technical expertise"
          title="What I build, and the work that proves it"
          lead="Five areas I work in, each backed by a real project rather than a list of buzzwords."
        />

        <div className={styles.grid}>
          {focusAreas.map((area, index) => {
            const project = publishedProjects.find((p) => p.id === area.projectId);
            return (
              <Reveal key={area.category} delay={(index % 3) * 0.06} className={`${styles.cell} ${index < 2 ? styles.wide : ''}`}>
                <article className={`card fx ${styles.card}`}>
                  <div className={styles.top}>
                    <span className={styles.icon} aria-hidden="true">
                      <i className={area.icon}></i>
                    </span>
                    <span className={styles.num}>{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className={styles.title}>{area.category}</h3>
                  <p className={styles.description}>{area.description}</p>
                  {project ? (
                    <Link href={`/projects/${project.id}`} className={styles.proof}>
                      <span className={styles.proofLabel}>Proof</span>
                      <span className={styles.proofTitle}>{project.title}</span>
                      <i className="fas fa-arrow-right" aria-hidden="true"></i>
                    </Link>
                  ) : (
                    area.evidence && (
                      <p className={styles.proof}>
                        <span className={styles.proofLabel}>Built in</span>
                        <span className={styles.proofTitle}>{area.evidence}</span>
                      </p>
                    )
                  )}
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
