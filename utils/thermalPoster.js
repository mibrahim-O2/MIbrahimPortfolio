import { Color, PerspectiveCamera, Vector3 } from 'three';

// Static SVG version of the hero's thermal terrain (components/hero/thermalScene.js at time 0), rendered on
// the server. It shows for a moment before the 3D scene draws, and stays only on devices without WebGL.
// It reproduces the scene's shader maths: the same camera, height function, colour ramp, depth fading and
// additive glow (mix-blend-mode: plus-lighter), so the hand-over to the live scene is seamless.
// SVG lines are not "contentful" for Largest Contentful Paint, so the headline stays the LCP element.
// Keep in sync with thermalScene.js (camera, terrain(), THERMAL colours, alpha formula).

const W = 1600;
const H = 760; // about the aspect of the desktop terrain layer
const THERMAL = { low: '#5E140C', mid: '#F0501C', high: '#FFB23F', hot: '#FFF1D6' };
const ROWS = 40; // the live scene has 56 (the farthest rows are nearly invisible)
const COLS = 120;
const K_STEPS = 10; // colour steps
const A_STEPS = 6; // opacity steps

function terrain(x, z) {
  return (
    0.9 * Math.sin(x * 0.45) * Math.cos(z * 0.5) +
    0.55 * Math.sin(x * 0.9 - z * 0.7) +
    0.35 * Math.cos(x * 1.7 + z * 1.3) +
    1.2 * Math.exp(-((x - 3.5) ** 2 + (z + 3.0) ** 2) * 0.18)
  );
}

const smoothstep = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

const C = Object.fromEntries(Object.entries(THERMAL).map(([key, hex]) => [key, new Color(hex)]));

// Colour for a normalised height k (0 valleys .. 1 peaks), as in the line shader
function rampColor(k) {
  const c = k < 0.5 ? C.low.clone().lerp(C.mid, k * 2) : C.mid.clone().lerp(C.high, (k - 0.5) * 2);
  return `#${c.lerp(C.hot, smoothstep(0.86, 1, k)).getHexString()}`;
}

let cached = null;

export function thermalPosterPaths() {
  if (cached) return cached;
  const camera = new PerspectiveCamera(40, W / H, 0.1, 100);
  camera.position.set(0, 3.2, 7.5);
  camera.lookAt(0, -1.6, -4);
  camera.updateMatrixWorld();
  camera.matrixWorldInverse.copy(camera.matrixWorld).invert();

  const v = new Vector3();
  const paths = [];
  for (let r = 0; r < ROWS; r++) {
    const z = 3 - r * 0.32 * (56 / ROWS);
    const pts = [];
    for (let c = 0; c < COLS; c++) {
      const x = (c / (COLS - 1) - 0.5) * 22;
      const y = terrain(x, z);
      const viewZ = v.set(x, y, z).applyMatrix4(camera.matrixWorldInverse).z;
      v.set(x, y, z).project(camera);
      const k = smoothstep(-1.2, 2.0, y);
      const alpha = (0.25 + 0.75 * k) * smoothstep(-20, -5, viewZ) * smoothstep(-0.5, -3, viewZ);
      pts.push({ x: ((v.x + 1) / 2) * W, y: ((1 - v.y) / 2) * H, k, alpha });
    }
    // Group neighbouring segments with the same colour and opacity step into one path
    let run = null;
    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i];
      const b = pts[i + 1];
      const kq = Math.round(((a.k + b.k) / 2) * K_STEPS) / K_STEPS;
      const aq = Math.round(((a.alpha + b.alpha) / 2) * A_STEPS) / A_STEPS;
      if (aq <= 0) {
        run = null;
        continue;
      }
      if (!run || run.kq !== kq || run.aq !== aq) {
        run = { kq, aq, d: `M${a.x.toFixed(0)} ${a.y.toFixed(0)}` };
        paths.push(run);
      }
      run.d += `L${b.x.toFixed(0)} ${b.y.toFixed(0)}`;
    }
  }
  cached = {
    width: W,
    height: H,
    paths: paths.map((p) => ({ d: p.d, color: rampColor(p.kq), opacity: p.aq.toFixed(2) }))
  };
  return cached;
}
