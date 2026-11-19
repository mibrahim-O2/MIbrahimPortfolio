# The 3D thermal terrain in the hero

**Files:** `components/hero/HeroGraph.js` (when to load, pause button), `components/hero/thermalScene.js`
(the three.js scene), `components/hero/HeroGraph.module.css` (size, position, poster),
`utils/thermalPoster.js` (the static SVG poster of the same scene, rendered on the server).

**What it shows:** a landscape of contour lines that slowly rolls like a heat map of a running system,
coloured like a thermal camera (oxblood valleys, infrared slopes, amber and white-hot peaks), with bright
agent beacons travelling across it. On desktop it fills the right and lower part of the hero and fades out
behind the text; on phones it is a band at the top, above the headline.

**Colours:** the whole site uses the matching "Thermal" palette (tokens at the top of `styles/globals.css`):
charcoal `#0B0706`, infrared `#FF6A2B` (buttons, links, focus), amber `#FFB23F` (signals such as "Live").
The scene's own colours are `THERMAL` at the top of `thermalScene.js`; keep both in sync.

**Performance and accessibility rules (keep them):**
- The hero is complete without it: a static SVG poster of the same terrain shows first. SVG lines are not
  counted as the largest paint, so the headline stays the LCP element (Lighthouse mobile: LCP about 1.2 s).
- three.js (about 145 KB gzipped) loads only after the page is idle or the visitor interacts.
- It does not load with "reduce motion" switched on, without WebGL, or on very low-end devices; the poster stays.
- It renders only while visible, at 30 fps and lower resolution on phones, and has a Pause button.
- The canvas is decorative: `aria-hidden`, no focus, no clicks or touches.

**Common changes:**
- Turn it off: remove `<HeroGraph />` from `sections/HeroSection.js` (the glow stays).
- Detail: `rows` and `cols` in `createThermalScene` (fewer = lighter).
- Shape of the landscape: the `terrain()` function in the `HEIGHT` shader string.
- After changing the shape or colours, update `utils/thermalPoster.js` to match, and run
  `python3 scripts/build-og-images.py` so the share images match (it uses `scripts/assets/thermal-poster.webp`).
