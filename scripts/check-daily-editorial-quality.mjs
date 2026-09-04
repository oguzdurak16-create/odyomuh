import { currentTurkishPosts, currentEnglishPosts } from '../data/current-updates.js';

const STRICT_SINCE = '2026-09-05';

const posts = [
  { language: 'tr', post: currentTurkishPosts?.[0] },
  { language: 'en', post: currentEnglishPosts?.[0] },
].filter(({ post }) => post);

if (!posts.length) {
  console.error('Daily editorial quality check: no current daily posts were found.');
  process.exit(1);
}

function stripHtml(value = '') {
  return String(value)
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;|&#160;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

function postDate(post) {
  const explicit = String(post?.published || post?.updated || '').slice(0, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(explicit) ? explicit : '';
}

function duplicateParagraphs(html = '') {
  const paragraphs = [...String(html).matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)]
    .map((match) => stripHtml(match[1]).toLowerCase())
    .map((text) => text.replace(/[^a-z0-9çğıöşüâîû]+/gi, ' ').replace(/\s+/g, ' ').trim())
    .filter((text) => text.length >= 120);
  const seen = new Set();
  return [...new Set(paragraphs.filter((paragraph) => {
    if (seen.has(paragraph)) return true;
    seen.add(paragraph);
    return false;
  }))];
}

const suspiciousPatterns = [
  { label: 'draft placeholder', pattern: /\b(?:todo|tbd|lorem ipsum)\b/i },
  { label: 'AI self-reference', pattern: /\b(?:as an ai|as a language model|bir yapay zek[aâ] olarak)\b/i },
  { label: 'editorial failure message', pattern: /\b(?:cannot verify|unable to verify|doğrulayamıyorum|kaynak bulamadım)\b/i },
  { label: 'markdown code fence', pattern: /```/ },
];

const languagePatterns = {
  tr: [
    { label: 'malformed Turkish phrase: boyama/ozon', pattern: /boyama\s*\/\s*ozon/iu },
    { label: 'Turkish typo: analizlar', pattern: /\banalizlar\b/iu },
    { label: 'Turkish typo: radiokarbon', pattern: /\bradiokarbon\b/iu },
  ],
  en: [],
};

let strictFailures = 0;
let warnings = 0;

for (const { language, post } of posts) {
  const date = postDate(post);
  const strict = Boolean(date && date >= STRICT_SINCE);
  const text = [post.title, post.description, post.metaDescription, post.contentHtml].filter(Boolean).join('\n');
  const issues = [];

  for (const rule of [...suspiciousPatterns, ...(languagePatterns[language] || [])]) {
    if (rule.pattern.test(text)) issues.push(rule.label);
  }

  const duplicates = duplicateParagraphs(post.contentHtml);
  if (duplicates.length) issues.push(`${duplicates.length} duplicated long paragraph(s)`);

  if (!/<h2\b/i.test(String(post.contentHtml || ''))) issues.push('article has no H2 section');
  if (!/<h2[^>]*>[^<]*(?:Sık sorulan sorular|Sources and further reading|Frequently asked questions|FAQ)/i.test(String(post.contentHtml || ''))
      && !/(Sık sorulan sorular|Frequently asked questions)/i.test(String(post.contentHtml || ''))) {
    issues.push('FAQ section is missing');
  }

  if (!issues.length) {
    console.log(`Editorial quality passed: ${language.toUpperCase()} ${date || '(unknown date)'} — ${post.title}`);
    continue;
  }

  const prefix = strict ? 'ERROR' : 'WARN';
  console.log(`${prefix}: ${language.toUpperCase()} ${date || '(unknown date)'} — ${post.title}`);
  for (const issue of issues) console.log(`  - ${issue}`);

  if (strict) strictFailures += issues.length;
  else warnings += issues.length;
}

if (warnings) {
  console.warn(`Daily editorial quality found ${warnings} legacy/current warning(s) before strict date ${STRICT_SINCE}.`);
}

if (strictFailures) {
  console.error(`Daily editorial quality failed with ${strictFailures} issue(s). Fix the generated copy before publishing or generating a cover.`);
  process.exit(1);
}

console.log(`Daily editorial quality gate passed. Strict enforcement starts ${STRICT_SINCE}.`);
