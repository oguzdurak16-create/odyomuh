'use client';

import { useMemo, useState } from 'react';

const prompts = [
  'Roma neden çöktü?',
  'Osmanlı ile Roma’yı karşılaştır',
  'Anadolu’daki en eski yerleşimler',
  'Mısır ve Mezopotamya arasındaki farklar',
];

function normalize(value = '') {
  return value.toLocaleLowerCase('tr-TR').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function scorePost(post, query) {
  const terms = normalize(query).split(/\s+/).filter((term) => term.length > 2);
  const title = normalize(post.title);
  const description = normalize(post.description);
  const labels = normalize((post.labels || []).join(' '));
  return terms.reduce((score, term) => score + (title.includes(term) ? 7 : 0) + (labels.includes(term) ? 4 : 0) + (description.includes(term) ? 2 : 0), 0);
}

export default function FutureHistoryLab({ posts = [] }) {
  const artifacts = posts.filter((post) => post?.image).slice(0, 8);
  const [artifactIndex, setArtifactIndex] = useState(0);
  const [rotation, setRotation] = useState(-8);
  const [zoom, setZoom] = useState(1);
  const [query, setQuery] = useState('');
  const [submitted, setSubmitted] = useState('');
  const artifact = artifacts[artifactIndex] || null;

  const answers = useMemo(() => {
    if (!submitted.trim()) return [];
    return posts
      .map((post) => ({ post, score: scorePost(post, submitted) }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((item) => item.post);
  }, [posts, submitted]);

  const ask = (event) => {
    event?.preventDefault();
    setSubmitted(query.trim());
  };

  return (
    <section className="future-lab" aria-labelledby="future-lab-title">
      <div className="odyssey-section-head future-lab-head">
        <div><span>Deneysel arayüz</span><h2 id="future-lab-title">Geleceğin tarih laboratuvarı</h2></div>
        <p>Arşivi bir müze vitrini gibi inceleyin, sorularınızı kaynaklı dosyalarla eşleştirin ve güncel araştırma akışını takip edin.</p>
      </div>

      <div className="future-lab-grid">
        <article className="artifact-viewer">
          <div className="future-panel-label"><i /> Dijital eser görüntüleyici</div>
          {artifact ? <>
            <div className="artifact-stage" onPointerMove={(event) => {
              if (event.buttons !== 1) return;
              setRotation((value) => Math.max(-28, Math.min(28, value + event.movementX * .12)));
            }}>
              <div className="artifact-halo" />
              <img src={artifact.image} alt={artifact.title} draggable="false" style={{ transform: `perspective(900px) rotateY(${rotation}deg) scale(${zoom})` }} />
              <div className="artifact-scan" aria-hidden="true" />
              <span className="artifact-hint">Sürükleyerek döndür</span>
            </div>
            <div className="artifact-controls">
              <button type="button" onClick={() => setRotation((value) => value - 8)} aria-label="Sola döndür">↶</button>
              <input aria-label="Yakınlaştır" type="range" min="0.85" max="1.35" step="0.05" value={zoom} onChange={(event) => setZoom(Number(event.target.value))} />
              <button type="button" onClick={() => setRotation((value) => value + 8)} aria-label="Sağa döndür">↷</button>
            </div>
            <div className="artifact-meta"><span>{artifact.labels?.[0] || 'Dijital koleksiyon'}</span><h3>{artifact.title}</h3><a href={artifact.primaryPath}>Eser dosyasını aç ↗</a></div>
            <div className="artifact-strip">{artifacts.slice(0, 5).map((item, index) => <button key={item.id || item.primaryPath} className={index === artifactIndex ? 'is-active' : ''} type="button" onClick={() => { setArtifactIndex(index); setRotation(-8); setZoom(1); }}><img src={item.image} alt="" /></button>)}</div>
          </> : <p>Görüntülenecek koleksiyon hazırlanıyor.</p>}
        </article>

        <article className="archive-assistant">
          <div className="future-panel-label"><i /> ODYOMUH arşiv asistanı</div>
          <div className="assistant-orb" aria-hidden="true"><span /><b /><em /></div>
          <h3>Tarihe bir soru sorun</h3>
          <p>Sorunuz arşivdeki başlık, özet ve etiketlerle eşleştirilerek en yakın kaynaklı dosyalar bulunur.</p>
          <form onSubmit={ask}>
            <textarea value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Örneğin: Hititlerin Mısır ile ilişkisi neydi?" aria-label="Tarih sorusu" />
            <button type="submit">Arşivi tara</button>
          </form>
          <div className="assistant-prompts">{prompts.map((prompt) => <button type="button" key={prompt} onClick={() => { setQuery(prompt); setSubmitted(prompt); }}>{prompt}</button>)}</div>
          {submitted && <div className="assistant-results" aria-live="polite">
            <span>“{submitted}” için önerilen dosyalar</span>
            {answers.length ? answers.map((post) => <a href={post.primaryPath} key={post.id || post.primaryPath}><small>{post.labels?.[0] || 'Arşiv'}</small><strong>{post.title}</strong><b>↗</b></a>) : <a href={`/search?q=${encodeURIComponent(submitted)}`}><small>Gelişmiş arama</small><strong>Arşivin tamamında ara</strong><b>↗</b></a>}
          </div>}
        </article>

        <article className="research-stream">
          <div className="future-panel-label"><i /> Canlı araştırma akışı</div>
          <div className="stream-status"><span /> Arşiv sinyali aktif</div>
          <div className="stream-list">{posts.slice(0, 5).map((post, index) => <a href={post.primaryPath} key={post.id || post.primaryPath}><time>{String(index + 1).padStart(2, '0')}</time><div><small>{post.labels?.[0] || 'Yeni araştırma'}</small><strong>{post.title}</strong></div><b>↗</b></a>)}</div>
          <a className="stream-all" href="/arsiv">Tüm araştırma akışını aç ↗</a>
        </article>
      </div>
    </section>
  );
}
