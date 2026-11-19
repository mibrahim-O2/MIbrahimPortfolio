import { personalInfo } from '@/data/personal';
import { educationData } from '@/data/education';
import { SITE_URL } from '@/utils/siteUrl';
import { absoluteUrl } from '@/utils/seo';

// schema.org structured data (JSON-LD). Every value here must match what the page visibly says:
// no ratings, no invented facts. One Person node (@id PERSON_ID) is shared by every page.

export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

const sameAs = personalInfo.socialLinks.map((social) => social.url).filter((url) => url.startsWith('http'));
const university = educationData.find((entry) => entry.id === 'bscs');

export function personNode() {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: personalInfo.name,
    url: SITE_URL,
    jobTitle: personalInfo.title,
    description: personalInfo.intro,
    image: absoluteUrl('/images/profile/portrait.jpg'),
    email: `mailto:${personalInfo.email}`,
    address: { '@type': 'PostalAddress', addressCountry: 'PK' },
    ...(university ? { alumniOf: { '@type': 'CollegeOrUniversity', name: 'University of Sindh' } } : {}),
    sameAs,
    knowsAbout: [
      'Agentic AI',
      'AI agents',
      'Multi-agent systems',
      'AI voice agents',
      'Business process automation',
      'Model Context Protocol (MCP)',
      'Retrieval-augmented generation (RAG)',
      'Human-in-the-loop approval',
      'Security testing automation',
      'Python',
      'FastAPI',
      'Next.js',
      'React'
    ]
  };
}

export function websiteNode() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: personalInfo.name,
    alternateName: `${personalInfo.name}, ${personalInfo.title}`,
    publisher: { '@id': PERSON_ID },
    inLanguage: 'en'
  };
}

// Homepage and /about: a profile page about the person
export function profilePageGraph(path = '/') {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      websiteNode(),
      personNode(),
      {
        '@type': 'ProfilePage',
        '@id': `${absoluteUrl(path)}#webpage`,
        url: absoluteUrl(path),
        name: `${personalInfo.name} | ${personalInfo.title}`,
        isPartOf: { '@id': WEBSITE_ID },
        mainEntity: { '@id': PERSON_ID },
        about: { '@id': PERSON_ID },
        inLanguage: 'en'
      }
    ]
  };
}

export function breadcrumbNode(items) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  };
}

// Case study: the page, its breadcrumb, and the project as source code (and a video where one exists)
export function projectGraph(project) {
  const url = absoluteUrl(`/projects/${project.id}`);
  const isPrivate = project.githubPrivate;
  const work = {
    '@type': project.githubUrl && !isPrivate ? 'SoftwareSourceCode' : 'CreativeWork',
    '@id': `${url}#project`,
    name: project.title,
    description: project.subtitle || project.description,
    url,
    creator: { '@id': PERSON_ID },
    keywords: (project.tags || []).join(', '),
    ...(project.image && project.image.startsWith('/') ? { image: absoluteUrl(project.image) } : {}),
    ...(project.githubUrl && !isPrivate ? { codeRepository: project.githubUrl, programmingLanguage: project.languages || undefined } : {}),
    ...(project.demoUrl ? { sameAs: [project.demoUrl] } : {})
  };
  const graph = [
    {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: `${project.title} | Case Study`,
      isPartOf: { '@id': WEBSITE_ID },
      about: { '@id': `${url}#project` },
      author: { '@id': PERSON_ID },
      inLanguage: 'en'
    },
    breadcrumbNode([
      { name: 'Home', path: '/' },
      { name: 'Projects', path: '/projects' },
      { name: project.title, path: `/projects/${project.id}` }
    ]),
    work
  ];
  return { '@context': 'https://schema.org', '@graph': graph };
}

export function jsonLdScript(data) {
  return { __html: JSON.stringify(data).replace(/</g, '\\u003c') };
}
