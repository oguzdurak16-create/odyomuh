import PostCard from '../../../../components/PostCard';
import { generatedArt, baseUrl, site } from '../../../site-data';
import { allTurkishPosts, latestDate } from '../../../../lib/content-collections';

const siteUrl = baseUrl || 'https://www.odyomuh.net';
const canonicalPath = '/gundem/orta-dogu';

export const metadata = {
  title: 'Orta Doğu Gündemi: İran, ABD, İsrail, Husiler ve Tarihsel Arka Plan',
  description: 'İran–ABD ve İran–İsrail çatışması, Husiler, Hürmüz, Kızıldeniz, Şiilik, Sünnilik, Yahudilik ve Filistin meselesi için kaynak odaklı güncel dosyalar.',
  keywords: [
    'İran Amerika savaşı', 'İran İsrail savaşı', 'Husiler kimdir', 'Hürmüz Boğazı',
    'İranlı Şiiler', 'Şii Sünni farkı', 'Yahudilik İsrail Siyonizm', 'İsrail Filistin sorunu',
  ],
  alternates: { canonical: canonicalPath, languages: { 'tr-TR': canonicalPath, en: '/en/topic/middle-east', 'x-default': '/en/topic/middle-east' } },
  openGraph: {
    type: 'website',
    title: 'Orta Doğu Gündemi | ODYOMUH',
    description: 'Güncel çatışmaları tarih, din, devlet ve stratejik geçitler üzerinden açıklayan tarafsız dosya merkezi.',
    url: canonicalPath,
    images: [{ url: generatedArt.middleEastHub, width: 1672, height: 941, alt: 'İran, İsrail ve Orta Doğu gündemi' }],
  },
  twitter: { card: 'summary_large_image', title: 'Orta Doğu Gündemi | ODYOMUH', description: 'Kaynak odaklı güncel dosyalar ve tarihsel arka plan.', images: [generatedArt.middleEastHub] },
};

const queries = [
  ['İran–ABD', '/search?q=iran%20amerika'],
  ['İran–İsrail', '/search?q=iran%20israil'],
  ['Husiler', '/search?q=husiler'],
  ['Hürmüz', '/search?q=hurmuz'],
  ['Şii–Sünni', '/search?q=sii%20sunni'],
  ['Yahudilik ve İsrail', '/search?q=yahudilik%20israil'],
  ['Filistin', '/search?q=filistin'],
  ['Nükleer Program', '/search?q=iran%20nukleer'],
];

function formatDate(value) {
  if (!value) return 'Güncel';
  return new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(value));
}

export default function MiddleEastHubPage() {
  const middleEastPosts = allTurkishPosts().filter((post) =>
    String(post.id || '').startsWith('tr-middle-east-') ||
    post.articleSection === 'Orta Doğu Gündemi' ||
    (post.labels || []).some((label) => ['Orta Doğu Gündemi', 'İran', 'Husiler', 'İsrail Filistin Sorunu'].includes(label))
  );
  const lastReviewed = latestDate(middleEastPosts);

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Orta Doğu Gündemi',
    description: metadata.description,
    url: `${siteUrl}${canonicalPath}`,
    inLanguage: 'tr-TR',
    dateModified: lastReviewed || undefined,
    isPartOf: { '@type': 'WebSite', '@id': `${siteUrl}/#website`, name: site.name, url: siteUrl },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: middleEastPosts.length,
      itemListElement: middleEastPosts.slice(0, 30).map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${siteUrl}${post.primaryPath}`,
        name: post.title,
      })),
    },
  };

  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      ['İran ile ABD neden savaşıyor?', 'Nükleer program, yaptırımlar, Hürmüz Boğazı, bölgesel üsler ve uzun süren güvenlik rekabeti aynı krizde birleşiyor.'],
      ['Husiler İran’ın ordusu mu?', 'Hayır. İran tarafından desteklenen ancak Yemen’de kendi siyasi ve askerî yapısı bulunan Ensarullah hareketidir.'],
      ['İranlıların tamamı Şii mi?', 'Hayır. Büyük çoğunluk Şii olsa da Sünni Müslümanlar ve farklı dinî topluluklar da bulunur.'],
      ['Yahudilik, İsrail ve Siyonizm aynı mı?', 'Hayır. Yahudilik din ve kültür geleneği, İsrail devlet, Siyonizm ise farklı akımları bulunan siyasi-ulusal hareketler ailesidir.'],
    ].map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })),
  };

  return (
    <div className="middle-east-hub">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />

      <section className="middle-east-hub-hero">
        <img src={generatedArt.middleEastHub} alt="Orta Doğu gündemi" width="1672" height="941" fetchPriority="high" decoding="async" />
        <div className="middle-east-hub-overlay" />
        <div className="middle-east-hub-copy">
          <p className="eyebrow">Güncel Gündem · Tarihsel Arka Plan</p>
          <h1>İran, ABD, İsrail, Husiler ve Orta Doğu’yu kavramlarla değil kanıtlarla oku.</h1>
          <p>Son gelişmeler hızla değişiyor. Bu merkez, günlük haberleri tarihsel kökler, dinî çeşitlilik, nükleer teknoloji ve stratejik deniz yollarıyla birlikte açıklar.</p>
          <div className="middle-east-hub-actions">
            <a className="home-primary-action" href="#gundem-dosyalari">Dosyaları incele</a>
            <a className="home-secondary-action" href="/en/topic/middle-east">English edition</a>
          </div>
        </div>
      </section>

      <section className="middle-east-update-note">
        <div><strong>Son güncelleme</strong><time dateTime={lastReviewed || undefined}>{formatDate(lastReviewed)}</time></div>
        <p>Askerî ve diplomatik durum değişebilir. Devletler, hükümetler, halklar ve dinî topluluklar birbirine eşitlenmeden yazılır.</p>
      </section>

      <section className="middle-east-query-section" aria-label="Popüler Orta Doğu aramaları">
        <div className="home-section-heading">
          <div><p className="eyebrow">Hızlı Arama</p><h2>En çok sorulan başlıklar</h2></div>
          <p>Aynı konuya farklı kelimelerle ulaşan okurlar için doğal arama yolları.</p>
        </div>
        <div className="middle-east-query-grid">
          {queries.map(([label, href]) => <a key={label} href={href}>{label}<span>→</span></a>)}
        </div>
      </section>

      <section id="gundem-dosyalari" className="middle-east-posts-section">
        <div className="home-section-heading">
          <div><p className="eyebrow">Kaynak Odaklı Dosyalar</p><h2>Güncel olaylar ve kalıcı açıklayıcı rehberler</h2></div>
          <a className="section-text-link" href="/arsiv">Tüm arşiv →</a>
        </div>
        <div className="home-latest-grid">
          {middleEastPosts.map((post) => <PostCard post={post} key={post.id} />)}
        </div>
      </section>

      <section className="middle-east-editorial-box">
        <div>
          <p className="eyebrow">Editoryal İlke</p>
          <h2>Hükümet eleştirisi, halk veya din düşmanlığına dönüştürülmez.</h2>
        </div>
        <p>İran devleti bütün İranlıları veya Şiileri; İsrail hükümeti bütün Yahudileri; Hamas, Hizbullah veya Husiler bütün Müslümanları temsil etmez. Sorumlu aktör açıkça adlandırılır.</p>
      </section>
    </div>
  );
}
