// Palette constants for places where CSS variables cannot be used (canvas 2D drawing).
// Keep in sync with the :root tokens in styles/globals.css.
export const palette = {
  bg: '#020403',
  surface: '#141413',
  surface2: '#1A2324',
  rust: '#5F2E1B',
  accent: '#D97B4A',
  accentSoft: '#F0A070',
  teal: '#7FA3A6',
  tealSoft: '#9DB8BA',
  text: '#E8E2DA'
};

// "r, g, b" strings for building rgba() values
export const rgb = {
  accent: '217, 123, 74',
  accentSoft: '240, 160, 112',
  rust: '95, 46, 27',
  teal: '127, 163, 166',
  tealSoft: '157, 184, 186'
};

export const rgba = (name, alpha) => `rgba(${rgb[name]}, ${alpha})`;