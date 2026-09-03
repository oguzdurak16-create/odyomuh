import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { currentTurkishPosts, currentEnglishPosts } from '../data/current-updates.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dataDir = path.join(root, 'data');
const STRICT_SINCE = '2026-09-04';
const BLOCKED_HOSTS = [
  'wikipedia.org',
  'wikimedia.org',
  'fandom.com',
  'reddit.com',
  'quora.com',
];
const TRACKING_PARAM = /^(utm_|gclid$|fbclid$|mc_cid$|mc_eid$)/i;
const KNOWN_BAD_HOSTS = new Map([
  ['tcmb.org.tr', 'tcmb.gov.tr'],
]);
const ACADEMIC_OR_OFFICIAL_HOST_HINTS = [
  '.gov.',
  '.gov',
  '.edu.',
  '.edu',
  '.ac.',
  'unesco.org',
  'icomos.org',
  'loc.gov',
  'si.edu',
  'europa.eu',
  'coe.int',
  'imf.org',
  'worldbank.org',
  'oecd.org',
  'doi.org',
  'jstor.org',
  'springer.com',
  'nature.com',
  'science.org',
  'sciencedirect.com',
  'cambridge.org',
  'oup.com',
  'wiley.com',
  'tandfonline.com',
  'britishmuseum.org',
  'metmuseum.org',
  'louvre.fr',
];

const errors = [];
const warnings = [];

function hostOf(value) {
  try {
    return new URL(value).hostname.toLowerCase().replace(/^www\./, '');
  } catch {
    return '';
  }
}

function isBlockedHost(host) {
  return BLOCKED_HOSTS.some((blocked) => host === blocked || host.endsWith(`.${blocked}`));
}

function isOfficialOrAcademic(host) {
  return ACADEMIC_OR_OFFICIAL_HOST_HINTS.some((hint) => host.includes(hint));
}

function extractUrls(value = '') {
  const matches = String(value).match(/https?:\/\/[^\s"'<>\])]+/gi) || [];
  return matches.map((url) => url.replace(/[.,;:!?]+$/, ''));
}

function publishedDate(post) {
  const value = String(post?.published || '');
  return /^\d{4}-\d{2}-\d{2}/.test(value) ? value.slice(0, 10) : '';
}

function validateUrl(url, label) {
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    errors.push(`${label}: invalid source URL ${url}`);
    return;
  }
  if (!['http:', 'https:'].includes(parsed.protocol)) errors.push(`${label}: unsupported source protocol ${url}`);
  const host = parsed.hostname.toLowerCase().replace(/^www\./, '');
  if (isBlockedHost(host)) errors.push(`${label}: blocked low-authority source host ${host}`);
  if (KNOWN_BAD_HOSTS.has(host)) errors.push(`${label}: known incorrect source host ${host}; use ${KNOWN_BAD_HOSTS.get(host)}`);
  for (const key of parsed.searchParams.keys()) {
    if (TRACKING_PARAM.test(key)) errors.push(`${label}: tracking parameter ${key} remains in ${url}`);
  }
  if (parsed.hash) warnings.push(`${label}: source URL contains a fragment and should normally be canonicalized: ${url}`);
}

function validatePost(post, locale) {
  const date = publishedDate(post);
  if (!date || date < STRICT_SINCE) return;
  const label = `${locale}:${post.primaryPath || post.slug || post.id || 'unknown'}`;
  const sourceUrls = [...new Set((post.sources || []).flatMap((source) => extractUrls(source)))];
  if (sourceUrls.length < 4) errors.push(`${label}: requires at least 4 distinct source URLs (${sourceUrls.length})`);
  sourceUrls.forEach((url) => validateUrl(url, label));

  const authoritative = new Set(sourceUrls.map(hostOf).filter((host) => host && isOfficialOrAcademic(host)));
  if (authoritative.size < 2) {
    errors.push(`${label}: requires at least 2 official/academic source hosts (${authoritative.size})`);
  }

  const inlineUrls = [...new Set(extractUrls(post.contentHtml || ''))];
  inlineUrls.forEach((url) => validateUrl(url, `${label}:inline`));

  if (!post.historicalAngle || String(post.historicalAngle).trim().length < 60) {
    errors.push(`${label}: historicalAngle is missing or too weak`);
  }
}

const datedFiles = fs.readdirSync(dataDir)
  .map((name) => name.match(/^current-updates-(\d{4}-\d{2}-\d{2})\.js$/)?.[1])
  .filter(Boolean)
  .sort();

if (!datedFiles.length) {
  errors.push('No dated current-updates files found');
} else {
  const newestDate = datedFiles.at(-1);
  const pointer = fs.readFileSync(path.join(dataDir, 'current-updates.js'), 'utf8');
  const pointerImports = [...pointer.matchAll(/current-updates-(\d{4}-\d{2}-\d{2})\.js/g)].map((match) => match[1]);
  if (!pointerImports.length) errors.push('data/current-updates.js imports no dated daily module');
  if (!pointerImports.includes(newestDate)) errors.push(`Daily pointer omits newest dated module ${newestDate}`);
  if (pointerImports[0] !== newestDate) errors.push(`Newest daily module must be imported first (${newestDate}); found ${pointerImports[0] || 'none'}`);

  const newestPublished = [...currentTurkishPosts, ...currentEnglishPosts]
    .map(publishedDate)
    .filter(Boolean)
    .sort()
    .at(-1);
  if (newestPublished && newestPublished !== newestDate) {
    errors.push(`Newest published daily date ${newestPublished} does not match newest module ${newestDate}`);
  }
}

currentTurkishPosts.forEach((post) => validatePost(post, 'tr'));
currentEnglishPosts.forEach((post) => validatePost(post, 'en'));

if (errors.length) {
  console.error(`Daily source-quality check failed with ${errors.length} error(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

const strictPosts = [...currentTurkishPosts, ...currentEnglishPosts].filter((post) => publishedDate(post) >= STRICT_SINCE);
console.log(`Daily source-quality check passed: ${strictPosts.length} strict post(s), pointer current, blocked/tracked sources rejected.`);
warnings.forEach((warning) => console.warn(`Warning: ${warning}`));
