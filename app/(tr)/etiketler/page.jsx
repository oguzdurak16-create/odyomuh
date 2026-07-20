import { generatedArt, baseUrl, site } from '../../site-data';
import { allTurkishPosts, turkishLabelStats } from '../../../lib/content-collections';
import TagsIndex from '../../../components/TagsIndex';

const siteUrl = baseUrl || 'https://www.odyomuh.net';

export const metadata = {
  title: 'Etiketler | Konulara Göre Tarih Arşivi',
  description: 'ODYOMUH içeriklerini uygarlık, dönem, kişi, olay, arkeoloji, mitoloji ve tarih etiketlerine göre keşfedin.',
  alternates: { canonical: '/etiketler' },
  openGraph: {
    title: 'ODYOMUH Etiketler',
    description: 'Tarih arşivindeki bütün konuları alfabetik ve popülerlik sırasıyla keşfedin.',
    url: '/etiketler',
    images: [{ url: generatedArt.cuneiformGlobal, width: 1672, height: 941, alt: 'Antik yazılar ve tarih etiketleri' }],
  },
};

export default function TagsPage() {
  const allPosts = allTurkishPosts();
  const tagStats = turkishLabelStats();
  const popular = tagStats.slice(0, 8);
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'ODYOMUH Etiket İndeksi',
    description: metadata.description,
    url: `${siteUrl}/etiketler`,
    inLanguage: 'tr-TR',
    isPartOf: { '@type': 'WebSite', name: site.name, url: siteUrl },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: tagStats.length,
      itemListElement: tagStats.slice(0, 100).map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.label,
        url: `${siteUrl}/label/${encodeURIComponent(item.label)}`,
      })),
    },
  };

  return (
    <div className="tags-page-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="tags-page-hero">
        <div className="tags-page-hero-copy">
          <p className="eyebrow">Konu İndeksi</p>
          <h1>Arşivin bütün etiketleri tek sayfada.</h1>
          <p>Uygarlık, dönem, kişi, savaş, arkeoloji, mitoloji ve antik teknoloji başlıklarını alfabetik olarak veya arama kutusuyla incele.</p>
          <div className="tags-page-stats">
            <span><strong>{tagStats.length}</strong><small>etiket</small></span>
            <span><strong>{allPosts.length}</strong><small>yazı</small></span>
            <span><strong>{tagStats.reduce((sum, item) => sum + item.count, 0)}</strong><small>etiket bağlantısı</small></span>
          </div>
        </div>
        <div className="tags-page-hero-visual">
          <img src={generatedArt.cuneiformGlobal} alt="Çivi yazılı tabletler ve tarih araştırması" width="1672" height="941" fetchPriority="high" decoding="async" />
          <div className="tags-page-hero-shade" />
          <div className="tags-page-popular">
            <span>En çok kullanılanlar</span>
            <div>{popular.map((item) => <a key={item.label} href={`/label/${encodeURIComponent(item.label)}`}>{item.label}<small>{item.count}</small></a>)}</div>
          </div>
        </div>
      </section>

      <section className="tags-index-panel">
        <div className="tags-index-panel-heading">
          <div>
            <p className="eyebrow">A–Z İndeks</p>
            <h2>Etiketleri keşfet</h2>
          </div>
          <a href="/arsiv">Yazı arşivine geç →</a>
        </div>
        <TagsIndex items={[...tagStats].sort((a, b) => a.label.localeCompare(b.label, 'tr'))} />
      </section>
    </div>
  );
}
