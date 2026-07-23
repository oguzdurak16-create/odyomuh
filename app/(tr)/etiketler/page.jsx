import { generatedArt, baseUrl, site } from '../../site-data';
import { allTurkishPosts, turkishLabelStats } from '../../../lib/content-collections';
import TagsIndex from '../../../components/TagsIndex';

const siteUrl = baseUrl || 'https://www.odyomuh.net';
const CURATED_LABELS = [
  'Arkeoloji',
  'Antik Uygarlıklar',
  'Anadolu Tarihi',
  'Antik Roma',
  'Mezopotamya',
  'Mitoloji',
  'Antik Teknoloji',
  'Çözülmemiş Gizemler',
];

export const metadata = {
  title: 'Konular | Tarih ve Arkeoloji Arşivi',
  description: 'ODYOMUH içeriklerini arkeoloji, uygarlıklar, dönemler, mitoloji ve tarihsel araştırma konularına göre keşfedin.',
  alternates: { canonical: '/etiketler' },
  openGraph: {
    title: 'ODYOMUH Konu İndeksi',
    description: 'Tarih arşivindeki temel konuları ve birden fazla araştırma içeren etiketleri keşfedin.',
    url: '/etiketler',
    images: [{ url: generatedArt.cuneiformGlobal, width: 1672, height: 941, alt: 'Antik yazılar ve tarih konuları' }],
  },
};

export default function TagsPage() {
  const allPosts = allTurkishPosts();
  const tagStats = turkishLabelStats();
  const statsByLabel = new Map(tagStats.map((item) => [item.label, item]));
  const curated = CURATED_LABELS.map((label) => statsByLabel.get(label)).filter(Boolean);
  const usefulTags = tagStats
    .filter((item) => item.count >= 2)
    .sort((a, b) => a.label.localeCompare(b.label, 'tr'));

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'ODYOMUH Konu İndeksi',
    description: metadata.description,
    url: `${siteUrl}/etiketler`,
    inLanguage: 'tr-TR',
    isPartOf: { '@type': 'WebSite', name: site.name, url: siteUrl },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: usefulTags.length,
      itemListElement: usefulTags.map((item, index) => ({
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
          <h1>Arşivi temel konular üzerinden keşfedin.</h1>
          <p>Dağınık ve tek kullanımlık etiketler yerine, birden fazla araştırma içeren anlamlı konu başlıkları öne çıkarılır.</p>
          <div className="tags-page-stats">
            <span><strong>{usefulTags.length}</strong><small>aktif konu</small></span>
            <span><strong>{allPosts.length}</strong><small>yazı</small></span>
            <span><strong>{curated.length}</strong><small>ana başlık</small></span>
          </div>
        </div>
        <div className="tags-page-hero-visual">
          <img src={generatedArt.cuneiformGlobal} alt="Çivi yazılı tabletler ve tarih araştırması" width="1672" height="941" fetchPriority="high" decoding="async" />
          <div className="tags-page-hero-shade" />
          <div className="tags-page-popular">
            <span>Temel araştırma alanları</span>
            <div>{curated.slice(0, 5).map((item) => <a key={item.label} href={`/label/${encodeURIComponent(item.label)}`}>{item.label}<small>{item.count}</small></a>)}</div>
          </div>
        </div>
      </section>

      <section className="tags-index-panel">
        <div className="tags-index-panel-heading">
          <div>
            <p className="eyebrow">Öne çıkan konular</p>
            <h2>Doğrudan başla</h2>
          </div>
          <a href="/arsiv">Yazı arşivine geç →</a>
        </div>

        <div className="curated-topic-grid">
          {curated.map((item) => (
            <a className="curated-topic-card" href={`/label/${encodeURIComponent(item.label)}`} key={item.label}>
              <strong>{item.label}</strong>
              <span>{item.count} yazı →</span>
            </a>
          ))}
        </div>

        <div className="tags-index-panel-heading">
          <div>
            <p className="eyebrow">A–Z İndeks</p>
            <h2>Diğer aktif konular</h2>
          </div>
        </div>
        <p className="tags-index-secondary-note">Yalnızca en az iki yazıda kullanılan konu başlıkları listelenir. Tek bir yazıya ait ayrıntılı etiketler arşiv aramasından bulunabilir.</p>
        <TagsIndex items={usefulTags} />
      </section>
    </div>
  );
}
