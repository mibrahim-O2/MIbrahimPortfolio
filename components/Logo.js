import { useId } from 'react';

// "MI" monogram logo (SVG, crisp at any size). A faceted, filled M and an I topped with a diamond
// "agent node", in a champagne-to-infrared gradient, set in a dark squircle with a gradient rim,
// an inner hairline, a warm under-glow and a soft top sheen. Colours follow styles/globals.css.
export default function Logo({ size = 38, className, title }) {
  const id = useId().replace(/:/g, '');
  const ids = { rim: `rim-${id}`, fill: `fill-${id}`, glow: `glow-${id}`, sheen: `sheen-${id}`, bg: `bg-${id}` };
  const squircle = 'M24 1.5C38.4 1.5 46.5 9.6 46.5 24S38.4 46.5 24 46.5 1.5 38.4 1.5 24 9.6 1.5 24 1.5Z';
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : 'true'}
      aria-label={title}
      focusable="false"
    >
      <defs>
        <linearGradient id={ids.bg} x1="24" y1="0" x2="24" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#1F1410" />
          <stop offset="1" stopColor="#0B0706" />
        </linearGradient>
        <radialGradient id={ids.glow} cx="24" cy="46" r="26" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FF6A2B" stopOpacity="0.45" />
          <stop offset="1" stopColor="#FF6A2B" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={ids.rim} x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFE9C2" />
          <stop offset="0.35" stopColor="#FFB23F" />
          <stop offset="0.7" stopColor="#FF6A2B" />
          <stop offset="1" stopColor="#9E2A0C" />
        </linearGradient>
        <linearGradient id={ids.fill} x1="11" y1="13" x2="37" y2="35" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFF4DE" />
          <stop offset="0.45" stopColor="#FFC56A" />
          <stop offset="1" stopColor="#FF6A2B" />
        </linearGradient>
        <linearGradient id={ids.sheen} x1="24" y1="2" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.14" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* tile */}
      <path d={squircle} fill={`url(#${ids.bg})`} />
      <path d={squircle} fill={`url(#${ids.glow})`} />
      <path d={squircle} fill="none" stroke={`url(#${ids.rim})`} strokeWidth="1.6" />
      <path d="M24 4.6C36.3 4.6 43.4 11.7 43.4 24S36.3 43.4 24 43.4 4.6 36.3 4.6 24 11.7 4.6 24 4.6Z" fill="none" stroke="#FFFFFF" strokeOpacity="0.07" strokeWidth="0.8" />

      {/* M: faceted, filled */}
      <path d="M10.5 34.5V13.5H15L20.5 21.6L26 13.5H30.5V34.5H26.6V20.7L20.5 29.2L14.4 20.7V34.5Z" fill={`url(#${ids.fill})`} />
      {/* facet highlight on the left stroke of the M */}
      <path d="M10.5 13.5H15L20.5 21.6L19.3 23.3L14.4 16.4V34.5H10.5Z" fill="#FFFFFF" fillOpacity="0.16" />

      {/* I with a diamond agent node */}
      <rect x="33.4" y="20.2" width="3.9" height="14.3" rx="1.2" fill={`url(#${ids.fill})`} />
      <path d="M35.35 11.8L38.1 14.55L35.35 17.3L32.6 14.55Z" fill="#FFB23F" />
      <path d="M35.35 13.3L36.6 14.55L35.35 15.8L34.1 14.55Z" fill="#FFF4DE" />

      {/* top sheen */}
      <path d="M24 1.5C38.4 1.5 46.5 9.6 46.5 24H1.5C1.5 9.6 9.6 1.5 24 1.5Z" fill={`url(#${ids.sheen})`} />
    </svg>
  );
}
