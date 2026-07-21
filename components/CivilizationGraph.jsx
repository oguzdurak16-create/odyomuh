'use client';

import { useMemo, useState } from 'react';

const nodes = [
  { id: 'anatolia', label: 'Anadolu', x: 50, y: 43, href: '/search?q=Anadolu', note: 'Hititlerden Bizans ve Osmanlı’ya uzanan tarihsel kavşak.' },
  { id: 'mesopotamia', label: 'Mezopotamya', x: 70, y: 54, href: '/search?q=Mezopotamya', note: 'Yazı, kent, hukuk ve ilk devlet geleneklerinin merkezi.' },
  { id: 'egypt', label: 'Mısır', x: 48, y: 72, href: '/search?q=Mısır', note: 'Nil çevresinde kurulan uzun ömürlü uygarlık düzeni.' },
  { id: 'greece', label: 'Yunan Dünyası', x: 31, y: 50, href: '/search?q=Antik Yunan', note: 'Ege ağları, polis düzeni ve klasik düşünce geleneği.' },
  { id: 'rome', label: 'Roma', x: 14, y: 38, href: '/search?q=Roma', note: 'Akdeniz’i siyasi, hukuki ve altyapısal bir sisteme dönüştürdü.' },
  { id: 'persia', label: 'Pers', x: 88, y: 43, href: '/search?q=Pers', note: 'İmparatorluk yönetimi, yol ağları ve çok kültürlü siyaset.' },
  { id: 'centralasia', label: 'Orta Asya', x: 73, y: 17, href: '/search?q=Orta Asya', note: 'Bozkır devletleri, ticaret yolları ve Türk tarihinin ana sahnesi.' },
];

const links = [
  ['rome', 'greece'], ['greece', 'anatolia'], ['anatolia', 'mesopotamia'], ['mesopotamia', 'persia'],
  ['anatolia', 'centralasia'], ['mesopotamia', 'egypt'], ['greece', 'egypt'], ['persia', 'centralasia'],
];

export default function CivilizationGraph() {
  const [activeId, setActiveId] = useState('anatolia');
  const active = nodes.find((node) => node.id === activeId) || nodes[0];
  const connected = useMemo(() => new Set(links.flatMap(([a, b]) => a === activeId ? [b] : b === activeId ? [a] : [])), [activeId]);

  return (
    <section className="civilization-graph" aria-labelledby="civilization-graph-title">
      <div className="civilization-graph-copy">
        <span className="civilization-kicker">Bilgi grafiği</span>
        <h2 id="civilization-graph-title">Uygarlıklar tek başına doğmadı.</h2>
        <p>Ticaret, savaş, göç, teknoloji ve fikirler üzerinden birbirine bağlanan tarihsel ağın bir düğümünü seçin.</p>
        <div className="civilization-active-card" aria-live="polite">
          <small>Seçili düğüm</small>
          <strong>{active.label}</strong>
          <p>{active.note}</p>
          <a href={active.href}>İlgili dosyaları aç ↗</a>
        </div>
      </div>

      <div className="civilization-canvas" role="group" aria-label="Etkileşimli uygarlık ağı">
        <svg className="civilization-links" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {links.map(([from, to]) => {
            const a = nodes.find((node) => node.id === from);
            const b = nodes.find((node) => node.id === to);
            const isActive = from === activeId || to === activeId;
            return <line key={`${from}-${to}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} className={isActive ? 'is-active' : ''} />;
          })}
        </svg>

        {nodes.map((node) => {
          const state = node.id === activeId ? 'is-active' : connected.has(node.id) ? 'is-connected' : '';
          return (
            <button
              key={node.id}
              type="button"
              className={`civilization-node ${state}`}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              onClick={() => setActiveId(node.id)}
              aria-pressed={node.id === activeId}
            >
              <span />
              <strong>{node.label}</strong>
            </button>
          );
        })}
        <div className="civilization-scan" aria-hidden="true" />
      </div>
    </section>
  );
}
