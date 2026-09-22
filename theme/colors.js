// Palette constants for places where CSS variables cannot be used (canvas 2D drawing).
// Keep in sync with the :root tokens in styles/globals.css.
export const palette = {
  bg: '#0b090a',
  surface: '#161a1d',
  surface2: '#1d1417',
  rust: '#660708',
  accent: '#ba181b',
  accentSoft: '#f2a9aa',
  teal: '#d3d3d3',
  tealSoft: '#b1a7a6',
  text: '#f5f3f4'
};

// "r, g, b" strings for building rgba() values
export const rgb = {
  accent: '186, 24, 27',
  accentSoft: '242, 169, 170',
  rust: '102, 7, 8',
  teal: '211, 211, 211',
  tealSoft: '177, 167, 166'
};

export const rgba = (name, alpha) => `rgba(${rgb[name]}, ${alpha})`;
