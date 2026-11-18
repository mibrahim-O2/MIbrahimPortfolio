// Content-Security-Policy: only the sources the site really uses.
// - github.com / avatars.githubusercontent.com: profile photo (data/personal.js avatarUrl)
// - youtube-nocookie.com: project videos on case study pages
// - vercel.live / pusher: the Vercel toolbar on Preview deployments
// Next.js needs inline scripts and styles ('unsafe-inline'); 'unsafe-eval' only in local development.
const isDev = process.env.NODE_ENV === 'development';
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} https://vercel.live`,
  "style-src 'self' 'unsafe-inline' https://vercel.live",
  "font-src 'self' data: https://vercel.live https://assets.vercel.com",
  "img-src 'self' data: blob: https://github.com https://avatars.githubusercontent.com https://vercel.live https://vercel.com",
  "frame-src https://www.youtube-nocookie.com https://vercel.live",
  "connect-src 'self' https://vercel.live wss://ws-us3.pusher.com",
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  'upgrade-insecure-requests'
].join('; ');

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
  { key: 'Content-Security-Policy', value: csp }
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Images are resized and converted to modern formats by Vercel (next/image)
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' }
    ],
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

module.exports = nextConfig;
