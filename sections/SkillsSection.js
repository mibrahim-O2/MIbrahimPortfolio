import SectionHeader from '@/components/ui/SectionHeader';
import Reveal from '@/components/motion/Reveal';
import { skillCategories } from '@/data/skills';
import styles from './SkillsSection.module.css';

// "Technology Stack": one card per category in data/skills.js, each chip with its brand-coloured icon.
export default function SkillsSection({ headingLevel = 'h2' }) {
  const H3 = headingLevel === 'h1' ? 'h2' : 'h3';
  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionHeader as={headingLevel}
          eyebrow="Technology stack"
          title="Tools I use to ship"
          lead="Languages, frameworks and platforms I've used in real projects."
        />

        <div className={styles.grid}>
          {skillCategories.map((category, index) => (
            <Reveal key={category.id} delay={(index % 3) * 0.06} className={`card fx ${styles.card}`}>
              <H3 className={styles.title}>
                <span className={styles.catIcon} aria-hidden="true">
                  <i className={category.icon}></i>
                </span>
                {category.title}
                {category.live && (
                  <span className={styles.live}>
                    <span aria-hidden="true" /> active
                  </span>
                )}
              </H3>
              <ul className={styles.chips}>
                {category.items.map((item) => (
                  <li key={item.name} className={styles.chip} style={{ '--brand': item.color || 'var(--accent)' }}>
                    <span className={styles.chipIcon} aria-hidden="true">
                      <i className={item.icon}></i>
                    </span>
                    <span className={styles.chipName}>{item.name}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
