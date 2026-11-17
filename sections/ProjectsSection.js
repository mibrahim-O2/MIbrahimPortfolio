import Link from 'next/link';
import SectionHeader from '@/components/ui/SectionHeader';
import ProjectCard from '@/components/ProjectCard';
import Reveal from '@/components/motion/Reveal';
import { featuredProjects, publishedProjects } from '@/data/projects';
import styles from './ProjectsSection.module.css';

// Homepage "Selected Projects": the first featured project as a large lead card, the other featured
// projects in a grid, then a link to the full archive on /projects.
export default function ProjectsSection() {
  const [lead, ...rest] = featuredProjects;
  const others = publishedProjects.length - featuredProjects.length;

  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHeader
          eyebrow="Selected work"
          title="Featured projects"
          lead="Systems I designed and built end to end, from AI and optimization engines to production web apps."
          action={
            <Link href="/projects" className="btn btn-ghost">
              All projects <i className="fas fa-arrow-right btn-arrow" aria-hidden="true"></i>
            </Link>
          }
        />

        {lead && (
          <Reveal className={styles.lead}>
            <ProjectCard project={lead} variant="lead" index={0} priority />
          </Reveal>
        )}

        <div className={styles.grid}>
          {rest.map((project, i) => (
            <Reveal key={project.id} delay={(i % 2) * 0.08} className={styles.cell}>
              <ProjectCard project={project} variant="featured" index={i + 1} />
            </Reveal>
          ))}
        </div>

        {others > 0 && (
          <Reveal className={styles.more}>
            <p>
              Plus {others} more project{others === 1 ? '' : 's'} in the archive.
            </p>
            <Link href="/projects" className="btn btn-primary">
              Browse the archive <i className="fas fa-arrow-right btn-arrow" aria-hidden="true"></i>
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
}
