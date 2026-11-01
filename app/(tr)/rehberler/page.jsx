import { allTurkishPosts } from '../../../lib/content-collections';
import { evergreenGuides } from '../../../lib/evergreen';

const title = 'Tarih ve Arkeoloji Rehberleri';
const description = 'Orun ve ülüş, Sümerler, Göbekli Tepe, Çatalhöyük ve antik teknoloji hakkında kalıcı araştırma rehberleri. Kısa cevaptan kaynaklara ve karşılaştırmalara ilerleyin.';

export const metadata = {
  title,
  description,
  alternates: { canonical: '/rehberler' },
  openGraph: { type: 'website', title, description, url: '/rehberler' },
};

export default function GuidesPage() {
  const guides = evergreenGuides(allTurkishPosts());
  const schema = {
    '@context': 'https://schema.org', '@type': 'CollectionPage',
    name: title, description, url: 'https://www.odyomuh.net/rehberler',
    mainEntity: { '@type': 'ItemList', itemListElement: guides.map((post, i) => ({
      '@type': 'ListItem', position: i + 1, name: post.title,
      url: `https://www.odyomuh.net${post.primaryPath}`,
    })) },
  };
  return <div className="clean-home">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <section className="clean-section">
      <span className="clean-kicker">ODYOMUH araştırma kütüphanesi</span>
      <h1>Tarih ve arkeoloji rehberleri</h1>
      <p>Bir haberi takip etmekten önce temel soruyu anlayın. Bu seçki tanımlar, tarihsel kanıtlar, karşılaştırmalar ve kaynaklarla tekrar başvurabileceğiniz dosyaları bir araya getirir.</p>
      <p>Kalıcı bir konu, değişmez bilgi anlamına gelmez. Yeni kazı bulguları ve yayınlar yorumları değiştirebilir; her yazının kaynaklarını ve yayın tarihini birlikte değerlendirin.</p>
      <div className="clean-article-grid">{guides.map((post) => <article className="clean-article-card" key={post.primaryPath}>
        <div className="clean-article-body"><h2><a href={post.primaryPath}>{post.title}</a></h2><p>{post.description}</p><a className="clean-text-link" href={post.primaryPath}>Açıklamayı ve kaynakları incele →</a></div>
      </article>)}</div>
      <p><a href="/p/tarih-kronolojisi.html">Tarih kronolojisi</a> · <a href="/p/ders-notlari.html">Ders notları</a> · <a href="/arsiv">Tarihli araştırmalar dahil tüm arşiv</a></p>
    </section>
  </div>;
}
