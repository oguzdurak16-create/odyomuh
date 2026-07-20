'use client';

import { useMemo, useState } from 'react';

const CATEGORY_ORDER = ['Tümü', 'Türk Tarihi', 'Osmanlı Tarihi', 'Dünya Tarihi', 'Antik Tarih', 'Genel Tarih'];

function normalize(value = '') {
  return String(value)
    .toLocaleLowerCase('tr-TR')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function categoryFor(post) {
  const haystack = normalize(`${post.title} ${(post.labels || []).join(' ')}`);

  if (/antik misir|antik tarih|firavun|piramit/.test(haystack)) return 'Antik Tarih';
  if (/osmanli|iskan|aksemseddin|kurulus donemi/.test(haystack)) return 'Osmanlı Tarihi';
  if (/kurtulus|ataturk|ilk turk|orun|ulus|turk tarihi/.test(haystack)) return 'Türk Tarihi';
  if (/dunya savasi|avrupa|feodal|orta cag|dunya tarihi/.test(haystack)) return 'Dünya Tarihi';
  return 'Genel Tarih';
}

function formatDate(value) {
  if (!value) return '';
  return new Intl.DateTimeFormat('tr-TR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(value));
}

function estimateReadingTime(html = '') {
  const words = String(html).replace(/<[^>]+>/g, ' ').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 210));
}

export default function DersNotlariExperience({ posts = [] }) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Tümü');

  const lessons = useMemo(() => posts.map((post) => ({
    ...post,
    lessonCategory: categoryFor(post),
    readingMinutes: estimateReadingTime(post.contentHtml),
  })), [posts]);

  const categoryCounts = useMemo(() => lessons.reduce((acc, post) => {
    acc[post.lessonCategory] = (acc[post.lessonCategory] || 0) + 1;
    return acc;
  }, {}), [lessons]);

  const availableCategories = CATEGORY_ORDER.filter((category) => category === 'Tümü' || categoryCounts[category]);

  const filteredLessons = useMemo(() => {
    const normalizedQuery = normalize(query.trim());
    return lessons.filter((post) => {
      const categoryMatches = activeCategory === 'Tümü' || post.lessonCategory === activeCategory;
      const queryMatches = !normalizedQuery || normalize(`${post.title} ${post.description} ${(post.labels || []).join(' ')}`).includes(normalizedQuery);
      return categoryMatches && queryMatches;
    });
  }, [lessons, query, activeCategory]);

  return (
    <div className="lessons-page">
      <header className="lessons-hero">
        <div className="lessons-hero-content">
          <p className="lessons-eyebrow">Sınav ve tekrar odaklı içerikler</p>
          <h1>Tarih Ders Notları</h1>
          <p>Konulara ayrılmış, anlaşılır ve doğrudan çalışmaya uygun tarih özetleri. Başlık seçerek veya arama yaparak notlara ulaşabilirsin.</p>
          <div className="lessons-stats" aria-label="Ders notları istatistikleri">
            <span><strong>{lessons.length}</strong><small>Ders notu</small></span>
            <span><strong>{availableCategories.length - 1}</strong><small>Konu alanı</small></span>
            <span><strong>{lessons.reduce((sum, post) => sum + post.readingMinutes, 0)}</strong><small>Dakika içerik</small></span>
          </div>
        </div>
        <div className="lessons-hero-visual" aria-hidden="true">
          <img src="/generated-history/ancient-library-desk.webp" alt="" width="1672" height="941" />
        </div>
      </header>

      <section className="lessons-controls" aria-label="Ders notu filtreleri">
        <label className="lessons-search">
          <span className="lessons-search-icon" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Konu, dönem veya kavram ara..."
            aria-label="Ders notlarında ara"
          />
          {query ? <button type="button" onClick={() => setQuery('')} aria-label="Aramayı temizle">×</button> : null}
        </label>

        <div className="lessons-filter-list" role="group" aria-label="Konu alanı seç">
          {availableCategories.map((category) => (
            <button
              key={category}
              type="button"
              className={activeCategory === category ? 'is-active' : ''}
              onClick={() => setActiveCategory(category)}
            >
              <span>{category}</span>
              <small>{category === 'Tümü' ? lessons.length : categoryCounts[category]}</small>
            </button>
          ))}
        </div>
      </section>

      <div className="lessons-results-head">
        <div>
          <p>Gösterilen içerik</p>
          <h2>{activeCategory === 'Tümü' ? 'Tüm Ders Notları' : activeCategory}</h2>
        </div>
        <span>{filteredLessons.length} sonuç</span>
      </div>

      {filteredLessons.length ? (
        <div className="lessons-grid">
          {filteredLessons.map((post) => (
            <article className="lesson-card" key={post.id}>
              <a className="lesson-card-image" href={post.primaryPath} aria-label={post.title}>
                <img src={post.image} alt={post.title} width="1672" height="941" loading="lazy" decoding="async" />
                <span>{post.lessonCategory}</span>
              </a>
              <div className="lesson-card-content">
                <div className="lesson-card-meta">
                  <span>{formatDate(post.published)}</span>
                  <span>{post.readingMinutes} dk okuma</span>
                </div>
                <h3><a href={post.primaryPath}>{post.title}</a></h3>
                <p>{post.description}</p>
                <a className="lesson-card-link" href={post.primaryPath}>Ders notunu aç <span aria-hidden="true">→</span></a>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="lessons-empty">
          <strong>Sonuç bulunamadı.</strong>
          <p>Arama kelimesini değiştir veya “Tümü” filtresini seç.</p>
          <button type="button" onClick={() => { setQuery(''); setActiveCategory('Tümü'); }}>Filtreleri temizle</button>
        </div>
      )}
    </div>
  );
}
