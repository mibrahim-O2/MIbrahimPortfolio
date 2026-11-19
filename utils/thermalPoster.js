import { PerspectiveCamera, Vector3 } from 'three';

// Static SVG version of the hero's thermal terrain (components/hero/thermalScene.js at time 0), rendered on
// the server. It shows before the live 3D scene loads, and stays for reduced motion, no WebGL and low-end
// devices. SVG lines are not "contentful" for Largest Contentful Paint, so the headline stays the LCP element.
// The camera, height function and colours mirror thermalScene.js: change them together.

const W = 1600;
const H = 840;
const COLORS = ['#5E140C', '#8A2410', '#C23A16', '#F0501C', '#FF7A2E', '#FFB23F', '#FFE2A8'];

function terrain(x, z) {
  return (
    0.9 * Math.sin(x * 0.45) * Math.cos(z * 0.5) +
    0.55 * Math.sin(x * 0.9 - z * 0.7) +
    0.35 * Math.cos(x * 1.7 + z * 1.3) +
    1.2 * Math.exp(-((x - 3.5) ** 2 + (z + 3.0) ** 2) * 0.18)
  );
}

let cached = null;

export function thermalPosterPaths() {
  if (cached) return cached;
  const camera = new PerspectiveCamera(40, W / H, 0.1, 100);
  camera.position.set(0, 3.2, 7.5);
  camera.lookAt(0, -0.3, -4);
  camera.updateMatrixWorld();
  const rows = 30;
  const cols = 110;
  const v = new Vector3();
  const paths = [];
  for (let r = 0; r < rows; r++) {
    const z = 3 - r * 0.6;
    let d = '';
    let sum = 0;
    for (let c = 0; c < cols; c++) {
      const x = (c / (cols - 1) - 0.5) * 22;
      const y = terrain(x, z);
      sum += y;
      v.set(x, y, z).project(camera);
      const px = ((v.x + 1) / 2) * W;
      const py = ((1 - v.y) / 2) * H;
      d += `${c ? 'L' : 'M'}${px.toFixed(0)} ${py.toFixed(0)}`;
    }
    const k = Math.min(1, Math.max(0, (sum / cols + 1.2) / 3.2));
    const depth = 1 - r / rows; // farther rows are fainter
    paths.push({ d, color: COLORS[Math.min(COLORS.length - 1, Math.round(k * (COLORS.length - 1)) + 2)], opacity: (0.25 + 0.6 * depth).toFixed(2) });
  }
  cached = { width: W, height: H, paths };
  return cached;
}
