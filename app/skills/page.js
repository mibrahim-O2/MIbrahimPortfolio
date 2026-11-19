import { buildMetadata } from '@/utils/seo';
import SkillsSection from '@/sections/SkillsSection';
import SectionHeader from '@/components/ui/SectionHeader';
import Reveal from '@/components/motion/Reveal';
import { softSkills } from '@/data/skills';
import styles from './skills.module.css';

export const metadata = buildMetadata({
  title: 'Skills & Tech Stack | Muhammad Ibrahim',
  description: 'Tools Muhammad Ibrahim uses in real projects: Python, OpenAI Agents SDK, MCP, RAG, FastAPI, Next.js, React, PostgreSQL, Supabase and more.',
  path: '/skills'
});

export default function SkillsPage() {
  return (
    <div className="subpage">
      <SkillsSection headingLevel="h1" />
      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="How I work" title="Working strengths" />
          <ul className={styles.grid}>
            {softSkills.map((skill, index) => (
              <Reveal as="li" key={skill.id} delay={(index % 3) * 0.06} className={`card fx ${styles.card}`}>
                <span className={styles.icon} aria-hidden="true">
                  <i className={skill.icon}></i>
                </span>
                <h3 className={styles.title}>{skill.title}</h3>
                <p className={styles.text}>{skill.description}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
