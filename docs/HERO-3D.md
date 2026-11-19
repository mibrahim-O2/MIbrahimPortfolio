# The 3D agent graph in the hero

**Files:** `components/hero/HeroGraph.js` (when to load, pause button), `components/hero/agentGraphScene.js`
(the three.js scene), `components/hero/HeroGraph.module.css` (size and position).

**What it shows:** ten clusters of teal "agent" nodes (one per project) linked to the centre behind your
portrait. Teal pulses travel to the centre and turn copper: machine work reaching a human approval point.

**Performance and accessibility rules (keep them):**
- The hero is complete without it. three.js (about 145 KB gzipped) loads only after the page is idle or
  the visitor interacts, never before the hero text is painted.
- It does not load with "reduce motion" switched on, without WebGL, or on very low-end devices.
- It renders only while visible, at 30 fps and lower resolution on phones, and has a Pause button.
- The canvas is decorative: `aria-hidden`, no focus, no clicks or touches.

**Common changes:**
- Turn it off: remove `<HeroGraph />` from `sections/HeroSection.js`.
- Colours: `TEAL`, `TEAL_BRIGHT`, `COPPER` at the top of `agentGraphScene.js`.
- Amount of detail: `perCluster` in `createAgentGraph` (8 on desktop, 4 on phones).
- Size on screen: `.wrap` `inset` in `HeroGraph.module.css`.
