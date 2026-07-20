import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { allTurkishPosts, allEnglishPosts, turkishLabelStats } from '../lib/content-collections.js';
import { currentTurkishPosts, currentEnglishPosts } from '../data/current-updates.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];
const warnings = [];

function read(relative) {
  return fs.readFileSync(path.join(root, relative), 'utf8');
}

function exists(relative) {
  return fs.existsSync(path.join(root, relative));
}

function walk(directory) {
  const absolute = path.join(root, directory);
  return fs.readdirSync(absolute, { withFileTypes: true }).flatMap((entry) => {
    const relative = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(relative) : [relative];
  });
}

function words(html = '') {
  return String(html).replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ').match(/[A-Za-zÀ-žĞğİıÖöŞşÜüÇç0-9’'-]+/g)?.length || 0;
}

function validatePost(post, locale) {
  const label = `${locale}:${post.id || post.primaryPath || 'unknown'}`;
  for (const field of ['id', 'title', 'description', 'primaryPath', 'published', 'image', 'contentHtml']) {
    if (!post[field]) errors.push(`${label} missing ${field}`);
  }
  if (!Array.isArray(post.labels) || !post.labels.length) errors.push(`${label} has no labels`);
  if (!Array.isArray(post.sources) || post.sources.length < 2) errors.push(`${label} has insufficient sources`);
  if (!Array.isArray(post.faq) || !post.faq.length) errors.push(`${label} has no FAQ data`);
  const count = words(post.contentHtml);
  if (count < 1000) errors.push(`${label} below 1000 words (${count})`);
  if (String(post.image || '').startsWith('/') && !exists(path.join('public', post.image.slice(1)))) errors.push(`${label} image missing: ${post.image}`);
}

const packageJson = JSON.parse(read('package.json'));
const packageLock = JSON.parse(read('package-lock.json'));
if (packageJson.name !== packageLock.name) errors.push('package.json and package-lock.json names differ');
if (packageJson.engines?.node !== packageLock.packages?.['']?.engines?.node) errors.push('Node engine differs between package and lock');
if (packageJson.version !== packageLock.version) warnings.push(`Lockfile display version is ${packageLock.version}; package release is ${packageJson.version}`);

for (const file of ['app/robots.js', 'app/sitemap.js', 'app/news-sitemap.xml/route.js', 'app/feed.xml/route.js', 'app/editorial.css', 'app/audit.css']) {
  if (!exists(file)) errors.push(`Required file missing: ${file}`);
}

const robots = read('app/robots.js');
if (/disallow[^\n]*search/i.test(robots)) errors.push('Search routes are blocked in robots.js; noindex pages must remain crawlable');
if (!robots.includes('news-sitemap.xml')) errors.push('News sitemap is not declared in robots.js');

const sitemap = read('app/sitemap.js');
if (!sitemap.includes('images:')) errors.push('Sitemap does not expose article images');
if (!sitemap.includes('turkishLabelStats')) errors.push('Sitemap does not filter thin label archives');
if (sitemap.includes('const now = new Date()')) errors.push('Sitemap resets every lastModified value on each build');

for (const layout of ['app/(tr)/layout.jsx', 'app/(en)/layout.jsx']) {
  const source = read(layout);
  if (!source.includes("import '../audit.css'")) errors.push(`${layout} does not load audit.css`);
  if (!source.includes('export const viewport')) errors.push(`${layout} has no viewport metadata`);
}

const appFiles = walk('app').filter((file) => /\.(jsx?|mjs)$/.test(file));
for (const file of appFiles) {
  const source = read(file);
  if (/from ['\"](?:\.\.\/)*components\/Sidebar/.test(source)) errors.push(`Legacy sidebar import remains in ${file}`);
  if (source.includes('DailyUpdateBanner')) errors.push(`Legacy daily banner remains in ${file}`);
}

currentTurkishPosts.forEach((post) => validatePost(post, 'tr-current'));
currentEnglishPosts.forEach((post) => validatePost(post, 'en-current'));

const trPosts = allTurkishPosts();
const enPosts = allEnglishPosts();
if (!trPosts.length || !enPosts.length) errors.push('One or both publication archives are empty');
if (new Set(trPosts.map((post) => post.primaryPath)).size !== trPosts.length) errors.push('Duplicate Turkish canonical paths');
if (new Set(enPosts.map((post) => post.primaryPath)).size !== enPosts.length) errors.push('Duplicate English canonical paths');
if (!turkishLabelStats().some((item) => item.count >= 2)) errors.push('No indexable Turkish label clusters found');

if (errors.length) {
  console.error(`Site audit failed with ${errors.length} error(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Site audit passed: ${trPosts.length} Turkish posts, ${enPosts.length} English posts, ${turkishLabelStats().length} Turkish labels.`);
warnings.forEach((warning) => console.warn(`Warning: ${warning}`));
