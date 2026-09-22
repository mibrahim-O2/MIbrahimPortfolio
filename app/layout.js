import '@/styles/globals.css';
import Script from 'next/script';
import { SITE_URL } from '@/utils/siteUrl';
import AOSInit from '@/components/AOSInit';
import SmoothScroll from '@/components/SmoothScroll';
import AmbientBackground from '@/components/AmbientBackground';
import CustomCursor from '@/components/CustomCursor';
import ScrollProgress from '@/components/ScrollProgress';

const TITLE = 'Muhammad Ibrahim | Full-Stack Developer & AI Engineer';
const DESCRIPTION = 'Portfolio of Muhammad Ibrahim, a Full-Stack Developer and AI Engineer building AI systems, optimization tools, and full-stack web applications.';
// 1200x630 JPEG: LinkedIn and some other crawlers do not render WebP
const OG_IMAGE = { url: '/og-image.jpg', width: 1200, height: 630, alt: 'Muhammad Ibrahim' };

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'Muhammad Ibrahim',
    'Full-Stack Developer',
    'AI Engineer',
    'Machine Learning',
    'FastAPI',
    'Next.js',
    'React',
    'Python',
    'Sanghar',
    'Pakistan'
  ],
  authors: [{ name: 'Muhammad Ibrahim' }],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: 'Muhammad Ibrahim',
    images: [OG_IMAGE],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: OG_IMAGE.url, alt: OG_IMAGE.alt }]
  },
  icons: {
    icon: '/favicon.png'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="theme-color" content="#020403" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        {/* Devicon glyphs for the Skills chips (pinned version, never @latest) */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/devicon.min.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&family=Inter:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Sora:wght@400;600;700;800&family=Space+Grotesk:wght@500;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css" />
        <link rel="stylesheet" href="https://unpkg.com/lenis@1.1.18/dist/lenis.css" />
      </head>
      <body>
        {children}
        <AmbientBackground />
        <ScrollProgress />
        <CustomCursor />
        <SmoothScroll />
        <AOSInit />
        <Script src="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
