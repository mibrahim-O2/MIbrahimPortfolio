'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';

let instance = null;

// Smooth scroll to a page Y position: uses the Lenis instance when it is running, the browser otherwise.
export function smoothScrollTo(y) {
  if (instance) instance.scrollTo(y, { duration: 1.1 });
  else window.scrollTo({ top: y, behavior: 'smooth' });
}

// Site-wide smooth scrolling (Lenis). Rendered once in app/layout.js. Renders nothing.
// - off with prefers-reduced-motion, always destroyed on unmount
// - #hash links (navbar, footer) scroll smoothly to their section
// - every route change starts at the top (or at the #hash target)
// Scrollable inner areas (chat panel, lightboxes) opt out with the data-lenis-prevent attribute.
export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    });
    instance = lenis;

    let frame = 0;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    const onClick = (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target instanceof Element ? event.target.closest('a[href]') : null;
      if (!anchor || anchor.target === '_blank') return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) {
        if (!(anchor.getAttribute('href') === '#')) return;
      }
      const id = decodeURIComponent(url.hash.slice(1));
      const target = id ? document.getElementById(id) : null;
      if (!target && id) return;

      event.preventDefault();
      lenis.scrollTo(target || 0, { duration: 1.1 });
      if (id) window.history.pushState(null, '', `#${id}`);
    };
    document.addEventListener('click', onClick, true);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('click', onClick, true);
      lenis.destroy();
      if (instance === lenis) instance = null;
    };
  }, []);

  // New page: start at the top (or at the #hash target)
  useEffect(() => {
    if (!instance) return;
    const id = decodeURIComponent(window.location.hash.slice(1));
    const target = id ? document.getElementById(id) : null;
    if (target) instance.scrollTo(target, { immediate: true });
    else instance.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
