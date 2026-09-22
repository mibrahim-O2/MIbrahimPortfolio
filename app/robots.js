import { SITE_URL } from '@/utils/siteUrl';

export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`
  };
}
