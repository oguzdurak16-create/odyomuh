import { posts, site, generatedArt } from '../app/site-data';
import { currentTurkishPosts, currentUpdateDate } from '../data/current-updates';
import { allTurkishPosts, allTurkishLabels } from '../lib/content-collections';
import PostCard from './PostCard';

const collections = [
  {
    title: 'Antik Dünya',
    description: 'Uygarlıklar, şehir devletleri, imparatorluklar ve geçmişin büyük kırılmaları.',
    href: '/label/antik-cag',
    image: generatedArt.classicalRuinsBust,
  },
  {
    title: 'Gizem Dosyaları',
    description: 'Kayıp metinler, çözülmemiş olaylar ve hâlâ cevap bekleyen tarih soruları.',
    href: '/label/%C3%87%C3%B6z%C3%BClmemi%C5%9F%20Gizemler',
    image: generatedArt.mysteryRoomKey,
  },
  {
    title: 'Arkeoloji',
    description: 'Kazılar, yeni keşifler ve toprağın altından çıkan geçmişin izleri.',
    href: '/label/Arkeoloji',
    image: generatedArt.excavationSite,
  },
  {
    title: 'Osmanlı ve Türk Tarihi',
    description: 'Devlet, toplum, fetihler ve Anadolu merkezli tarihsel dosyalar.',
    href: '/search?q=osmanli',
    image: generatedArt.ottomanManuscript,
  },
];

function formatDate(value) {
  if (!value) return 'Yeni araştırmalar';
  return new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(value));
}

export default function ProfessionalHome() {
  const recentResearch = [...currentTurkishPosts].sort((a, b) => String(b.published || '').localeCompare(String(a.published || '')));
  const archivePosts = posts();
  const allPosts = allTurkishPosts();
  const labelList = allTurkishLabels();
  const lead = recentResearch[0] || allPosts[0];
  const recentIds = new Set(recentResearch.map((post) => post.id));
  const latest = allPosts.filter((post) => !recentIds.has(post.id)).slice(0, 9);
  const editorPicks = archivePosts.slice(0, 3);

  return (
    <div className="home-editorial-shell">
      <section className="home-editorial-hero">
        <div className="home-editorial-intro">
          <p className="eyebrow">Dijital tarih dergisi</p>
          <h1>Geçmişi yalnızca anlatmıyoruz. Kanıtlarıyla yeniden kuruyoruz.</h1>
          <p className="home-lead-copy">{site.description || 'ODYOMUH; tarih, arkeoloji, mitoloji ve güncel gelişmelerin tarihsel arka planını kaynak odaklı dosyalarda bir araya getirir.'}</p>
          <div className="home-hero-actions">
            <a className="home-primary-action" href="#son-eklenenler">Son eklenen dosyalar</a>
            <a className="home-secondary-action" href="/p/tarih-kronolojisi.html">Kronolojiyi aç</a>
          </div>
          <div className="home-quick-links">
            {labelList.slice(0, 6).map((label) => <a key={label} href={`/label/${encodeURIComponent(label)}`}>{label}</a>)}
          </div>
        </div>

        {lead ? (
          <a className="home-lead-story" href={lead.primaryPath}>
            <img src={lead.image} alt={lead.title} width="1672" height="941" fetchPriority="high" decoding="async" />
            <div className="home-lead-story-shade" />
            <div className="home-lead-story-content">
              <span>{recentIds.has(lead.id) ? 'Yeni araştırma' : (lead.labels?.[0] || 'Öne çıkan dosya')}</span>
              <h2>{lead.title}</h2>
              <p>{lead.description}</p>
              <strong>Dosyayı aç →</strong>
            </div>
          </a>
        ) : null}
      </section>

      {recentResearch.length ? (
        <section className="home-today-section" id="son-eklenenler">
          <div className="home-today-heading">
            <div>
              <p className="eyebrow">{formatDate(currentUpdateDate)} · Son yayınlar</p>
              <h2>Yeni araştırma dosyaları</h2>
            </div>
            <p>En son eklenen Türkçe dosyalar kapak, özet ve doğrudan okuma bağlantısıyla burada yer alır.</p>
          </div>
          <div className="home-today-grid">
            {recentResearch.map((post) => (
              <a className="home-today-card" href={post.primaryPath} key={post.id}>
                <img src={post.image} alt={post.title} width="1672" height="941" decoding="async" />
                <div className="home-today-card-content">
                  <span>{post.labels?.[0] || 'Yeni dosya'}</span>
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                </div>
              </a>
            ))}
          </div>
        </section>
      ) : null}

      <section className="home-tools-row" aria-label="ODYOMUH araçları">
        <a className="home-tool-card" href="/p/tarih-kronolojisi.html">
          <img src={generatedArt.explorerDesk} alt="Tarih kronolojisi" width="1672" height="941" loading="lazy" decoding="async" />
          <div><span>ARAŞTIRMA ARACI</span><h2>Tarih Kronolojisi</h2><p>MÖ 9600’den günümüze uzanan 51 tarihsel olay.</p></div>
        </a>
        <a className="home-tool-card" href="/p/tarih-quiz.html">
          <img src={generatedArt.ancientLibraryDesk} alt="Tarih quiz" width="1672" height="941" loading="lazy" decoding="async" />
          <div><span>ETKİLEŞİMLİ TEST</span><h2>Tarih Quiz</h2><p>125 soruluk havuzdan 10 soruluk hızlı bir tur.</p></div>
        </a>
      </section>

      <section className="home-picks-section">
        <div className="home-section-heading">
          <div><p className="eyebrow">Editör seçkisi</p><h2>Derinlemesine tarih dosyaları</h2></div>
          <p>Uzun okuma için seçilmiş tarih, arkeoloji ve gizem araştırmaları.</p>
        </div>
        <div className="home-picks-grid">
          {editorPicks.map((post) => <PostCard post={post} key={post.id} />)}
        </div>
      </section>

      <section className="home-collections-section">
        <div className="home-section-heading">
          <div><p className="eyebrow">Araştırma alanları</p><h2>İlgi alanına göre ilerle</h2></div>
          <p>Arşivi dört farklı tarih rotasından keşfet.</p>
        </div>
        <div className="home-collections-grid">
          {collections.map((collection) => (
            <a className="home-collection-card" href={collection.href} key={collection.title}>
              <img src={collection.image} alt={collection.title} width="1672" height="941" loading="lazy" decoding="async" />
              <div className="home-collection-shade" />
              <div className="home-collection-content"><h3>{collection.title}</h3><p>{collection.description}</p><strong>Keşfet →</strong></div>
            </a>
          ))}
        </div>
      </section>

      <section className="home-latest-section" id="son-yazilar">
        <div className="home-section-heading">
          <div><p className="eyebrow">Arşivden son kayıtlar</p><h2>Yeni ve güncellenen yazılar</h2></div>
          <a className="home-all-posts-link" href="/arsiv">Tüm yazıları gör →</a>
        </div>
        <div className="home-latest-grid">{latest.map((post) => <PostCard post={post} key={post.id} />)}</div>
      </section>

      <section className="home-closing-banner">
        <div><p className="eyebrow">ODYOMUH arşivi</p><h2>{allPosts.length} yazı, {labelList.length} etiket, tek bir araştırma rotası.</h2><p>Aradığın kişiyi, olayı, dönemi veya uygarlığı saniyeler içinde bul.</p></div>
        <div className="home-closing-actions"><a className="home-secondary-action" href="/etiketler">Etiket indeksi</a><a className="home-primary-action" href="/arsiv">Tüm yazılar</a></div>
      </section>
    </div>
  );
}
