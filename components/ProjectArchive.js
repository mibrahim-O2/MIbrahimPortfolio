'use client';

import { useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';
import styles from './ProjectArchive.module.css';

// /projects: every published project with category filters. Categories without projects are hidden.
// The data comes in as props from the server page (app/projects/page.js), so data/projects.js, which also
// holds unpublished projects, is never bundled into browser JavaScript.
export default function ProjectArchive({ projects: publishedProjects, categories: projectCategories }) {
  const [active, setActive] = useState('all');
  const categories = projectCategories.filter(
    (cat) => cat.key === 'all' || publishedProjects.some((project) => (project.categories || []).includes(cat.key))
  );
  const projects = active === 'all' ? publishedProjects : publishedProjects.filter((p) => (p.categories || []).includes(active));

  return (
    <>
      <LayoutGroup id="project-filters">
        <div className={styles.filters} role="group" aria-label="Filter projects by category">
          {categories.map((cat) => {
            const count =
              cat.key === 'all' ? publishedProjects.length : publishedProjects.filter((p) => (p.categories || []).includes(cat.key)).length;
            const isActive = active === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                className={`${styles.filter} ${isActive ? styles.active : ''}`}
                aria-pressed={isActive}
                onClick={() => setActive(cat.key)}
              >
                {isActive && <motion.span layoutId="filter-pill" className={styles.pill} transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                <span className={styles.label}>
                  {cat.label} <span className={styles.count}>{count}</span>
                </span>
              </button>
            );
          })}
        </div>
      </LayoutGroup>

      <motion.ul layout className={styles.grid}>
        <AnimatePresence mode="popLayout" initial={false}>
          {projects.map((project, index) => (
            <motion.li
              key={project.id}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className={styles.cell}
            >
              <ProjectCard project={project} variant="compact" priority={index < 2} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </>
  );
}
