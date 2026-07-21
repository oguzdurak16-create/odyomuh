'use client';

import { useEffect, useMemo, useState } from 'react';

const moments = [
  { year: -9600, label: 'Göbeklitepe', text: 'Avcı-toplayıcı topluluklar anıtsal yapılar kuruyor.', href: '/search?q=Göbeklitepe' },
  { year: -3200, label: 'Yazının Doğuşu', text: 'Mezopotamya’da kayıt, yönetim ve hafıza değişiyor.', href: '/search?q=yazı' },
  { year: -753, label: 'Roma', text: 'Bir şehir, Akdeniz dünyasının merkezine dönüşüyor.', href: '/search?q=Roma' },
  { year: 1453, label: 'İstanbul', text: 'Bir çağ kapanırken yeni bir siyasi düzen kuruluyor.', href: '/search?q=1453' },
  { year: 1923, label: 'Cumhuriyet', text: 'Anadolu’da yeni bir devlet ve toplum modeli doğuyor.', href: '/search?q=1923' },
];

function formatYear(year) {
  return year < 0 ? `MÖ ${Math.abs(year)}` : String(year);
}

export default function HomeExperience({ posts = [] }) {
  const [index, setIndex] = useState(2);
  const [clock, setClock] = useState('');
  const moment = moments[index];
  const discovery = useMemo(() => posts[Math.floor(Math.random() * Math.max(posts.length, 1))], [posts]);

  useEffect(() => {
    const update = () => setClock(new Intl.DateTimeFormat('tr-TR', {
      hour: '2-digit', minute: '2-digit', second: '2-digit', day: '2-digit', month: 'short', year: 'numeric'
    }).format(new Date()));
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="odyssey-command" aria-label="İnteraktif tarih merkezi">
      <div className="odyssey-command-head">
        <div><span>Canlı deneyim</span><h2>Tarih Komuta Merkezi</h2></div>
        <time suppressHydrationWarning>{clock || 'ODYOMUH zamanı'}</time>
      </div>

      <div className="odyssey-command-grid">
        <article className="odyssey-time-machine">
          <div className="odyssey-widget-label"><i /> Zaman gezgini</div>
          <div className="odyssey-time-display"><strong>{formatYear(moment.year)}</strong><span>{moment.label}</span></div>
          <p>{moment.text}</p>
          <input aria-label="Tarih dönemini seç" type="range" min="0" max={moments.length - 1} value={index} onChange={(event) => setIndex(Number(event.target.value))} />
          <div className="odyssey-time-scale"><span>MÖ 9600</span><span>Günümüz</span></div>
          <a href={moment.href}>Bu dönemi keşfet ↗</a>
        </article>

        <article className="odyssey-radar-widget">
          <div className="odyssey-widget-label"><i /> Arkeoloji radarı</div>
          <div className="odyssey-radar" aria-hidden="true"><span /><b /><em /></div>
          <strong>Arşiv taraması aktif</strong>
          <p>Yeni kazılar, antik teknoloji ve uygarlık dosyaları sürekli görünür durumda.</p>
          <a href="/label/Arkeoloji">Radar merkezini aç ↗</a>
        </article>

        <article className="odyssey-discovery-widget">
          <div className="odyssey-widget-label"><i /> Rastgele keşif</div>
          {discovery ? <>
            <span>{discovery.labels?.[0] || 'Tarih dosyası'}</span>
            <h3>{discovery.title}</h3>
            <p>{discovery.description}</p>
            <a href={discovery.primaryPath}>Beklenmedik bir dosyaya gir ↗</a>
          </> : <p>Arşiv hazırlanıyor.</p>}
        </article>
      </div>
    </section>
  );
}
