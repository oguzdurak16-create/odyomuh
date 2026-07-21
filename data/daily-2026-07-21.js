import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';
import { dailyTurkishPosts as previousTurkishPosts, dailyEnglishPosts as previousEnglishPosts } from './daily-2026-07-20.js';

const directory = path.join(path.dirname(fileURLToPath(import.meta.url)), 'daily-2026-07-21');
const encoded = [1, 2, 3]
  .map((part) => fs.readFileSync(path.join(directory, `runtime_${part}.txt`), 'utf8').trim())
  .join('');
const payload = JSON.parse(zlib.inflateSync(Buffer.from(encoded, 'base64')).toString('utf8'));

export const dailyTurkishPosts = [...payload.tr, ...previousTurkishPosts];
export const dailyEnglishPosts = [...payload.en, ...previousEnglishPosts];

export function findDailyTurkishPost(pathname) {
  return dailyTurkishPosts.find((post) => post.primaryPath === pathname || post.routes?.includes(pathname));
}

export function findDailyEnglishPost(slug) {
  return dailyEnglishPosts.find((post) => post.slug === slug);
}
