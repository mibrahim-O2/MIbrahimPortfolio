import { personalInfo } from '@/data/personal';
import { publishedProjects } from '@/data/projects';
import { servicesData } from '@/data/services';
import { SITE_URL } from '@/utils/siteUrl';

// /llms.txt (format: llmstxt.org). A plain-text summary of the site for AI tools, generated from the
// same data files as the pages, so it never goes out of date. This is an optional extra: no major
// search or AI provider has confirmed using it, and it is not expected to change rankings or citations.
export const dynamic = 'force-static';

export function GET() {
  const social = personalInfo.socialLinks.filter((link) => link.url.startsWith('http'));
  const lines = [
    `# ${personalInfo.name}`,
    '',
    `> ${personalInfo.name} is an ${personalInfo.title} based in Pakistan and a BS Computer Science student at IMCS, University of Sindh. He builds AI agents, AI voice agents and business automation in which every risky action is approved by a person, verified by code or audited, plus full-stack web products for real businesses.`,
    '',
    `Contact: ${personalInfo.email}. Profiles: ${social.map((link) => `${link.name} ${link.url}`).join(', ')}.`,
    '',
    '## Services',
    '',
    ...servicesData.map((service) => `- [${service.name}](${SITE_URL}/services/${service.slug}): ${service.short}`),
    '',
    '## Projects',
    '',
    ...publishedProjects.map(
      (project) => `- [${project.title}](${SITE_URL}/projects/${project.id}): ${project.subtitle}${project.highlight ? ` (${project.highlight})` : ''}`
    ),
    '',
    '## Optional',
    '',
    `- [About](${SITE_URL}/about): background and how he works`,
    `- [Skills](${SITE_URL}/skills): tools used in real projects`,
    `- [Education](${SITE_URL}/education) and [Certifications](${SITE_URL}/certificates)`,
    ''
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
