'use client';

import { useState } from 'react';
import SectionTitle from '@/components/SectionTitle';
import ProjectCard from '@/components/ProjectCard';
import Reveal from '@/components/motion/Reveal';
import { projectsData, projectCategories } from '@/data/projects';

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects = activeCategory === 'all'
    ? projectsData
    : projectsData.filter((p) => p.categories.includes(activeCategory));

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <SectionTitle
          icon="fas fa-folder-open"
          ghost="PROJECTS"
          subtitle="04. My Work"
          title="Featured Projects"
        />

        <Reveal variant="rise" className="project-filters">
          {projectCategories.map((cat) => (
            <button
              key={cat.key}
              className={`filter-btn ${activeCategory === cat.key ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.key)}
            >
              {cat.label}
            </button>
          ))}
        </Reveal>

        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <Reveal key={project.id} variant="rise" delay={(index % 4) * 0.1} viewport={{ once: true, amount: 0.1 }} style={{ display: 'grid' }}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
