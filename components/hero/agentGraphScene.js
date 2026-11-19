// The hero's 3D "agent graph" (plain three.js, loaded on demand by components/hero/HeroGraph.js).
//
// What it shows: ten clusters (one per published project) of small cool-teal agent nodes, linked to
// each other and to the centre, where the portrait card sits. Teal data pulses travel along the links
// and turn copper as they reach the centre: machine work flowing to a human approval point.
//
// Cost: 3 draw calls (nodes, links, pulses). All motion runs in vertex shaders from one time uniform,
// so the CPU does almost nothing per frame. No post-processing; the glow is additive blending plus a
// soft disc in the fragment shader.
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  LineSegments,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  WebGLRenderer
} from 'three';

const TEAL = new Color('#7FA3A6');
const TEAL_BRIGHT = new Color('#B7DCDD');
const COPPER = new Color('#E8935F');

// Deterministic random numbers, so the graph looks the same on every visit
function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

const NODE_VERT = /* glsl */ `
  attribute float aSize;
  attribute float aPhase;
  attribute vec3 aColor;
  uniform float uTime;
  uniform float uPixelRatio;
  varying vec3 vColor;
  varying float vFade;
  void main() {
    vec3 p = position;
    p += 0.035 * vec3(sin(uTime * 0.5 + aPhase), cos(uTime * 0.4 + aPhase * 1.3), sin(uTime * 0.45 + aPhase * 0.7));
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * uPixelRatio * (8.0 / -mv.z);
    vColor = aColor;
    vFade = clamp(1.5 - (-mv.z - 5.0) * 0.16, 0.35, 1.0); // farther nodes are dimmer (depth)
  }
`;

const POINT_FRAG = /* glsl */ `
  uniform float uOpacity;
  varying vec3 vColor;
  varying float vFade;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float core = smoothstep(0.5, 0.0, d);
    float alpha = pow(core, 1.5) * vFade * uOpacity;
    if (alpha < 0.01) discard;
    gl_FragColor = vec4(vColor, alpha);
  }
`;

const PULSE_VERT = /* glsl */ `
  attribute vec3 aStart;
  attribute vec3 aEnd;
  attribute float aOffset;
  attribute float aSpeed;
  attribute float aToCore;
  uniform float uTime;
  uniform float uPixelRatio;
  uniform vec3 uTeal;
  uniform vec3 uCopper;
  varying vec3 vColor;
  varying float vFade;
  void main() {
    float t = fract(uTime * aSpeed + aOffset);
    vec3 p = mix(aStart, aEnd, t);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = 7.0 * uPixelRatio * (8.0 / -mv.z);
    vColor = mix(uTeal, uCopper, aToCore * smoothstep(0.55, 1.0, t));
    vFade = sin(t * 3.14159); // fade in and out along the link
  }
`;

const LINE_VERT = /* glsl */ `
  attribute float aAlpha;
  varying float vAlpha;
  void main() {
    vAlpha = aAlpha;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const LINE_FRAG = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vAlpha;
  void main() {
    gl_FragColor = vec4(uColor, vAlpha * uOpacity);
  }
`;

function buildGraph({ clusters, perCluster, seed = 7 }) {
  const rand = rng(seed);
  const nodes = []; // { p: [x,y,z], size, color, phase }
  const links = []; // [a, b, alpha, toCore]
  const centres = [];

  // The centre (behind the portrait card): a soft copper glow
  nodes.push({ p: [0, 0, 0], size: 26, color: COPPER, phase: 0 });

  for (let c = 0; c < clusters; c++) {
    // cluster centres on a tilted ring around the core
    const angle = (c / clusters) * Math.PI * 2 + rand() * 0.3;
    const radius = 2.15 + rand() * 0.55;
    const centre = [Math.cos(angle) * radius, (rand() - 0.5) * 1.6, Math.sin(angle) * radius * 0.75];
    const centreIndex = nodes.length;
    centres.push(centreIndex);
    nodes.push({ p: centre, size: 13, color: TEAL_BRIGHT, phase: rand() * 6.28 });
    links.push([0, centreIndex, 0.55, 1]); // to the human approval point

    for (let i = 0; i < perCluster; i++) {
      const r = 0.35 + rand() * 0.5;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      const p = [
        centre[0] + r * Math.sin(phi) * Math.cos(theta),
        centre[1] + r * Math.cos(phi),
        centre[2] + r * Math.sin(phi) * Math.sin(theta)
      ];
      const index = nodes.length;
      nodes.push({ p, size: 5 + rand() * 4, color: TEAL, phase: rand() * 6.28 });
      links.push([centreIndex, index, 0.35, 0]);
    }
  }
  // a few links between neighbouring clusters (agents handing work to each other)
  for (let c = 0; c < centres.length; c++) {
    links.push([centres[c], centres[(c + 1) % centres.length], 0.22, 0]);
  }

  // faint far-away dust for depth
  const dust = Math.round(clusters * perCluster * 0.8);
  for (let i = 0; i < dust; i++) {
    const r = 3.6 + rand() * 2.4;
    const theta = rand() * Math.PI * 2;
    const y = (rand() - 0.5) * 4;
    nodes.push({ p: [Math.cos(theta) * r, y, Math.sin(theta) * r - 1], size: 2.5 + rand() * 2, color: TEAL, phase: rand() * 6.28 });
  }

  return { nodes, links };
}

export function createAgentGraph(canvas, { mobile = false } = {}) {
  const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: !mobile, powerPreference: 'low-power' });
  const pixelRatio = Math.min(window.devicePixelRatio || 1, mobile ? 1.25 : 1.5);
  renderer.setPixelRatio(pixelRatio);
  renderer.setClearColor(0x000000, 0);

  const scene = new Scene();
  const camera = new PerspectiveCamera(45, 1, 0.1, 50);
  camera.position.set(0, 0.6, 8.2);
  camera.lookAt(0, 0, 0);

  const { nodes, links } = buildGraph({ clusters: 10, perCluster: mobile ? 4 : 8 });

  // ---- nodes ----
  const pos = new Float32Array(nodes.length * 3);
  const col = new Float32Array(nodes.length * 3);
  const size = new Float32Array(nodes.length);
  const phase = new Float32Array(nodes.length);
  nodes.forEach((n, i) => {
    pos.set(n.p, i * 3);
    col.set([n.color.r, n.color.g, n.color.b], i * 3);
    size[i] = n.size;
    phase[i] = n.phase;
  });
  const nodeGeo = new BufferGeometry();
  nodeGeo.setAttribute('position', new BufferAttribute(pos, 3));
  nodeGeo.setAttribute('aColor', new BufferAttribute(col, 3));
  nodeGeo.setAttribute('aSize', new BufferAttribute(size, 1));
  nodeGeo.setAttribute('aPhase', new BufferAttribute(phase, 1));
  const uniforms = { uTime: { value: 0 }, uPixelRatio: { value: pixelRatio }, uOpacity: { value: 0.95 } };
  const nodeMat = new ShaderMaterial({
    vertexShader: NODE_VERT,
    fragmentShader: POINT_FRAG,
    uniforms,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending
  });
  const nodePoints = new Points(nodeGeo, nodeMat);

  // ---- links ----
  const linePos = new Float32Array(links.length * 6);
  const lineAlpha = new Float32Array(links.length * 2);
  links.forEach(([a, b, alpha], i) => {
    linePos.set(nodes[a].p, i * 6);
    linePos.set(nodes[b].p, i * 6 + 3);
    lineAlpha[i * 2] = alpha;
    lineAlpha[i * 2 + 1] = alpha * 0.6;
  });
  const lineGeo = new BufferGeometry();
  lineGeo.setAttribute('position', new BufferAttribute(linePos, 3));
  lineGeo.setAttribute('aAlpha', new BufferAttribute(lineAlpha, 1));
  const lineMat = new ShaderMaterial({
    vertexShader: LINE_VERT,
    fragmentShader: LINE_FRAG,
    uniforms: { uColor: { value: TEAL }, uOpacity: { value: 0.75 } },
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending
  });
  const lineSegments = new LineSegments(lineGeo, lineMat);

  // ---- pulses (2 per link to the centre, 1 on some others) ----
  const pulseLinks = [];
  links.forEach((link) => {
    if (link[3]) pulseLinks.push(link, link);
    else if (link[2] < 0.3) pulseLinks.push(link);
  });
  const rand = rng(99);
  const pStart = new Float32Array(pulseLinks.length * 3);
  const pEnd = new Float32Array(pulseLinks.length * 3);
  const pOffset = new Float32Array(pulseLinks.length);
  const pSpeed = new Float32Array(pulseLinks.length);
  const pCore = new Float32Array(pulseLinks.length);
  pulseLinks.forEach(([a, b, , toCore], i) => {
    // pulses on centre links travel outward-in: from the cluster (b) to the centre (a)
    pStart.set(nodes[toCore ? b : a].p, i * 3);
    pEnd.set(nodes[toCore ? a : b].p, i * 3);
    pOffset[i] = rand();
    pSpeed[i] = 0.08 + rand() * 0.08;
    pCore[i] = toCore;
  });
  const pulseGeo = new BufferGeometry();
  pulseGeo.setAttribute('position', new BufferAttribute(new Float32Array(pulseLinks.length * 3), 3));
  pulseGeo.setAttribute('aStart', new BufferAttribute(pStart, 3));
  pulseGeo.setAttribute('aEnd', new BufferAttribute(pEnd, 3));
  pulseGeo.setAttribute('aOffset', new BufferAttribute(pOffset, 1));
  pulseGeo.setAttribute('aSpeed', new BufferAttribute(pSpeed, 1));
  pulseGeo.setAttribute('aToCore', new BufferAttribute(pCore, 1));
  pulseGeo.boundingSphere = nodeGeo.computeBoundingSphere() || nodeGeo.boundingSphere; // positions are computed in the shader
  const pulseMat = new ShaderMaterial({
    vertexShader: PULSE_VERT,
    fragmentShader: POINT_FRAG,
    uniforms: { uTime: uniforms.uTime, uPixelRatio: uniforms.uPixelRatio, uOpacity: { value: 1 }, uTeal: { value: TEAL_BRIGHT }, uCopper: { value: COPPER } },
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending
  });
  const pulses = new Points(pulseGeo, pulseMat);
  pulses.frustumCulled = false;

  const group = { objects: [lineSegments, nodePoints, pulses] };
  group.objects.forEach((object) => scene.add(object));

  // ---- size ----
  function resize() {
    const { clientWidth: w, clientHeight: h } = canvas;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // keep the whole graph in view on narrow screens
    camera.position.z = camera.aspect < 0.9 ? 8.2 / Math.max(camera.aspect, 0.55) * 0.9 : 8.2;
    camera.updateProjectionMatrix();
  }
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();

  // ---- loop ----
  let rotation = 0;
  let targetTilt = 0;
  let tilt = 0;
  let last = 0;
  let running = false;
  const minFrame = mobile ? 1000 / 30 : 0; // 30 fps on phones
  const start = performance.now();

  function frame(now) {
    if (minFrame && now - last < minFrame) return;
    const dt = last ? Math.min((now - last) / 1000, 0.1) : 0;
    last = now;
    uniforms.uTime.value = (now - start) / 1000;
    rotation += dt * 0.06;
    tilt += (targetTilt - tilt) * 0.05;
    group.objects.forEach((object) => {
      object.rotation.y = rotation + tilt * 0.25;
      object.rotation.x = 0.12 + tilt * 0.05;
    });
    renderer.render(scene, camera);
  }

  return {
    play() {
      if (running) return;
      running = true;
      last = 0;
      renderer.setAnimationLoop(frame);
    },
    pause() {
      running = false;
      renderer.setAnimationLoop(null);
    },
    renderOnce() {
      frame(performance.now());
    },
    // -1..1, from the mouse position (desktop only)
    setPointer(x) {
      targetTilt = x;
    },
    dispose() {
      running = false;
      renderer.setAnimationLoop(null);
      ro.disconnect();
      [nodeGeo, lineGeo, pulseGeo].forEach((g) => g.dispose());
      [nodeMat, lineMat, pulseMat].forEach((m) => m.dispose());
      renderer.dispose();
      renderer.forceContextLoss();
    }
  };
}
