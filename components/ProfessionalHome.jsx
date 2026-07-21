import { posts, site, generatedArt } from '../app/site-data';
import { currentTurkishPosts, currentUpdateDate } from '../data/current-updates';
import { allTurkishPosts, allTurkishLabels } from '../lib/content-collections';
import PostCard from './PostCard';
import HomeExperience from './HomeExperience';
import CivilizationGraph from './CivilizationGraph';

const eras = [
  { year: 'MÖ 9600', title: 'İlk Yerleşimler', text: 'Göbeklitepe, tarım devrimi ve insanlığın yerleşik hayata geçişi.', href: '/search?q=neolitik', icon: '𒀭' },
  { year: 'MÖ 3000', title: 'Kadim Uygarlıklar', text: 'Mezopotamya, Mısır, Anadolu ve ilk büyük şehir devletleri.', href: '/label/Antik%20Uygarlıklar', icon: '𓂀' },
  { year: 'MÖ 500', title: 'Klasik Dünya', text: 'Persler, Yunan dünyası, Roma ve Akdeniz’in dönüşümü.', href: '/label/antik-cag', icon: 'Ω' },
  { year: '1453', title: 'İmparatorluklar Çağı', text: 'Osmanlı, keşifler, savaşlar ve yeni dünya düzeni.', href: '/search?q=osmanli', icon: '✦' },
  { year: 'Günümüz', title: 'Tarihin Yankıları', text: 'Bugünkü krizlerin, sınırların ve kimliklerin tarihsel kökleri.', href: '/gundem/orta-dogu', icon: '◉' },
];

const portals = [
  { title: 'Arkeoloji Radarı', text: 'Yeni kazılar, buluntular ve bilimsel keşifler.', href: '/label/Arkeoloji', image: generatedArt.excavationSite, meta: 'Saha notları' },
  { title: 'Gizem Arşivi', text: 'Çözülemeyen olaylar, kayıp metinler ve tartışmalı kanıtlar.', href: '/label/%C3%87%C3%B6z%C3%BClmemi%C5%9F%20Gizemler', image: generatedArt.mysteryRoomKey, meta: 'Açık dosyalar' },
  { title: 'Antik Dünya Atlası', text: 'Uygarlıkları coğrafya, dönem ve kültür üzerinden keşfet.', href: '/label/Antik%20Uygarlıklar', image: generatedArt.classicalRuinsBust, meta: 'Uygarlık haritası' },
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
  const latest = allPosts.filter((post) => !recentIds.has(post.id)).slice(0, 6);
  const editorPicks = archivePosts.slice(0, 3);

  return (
    <div className="odyssey-home">
      <section className="odyssey-hero">
        <div className="odyssey-aurora" aria-hidden="true" />
        <div className="odyssey-grid" aria-hidden="true" />
        <div className="odyssey-copy">
          <div className="odyssey-status"><span /> Dijital tarih araştırma merkezi</div>
          <h1>Geçmişi okumayın.<br/><em>İçine girin.</em></h1>
          <p>{site.description || 'Tarih, arkeoloji ve kadim uygarlıkları kanıtlar, haritalar ve kaynaklı araştırmalarla keşfedin.'}</p>
          <form className="odyssey-search" action="/search" method="get">
            <span aria-hidden="true">⌕</span><input name="q" type="search" placeholder="Bir uygarlık, olay veya kişi ara..." aria-label="Arşivde ara" /><button type="submit">Keşfet</button>
          </form>
          <div className="odyssey-actions"><a href="#son-arastirmalar">Son araştırmalar</a><a href="/p/tarih-kronolojisi.html">Zaman çizelgesini aç <span>↗</span></a></div>
          <div className="odyssey-metrics"><div><strong>{allPosts.length}+</strong><span>Kaynaklı dosya</span></div><div><strong>{labelList.length}</strong><span>Araştırma alanı</span></div><div><strong>2</strong><span>Dil seçeneği</span></div></div>
        </div>
        {lead && <a className="odyssey-feature" href={lead.primaryPath}>
          <img src={lead.image} alt={lead.title} width="1672" height="941" fetchPriority="high" decoding="async" />
          <div className="odyssey-feature-shade" /><div className="odyssey-feature-top"><span>Yeni keşif</span><time dateTime={lead.published}>{formatDate(lead.published)}</time></div>
          <div className="odyssey-feature-copy"><small>{lead.labels?.[0] || 'Araştırma dosyası'}</small><h2>{lead.title}</h2><p>{lead.description}</p><strong>Dosyaya gir <b>↗</b></strong></div>
          <div className="odyssey-orbit" aria-hidden="true"><i/><i/><i/></div>
        </a>}
      </section>

      <section className="odyssey-dashboard" aria-label="Hızlı erişim">
        <a href="/arsiv"><span>01</span><div><small>Tüm içerik</small><strong>Arşiv Merkezi</strong></div><b>↗</b></a>
        <a href="/p/tarih-kronolojisi.html"><span>02</span><div><small>İnteraktif araç</small><strong>Zaman Makinesi</strong></div><b>↗</b></a>
        <a href="/p/tarih-quiz.html"><span>03</span><div><small>Bilgini test et</small><strong>Tarih Laboratuvarı</strong></div><b>↗</b></a>
        <a href="/etiketler"><span>04</span><div><small>Konu navigasyonu</small><strong>Keşif Haritası</strong></div><b>↗</b></a>
      </section>

      <HomeExperience posts={allPosts.slice(0, 24)} />
      <CivilizationGraph />

      <section className="odyssey-era-section">
        <div className="odyssey-section-head"><div><span>Zaman koridoru</span><h2>İnsanlığın kırılma noktaları</h2></div><p>On iki bin yıllık geçmişi dönemler, uygarlıklar ve dönüm noktaları üzerinden tarayın.</p></div>
        <div className="odyssey-era-track">{eras.map((era) => <a href={era.href} key={era.title} className="odyssey-era-card"><div className="odyssey-era-icon">{era.icon}</div><time>{era.year}</time><h3>{era.title}</h3><p>{era.text}</p><span>Keşfet ↗</span></a>)}</div>
      </section>

      <section className="odyssey-research" id="son-arastirmalar">
        <div className="odyssey-section-head"><div><span>{formatDate(currentUpdateDate)} · Canlı arşiv</span><h2>Son araştırmalar</h2></div><a href="/arsiv">Tüm dosyalar ↗</a></div>
        <div className="odyssey-research-grid">{recentResearch.slice(0, 4).map((post, index) => <a className={`odyssey-research-card ${index === 0 ? 'is-large' : ''}`} href={post.primaryPath} key={post.id}><img src={post.image} alt={post.title} width="1672" height="941" loading={index ? 'lazy' : 'eager'} decoding="async" /><div className="odyssey-card-glass"><span>{post.labels?.[0] || 'Yeni dosya'}</span><h3>{post.title}</h3><p>{post.description}</p></div></a>)}</div>
      </section>

      <section className="odyssey-portals">{portals.map((portal) => <a href={portal.href} className="odyssey-portal" key={portal.title}><img src={portal.image} alt="" width="1672" height="941" loading="lazy" decoding="async" /><div><span>{portal.meta}</span><h3>{portal.title}</h3><p>{portal.text}</p><strong>Portalı aç ↗</strong></div></a>)}</section>

      <section className="odyssey-editorial"><div className="odyssey-section-head"><div><span>Editör seçkisi</span><h2>Derin okumalar</h2></div><p>Arşivden seçilmiş kapsamlı tarih, arkeoloji ve kültür dosyaları.</p></div><div className="home-picks-grid">{editorPicks.map((post) => <PostCard post={post} key={post.id} />)}</div></section>
      <section className="odyssey-latest"><div className="odyssey-section-head"><div><span>Arşiv akışı</span><h2>Keşfetmeye devam edin</h2></div><a href="/arsiv">Arşive git ↗</a></div><div className="home-latest-grid">{latest.map((post) => <PostCard post={post} key={post.id} />)}</div></section>
    </div>
  );
}
