import { Inter, JetBrains_Mono } from 'next/font/google';
import '@/styles/globals.css';
import '@/styles/legacy.css';
import { SITE_URL } from '@/utils/siteUrl';
import Navbar from '@/components/Navbar';
import FooterSection from '@/sections/FooterSection';
import ScrollProgress from '@/components/ScrollProgress';
import ScrollToTop from '@/components/ScrollToTop';

// Self-hosted at build time by next/font: no request to Google from the visitor's browser
const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], display: 'swap', weight: ['400', '500'], variable: '--font-jetbrains' });

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
    icon: '/favicon.png',
    apple: '/favicon.png'
  }
};

export const viewport = {
  themeColor: '#0A0B0D'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <head>
        {/* Icon fonts used by the data files (skills, focus areas, experience, social links) */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/devicon.min.css" />
      </head>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <ScrollProgress />
        <Navbar />
        <main id="main">{children}</main>
        <FooterSection />
        <ScrollToTop />
      </body>
    </html>
  );
}
