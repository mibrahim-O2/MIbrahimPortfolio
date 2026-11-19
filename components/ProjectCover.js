'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './ProjectCover.module.css';

// Fallback icon per project id; anything else uses fa-code.
const COVER_ICONS = {
  finlexpurple: 'fa-solid fa-shield-halved',
  'ai-voice-agent-for-business': 'fa-solid fa-headset',
  'sn-noor-herbal-store': 'fa-solid fa-leaf',
  'autonomous-ai-business-operations-agent': 'fa-solid fa-diagram-project',
  'lead-generation-agent-inbound': 'fa-solid fa-inbox',
  neurocode: 'fa-solid fa-brain',
  verdexai: 'fa-solid fa-user-tie',
  'ai-tutor-plr': 'fa-solid fa-graduation-cap',
  'bin-khalid-dairy-v2': 'fa-solid fa-cow',
  'finlytics-tracker': 'fa-solid fa-chart-pie'
};

// Generated cover: shown when a project has no image or the image fails to load.
export function ProjectCover({ project }) {
  const icon = COVER_ICONS[project.id] || 'fa-solid fa-code';
  return (
    <div className={styles.cover} role="img" aria-label={`${project.title} cover`}>
      <i className={icon} aria-hidden="true"></i>
      <span>{project.title}</span>
    </div>
  );
}

// Project image (optimised by next/image) that fills its parent, which must be position: relative.
// `sizes` tells the browser which width to download.
export default function ProjectMedia({ project, src, sizes = '(min-width: 960px) 50vw, 100vw', priority = false, className }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return <ProjectCover project={project} />;

  return (
    <Image
      src={src}
      alt={`${project.title} screenshot`}
      fill
      sizes={sizes}
      priority={priority}
      className={className || styles.image}
      onError={() => setFailed(true)}
    />
  );
}
