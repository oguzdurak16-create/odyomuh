"use client";

import { useEffect, useMemo, useState } from 'react';

const eraDefinitions = [
  { key: 'antik', label: 'Antik Dünya', terms: ['antik', 'roma', 'yunan', 'mısır', 'mezopotamya', 'hitit', 'babil', 'pers'] },
  { key: 'orta', label: 'Orta Çağ', terms: ['orta çağ', 'bizans', 'haçlı', 'selçuklu', 'viking', 'moğol'] },
  { key: 'osmanli', label: 'Osmanlı', terms: ['osmanlı', 'ottoman'] },
  { key: 'gizem', label: 'Çözülmemiş', terms: ['gizem', 'çözülmemiş', 'kayıp', 'sır', 'esrar'] },
];

const todayEvents = {
  '01-01': ['MÖ 45: Jülyen takviminin uygulamaya girmesiyle Roma dünyasında yeni bir zaman düzeni başladı.'],
  '03-15': ['MÖ 44: Julius Caesar, Roma Senatosu yakınında suikasta uğradı.'],
  '04-06': ['1453: II. Mehmed’in İstanbul kuşatması başladı.'],
  '05-29': ['1453: İstanbul, Osmanlı ordusu tarafından fethedildi.'],
  '06-13': ['313: Milano Fermanı ile Roma İmparatorluğu’nda Hristiyanlara yönelik hoşgörü politikası güç kazandı.', '1381: İngiltere’de Köylü İsyanı sırasında isyancılar Londra’ya girdi.'],
  '07-14': ['1789: Bastille Hapishanesi’nin basılması Fransız Devrimi’nin simge olaylarından biri oldu.'],
  '08-26': ['1071: Malazgirt Savaşı, Anadolu tarihinin siyasi yönünü değiştirdi.'],
  '10-29': ['1923: Türkiye Cumhuriyeti ilan edildi.'],
  '11-11': ['1918: Ateşkesin yürürlüğe girmesiyle Birinci Dünya Savaşı’nın Batı Cephesi’ndeki çatışmalar sona erdi.'],
  '12-25': ['800: Şarlman, Roma’da imparator olarak taç giydi.'],
};

function normalize(value = '') {
  return value.toLocaleLowerCase('tr-TR');
}

function matchesEra(post, terms) {
  const haystack = normalize(`${post.title} ${(post.labels || []).join(' ')} ${post.description || ''}`);
  return terms.some((term) => haystack.includes(term));
}

export default function ArchiveWidgets({ posts, labels }) {
  const [activeEra, setActiveEra] = useState('antik');
  const [randomIndex, setRandomIndex] = useState(0);
  const [today, setToday] = useState(null);

  useEffect(() => {
    setToday(new Date());
  }, []);

  const todayKey = useMemo(() => {
    if (!today) return '';
    return `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  }, [today]);

  const era = eraDefinitions.find((item) => item.key === activeEra) || eraDefinitions[0];
  const eraPosts = posts.filter((post) => matchesEra(post, era.terms)).slice(0, 4);
  const mysteryPosts = posts
    .filter((post) => matchesEra(post, eraDefinitions[3].terms))
    .slice(0, 3);
  const randomPost = posts[randomIndex % Math.max(posts.length, 1)];

  function discoverRandom() {
    if (!posts.length) return;
    const next = Math.floor(Math.random() * posts.length);
    setRandomIndex(next);
  }

  return (
    <section className="archive-dashboard" aria-label="ODYOMUH arşiv araçları">
      <article className="archive-widget chronos-widget">
        <div className="widget-heading-row">
          <div>
            <span className="widget-overline">Kronos Çarkı</span>
            <h2>Dönem seç, arşivi aç</h2>
          </div>
          <span className="widget-glyph" aria-hidden="true">⌛</span>
        </div>
        <div className="era-dial" aria-label="Tarih dönemleri">
          {eraDefinitions.map((item, index) => (
            <button
              key={item.key}
              type="button"
              className={activeEra === item.key ? `era-node active node-${index}` : `era-node node-${index}`}
              onClick={() => setActiveEra(item.key)}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              {item.label}
            </button>
          ))}
          <div className="era-dial-core"><span>ODYO</span><strong>MUH</strong></div>
        </div>
        <div className="era-results">
          <p className="era-result-title">{era.label} dosyaları</p>
          {eraPosts.length ? eraPosts.map((post) => (
            <a key={post.id} href={post.primaryPath}>{post.title}<span>→</span></a>
          )) : <p className="widget-empty">Bu dönemde eşleşen yazı bulunamadı.</p>}
        </div>
      </article>

      <article className="archive-widget today-widget">
        <span className="widget-overline">Bugün Tarihte</span>
        <div className="today-date">
          <strong suppressHydrationWarning>{today ? new Intl.DateTimeFormat('tr-TR', { day: '2-digit' }).format(today) : '--'}</strong>
          <span suppressHydrationWarning>{today ? new Intl.DateTimeFormat('tr-TR', { month: 'long', year: 'numeric' }).format(today) : 'Tarih yükleniyor'}</span>
        </div>
        <div className="today-events">
          {(todayEvents[todayKey] || ['Tarih arşivinde bugün için özel kayıt hazırlanıyor. Rastgele keşif düğmesiyle başka bir dosya açabilirsin.']).map((event) => (
            <p key={event}>{event}</p>
          ))}
        </div>
      </article>

      <article className="archive-widget discovery-widget">
        <div className="widget-heading-row">
          <div>
            <span className="widget-overline">Rastgele Keşif</span>
            <h2>Arşiv sana bir dosya seçsin</h2>
          </div>
          <span className="widget-glyph" aria-hidden="true">✦</span>
        </div>
        {randomPost ? (
          <div className="random-file-card">
            <span className="random-file-code">DOSYA-{String(randomIndex + 1).padStart(3, '0')}</span>
            <h3>{randomPost.title}</h3>
            <p>{randomPost.description}</p>
            <div className="random-actions">
              <button type="button" onClick={discoverRandom}>Başka dosya seç</button>
              <a href={randomPost.primaryPath}>Dosyayı aç →</a>
            </div>
          </div>
        ) : null}
      </article>

      <article className="archive-widget archive-signal-widget">
        <span className="widget-overline">Arşiv Sinyali</span>
        <div className="signal-rings" aria-hidden="true"><span /><span /><span /><i /></div>
        <div className="signal-stats">
          <div><strong>{posts.length}</strong><span>Yazı</span></div>
          <div><strong>{labels.length}</strong><span>Etiket</span></div>
          <div><strong>{mysteryPosts.length}</strong><span>Aktif gizem</span></div>
        </div>
      </article>

      <article className="archive-widget mystery-widget">
        <div className="widget-heading-row">
          <div>
            <span className="widget-overline">Gizem Endeksi</span>
            <h2>Çözülemeyen dosyalar</h2>
          </div>
          <span className="mystery-level">87%</span>
        </div>
        <div className="mystery-meter"><span /></div>
        <div className="mystery-list">
          {mysteryPosts.map((post, index) => (
            <a key={post.id} href={post.primaryPath}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{post.title}</strong>
            </a>
          ))}
        </div>
      </article>
    </section>
  );
}
