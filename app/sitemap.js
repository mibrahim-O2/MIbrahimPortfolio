import { SITE_URL } from '@/utils/siteUrl';
import { publishedProjects } from '@/data/projects';
import { servicesData } from '@/data/services';
import { hasExperience } from '@/data/experience';
import { DEFAULT_DATE, pageDates } from '@/data/siteDates';

// sitemap.xml: every indexable page with the date its content last changed (data/siteDates.js)
const PAGES = ['', '/about', '/projects', '/services', '/skills', '/education', ...(hasExperience ? ['/experience'] : []), '/certificates', '/volunteer', '/gallery', '/contact'];

const date = (value) => new Date(`${value || DEFAULT_DATE}T00:00:00Z`);

export default function sitemap() {
  return [
    ...PAGES.map((path) => ({ url: `${SITE_URL}${path}`, lastModified: date(pageDates[path]) })),
    ...servicesData.map((service) => ({ url: `${SITE_URL}/services/${service.slug}`, lastModified: date(service.updatedAt) })),
    ...publishedProjects.map((project) => ({ url: `${SITE_URL}/projects/${project.id}`, lastModified: date(project.updatedAt) }))
  ];
}
