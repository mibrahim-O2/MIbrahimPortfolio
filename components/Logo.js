import { useId } from 'react';

// "MI" monogram logo (SVG, scales cleanly at any size). A geometric M whose middle vertex is an agent
// node, an I with a node on top, inside a dark tile with an infrared-to-amber gradient frame.
// Colours follow the Thermal palette in styles/globals.css.
export default function Logo({ size = 36, className, title }) {
  const id = useId().replace(/:/g, '');
  const stroke = `logo-stroke-${id}`;
  const frame = `logo-frame-${id}`;
  const glow = `logo-glow-${id}`;
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 40 40"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : 'true'}
      aria-label={title}
      focusable="false"
    >
      <defs>
        <linearGradient id={frame} x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFE2A8" />
          <stop offset="0.45" stopColor="#FF7A2E" />
          <stop offset="1" stopColor="#B8300E" />
        </linearGradient>
        <linearGradient id={stroke} x1="9" y1="10" x2="31" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFF1D6" />
          <stop offset="0.5" stopColor="#FFB23F" />
          <stop offset="1" stopColor="#FF6A2B" />
        </linearGradient>
        <radialGradient id={glow} cx="20" cy="4" r="30" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FF6A2B" stopOpacity="0.35" />
          <stop offset="1" stopColor="#FF6A2B" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="1" y="1" width="38" height="38" rx="11" fill="#140C09" />
      <rect x="1" y="1" width="38" height="38" rx="11" fill={`url(#${glow})`} />
      <rect x="1" y="1" width="38" height="38" rx="11" fill="none" stroke={`url(#${frame})`} strokeWidth="1.5" />
      {/* M */}
      <path d="M9.5 28.5V12.5L16.5 21.5L23.5 12.5V28.5" fill="none" stroke={`url(#${stroke})`} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      {/* I */}
      <path d="M30 18V28.5" fill="none" stroke={`url(#${stroke})`} strokeWidth="2.6" strokeLinecap="round" />
      {/* agent nodes */}
      <circle cx="30" cy="12.6" r="2.1" fill="#FFB23F" />
      <circle cx="16.5" cy="21.5" r="1.6" fill="#FFF1D6" />
    </svg>
  );
}
