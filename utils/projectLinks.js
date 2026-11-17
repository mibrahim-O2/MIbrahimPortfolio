// External links of a project, in display order. Empty URLs are skipped, so placeholders in
// data/projects.js (e.g. a video or blog post that does not exist yet) never show a button.
export function projectLinks(project) {
  const links = [];
  if (project.demoUrl) links.push({ label: 'Live demo', url: project.demoUrl, icon: 'fas fa-arrow-up-right-from-square' });
  if (project.githubUrl) links.push({ label: 'GitHub', url: project.githubUrl, icon: 'fab fa-github' });
  if (project.videoUrl) links.push({ label: project.videoLabel || 'Watch video', url: project.videoUrl, icon: 'fas fa-play' });
  (project.links || [])
    .filter((link) => link && link.url)
    .forEach((link) => links.push({ label: link.label, url: link.url, icon: link.icon || 'fas fa-link' }));
  return links;
}
