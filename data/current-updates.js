import { dailyTurkishPosts, dailyEnglishPosts } from './current-updates-2026-09-12.js';

function dailyDateFromImage(item) {
  return String(item?.image || '').match(/^\/generated-daily\/(\d{4}-\d{2}-\d{2})-/)?.[1] || null;
}

function normalizeDailyPost(item) {
  const dailyDate = dailyDateFromImage(item);
  if (!dailyDate) return item;

  const normalizeDateTime = (value) => {
    if (!value) return `${dailyDate}T12:00:00+03:00`;
    return String(value).replace(/^\d{4}-\d{2}-\d{2}/, dailyDate);
  };

  return {
    ...item,
    published: normalizeDateTime(item.published),
    updated: normalizeDateTime(item.updated || item.published),
  };
}

export const currentTurkishPosts = dailyTurkishPosts.map(normalizeDailyPost);
export const currentEnglishPosts = dailyEnglishPosts.map(normalizeDailyPost);

function newestDate(items = []) {
  return items
    .map((item) => item.updated || item.published)
    .filter(Boolean)
    .sort((a, b) => String(b).localeCompare(String(a)))[0] || null;
}

export const currentUpdateDate = newestDate([...currentTurkishPosts, ...currentEnglishPosts]);
