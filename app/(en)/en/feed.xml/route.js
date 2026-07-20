import { englishPosts } from '../../../../data/en-posts';
import { dailyEnglishPosts } from '../../../../data/daily-2026-07-20';
import { baseUrl } from '../../../site-data';

const siteUrl = baseUrl || 'https://www.odyomuh.net';
const escapeXml = (value = '') => String(value).replace(/[<>&'\"]/g, (char) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[char]));

function combinedPosts() {
  const seen = new Set();
  return [...dailyEnglishPosts, ...englishPosts]
    .filter((post) => {
      const key = post.id || post.primaryPath;
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a, b) => (b.published || '').localeCompare(a.published || ''));
}

export async function GET() {
  const items = combinedPosts().slice(0, 30).map((post) => `
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
