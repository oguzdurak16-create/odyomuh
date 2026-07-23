import { baseUrl, site, generatedArt } from '../../site-data';
import { allTurkishPosts } from '../../../lib/content-collections';
import PostCard from '../../../components/PostCard';

const siteUrl = baseUrl || 'https://www.odyomuh.net';
const PAGE_SIZE = 24;

export const metadata = {
  title: 'Tüm Yazılar | Tarih ve Arkeoloji Arşivi',
  description: 'ODYOMUH tarih, arkeoloji, mitoloji, antik teknoloji ve güncel tarihsel arka plan arşivindeki bütün yazılar.',
  alternates: { canonical: '/arsiv' },
  openGraph: {
    title: 'ODYOMUH Tüm Yazılar',
    description: 'Kaynak odaklı tarih ve arkeoloji dosyalarının tamamını en yeni yayından başlayarak inceleyin.',
    url: '/arsiv',
    images: [{ url: generatedArt.ancientLibraryDesk, width: 1672, height: 941, alt: 'ODYOMUH tarih arşivi' }],
  },
};

function archiveHref(page) {
  return page <= 1 ? '/arsiv' : `/arsiv?page=${page}`;
}

export default async function ArchivePage({ searchParams }) {
  const params = await searchParams;
  const allPosts = allTurkishPosts();
  const pageCount = Math.max(1, Math.ceil(allPosts.length / PAGE_SIZE));
  const requestedPage = Number.parseInt(params?.page || '1', 10);
  const currentPage = Number.isFinite(requestedPage) ? Math.min(Math.max(requestedPage, 1), pageCount) : 1;
  const start = (currentPage - 1) * PAGE_SIZE;
  const visiblePosts = allPosts.slice(start, start + PAGE_SIZE);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'ODYOMUH Tüm Yazılar',
    description: metadata.description,
    url: `${siteUrl}${archiveHref(currentPage)}`,
    inLanguage: 'tr-TR',
    isPartOf: { '@type': 'WebSite', name: site.name, url: siteUrl },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: visiblePosts.length,
      itemListElement: visiblePosts.map((post, index) => ({
        '@type': 'ListItem',
        position: start + index + 1,
        name: post.title,
        url: `${siteUrl}${post.primaryPath}`,
      })),
    },
  };

  return (
    <div className="archive-page-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <header className="modern-page-hero">
        <p className="eyebrow">ODYOMUH araştırma arşivi</p>
        <h1>Tüm yazılar</h1>
        <p>{allPosts.length} tarih, arkeoloji, mitoloji ve güncel arka plan dosyası. Sayfa başına {PAGE_SIZE} yazı gösterilir.</p>
        <div className="modern-page-tools">
          <form action="/search" method="get" role="search">
            <input name="q" type="search" placeholder="Kişi, olay veya uygarlık ara..." aria-label="Arşivde ara" />
            <button type="submit">Ara</button>
          </form>
          <a href="/etiketler">Konulara göre keşfet</a>
        </div>
      </header>

      <p className="archive-page-summary">{start + 1}–{Math.min(start + PAGE_SIZE, allPosts.length)} arasındaki yazılar gösteriliyor.</p>

      <section className="archive-post-list" aria-label="ODYOMUH yazıları">
        {visiblePosts.map((post) => <PostCard post={post} key={post.id || post.primaryPath} />)}
      </section>

      {pageCount > 1 ? (
        <nav className="archive-pagination" aria-label="Arşiv sayfaları">
          {currentPage > 1 ? <a href={archiveHref(currentPage - 1)} rel="prev">← Önceki</a> : <span className="is-disabled">← Önceki</span>}
          {Array.from({ length: pageCount }, (_, index) => index + 1).map((page) => (
            page === currentPage
              ? <span className="is-current" aria-current="page" key={page}>{page}</span>
              : <a href={archiveHref(page)} key={page}>{page}</a>
          ))}
          {currentPage < pageCount ? <a href={archiveHref(currentPage + 1)} rel="next">Sonraki →</a> : <span className="is-disabled">Sonraki →</span>}
        </nav>
      ) : null}
    </div>
  );
}
