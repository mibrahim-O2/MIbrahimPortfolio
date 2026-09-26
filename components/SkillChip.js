'use client';

import { motion } from 'framer-motion';

// One technology chip: a dark glass tile behind the icon (matches the site's dark theme),
// with the icon shown in its own real/brand color from data/skills.js.
export default function SkillChip({ item, variants, className = '' }) {
  return (
    <motion.li className={`skills-v3-chip${className ? ` ${className}` : ''}`} variants={variants}>
      <span
        aria-hidden="true"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '30px',
          height: '30px',
          borderRadius: '10px',
          background: 'rgba(20, 20, 19, 0.9)',
          border: '1px solid rgba(232, 226, 218, 0.12)',
          marginRight: '8px',
          flexShrink: 0
        }}
      >
        <i
          className={item.icon}
          style={{
            color: item.color || '#D97B4A',
            fontSize: '16px',
            filter: 'none',
            opacity: 1
          }}
        ></i>
      </span>
      <span>{item.name}</span>
    </motion.li>
  );
}