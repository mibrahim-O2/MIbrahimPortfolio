import { SITE_URL } from '@/utils/siteUrl';
import { personalInfo } from '@/data/personal';

// One place for page metadata. Every route calls buildMetadata(), so each page gets its own title,
// description, canonical URL, Open Graph block and Twitter card. (In Next.js a page's `openGraph`
// replaces the root one instead of merging with it, so every field is set here on purpose.)
//
// image: a local path to a 1200x630 JPEG or PNG. LinkedIn and some other apps do not show WebP previews.

export const SITE_NAME = personalInfo.name;
export const ROLE = personalInfo.title; // "Agentic AI & Automation Engineer": keep this one label everywhere
export const DEFAULT_OG_IMAGE = { url: '/og-image.jpg', width: 1200, height: 630, alt: `${personalInfo.name}, ${personalInfo.title}` };

export function absoluteUrl(path = '/') {
  return `${SITE_URL}${path === '/' ? '' : path}`;
}

export function buildMetadata({ title, description, path = '/', image, imageAlt, type = 'website', noindex = false }) {
  const og = image ? { url: image, width: 1200, height: 630, alt: imageAlt || title } : DEFAULT_OG_IMAGE;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: 'en_US',
      type,
      images: [og]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [{ url: og.url, alt: og.alt }]
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {})
  };
}
