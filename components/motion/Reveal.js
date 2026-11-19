// Scroll-reveal wrapper. Works in Server and Client Components (no React state, no Framer Motion).
//
// The server HTML is always fully visible. The tiny script in app/layout.js (REVEAL_SCRIPT) adds
// `js-reveal` to <html> before first paint, which hides `.reveal` elements until they scroll into view;
// it then marks each one `data-in`. No JavaScript, a crawler, or prefers-reduced-motion = content shown
// immediately. Styles: styles/globals.css (search "Scroll reveal").
//
// variant: up (default) | left | right | scale | fade | rise. delay: seconds.
export default function Reveal({ as: Tag = 'div', variant = 'up', delay = 0, className = '', style, viewport, children, ...rest }) {
  return (
    <Tag
      className={`reveal ${className}`.trim()}
      data-reveal={variant}
      style={delay ? { ...style, '--reveal-delay': `${delay}s` } : style}
      suppressHydrationWarning
      {...rest}
    >
      {children}
    </Tag>
  );
}
