import { SITE_URL } from '@/utils/siteUrl';
import { projectsData } from '@/data/projects';

const PAGES = ['', '/about', '/education', '/experience', '/projects', '/skills', '/volunteer', '/certificates', '/gallery', '/contact'];

export default function sitemap() {
  const lastModified = new Date();
  return [
    ...PAGES.map((path) => ({ url: `${SITE_URL}${path}`, lastModified })),
    ...projectsData.map((project) => ({ url: `${SITE_URL}/projects/${project.id}`, lastModified }))
  ];
}
