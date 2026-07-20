import { baseUrl } from '../site-data';
import { allTurkishPosts, allEnglishPosts } from '../../lib/content-collections';

const siteUrl = baseUrl || 'https://www.odyomuh.net';
const escapeXml = (value = '') => String(value).replace(/[<>&'\"]/g, (char) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '\"': '&quot;' }[char]));

function recentNewsPosts() {
  const cutoff = Date.now() - (2 * 24 * 60 * 60 * 1000);
  return [
    ...allTurkishPosts().map((post) => ({ ...post, language: 'tr' })),
    ...allEnglishPosts().map((post) => ({ ...post, language: 'en' })),
  ]
    .filter((post) => post.newsArticle && new Date(post.published || post.updated || 0).getTime() >= cutoff)
    .sort((a, b) => String(b.published || '').localeCompare(String(a.published || '')));
}

export async function GET() {
  const urls = recentNewsPosts().map((post) => `
  <url>
    <loc>${escapeXml(`${siteUrl}${post.primaryPath}`)}</loc>
    <news:news>
      <news:publication>
        <news:name>ODYOMUH</news:name>
        <news:language>${post.language}</news:language>
      </news:publication>
      <news:publication_date>${escapeXml(new Date(post.published).toISOString())}</news:publication_date>
      <news:title>${escapeXml(post.title)}</news:title>
    </news:news>
  </url>`).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=900, s-maxage=900',
    },
  });
}
