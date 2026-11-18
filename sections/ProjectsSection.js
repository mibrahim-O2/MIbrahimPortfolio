import SectionHeader from '@/components/ui/SectionHeader';
import ProjectCard from '@/components/ProjectCard';
import Reveal from '@/components/motion/Reveal';
import { featuredProjects } from '@/data/projects';
import styles from './ProjectsSection.module.css';

// Homepage "Selected Projects": the first featured project as a large lead card, the other featured
// projects in a two-column grid.
export default function ProjectsSection() {
  const [lead, ...rest] = featuredProjects;

  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHeader
          eyebrow="Selected work"
          title="Featured projects"
          lead="Systems I designed and built end to end, from AI agents and security tooling to client stores and business software."
        />

        {lead && (
          <Reveal className={styles.lead}>
            <ProjectCard project={lead} variant="lead" priority />
          </Reveal>
        )}

        <div className={styles.grid}>
          {rest.map((project, i) => {
            // A card left alone in the last row of the two-column grid becomes a wide, horizontal card
            const wide = rest.length % 2 === 1 && i === rest.length - 1;
            return (
              <Reveal key={project.id} delay={(i % 2) * 0.08} className={`${styles.cell} ${wide ? styles.wideCell : ''}`}>
                <ProjectCard project={project} variant="featured" wide={wide} />
              </Reveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
