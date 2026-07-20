import { posts, normalizeSearchText } from '../../site-data';
import { dailyTurkishPosts } from '../../../data/daily-2026-07-20';
import PostCard from '../../../components/PostCard';

export const metadata = {
  title: 'Arama',
  description: 'ODYOMUH arşivinde tarih, arkeoloji, mitoloji ve uygarlık yazılarını ara.',
  robots: { index: false, follow: true },
};

function uniquePosts(items) {
  const seen = new Set();
  return items.filter((post) => {
    const key = post.id || post.primaryPath;
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export default async function SearchPage({ searchParams }) {
  const resolved = await searchParams;
  const q = String(resolved?.q || '').trim();
  const normalized = normalizeSearchText(q);
  const allPosts = uniquePosts([...dailyTurkishPosts, ...posts()]).sort((a, b) => (b.published || '').localeCompare(a.published || ''));
  const results = q
    ? allPosts.filter((post) => normalizeSearchText(`${post.title} ${post.description} ${(post.labels || []).join(' ')} ${(post.searchAliases || []).join(' ')} ${String(post.contentHtml || '').replace(/<[^>]+>/g, ' ')}`).includes(normalized))
    : allPosts.slice(0, 12);

  return (
    <div className="search-page-shell">
      <header className="modern-page-hero">
        <p className="eyebrow">ODYOMUH arama</p>
        <h1>{q ? `“${q}” için sonuçlar` : 'Arşivde tam olarak ne arıyorsun?'}</h1>
        <p>{q ? `${results.length} yazı bulundu.` : 'Bir uygarlık, kişi, savaş, metin, kazı alanı veya güncel olay yaz.'}</p>
        <div className="modern-page-tools">
          <form action="/search" method="get" role="search">
            <input name="q" type="search" defaultValue={q} aria-label="Arama kelimesi" placeholder="Örnek: Anunnakiler, Roma, İran, Göbekli Tepe..." autoComplete="off" />
            <button type="submit">Ara</button>
          </form>
        </div>
      </header>
      <section className="search-results-grid" aria-label="Arama sonuçları">
        {results.length ? results.map((post) => <PostCard post={post} key={post.id} />) : <p className="empty-state">Bu aramayla eşleşen yazı bulunamadı.</p>}
      </section>
    </div>
  );
}
