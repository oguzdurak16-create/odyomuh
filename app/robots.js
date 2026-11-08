import { baseUrl } from './site-data';

const siteUrl = baseUrl || 'https://www.odyomuh.net';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      // OpenAI's search crawler may index public research pages for ChatGPT Search.
      // The private API paths remain excluded, just as they are for all crawlers.
      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: [`${siteUrl}/sitemap.xml`, `${siteUrl}/news-sitemap.xml`],
    host: siteUrl,
  };
}
