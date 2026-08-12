import { dailyTurkishPosts, dailyEnglishPosts } from './current-updates-2026-08-12.js';

export const currentTurkishPosts = dailyTurkishPosts;
export const currentEnglishPosts = dailyEnglishPosts;

function newestDate(items = []) {
  return items
    .map((item) => item.updated || item.published)
    .filter(Boolean)
    .sort((a, b) => String(b).localeCompare(String(a)))[0] || null;
}

export const currentUpdateDate = newestDate([...currentTurkishPosts, ...currentEnglishPosts]);

// Daily content verified: 2026-08-12
