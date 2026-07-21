'use client';

import { useEffect, useMemo, useState } from 'react';

export default function GlobalExperience({ items = [] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [installEvent, setInstallEvent] = useState(null);

  useEffect(() => {
    if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(() => {});
    const onKey = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault(); setOpen((value) => !value);
      }
      if (event.key === 'Escape') setOpen(false);
    };
    const onInstall = (event) => { event.preventDefault(); setInstallEvent(event); };
    window.addEventListener('keydown', onKey);
    window.addEventListener('beforeinstallprompt', onInstall);
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('beforeinstallprompt', onInstall); };
  }, []);

  const results = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase('tr-TR');
    if (!normalized) return items.slice(0, 7);
    return items.filter((item) => `${item.title} ${item.description || ''} ${(item.labels || []).join(' ')}`.toLocaleLowerCase('tr-TR').includes(normalized)).slice(0, 9);
  }, [items, query]);

  async function install() {
    if (!installEvent) return;
    await installEvent.prompt();
    setInstallEvent(null);
  }

  return <>
    <div className="ody-floating-tools">
      <button onClick={() => setOpen(true)} aria-label="Hızlı aramayı aç"><span>⌕</span><b>Hızlı keşif</b><kbd>Ctrl K</kbd></button>
      {installEvent && <button className="ody-install" onClick={install}>Uygulamayı yükle</button>}
    </div>
    {open && <div className="ody-command-backdrop" role="presentation" onMouseDown={() => setOpen(false)}>
      <section className="ody-command-palette" role="dialog" aria-modal="true" aria-label="ODYOMUH hızlı keşif" onMouseDown={(event) => event.stopPropagation()}>
        <header><span>⌕</span><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Roma, Göbeklitepe, Osmanlı, mitoloji..."/><button onClick={() => setOpen(false)}>ESC</button></header>
        <div className="ody-command-hints"><span>Anlamlı arama</span><span>Arşiv</span><span>Kronoloji</span><span>Uygarlıklar</span></div>
        <div className="ody-command-results">
          {results.map((item) => <a key={item.id || item.primaryPath} href={item.primaryPath}><small>{item.labels?.[0] || 'Tarih dosyası'}</small><strong>{item.title}</strong><p>{item.description}</p><b>↗</b></a>)}
          {!results.length && <div className="ody-command-empty">Bu ifadeyle eşleşen dosya bulunamadı. <a href={`/search?q=${encodeURIComponent(query)}`}>Gelişmiş aramada dene ↗</a></div>}
        </div>
        <footer><span>↑↓ gezin</span><span>Enter aç</span><span>ESC kapat</span></footer>
      </section>
    </div>}
  </>;
}
