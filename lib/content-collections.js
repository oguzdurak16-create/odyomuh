import { posts, labels, canonicalLabel } from '../app/site-data.js';
import { englishPosts } from '../data/en-posts.js';
import { currentTurkishPosts, currentEnglishPosts } from '../data/current-updates.js';
import { applyContentOverride } from '../data/seo-overrides.js';

export function uniqueContent(items = []) {
  const seen = new Set();
  return items.filter((item) => {
    const key = item?.id || item?.primaryPath;
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function sortNewest(items = []) {
  return [...items].sort((a, b) => String(b.updated || b.published || '').localeCompare(String(a.updated || a.published || '')));
}

function applyOverrides(items = []) {
  return items.map(applyContentOverride);
}

export function allTurkishPosts() {
  return sortNewest(applyOverrides(uniqueContent([...currentTurkishPosts, ...posts()])));
}

export function allEnglishPosts() {
  return sortNewest(applyOverrides(uniqueContent([...currentEnglishPosts, ...englishPosts])));
}

export function turkishLabelStats() {
  const counts = new Map();
  const latest = new Map();
  for (const post of allTurkishPosts()) {
    for (const rawLabel of post.labels || []) {
      const label = canonicalLabel(rawLabel);
      counts.set(label, (counts.get(label) || 0) + 1);
      const date = post.updated || post.published || null;
      if (date && (!latest.has(label) || String(date) > String(latest.get(label)))) latest.set(label, date);
    }
  }
  return [...counts.entries()]
    .map(([label, count]) => ({ label, count, latest: latest.get(label) || null }))
    .sort((a, b) => (b.count - a.count) || a.label.localeCompare(b.label, 'tr'));
}

export function allTurkishLabels() {
  const combined = new Set(labels().map(canonicalLabel));
  for (const item of turkishLabelStats()) combined.add(item.label);
  return [...combined].sort((a, b) => a.localeCompare(b, 'tr'));
}

export function postsForTurkishLabel(rawLabel) {
  const label = canonicalLabel(rawLabel);
  return allTurkishPosts().filter((post) => (post.labels || []).map(canonicalLabel).includes(label));
}

export function latestDate(items = []) {
  const latest = sortNewest(items)[0];
  return latest?.updated || latest?.published || null;
}
