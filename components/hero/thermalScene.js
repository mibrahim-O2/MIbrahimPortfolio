// The hero's 3D "thermal terrain" (plain three.js, loaded on demand by components/hero/HeroGraph.js).
//
// What it shows: a landscape of contour lines that slowly rolls like a heat map of a running system,
// coloured like a thermal camera (oxblood in the valleys, infrared on the slopes, amber and white-hot
// on the peaks). Bright "agent" beacons travel across the surface, riding its height.
//
// Cost: 2 draw calls (lines, beacons). The terrain height is computed in the vertex shader from one
// time uniform, so the CPU only updates a couple of uniforms per frame. No post-processing.
import { AdditiveBlending, BufferAttribute, BufferGeometry, Color, LineSegments, PerspectiveCamera, Points, Scene, ShaderMaterial, WebGLRenderer } from 'three';

// Palette (keep in sync with the tokens in styles/globals.css)
export const THERMAL = {
  low: '#5E140C', // oxblood valleys
  mid: '#F0501C', // infrared slopes
  high: '#FFB23F', // amber peaks
  hot: '#FFF1D6' // white-hot crests and beacons
};

function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

// Terrain height: a few travelling waves plus one warm "hill" (the busiest part of the system)
const HEIGHT = /* glsl */ `
  float terrain(vec2 p, float t) {
    return 0.9 * sin(p.x * 0.45 + t * 0.25) * cos(p.y * 0.5 - t * 0.2)
         + 0.55 * sin(p.x * 0.9 - p.y * 0.7 + t * 0.35)
         + 0.35 * cos(p.x * 1.7 + p.y * 1.3 - t * 0.3)
         + 1.2 * exp(-dot(p - vec2(3.5, -3.0), p - vec2(3.5, -3.0)) * 0.18);
  }
`;

const LINE_VERT = /* glsl */ `
  uniform float uTime;
  uniform vec3 uLow; uniform vec3 uMid; uniform vec3 uHigh; uniform vec3 uHot;
  varying vec3 vColor;
  varying float vAlpha;
  ${HEIGHT}
  void main() {
    vec3 p = position;
    p.y = terrain(p.xz, uTime);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    float k = smoothstep(-1.2, 2.0, p.y);
    vec3 c = k < 0.5 ? mix(uLow, uMid, k * 2.0) : mix(uMid, uHigh, (k - 0.5) * 2.0);
    vColor = mix(c, uHot, smoothstep(0.86, 1.0, k));
    // brighter on the peaks, fading into the distance and right in front of the camera
    vAlpha = (0.25 + 0.75 * k) * smoothstep(-20.0, -5.0, mv.z) * smoothstep(-0.5, -3.0, mv.z);
  }
`;

const LINE_FRAG = /* glsl */ `
  uniform float uOpacity;
  varying vec3 vColor;
  varying float vAlpha;
  void main() { gl_FragColor = vec4(vColor, vAlpha * uOpacity); }
`;

const BEACON_VERT = /* glsl */ `
  attribute float aSeed;
  uniform float uTime;
  uniform float uPixelRatio;
  uniform vec3 uHigh; uniform vec3 uHot;
  varying vec3 vColor;
  varying float vAlpha;
  ${HEIGHT}
  void main() {
    vec3 p = position;
    p.x += sin(uTime * 0.2 + aSeed * 10.0) * 3.0;
    p.z += cos(uTime * 0.15 + aSeed * 7.0) * 1.5;
    p.y = terrain(p.xz, uTime) + 0.25;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (14.0 + 10.0 * sin(uTime * 3.0 + aSeed * 20.0)) * uPixelRatio * (7.0 / -mv.z);
    vColor = mix(uHigh, uHot, 0.7);
    vAlpha = 0.95;
  }
`;

const POINT_FRAG = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = pow(smoothstep(0.5, 0.0, d), 1.5) * vAlpha;
    if (a < 0.01) discard;
    gl_FragColor = vec4(vColor, a);
  }
`;

export function createThermalScene(canvas, { mobile = false, speed = 1 } = {}) {
  const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: !mobile, powerPreference: 'low-power' });
  const pixelRatio = Math.min(window.devicePixelRatio || 1, mobile ? 1.25 : 1.5);
  renderer.setPixelRatio(pixelRatio);
  renderer.setClearColor(0x000000, 0);

  const scene = new Scene();
  const camera = new PerspectiveCamera(40, 1, 0.1, 100);
  const camBase = { x: 0, y: 3.2, z: 7.5 };
  camera.position.set(camBase.x, camBase.y, camBase.z);
  camera.lookAt(0, -1.6, -4);

  const uniforms = {
    uTime: { value: 0 },
    uPixelRatio: { value: pixelRatio },
    uOpacity: { value: 1 },
    uLow: { value: new Color(THERMAL.low) },
    uMid: { value: new Color(THERMAL.mid) },
    uHigh: { value: new Color(THERMAL.high) },
    uHot: { value: new Color(THERMAL.hot) }
  };

  // ---- contour lines: rows of line segments across x, spaced along z ----
  const rows = mobile ? 34 : 56;
  const cols = mobile ? 120 : 220;
  const segments = rows * (cols - 1);
  const linePos = new Float32Array(segments * 6);
  let o = 0;
  for (let r = 0; r < rows; r++) {
    const z = 3 - r * 0.32;
    for (let c = 0; c < cols - 1; c++) {
      const x1 = (c / (cols - 1) - 0.5) * 22;
      const x2 = ((c + 1) / (cols - 1) - 0.5) * 22;
      linePos.set([x1, 0, z, x2, 0, z], o * 6);
      o++;
    }
  }
  const lineGeo = new BufferGeometry();
  lineGeo.setAttribute('position', new BufferAttribute(linePos, 3));
  const lineMat = new ShaderMaterial({ vertexShader: LINE_VERT, fragmentShader: LINE_FRAG, uniforms, transparent: true, depthWrite: false, blending: AdditiveBlending });
  const lines = new LineSegments(lineGeo, lineMat);
  lines.frustumCulled = false; // heights are computed in the shader

  // ---- agent beacons ----
  const rand = rng(5);
  const count = mobile ? 9 : 14;
  const beaconPos = new Float32Array(count * 3);
  const beaconSeed = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    beaconPos.set([(rand() - 0.5) * 16, 0, 2 - rand() * 14], i * 3);
    beaconSeed[i] = rand();
  }
  const beaconGeo = new BufferGeometry();
  beaconGeo.setAttribute('position', new BufferAttribute(beaconPos, 3));
  beaconGeo.setAttribute('aSeed', new BufferAttribute(beaconSeed, 1));
  const beaconMat = new ShaderMaterial({ vertexShader: BEACON_VERT, fragmentShader: POINT_FRAG, uniforms, transparent: true, depthWrite: false, blending: AdditiveBlending });
  const beacons = new Points(beaconGeo, beaconMat);
  beacons.frustumCulled = false;

  scene.add(lines, beacons);

  function resize() {
    const { clientWidth: w, clientHeight: h } = canvas;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();

  let pointer = 0;
  let sway = 0;
  let last = 0;
  let running = false;
  const minFrame = mobile ? 1000 / 30 : 0; // 30 fps on phones
  let rate = speed; // 1 = normal; lower for reduced motion
  let clock = 0; // scene time in seconds (advances only while playing)
  let prev = 0;

  function frame(now) {
    if (minFrame && now - last < minFrame) return;
    last = now;
    if (prev) clock += Math.min((now - prev) / 1000, 0.1) * rate;
    prev = now;
    uniforms.uTime.value = clock;
    sway += (pointer - sway) * 0.04;
    camera.position.x = camBase.x + sway * 0.8;
    camera.lookAt(sway * 0.4, -1.6, -4);
    renderer.render(scene, camera);
  }

  return {
    play() {
      if (running) return;
      running = true;
      last = 0;
      prev = 0;
      renderer.setAnimationLoop(frame);
    },
    pause() {
      running = false;
      renderer.setAnimationLoop(null);
    },
    renderOnce() {
      last = 0;
      prev = 0;
      frame(performance.now());
    },
    setSpeed(value) {
      rate = value;
    },
    // -1..1, from the mouse position (desktop only)
    setPointer(x) {
      pointer = x;
    },
    dispose() {
      running = false;
      renderer.setAnimationLoop(null);
      ro.disconnect();
      lineGeo.dispose();
      beaconGeo.dispose();
      lineMat.dispose();
      beaconMat.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
    }
  };
}
