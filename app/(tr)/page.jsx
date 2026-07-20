import { posts, labels, site, generatedArt } from '../site-data';
import PostCard from '../../components/PostCard';

const collections = [
  {
    title: 'Antik Dünya',
    description: 'Uygarlıklar, şehir devletleri, imparatorluklar ve geçmişin ilk büyük kırılmaları.',
    href: '/label/antik-cag',
    image: generatedArt.classicalRuinsBust,
  },
  {
    title: 'Gizem Dosyaları',
    description: 'Kayıp metinler, çözülmemiş olaylar ve tarihin hâlâ cevaplanmamış soruları.',
    href: '/label/%C3%87%C3%B6z%C3%BClmemi%C5%9F%20Gizemler',
    image: generatedArt.mysteryRoomKey,
  },
  {
    title: 'Arkeoloji',
    description: 'Kazılar, yeni keşifler ve toprağın altından çıkan geçmişin izleri.',
    href: '/search?q=arkeoloji',
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
  if (!value) return '';
  return new Intl.DateTimeFormat('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(value));
}

export default function HomePage() {
  const allPosts = posts();
  const labelList = labels();
  const [lead, firstSupport, secondSupport, thirdSupport, ...latest] = allPosts;
  const editorPicks = [firstSupport, secondSupport, thirdSupport].filter(Boolean);
  const middleEastPosts = allPosts.filter((post) => String(post.id || '').startsWith('tr-middle-east-')).slice(0, 4);

  return (
    <div className="home-editorial-shell">
      <section className="home-editorial-hero">
        <div className="home-editorial-intro">
          <p className="eyebrow">Tarih · Mitoloji · Kadim Uygarlıklar</p>
          <h1>Geçmişin büyük hikâyelerini düzenli bir arşivde keşfet.</h1>
          <p className="home-lead-copy">{site.description || 'ODYOMUH, tarihsel olayları, uygarlıkları ve çözülmemiş gizemleri anlaşılır içeriklerle bir araya getirir.'}</p>
          <div className="home-hero-actions">
            <a className="home-primary-action" href="#son-yazilar">Son yazıları incele</a>
            <a className="home-secondary-action" href="/p/tarih-kronolojisi.html">Kronolojiye git</a>
          </div>
          <div className="home-quick-links">
            {labelList.slice(0, 6).map((label) => <a key={label} href={`/label/${encodeURIComponent(label)}`}>{label}</a>)}
          </div>
        </div>

        {lead ? (
          <a className="home-lead-story" href={lead.primaryPath}>
            <img src={lead.image} alt={lead.title} width="1672" height="941" fetchPriority="high" />
            <div className="home-lead-story-shade" />
            <div className="home-lead-story-content">
              <span>{lead.labels?.[0] || 'Öne Çıkan Dosya'}</span>
              <h2>{lead.title}</h2>
              <p>{lead.description}</p>
              <strong>Dosyayı aç →</strong>
            </div>
          </a>
        ) : null}
      </section>


      {middleEastPosts.length ? (
        <section className="home-current-affairs-section">
          <div className="home-section-heading">
            <div>
              <p className="eyebrow">Güncel Gündem · 17 Temmuz 2026</p>
              <h2>İran, ABD, İsrail ve Kızıldeniz dosyaları</h2>
            </div>
            <a className="home-all-posts-link" href="/gundem/orta-dogu">Gündem merkezini aç →</a>
          </div>
          <div className="home-current-affairs-grid">
            {middleEastPosts.map((post) => <PostCard post={post} key={post.id} />)}
          </div>
          <p className="home-current-affairs-disclaimer">Devletler, hükümetler, silahlı örgütler, halklar ve dinî topluluklar birbirine eşitlenmeden; tarihli ve kaynaklı içerik.</p>
        </section>
      ) : null}

      <section className="home-tools-row" aria-label="ODYOMUH araçları">
        <a className="home-tool-card" href="/p/tarih-kronolojisi.html">
          <img src={generatedArt.explorerDesk} alt="Tarih kronolojisi görseli" width="1672" height="941" loading="lazy" decoding="async" />
          <div>
            <span>ARAŞTIRMA ARACI</span>
            <h2>Tarih Kronolojisi</h2>
            <p>MÖ 9600’den günümüze uzanan 51 tarihsel olay.</p>
          </div>
        </a>
        <a className="home-tool-card" href="/p/tarih-quiz.html">
          <img src={generatedArt.ancientLibraryDesk} alt="Tarih quiz görseli" width="1672" height="941" loading="lazy" decoding="async" />
          <div>
            <span>ETKİLEŞİMLİ TEST</span>
            <h2>Tarih Quiz</h2>
            <p>125 soruluk havuzdan 10 soruluk hızlı bir tur.</p>
          </div>
        </a>
      </section>

      {editorPicks.length ? (
        <section className="home-picks-section">
          <div className="home-section-heading">
            <div>
              <p className="eyebrow">Editör Seçkisi</p>
              <h2>Öne çıkan dosyalar</h2>
            </div>
            <p>Uzun okuma için seçilmiş tarih, arkeoloji ve gizem yazıları.</p>
          </div>
          <div className="home-picks-grid">
            {editorPicks.map((post) => (
              <a className="home-pick-card" href={post.primaryPath} key={post.id}>
                <img src={post.image} alt={post.title} width="1672" height="941" loading="lazy" decoding="async" />
                <div className="home-pick-card-body">
                  <div className="home-pick-meta">
                    <span>{post.labels?.[0] || 'Tarih'}</span>
                    <time dateTime={post.published}>{formatDate(post.published)}</time>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                  <strong className="home-pick-link">Dosyayı aç <b aria-hidden="true">→</b></strong>
                </div>
              </a>
            ))}
          </div>
        </section>
      ) : null}

      <section className="home-collections-section">
        <div className="home-section-heading">
          <div>
            <p className="eyebrow">Tematik Salonlar</p>
            <h2>İlgi alanına göre ilerle</h2>
          </div>
          <p>Arşivi dört farklı rotadan keşfet.</p>
        </div>
        <div className="home-collections-grid">
          {collections.map((collection) => (
            <a className="home-collection-card" href={collection.href} key={collection.title}>
              <img src={collection.image} alt={collection.title} width="1672" height="941" loading="lazy" decoding="async" />
              <div className="home-collection-shade" />
              <div className="home-collection-content">
                <h3>{collection.title}</h3>
                <p>{collection.description}</p>
                <strong>Keşfet →</strong>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="home-latest-section" id="son-yazilar">
        <div className="home-section-heading">
          <div>
            <p className="eyebrow">Son Yazılar</p>
            <h2>Arşivden yeni kayıtlar</h2>
          </div>
          <a className="home-all-posts-link" href="/arsiv">Tüm yazıları gör →</a>
        </div>
        <div className="home-latest-grid">
          {latest.slice(0, 9).map((post) => <PostCard post={post} key={post.id} />)}
        </div>
      </section>

      <section className="home-closing-banner">
        <div>
          <p className="eyebrow">ODYOMUH ARŞİVİ</p>
          <h2>{allPosts.length} yazı, {labelList.length} etiket, tek bir tarih rotası.</h2>
          <p>Aradığın kişiyi, olayı, dönemi veya uygarlığı arşiv içinde saniyeler içinde bul.</p>
        </div>
        <div className="home-closing-actions">
          <a className="home-secondary-action" href="/etiketler">Etiket İndeksi</a>
          <a className="home-primary-action" href="/arsiv">Tüm Yazılar</a>
        </div>
      </section>
    </div>
  );
}
