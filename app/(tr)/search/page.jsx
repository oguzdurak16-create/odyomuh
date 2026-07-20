import { posts, labels, site, normalizeSearchText } from '../../site-data';
import PostCard from '../../../components/PostCard';
import Sidebar from '../../../components/Sidebar';

export const metadata = {
  title: 'Arama',
  description: 'ODYOMUH arşivinde tarih, arkeoloji, mitoloji ve uygarlık yazılarını ara.',
  robots: { index: false, follow: true },
};

export default async function SearchPage({ searchParams }) {
  const resolved = await searchParams;
  const q = String(resolved?.q || '').trim();
  const normalized = normalizeSearchText(q);
  const allPosts = posts();
  const results = q
    ? allPosts.filter((post) => normalizeSearchText(`${post.title} ${post.description} ${(post.labels || []).join(' ')} ${(post.searchAliases || []).join(' ')} ${String(post.contentHtml || '').replace(/<[^>]+>/g, ' ')}`).includes(normalized))
    : allPosts.slice(0, 12);

  return (
    <div className="main-wrapper">
      <section>
        <section className="hero small">
          <p className="eyebrow">Arama</p>
          <h1>{q ? `“${q}”` : 'Sitede Ara'}</h1>
          <form className="search-page-form" action="/search" method="get" role="search">
            <input name="q" type="search" defaultValue={q} aria-label="Arama kelimesi" placeholder="Aranacak kelime..." autoComplete="off" />
            <button type="submit">Ara</button>
          </form>
          {q ? <p>{results.length} sonuç bulundu.</p> : <p>Türkçe karakter kullanmadan da arayabilirsin. Aşağıda son 12 yazı gösteriliyor.</p>}
        </section>
        <section className="blog-posts">
          {results.length ? results.map((post) => <PostCard post={post} key={post.id} />) : <p className="empty-state">Bu aramayla eşleşen yazı bulunamadı.</p>}
        </section>
      </section>
      <Sidebar posts={allPosts} labels={labels()} site={site} />
    </div>
  );
}
