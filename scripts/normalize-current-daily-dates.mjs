import { readFile, writeFile } from 'node:fs/promises';

const POINTER_FILE = new URL('../data/current-updates.js', import.meta.url);

function currentModuleName(source) {
  const match = source.match(/from\s+['"]\.\/(current-updates-\d{4}-\d{2}-\d{2}\.js)['"]/);
  if (!match) throw new Error('Could not resolve dated module from data/current-updates.js');
  return match[1];
}

function buildPointer(moduleName) {
  return [
    `import { dailyTurkishPosts, dailyEnglishPosts } from './${moduleName}';`,
    '',
    'function dailyDateFromImage(item) {',
    "  return String(item?.image || '').match(/^\\/generated-daily\\/(\\d{4}-\\d{2}-\\d{2})-/)?.[1] || null;",
    '}',
    '',
    'function normalizeDailyPost(item) {',
    '  const dailyDate = dailyDateFromImage(item);',
    '  if (!dailyDate) return item;',
    '',
    '  const normalizeDateTime = (value) => {',
    '    if (!value) return `${dailyDate}T12:00:00+03:00`;',
    "    return String(value).replace(/^\\d{4}-\\d{2}-\\d{2}/, dailyDate);",
    '  };',
    '',
    '  return {',
    '    ...item,',
    '    published: normalizeDateTime(item.published),',
    '    updated: normalizeDateTime(item.updated || item.published),',
    '  };',
    '}',
    '',
    'export const currentTurkishPosts = dailyTurkishPosts.map(normalizeDailyPost);',
    'export const currentEnglishPosts = dailyEnglishPosts.map(normalizeDailyPost);',
    '',
    'function newestDate(items = []) {',
    '  return items',
    '    .map((item) => item.updated || item.published)',
    '    .filter(Boolean)',
    '    .sort((a, b) => String(b).localeCompare(String(a)))[0] || null;',
    '}',
    '',
    'export const currentUpdateDate = newestDate([...currentTurkishPosts, ...currentEnglishPosts]);',
    '',
  ].join('\n');
}

const source = await readFile(POINTER_FILE, 'utf8');
const moduleName = currentModuleName(source);
const normalized = buildPointer(moduleName);

if (source === normalized) {
  console.log(`Daily pointer already normalized: ${moduleName}`);
} else {
  await writeFile(POINTER_FILE, normalized, 'utf8');
  console.log(`Normalized daily publication dates for pointer: ${moduleName}`);
}
