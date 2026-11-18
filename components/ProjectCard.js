'use client';

import Link from 'next/link';
import ProjectMedia from '@/components/ProjectCover';
import useSpotlight from '@/utils/useSpotlight';
import { projectLinks } from '@/utils/projectLinks';
import styles from './ProjectCard.module.css';

const TAG_LIMIT = { lead: 8, featured: 5, compact: 4 };
const SIZES = {
  lead: '(min-width: 960px) 640px, 100vw',
  featured: '(min-width: 760px) 560px, 100vw',
  compact: '(min-width: 1100px) 380px, (min-width: 700px) 50vw, 100vw'
};

// One project card. variant: "lead" (large, first featured project), "featured" (homepage grid),
// "compact" (project archive). The lead card shows `description`; the others show the shorter `subtitle`.
// All content comes from data/projects.js.
export default function ProjectCard({ project, variant = 'featured', index, priority = false, wide = false }) {
  const onPointerMove = useSpotlight();
  const links = projectLinks(project);
  const tags = project.tags || [];
  const limit = TAG_LIMIT[variant] || 5;
  const shown = tags.slice(0, limit);
  const extra = tags.length - shown.length;
  const href = `/projects/${project.id}`;
  const visibleLinks = variant === 'lead' ? links : links.slice(0, 2);

  return (
    <article className={`card spotlight ${styles.card} ${styles[variant]} ${wide ? styles.wide : ''}`} onPointerMove={onPointerMove}>
      <Link href={href} className={styles.media} tabIndex={-1} aria-hidden="true">
        <ProjectMedia project={project} src={project.image} sizes={SIZES[variant]} priority={priority} className={styles.image} />
      </Link>

      <div className={styles.body}>
        <div className={styles.meta}>
          {typeof index === 'number' && <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>}
          {project.badge && <span className={styles.badge}>{project.badge}</span>}
          {project.status && (
            <span className={`status ${styles.status}`} data-status={project.status}>
              {project.status}
            </span>
          )}
        </div>

        <h3 className={styles.title}>
          <Link href={href} className={styles.titleLink}>
            {project.title}
          </Link>
        </h3>

        <p className={styles.description}>{variant === 'lead' ? project.description : project.subtitle || project.description}</p>

        {variant !== 'compact' && project.highlight && <p className={styles.highlight}>{project.highlight}</p>}

        <ul className={styles.tags} aria-label="Technologies">
          {shown.map((tag) => (
            <li key={tag} className="tag">
              {tag}
            </li>
          ))}
          {extra > 0 && <li className={`tag ${styles.more}`}>+{extra}</li>}
        </ul>

        <div className={styles.actions}>
          <Link href={href} className={`btn btn-sm ${variant === 'compact' ? 'btn-ghost' : 'btn-primary'}`}>
            Case study <i className="fas fa-arrow-right btn-arrow" aria-hidden="true"></i>
          </Link>
          {visibleLinks.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn btn-ghost btn-sm ${variant === 'compact' ? styles.iconOnly : ''}`}
              aria-label={`${link.label} (opens in a new tab)`}
              title={link.title || link.label}
            >
              <i className={link.icon} aria-hidden="true"></i>
              {variant !== 'compact' && <span>{link.label}</span>}
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
