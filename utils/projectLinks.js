// External links of a project, in display order. Empty URLs are skipped, so placeholders in
// data/projects.js (e.g. a demo, video or blog post that does not exist yet) never show a button.
export function projectLinks(project) {
  const links = [];
  if (project.demoUrl) {
    links.push({ label: project.demoLabel || 'Live demo', url: project.demoUrl, icon: 'fas fa-arrow-up-right-from-square' });
  }
  if (project.githubUrl) {
    links.push(
      project.githubPrivate
        ? { label: 'Private repo', url: project.githubUrl, icon: 'fas fa-lock', title: 'Private repository: visible to the client and invited reviewers' }
        : { label: 'GitHub', url: project.githubUrl, icon: 'fab fa-github' }
    );
  }
  if (project.videoUrl) links.push({ label: project.videoLabel || 'Watch video', url: project.videoUrl, icon: 'fas fa-play' });
  (project.links || [])
    .filter((link) => link && link.url)
    .forEach((link) => links.push({ label: link.label, url: link.url, icon: link.icon || 'fas fa-link' }));
  return links;
}

// YouTube watch/short links -> privacy-friendly embed URL; null for anything else.
export function youtubeEmbedUrl(url) {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
  return match ? `https://www.youtube-nocookie.com/embed/${match[1]}` : null;
}
