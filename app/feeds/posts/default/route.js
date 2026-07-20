import { baseUrl } from '../../../site-data';
import { allTurkishPosts } from '../../../../lib/content-collections';

function stripHtml(value = '') {
  return String(value).replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function toEntry(post) {
  const url = `${baseUrl || ''}${post.primaryPath}`;
  return {
    id: { $t: post.id },
    published: { $t: post.published || '' },
    updated: { $t: post.updated || post.published || '' },
    title: { $t: post.title || '' },
    summary: { $t: post.description || stripHtml(post.contentHtml).slice(0, 220) },
    content: { $t: post.contentHtml || '' },
    link: [{ rel: 'alternate', type: 'text/html', href: url }],
    category: (post.labels || []).map((label) => ({ term: label })),
    ...(post.image ? { media$thumbnail: { url: post.image } } : {}),
  };
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const max = Number(searchParams.get('max-results') || 50);
  const entries = allTurkishPosts().slice(0, Number.isFinite(max) ? max : 50).map(toEntry);
  return Response.json({ feed: { title: { $t: 'ODYOMUH' }, entry: entries } }, {
    headers: { 'Cache-Control': 'public, max-age=900, s-maxage=900' },
  });
}
