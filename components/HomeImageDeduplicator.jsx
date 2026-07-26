'use client';

import { useEffect } from 'react';

const fallbackPool = [
  '/generated-history/maritime-chart.webp',
  '/generated-history/classical-ruins-bust.webp',
  '/generated-global/gobekli-tepe.webp',
  '/generated-daily/tartessos-bronze-chariot-2026.svg',
  '/generated-history/ancient-library-desk.webp',
  '/generated-trends/qafzeh-jaw-injury.webp',
  '/generated-middle-east/iran-us-war-2026.webp',
  '/generated-history/mystery-room-key.webp',
  '/generated-history/war-room-map.webp',
  '/generated-history/mythic-temple.webp',
];

function pathnameFor(source) {
  if (!source) return '';
  try {
    return new URL(source, window.location.origin).pathname;
  } catch {
    return String(source);
  }
}

export default function HomeImageDeduplicator() {
  useEffect(() => {
    const root = document.querySelector('.clean-home');
    if (!root) return;

    const images = [...root.querySelectorAll('.clean-lead img, .clean-article-image img')];
    const used = new Set();

    for (const image of images) {
      const current = pathnameFor(image.currentSrc || image.getAttribute('src'));
      if (current && !used.has(current)) {
        used.add(current);
        continue;
      }

      const replacement = fallbackPool.find((candidate) => !used.has(candidate));
      if (!replacement) continue;

      image.removeAttribute('srcset');
      image.setAttribute('src', replacement);
      image.dataset.deduplicatedCover = 'true';
      used.add(replacement);
    }
  }, []);

  return null;
}
