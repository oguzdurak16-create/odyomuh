'use client';

import { useEffect, useState } from 'react';

const sections = [
  { id: 'komuta-merkezi', label: 'Komuta Merkezi' },
  { id: 'uygarlik-agi', label: 'Uygarlık Ağı' },
  { id: 'tarih-atlasi', label: 'Tarih Atlası' },
  { id: 'gelecek-laboratuvari', label: 'Tarih Laboratuvarı' },
  { id: 'zaman-koridoru', label: 'Zaman Koridoru' },
  { id: 'son-arastirmalar', label: 'Son Araştırmalar' },
];

export default function HomeJourneyNav() {
  const [active, setActive] = useState(sections[0].id);

  useEffect(() => {
    const nodes = sections.map(({ id }) => document.getElementById(id)).filter(Boolean);
    if (!nodes.length) return undefined;

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target?.id) setActive(visible.target.id);
    }, { rootMargin: '-18% 0px -65% 0px', threshold: [0.05, 0.2, 0.45] });

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="home-journey-nav" aria-label="Ana sayfa bölümleri">
      <span className="home-journey-label">Keşif rotası</span>
      <div className="home-journey-links">
        {sections.map((section, index) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={active === section.id ? 'is-active' : undefined}
            aria-current={active === section.id ? 'location' : undefined}
          >
            <small>{String(index + 1).padStart(2, '0')}</small>
            <span>{section.label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
