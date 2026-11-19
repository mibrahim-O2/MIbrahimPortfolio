'use client';

import { MotionConfig } from 'framer-motion';

// MotionConfig makes every Framer Motion animation on the site follow the visitor's "reduce motion"
// setting. (There is no page-wide fade-in any more: the server HTML must be visible without JavaScript,
// for visitors and for crawlers. Sections animate in with components/motion/Reveal.js.)
export default function Template({ children }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
