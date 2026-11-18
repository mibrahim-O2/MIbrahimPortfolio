import { useCallback } from 'react';

// Pointer spotlight for cards with the `.spotlight` class (styles/globals.css): writes the pointer
// position into --mx / --my. Mouse only; touch devices never get the listener's effect.
export default function useSpotlight() {
  return useCallback((event) => {
    if (event.pointerType !== 'mouse') return;
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    el.style.setProperty('--my', `${event.clientY - rect.top}px`);
  }, []);
}
