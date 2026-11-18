'use client';

import { motion, MotionConfig } from 'framer-motion';

// Page transition: every route change fades the new page in with a short rise.
// (A template re-mounts on navigation, unlike a layout.) MotionConfig makes every Framer Motion
// animation on the site follow the visitor's "reduce motion" setting.
export default function Template({ children }) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
        {children}
      </motion.div>
    </MotionConfig>
  );
}
