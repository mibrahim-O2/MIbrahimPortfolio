import { useId } from 'react';

// "MI" emblem logo (SVG, crisp at any size). The letters are drawn as an agent network: the M is a chain
// of links between glowing nodes, its centre node is the "agent" (white-hot core), and the I is a link
// topped by an amber node, wired to the M by a faint data line. It sits in a hexagonal badge with an
// infrared-to-champagne gradient rim, an inner hairline, a warm core glow and a top sheen.
// Colours follow the Thermal palette in styles/globals.css.
export default function Logo({ size = 40, className, title }) {
  const id = useId().replace(/:/g, '');
  const ids = { rim: `rim-${id}`, link: `link-${id}`, core: `core-${id}`, bg: `bg-${id}`, sheen: `sheen-${id}`, node: `node-${id}` };
  // pointy-top hexagon, slightly rounded by the stroke join
  const hex = 'M24 2.2L42.9 13.1V34.9L24 45.8L5.1 34.9V13.1Z';
  const hexInner = 'M24 6.4L39.3 15.2V32.8L24 41.6L8.7 32.8V15.2Z';
  const nodes = [
    [12.4, 32.6, 1.9],
    [12.4, 15.6, 1.9],
    [27.2, 15.6, 1.9],
    [27.2, 32.6, 1.9],
    [35.6, 32.6, 1.7]
  ];
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
        <linearGradient id={ids.bg} x1="24" y1="2" x2="24" y2="46" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#24170F" />
          <stop offset="1" stopColor="#0B0706" />
        </linearGradient>
        <radialGradient id={ids.core} cx="19.8" cy="24.6" r="16" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FF6A2B" stopOpacity="0.55" />
          <stop offset="1" stopColor="#FF6A2B" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={ids.rim} x1="6" y1="4" x2="42" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFF1D6" />
          <stop offset="0.3" stopColor="#FFB23F" />
          <stop offset="0.65" stopColor="#FF6A2B" />
          <stop offset="1" stopColor="#8E220A" />
        </linearGradient>
        <linearGradient id={ids.link} x1="12" y1="15" x2="36" y2="33" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFE2A8" />
          <stop offset="0.55" stopColor="#FF9A3C" />
          <stop offset="1" stopColor="#FF6A2B" />
        </linearGradient>
        <radialGradient id={ids.node}>
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.45" stopColor="#FFE2A8" />
          <stop offset="1" stopColor="#FF9A3C" />
        </radialGradient>
        <linearGradient id={ids.sheen} x1="24" y1="2" x2="24" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.16" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* badge */}
      <path d={hex} fill={`url(#${ids.bg})`} />
      <path d={hex} fill={`url(#${ids.core})`} />
      <path d={hex} fill="none" stroke={`url(#${ids.rim})`} strokeWidth="1.7" strokeLinejoin="round" />
      <path d={hexInner} fill="none" stroke="#FFFFFF" strokeOpacity="0.08" strokeWidth="0.7" strokeLinejoin="round" />

      {/* faint data line from the agent to the I */}
      <path d="M19.8 24.6L35.6 24" stroke="#FFB23F" strokeOpacity="0.35" strokeWidth="0.8" strokeDasharray="1.2 1.6" strokeLinecap="round" />

      {/* M: links between nodes */}
      <path d="M12.4 32.6V15.6L19.8 24.6L27.2 15.6V32.6" fill="none" stroke={`url(#${ids.link})`} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {/* I */}
      <path d="M35.6 21.6V32.6" stroke={`url(#${ids.link})`} strokeWidth="3" strokeLinecap="round" />

      {/* nodes */}
      {nodes.map(([cx, cy, r]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill={`url(#${ids.node})`} />
      ))}
      {/* the agent: white-hot core with a halo */}
      <circle cx="19.8" cy="24.6" r="4.2" fill="#FF6A2B" fillOpacity="0.25" />
      <circle cx="19.8" cy="24.6" r="2.6" fill={`url(#${ids.node})`} />
      {/* I's amber node */}
      <circle cx="35.6" cy="15.6" r="2.5" fill="#FFB23F" />
      <circle cx="35.6" cy="15.6" r="1.1" fill="#FFF6E6" />

      {/* sheen */}
      <path d="M24 2.2L42.9 13.1V24H5.1V13.1Z" fill={`url(#${ids.sheen})`} />
    </svg>
  );
}
