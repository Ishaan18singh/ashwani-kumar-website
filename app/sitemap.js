import { SITE_DATA } from '@/lib/data';
import { slugify } from '@/lib/utils';

const SITE_URL = 'https://www.ashwanikumarias.com';

const ROUTES = ['/', '/about', '/timeline', '/projects', '/awards', '/publications', '/ias-aspirants', '/gallery', '/contact'];

export default function sitemap() {
  const staticEntries = ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date()
  }));

  const projectEntries = SITE_DATA.projects.map((project) => ({
    url: `${SITE_URL}/projects/${slugify(project.title)}`,
    lastModified: new Date()
  }));

  return [...staticEntries, ...projectEntries];
}
