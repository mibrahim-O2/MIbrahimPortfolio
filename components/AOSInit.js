'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

// AOS is loaded from a CDN <Script> in app/layout.js and may finish loading after hydration.
const RETRY_MS = 100;
const MAX_TRIES = 100; // give up after ~10 s

const AOS_OPTIONS = {
  duration: 700,
  easing: 'ease-out-quart',
  offset: 60,
  delay: 0,
  once: true,
  // With reduced motion AOS switches itself off, so every [data-aos] element is simply visible
  disable: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
};

// Renders nothing. Initialises AOS once for the whole app and re-scans the DOM on every route change.
export default function AOSInit() {
  const pathname = usePathname();
  const initialisedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    let timer = null;
    let tries = 0;

    const start = () => {
      if (cancelled) return;

      if (window.AOS) {
        if (!initialisedRef.current) {
          window.AOS.init(AOS_OPTIONS);
          initialisedRef.current = true;
        } else {
          // New route: pick up the [data-aos] elements of the page that was just rendered
          window.AOS.refreshHard();
        }
        return;
      }

      tries += 1;
      if (tries < MAX_TRIES) timer = window.setTimeout(start, RETRY_MS);
    };

    start();

    return () => {
      cancelled = true;
      if (timer) window.clearTimeout(timer);
    };
  }, [pathname]);

  return null;
}
