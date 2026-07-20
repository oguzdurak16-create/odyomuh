"use client";

import { useMemo, useState } from 'react';

const ERA_ORDER = ['prehistoric', 'ancient', 'medieval', 'early-modern', 'modern'];

function normalize(value = '') {
  return String(value).toLocaleLowerCase('tr-TR').trim();
}

export default function TimelineExperience({ data }) {
  const [activeEra, setActiveEra] = useState('all');
  const [query, setQuery] = useState('');
  const normalizedQuery = normalize(query);

  const visibleEvents = useMemo(() => data.events.filter((event) => {
    const eraMatches = activeEra === 'all' || event.era === activeEra;
    if (!eraMatches) return false;
    if (!normalizedQuery) return true;
    const haystack = normalize(`${event.date} ${event.title} ${event.description} ${event.details} ${event.keywords} ${(event.tags || []).join(' ')}`);
    return haystack.includes(normalizedQuery);
  }), [activeEra, data.events, normalizedQuery]);

  const grouped = useMemo(() => ERA_ORDER.map((era) => ({
    era,
    info: data.eras[era],
    events: visibleEvents.filter((event) => event.era === era),
  })).filter((group) => group.events.length), [data.eras, visibleEvents]);

  return (
    <section className="special-page timeline-page" aria-labelledby="timeline-title">
      <header className="special-hero timeline-hero-new">
        <img src="/generated-history/explorer-desk.webp" alt="Eski harita ve pusula ile tarih kronolojisi" width="1672" height="941" />
        <div className="special-hero-overlay" />
        <div className="special-hero-content">
          <p className="eyebrow">ODYOMUH ARAŞTIRMA ARACI</p>
          <h1 id="timeline-title">Tarih Kronolojisi</h1>
          <p>MÖ 9600’den günümüze uzanan 51 önemli olay. Dönem filtresi ve anahtar kelime aramasıyla tarihsel kırılmaları tek akışta incele.</p>
          <div className="special-hero-stats">
            <span><strong>51</strong> olay</span>
            <span><strong>5</strong> çağ</span>
            <span><strong>10.000+</strong> yıl</span>
          </div>
        </div>
      </header>

      <section className="timeline-controls" aria-label="Kronoloji filtreleri">
        <div className="timeline-search-new">
          <label htmlFor="timelineSearch">Kronolojide ara</label>
          <input
            id="timelineSearch"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Örnek: Roma, İstanbul, savaş, yazı..."
            type="search"
          />
        </div>
        <div className="timeline-filter-row" role="group" aria-label="Çağ filtreleri">
          <button type="button" className={activeEra === 'all' ? 'active' : ''} onClick={() => setActiveEra('all')}>Tüm çağlar</button>
          {ERA_ORDER.map((era) => (
            <button
              type="button"
              key={era}
              className={activeEra === era ? 'active' : ''}
              onClick={() => setActiveEra(era)}
            >
              {data.eras[era]?.title}
            </button>
          ))}
        </div>
        <p className="timeline-result-count"><strong>{visibleEvents.length}</strong> kayıt görüntüleniyor.</p>
      </section>

      {grouped.length ? (
        <div className="timeline-stream">
          {grouped.map((group) => (
            <section className="timeline-era" key={group.era}>
              <header className="timeline-era-heading">
                <span>{group.info?.range}</span>
                <h2>{group.info?.title}</h2>
              </header>
              <div className="timeline-event-list">
                {group.events.map((event, index) => (
                  <article className="timeline-event" key={`${event.era}-${event.date}-${event.title}`}>
                    <div className="timeline-marker" aria-hidden="true"><span>{String(index + 1).padStart(2, '0')}</span></div>
                    <div className="timeline-event-card">
                      <div className="timeline-event-topline">
                        <span className="timeline-date-new">{event.date}</span>
                        {event.tags?.length ? <div className="timeline-tags-new">{event.tags.slice(0, 2).map((tag) => <span key={tag}>{tag}</span>)}</div> : null}
                      </div>
                      <h3>{event.title}</h3>
                      <p>{event.description}</p>
                      {event.details ? <div className="timeline-details-new">{event.details}</div> : null}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>Sonuç bulunamadı</h2>
          <p>Aramayı değiştir veya tüm çağlar filtresine dön.</p>
          <button type="button" onClick={() => { setActiveEra('all'); setQuery(''); }}>Filtreleri temizle</button>
        </div>
      )}
    </section>
  );
}
