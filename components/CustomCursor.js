'use client';

import { useEffect, useRef, useState } from 'react';

const LERP = 0.18;
const HOVER_SELECTOR = 'a, button, input, textarea, [role="button"], [data-cursor="hover"]';

// Cursor accent for mouse users only ((hover: hover) and (pointer: fine)). The native cursor stays visible.
// A 6px dot follows the pointer exactly, a 34px ring follows with a lerp and grows over interactive elements.
// Reduced motion: dot only, no lerp, no ring. Rendered once in app/layout.js.
export default function CustomCursor() {
  const [mode, setMode] = useState('off'); // 'off' | 'full' | 'dot'
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setMode(!fine.matches ? 'off' : reduce.matches ? 'dot' : 'full');
    update();
    fine.addEventListener('change', update);
    reduce.addEventListener('change', update);
    return () => {
      fine.removeEventListener('change', update);
      reduce.removeEventListener('change', update);
    };
  }, []);

  useEffect(() => {
    if (mode === 'off') return undefined;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot) return undefined;

    let tx = -100;
    let ty = -100;
    let rx = -100;
    let ry = -100;
    let frame = 0;
    let seen = false;

    const place = (el, x, y) => {
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    };

    const tick = () => {
      rx += (tx - rx) * LERP;
      ry += (ty - ry) * LERP;
      if (ring) place(ring, rx, ry);
      frame = window.requestAnimationFrame(tick);
    };

    const onMove = (event) => {
      if (event.pointerType && event.pointerType !== 'mouse') return;
      tx = event.clientX;
      ty = event.clientY;
      place(dot, tx, ty);
      if (!seen) {
        seen = true;
        rx = tx;
        ry = ty;
        dot.classList.add('is-visible');
        if (ring) ring.classList.add('is-visible');
      }
    };

    const onOver = (event) => {
      const hit = event.target instanceof Element && event.target.closest(HOVER_SELECTOR);
      if (ring) ring.classList.toggle('is-hover', Boolean(hit));
    };
    const onDown = () => ring && ring.classList.add('is-down');
    const onUp = () => ring && ring.classList.remove('is-down');
    const onLeave = () => {
      dot.classList.remove('is-visible');
      if (ring) ring.classList.remove('is-visible');
      seen = false;
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    if (mode === 'full') frame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, [mode]);

  if (mode === 'off') return null;

  return (
    <>
      <div ref={dotRef} className="cur-dot" aria-hidden="true"></div>
      {mode === 'full' ? (
        <div ref={ringRef} className="cur-ring" aria-hidden="true">
          <span className="cur-ring-inner"></span>
        </div>
      ) : null}
    </>
  );
}
