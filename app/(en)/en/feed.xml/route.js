import { englishPosts } from '../../../../data/en-posts';
import { baseUrl } from '../../../site-data';

const siteUrl = baseUrl || 'https://www.odyomuh.net';
const escapeXml = (value = '') => String(value).replace(/[<>&'\"]/g, (char) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[char]));

export async function GET() {
  const items = englishPosts.slice(0, 30).map((post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${siteUrl}${post.primaryPath}</link>
      <guid isPermaLink="true">${siteUrl}${post.primaryPath}</guid>
      <pubDate>${new Date(post.published).toUTCString()}</pubDate>
      <description>${escapeXml(post.description)}</description>
    </item>`).join('');
  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0"><channel>
    <title>ODYOMUH English</title>
    <link>${siteUrl}/en</link>
    <description>History, archaeology and ancient mysteries explained through evidence.</description>
    <language>en</language>${items}
  </channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
}
