import { baseUrl, site, generatedArt } from '../../site-data';
import { allTurkishPosts } from '../../../lib/content-collections';
import PostCard from '../../../components/PostCard';

const siteUrl = baseUrl || 'https://www.odyomuh.net';

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

export default function ArchivePage() {
  const allPosts = allTurkishPosts();
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'ODYOMUH Tüm Yazılar',
    description: metadata.description,
    url: `${siteUrl}/arsiv`,
    inLanguage: 'tr-TR',
    isPartOf: { '@type': 'WebSite', name: site.name, url: siteUrl },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: allPosts.length,
      itemListElement: allPosts.slice(0, 100).map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
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
