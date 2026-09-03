import { dailyTurkishPosts, dailyEnglishPosts } from './current-updates-2026-09-03.js';

export const currentTurkishPosts = dailyTurkishPosts;
export const currentEnglishPosts = dailyEnglishPosts;

function newestDate(items = []) {
  return items
    .map((item) => item.updated || item.published)
    .filter(Boolean)
    .sort((a, b) => String(b).localeCompare(String(a)))[0] || null;
}

export const currentUpdateDate = newestDate([...currentTurkishPosts, ...currentEnglishPosts]);
