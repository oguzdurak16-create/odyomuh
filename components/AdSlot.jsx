'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { usePathname } from 'next/navigation';

const PUBLISHER_ID = 'ca-pub-4491868887846507';

export default function AdSlot({ slot, label = 'Reklam', afterSelector }) {
  const normalizedSlot = slot?.trim();
  const pathname = usePathname();
  const [target, setTarget] = useState(null);

  useEffect(() => {
    if (!normalizedSlot || !afterSelector) return undefined;
    const anchor = document.querySelector(afterSelector);
    if (!anchor) return undefined;

    const host = document.createElement('div');
    host.dataset.adsensePlacement = 'content';
    anchor.insertAdjacentElement('afterend', host);
    setTarget(host);

    return () => {
      setTarget(null);
      host.remove();
    };
  }, [afterSelector, normalizedSlot, pathname]);

  useEffect(() => {
    if (!normalizedSlot || (afterSelector && !target)) return;
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      // Ad blockers and delayed consent can prevent initialization safely.
    }
  }, [afterSelector, normalizedSlot, pathname, target]);

  if (!normalizedSlot) return null;

  const content = <aside aria-label={label} style={{ width: 'min(1100px, calc(100% - 32px))', margin: '20px auto', minHeight: 120, padding: 12, border: '1px solid rgba(223,185,120,.18)', borderRadius: 18, background: 'rgba(255,255,255,.025)', overflow: 'hidden' }}>
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

  if (afterSelector) return target ? createPortal(content, target) : null;
  return content;
}
