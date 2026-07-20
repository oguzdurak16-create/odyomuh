import { baseUrl } from '../site-data';
import { allTurkishPosts } from '../../lib/content-collections';

const siteUrl = baseUrl || 'https://www.odyomuh.net';
const escapeXml = (value = '') => String(value).replace(/[<>&'\"]/g, (char) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '\"': '&quot;' }[char]));

export async function GET() {
  const items = allTurkishPosts().slice(0, 40).map((post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(`${siteUrl}${post.primaryPath}`)}</link>
      <guid isPermaLink="true">${escapeXml(`${siteUrl}${post.primaryPath}`)}</guid>
      <pubDate>${new Date(post.published).toUTCString()}</pubDate>
      <description>${escapeXml(post.description)}</description>
      ${post.image ? `<enclosure url="${escapeXml(`${siteUrl}${post.image}`)}" type="image/webp" />` : ''}
    </item>`).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>ODYOMUH</title>
    <link>${siteUrl}</link>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Tarih, arkeoloji, mitoloji ve kadim uygarlıklar üzerine kaynak odaklı içerikler.</description>
    <language>tr-TR</language>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
