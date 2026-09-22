'use client';

import NeuralBackground from '@/components/NeuralBackground';

// Site-wide background, rendered once in app/layout.js (fixed, below the content, pointer-events none).
// Layer 1: a static vignette (two soft radial gradients) for depth. Layer 2: the neural network canvas.
export default function AmbientBackground() {
  return (
    <div className="amb-root" aria-hidden="true">
      <div className="amb-vignette"></div>
      <NeuralBackground />
    </div>
  );
}
