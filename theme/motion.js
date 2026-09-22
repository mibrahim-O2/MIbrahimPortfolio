// Shared motion tokens for framer-motion pieces. The CSS twins live in :root of styles/globals.css
// (--ease, --dur-fast, --dur-base, --dur-slow) so CSS transitions and JS animations feel identical.
export const EASE_OUT = [0.22, 1, 0.36, 1];

export const DUR = { fast: 0.25, base: 0.7, slow: 0.9 };

export const STAGGER = 0.08;

export const VIEWPORT = { once: true, amount: 0.25, margin: '0px 0px -10% 0px' };

export const SPRING = { type: 'spring', stiffness: 140, damping: 20 };
