'use client';

import { motion } from 'framer-motion';

// One technology chip: a Devicon or Font Awesome glyph (both render through the same <i>) plus the name.
// Colors come from theme tokens only (no per-technology colors). `variants` is optional (framer-motion stagger).
export default function SkillChip({ item, variants, className = '' }) {
  return (
    <motion.li className={`skills-v3-chip${className ? ` ${className}` : ''}`} variants={variants}>
      <i className={item.icon} aria-hidden="true"></i>
      <span>{item.name}</span>
    </motion.li>
  );
}
