"use client";

import { useMemo, useState } from 'react';

function normalize(value = '') {
  return String(value)
    .toLocaleLowerCase('tr-TR')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export default function TagsIndex({ items }) {
  const [query, setQuery] = useState('');
  const normalizedQuery = normalize(query.trim());
  const filtered = useMemo(() => (
    normalizedQuery
      ? items.filter((item) => normalize(item.label).includes(normalizedQuery))
      : items
  ), [items, normalizedQuery]);

  const groups = useMemo(() => {
    const map = new Map();
    for (const item of filtered) {
      const first = item.label.trim().charAt(0).toLocaleUpperCase('tr-TR') || '#';
      const key = /[A-ZÇĞİÖŞÜ]/.test(first) ? first : '#';
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(item);
    }
    return [...map.entries()].sort(([a], [b]) => a.localeCompare(b, 'tr'));
  }, [filtered]);

  return (
    <div className="tags-index-experience">
      <div className="tags-index-controls">
        <label className="tags-index-search">
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Etiketlerde ara..."
            aria-label="Etiketlerde ara"
          />
          {query ? <button type="button" onClick={() => setQuery('')} aria-label="Aramayı temizle">×</button> : null}
        </label>
        <span className="tags-index-result-count">{filtered.length} etiket</span>
      </div>

      {groups.length ? (
        <div className="tags-index-groups">
          {groups.map(([letter, tags]) => (
            <section className="tags-letter-group" key={letter} aria-labelledby={`tag-letter-${letter}`}>
              <div className="tags-letter-heading">
                <h2 id={`tag-letter-${letter}`}>{letter}</h2>
                <span>{tags.length}</span>
              </div>
              <div className="tags-index-grid">
                {tags.map((item) => (
                  <a className="tags-index-card" href={`/label/${encodeURIComponent(item.label)}`} key={item.label}>
                    <span className="tags-index-name">{item.label}</span>
                    <span className="tags-index-meta">{item.count} yazı</span>
                    <span className="tags-index-arrow" aria-hidden="true">→</span>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="tags-index-empty">
          <strong>Eşleşen etiket bulunamadı.</strong>
          <p>Farklı bir kelimeyle tekrar ara.</p>
          <button type="button" onClick={() => setQuery('')}>Tüm etiketleri göster</button>
        </div>
      )}
    </div>
  );
}
