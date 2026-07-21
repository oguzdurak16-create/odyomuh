'use client';

import { useMemo, useState } from 'react';

const places = [
  { id:'anadolu', x:48, y:40, title:'Anadolu', subtitle:'Göbeklitepe’den Bizans’a', href:'/search?q=Anadolu' },
  { id:'misir', x:49, y:58, title:'Mısır', subtitle:'Nil, firavunlar ve tapınaklar', href:'/search?q=Mısır' },
  { id:'mezopotamya', x:57, y:46, title:'Mezopotamya', subtitle:'Yazı, şehir ve imparatorluk', href:'/search?q=Mezopotamya' },
  { id:'roma', x:39, y:42, title:'Roma', subtitle:'Cumhuriyetten dünya imparatorluğuna', href:'/search?q=Roma' },
  { id:'orta-asya', x:70, y:31, title:'Orta Asya', subtitle:'Bozkır kültürü ve Türk tarihi', href:'/search?q=Orta%20Asya' },
  { id:'levant', x:53, y:50, title:'Levant', subtitle:'Ticaret yolları ve kadim kentler', href:'/search?q=Levant' },
];

export default function HistoryAtlas({ posts = [] }) {
  const [active, setActive] = useState(places[0]);
  const [museum, setMuseum] = useState(0);
  const museumPosts = useMemo(() => posts.slice(0, 6), [posts]);
  const selected = museumPosts[museum] || museumPosts[0];

  return <section className="ody-atlas-section">
    <div className="odyssey-section-head"><div><span>İnteraktif dünya</span><h2>Tarihin yaşayan atlası</h2></div><p>Coğrafyaya dokunun, uygarlıkların ve olayların arşivdeki izlerini açın.</p></div>
    <div className="ody-atlas-grid">
      <article className="ody-map-card">
        <div className="ody-map-toolbar"><span><i/> Keşif ağı çevrimiçi</span><b>{places.length} tarih bölgesi</b></div>
        <div className="ody-world-map" aria-label="İnteraktif tarih haritası">
          <svg viewBox="0 0 100 65" role="img" aria-label="Stilize dünya haritası">
            <path d="M5 20L13 12l11 2 7 8-5 8-9 2-4 11-7-4 3-9zM31 18l9-6 10 3 7-4 13 3 10 9 12 4-3 8-9 1-6 8-8 9-12-2-5-8-8-1-8-8zM44 39l9 2 7 9-4 13-9-2-5-10zM76 43l9 2 8 8-5 7-11-4z" />
            {places.map((place) => <g key={place.id} className={active.id === place.id ? 'active' : ''} onClick={() => setActive(place)} tabIndex="0" role="button" aria-label={place.title} onKeyDown={(event) => event.key === 'Enter' && setActive(place)}><circle cx={place.x} cy={place.y} r="1.6"/><circle className="pulse" cx={place.x} cy={place.y} r="4"/></g>)}
          </svg>
          <div className="ody-map-lines" aria-hidden="true" />
        </div>
        <div className="ody-map-detail"><small>Seçili bölge</small><h3>{active.title}</h3><p>{active.subtitle}</p><a href={active.href}>Bölge arşivini aç ↗</a></div>
      </article>

      <article className="ody-museum-card">
        <div className="ody-museum-top"><span>Müze modu</span><div><button onClick={() => setMuseum((museum - 1 + museumPosts.length) % museumPosts.length)} aria-label="Önceki eser">←</button><button onClick={() => setMuseum((museum + 1) % museumPosts.length)} aria-label="Sonraki eser">→</button></div></div>
        {selected && <a href={selected.primaryPath} className="ody-museum-stage">
          <img src={selected.image} alt={selected.title} width="1200" height="800" loading="lazy" decoding="async"/>
          <div className="ody-museum-light"/><div className="ody-museum-copy"><small>{selected.labels?.[0] || 'Koleksiyon'}</small><h3>{selected.title}</h3><p>{selected.description}</p><strong>Tam ekran dosyayı aç ↗</strong></div>
        </a>}
        <div className="ody-museum-dots">{museumPosts.map((post,index)=><button key={post.id || index} className={museum===index?'active':''} onClick={()=>setMuseum(index)} aria-label={`${index+1}. eseri göster`}/>)}</div>
      </article>
    </div>
  </section>;
}
