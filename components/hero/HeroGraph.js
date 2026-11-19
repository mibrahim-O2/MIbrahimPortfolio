'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './HeroGraph.module.css';

const STORAGE_KEY = 'hero-animation-paused';

function webglAvailable() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(window.WebGLRenderingContext && (canvas.getContext('webgl2') || canvas.getContext('webgl')));
  } catch {
    return false;
  }
}

function readPaused() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

// Decorative 3D agent graph behind the hero portrait (scene: ./agentGraphScene.js).
//
// Progressive enhancement: the hero is complete without it (CSS backdrop). three.js is only downloaded
// when all of these hold: the visitor has not asked for reduced motion, WebGL works, and the page has
// finished loading and gone idle (or the visitor has scrolled, tapped or moved the mouse). It renders
// only while the hero is on screen and the tab is visible, and a button lets anyone pause it (WCAG 2.2.2).
export default function HeroGraph() {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const visibleRef = useRef(true);
  const pausedRef = useRef(false);
  const [state, setState] = useState('idle'); // idle | ready | off
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduce.matches || !webglAvailable()) {
      setState('off');
      return undefined;
    }
    const startPaused = readPaused();
    pausedRef.current = startPaused;
    setPaused(startPaused);

    let cancelled = false;
    let idleId = 0;
    let timer = 0;
    const mobile = window.matchMedia('(max-width: 959px), (pointer: coarse)').matches;
    const lowEnd = (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) || (navigator.deviceMemory && navigator.deviceMemory <= 2);
    if (lowEnd) {
      setState('off');
      return undefined;
    }

    const update = () => {
      const scene = sceneRef.current;
      if (!scene) return;
      if (visibleRef.current && !pausedRef.current && document.visibilityState === 'visible') scene.play();
      else scene.pause();
    };

    const load = async () => {
      if (cancelled || sceneRef.current) return;
      removeTriggers();
      try {
        const { createAgentGraph } = await import('./agentGraphScene');
        if (cancelled || !canvasRef.current) return;
        const scene = createAgentGraph(canvasRef.current, { mobile });
        sceneRef.current = scene;
        scene.renderOnce();
        setState('ready');
        update();
      } catch {
        setState('off');
      }
    };

    // Start after load + idle, or on the first interaction, whichever comes first
    const triggers = ['pointerdown', 'scroll', 'keydown', 'mousemove', 'touchstart'];
    function removeTriggers() {
      triggers.forEach((name) => window.removeEventListener(name, load));
    }
    triggers.forEach((name) => window.addEventListener(name, load, { once: true, passive: true }));
    const schedule = () => {
      if ('requestIdleCallback' in window) idleId = window.requestIdleCallback(load, { timeout: 2500 });
      else timer = window.setTimeout(load, 1200);
    };
    if (document.readyState === 'complete') schedule();
    else window.addEventListener('load', schedule, { once: true });

    // Render only while the hero is visible and the tab is in front
    const io = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting;
      update();
    });
    if (wrapRef.current) io.observe(wrapRef.current);
    document.addEventListener('visibilitychange', update);

    // Gentle tilt toward the mouse (desktop, fine pointer only)
    const fine = window.matchMedia('(pointer: fine)').matches;
    const onMove = (event) => {
      if (sceneRef.current) sceneRef.current.setPointer((event.clientX / window.innerWidth) * 2 - 1);
    };
    if (fine) window.addEventListener('pointermove', onMove, { passive: true });

    // Turn everything off if the visitor switches on reduced motion while on the page
    const onReduce = () => {
      if (reduce.matches) {
        sceneRef.current?.dispose();
        sceneRef.current = null;
        setState('off');
      }
    };
    reduce.addEventListener?.('change', onReduce);

    const canvas = canvasRef.current;
    const onLost = (event) => {
      event.preventDefault();
      sceneRef.current = null;
      setState('off');
    };
    canvas?.addEventListener('webglcontextlost', onLost);

    return () => {
      cancelled = true;
      removeTriggers();
      window.removeEventListener('load', schedule);
      if (idleId && 'cancelIdleCallback' in window) window.cancelIdleCallback(idleId);
      if (timer) window.clearTimeout(timer);
      io.disconnect();
      document.removeEventListener('visibilitychange', update);
      window.removeEventListener('pointermove', onMove);
      reduce.removeEventListener?.('change', onReduce);
      canvas?.removeEventListener('webglcontextlost', onLost);
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
  }, []);

  const togglePause = () => {
    const next = !pausedRef.current;
    pausedRef.current = next;
    setPaused(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next ? '1' : '0');
    } catch {
      /* storage unavailable: the choice lasts for this visit only */
    }
    const scene = sceneRef.current;
    if (scene) {
      if (next) scene.pause();
      else if (visibleRef.current) scene.play();
    }
  };

  return (
    <>
      <div ref={wrapRef} className={styles.wrap} data-state={state} aria-hidden="true">
        <canvas ref={canvasRef} className={styles.canvas} tabIndex={-1} />
      </div>
      {state === 'ready' && (
        <button type="button" className={styles.pause} onClick={togglePause} aria-pressed={paused}>
          <i className={`fas ${paused ? 'fa-play' : 'fa-pause'}`} aria-hidden="true"></i>
          <span>{paused ? 'Play animation' : 'Pause animation'}</span>
        </button>
      )}
    </>
  );
}
