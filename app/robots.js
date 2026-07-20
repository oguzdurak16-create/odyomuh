import { baseUrl } from './site-data';

const siteUrl = baseUrl || 'https://www.odyomuh.net';

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/search', '/search/', '/en/search', '/en/search/', '/api/'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
