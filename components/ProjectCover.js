'use client';

import { useState } from 'react';

// Fallback icon per project id; anything else (or a class missing in Font Awesome 6 free) uses fa-code.
const COVER_ICONS = {
  neurocode: 'fa-solid fa-brain',
  verdexai: 'fa-solid fa-user-tie',
  'imcs-scheduler': 'fa-solid fa-calendar-days',
  'ai-tutor-plr': 'fa-solid fa-graduation-cap',
  'bin-khalid-dairy-v2': 'fa-solid fa-cow',
  'bin-khalid-dairy-farm': 'fa-solid fa-jar',
  'finlytics-tracker': 'fa-solid fa-chart-pie',
  pulsegrid: 'fa-solid fa-microchip',
  'event-registration-system': 'fa-solid fa-ticket',
  'restaurant-management-system': 'fa-solid fa-utensils',
  'url-shortener': 'fa-solid fa-link'
};

export function ProjectCover({ project, variant = 'card' }) {
  const icon = COVER_ICONS[project.id] || 'fa-solid fa-code';
  return (
    <div className={`project-cover project-cover--${variant}`} role="img" aria-label={`${project.title} cover`}>
      <i className={icon} aria-hidden="true"></i>
      <span className="project-cover-title">{project.title}</span>
    </div>
  );
}

// Shows the project's image; shows the generated cover when there is no image or the URL fails to load,
// so a broken image is never visible.
export default function ProjectMedia({ project, src, variant = 'card' }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) return <ProjectCover project={project} variant={variant} />;

  return (
    <img
      src={src}
      alt={project.title}
      className={variant === 'hero' ? 'project-hero-image' : 'project-image'}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
