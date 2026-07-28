'use client';

import { useEffect } from 'react';

const PUBLISHER_ID = 'ca-pub-4491868887846507';

export default function AdSlot({ slot, label = 'Reklam' }) {
  const normalizedSlot = slot?.trim();

  useEffect(() => {
    if (!normalizedSlot) return;
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      // Ad blockers and delayed consent can prevent initialization safely.
    }
  }, [normalizedSlot]);

  if (!normalizedSlot) return null;

  return <aside aria-label={label} style={{ width: 'min(1100px, calc(100% - 32px))', margin: '20px auto', minHeight: 120, padding: 12, border: '1px solid rgba(223,185,120,.18)', borderRadius: 18, background: 'rgba(255,255,255,.025)', overflow: 'hidden' }}>
    <span style={{ display: 'block', marginBottom: 8, fontSize: 10, letterSpacing: '.12em', opacity: .58 }}>{label.toLocaleUpperCase('tr-TR')}</span>
    <ins
      className="adsbygoogle"
      style={{ display: 'block', minHeight: 90 }}
      data-ad-client={PUBLISHER_ID}
      data-ad-slot={normalizedSlot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  </aside>;
}
