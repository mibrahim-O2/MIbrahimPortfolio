import { SITE_URL } from '@/utils/siteUrl';
import { publishedProjects } from '@/data/projects';
import { hasExperience } from '@/data/experience';

const PAGES = ['', '/about', '/education', ...(hasExperience ? ['/experience'] : []), '/projects', '/skills', '/volunteer', '/certificates', '/gallery', '/contact'];

export default function sitemap() {
  const lastModified = new Date();
  return [
    ...PAGES.map((path) => ({ url: `${SITE_URL}${path}`, lastModified })),
    ...publishedProjects.map((project) => ({ url: `${SITE_URL}/projects/${project.id}`, lastModified }))
  ];
}
