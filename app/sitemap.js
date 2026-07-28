const SITE_URL = 'https://www.ashwanikumarias.com';

const ROUTES = ['/', '/about', '/timeline', '/projects', '/awards', '/publications', '/ias-aspirants', '/gallery', '/contact'];

export default function sitemap() {
  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date()
  }));
}
