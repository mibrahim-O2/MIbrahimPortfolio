import Link from 'next/link';
import { featuredProjects } from '@/data/projects';
import styles from './not-found.module.css';

export const metadata = {
  title: 'Page not found | Muhammad Ibrahim',
  robots: { index: false }
};

// Shown for any URL that does not exist (including unpublished projects)
export default function NotFound() {
  const suggestions = featuredProjects.slice(0, 3);
  return (
    <section className={`container ${styles.wrap}`}>
      <p className={styles.code} aria-hidden="true">404</p>
      <span className="eyebrow">Page not found</span>
      <h1 className={styles.title}>This page doesn&apos;t exist, or it has moved.</h1>
      <p className={styles.lead}>Try the homepage or one of these projects.</p>
      <div className={styles.actions}>
        <Link href="/" className="btn btn-primary">
          Back to home
        </Link>
        <Link href="/projects" className="btn btn-ghost">
          All projects
        </Link>
      </div>
      <ul className={styles.list}>
        {suggestions.map((project) => (
          <li key={project.id}>
            <Link href={`/projects/${project.id}`} className="link">
              {project.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
