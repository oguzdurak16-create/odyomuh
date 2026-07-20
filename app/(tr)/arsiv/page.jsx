import { posts } from '../../site-data';
import { dailyTurkishPosts } from '../../../data/daily-2026-07-20';
import PostCard from '../../../components/PostCard';

export const metadata = {
  title: 'Tüm Yazılar',
  description: 'ODYOMUH tarih, arkeoloji, mitoloji ve kadim uygarlık arşivindeki tüm yazılar.',
  alternates: { canonical: '/arsiv' },
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

export default function ArchivePage() {
  const allPosts = uniquePosts([...dailyTurkishPosts, ...posts()]).sort((a, b) => (b.published || '').localeCompare(a.published || ''));
  return (
    <div className="archive-page-shell">
      <header className="modern-page-hero">
        <p className="eyebrow">ODYOMUH araştırma arşivi</p>
        <h1>Tüm yazılar</h1>
        <p>{allPosts.length} kaynak odaklı tarih, arkeoloji, mitoloji ve güncel arka plan dosyası; en yeni yayından başlayarak tek akışta.</p>
        <div className="modern-page-tools">
          <form action="/search" method="get" role="search">
            <input name="q" type="search" placeholder="Arşivde kişi, olay veya uygarlık ara..." aria-label="Arşivde ara" />
            <button type="submit">Arşivde ara</button>
          </form>
          <a href="/etiketler">Etiket indeksini aç</a>
        </div>
      </header>
      <section className="archive-post-list" aria-label="Tüm ODYOMUH yazıları">
        {allPosts.map((post) => <PostCard post={post} key={post.id} />)}
      </section>
    </div>
  );
}
