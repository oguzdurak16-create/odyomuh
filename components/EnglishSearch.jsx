"use client";

import { useMemo, useState } from 'react';

function normalize(value = '') {
  return String(value)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export default function EnglishSearch({ posts }) {
  const [query, setQuery] = useState('');
  const normalized = normalize(query);
  const results = useMemo(() => {
    if (!normalized) return posts;
    const terms = normalized.split(' ').filter(Boolean);
    return posts.filter((post) => {
      const haystack = normalize(`${post.title} ${post.description} ${(post.labels || []).join(' ')} ${post.topic} ${String(post.contentHtml || '').replace(/<[^>]+>/g, ' ')}`);
      return terms.every((term) => haystack.includes(term));
    });
  }, [normalized, posts]);

  return (
    <div className="english-search-tool">
      <label htmlFor="english-search-input">Search the English archive</label>
      <div className="english-search-field">
        <input
          id="english-search-input"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try Anunnaki, Linear A, Roman concrete..."
          autoComplete="off"
        />
        {query ? <button type="button" onClick={() => setQuery('')}>Clear</button> : null}
      </div>
      <p className="english-search-count">{results.length} {results.length === 1 ? 'article' : 'articles'}</p>
      <div className="english-search-results">
        {results.map((post) => (
          <article key={post.id}>
            <a className="english-search-thumb" href={post.primaryPath}>
              <img src={post.image} alt="" width="320" height="180" loading="lazy" />
            </a>
            <div>
              <span>{post.labels[0]}</span>
              <h2><a href={post.primaryPath}>{post.title}</a></h2>
              <p>{post.description}</p>
            </div>
          </article>
        ))}
      </div>
      {!results.length ? <div className="empty-state">No matching English article was found.</div> : null}
    </div>
  );
}
