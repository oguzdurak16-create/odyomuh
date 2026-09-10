import { readFile, writeFile } from 'node:fs/promises';

const POINTER_FILE = new URL('../data/current-updates.js', import.meta.url);

function currentModuleName(source) {
  const match = source.match(/from\s+['"]\.\/(current-updates-\d{4}-\d{2}-\d{2}\.js)['"]/);
  if (!match) throw new Error('Could not resolve dated module from data/current-updates.js');
  return match[1];
}

function buildPointer(moduleName) {
  return `import { dailyTurkishPosts, dailyEnglishPosts } from './${moduleName}';\n\nfunction dailyDateFromImage(item) {\n  return String(item?.image || '').match(/^\\/generated-daily\\/(\\d{4}-\\d{2}-\\d{2})-/)?.[1] || null;\n}\n\nfunction normalizeDailyPost(item) {\n  const dailyDate = dailyDateFromImage(item);\n  if (!dailyDate) return item;\n\n  const normalizeDateTime = (value) => {\n    if (!value) return \\`${'${dailyDate}'}T12:00:00+03:00\\`;\n    return String(value).replace(/^\\d{4}-\\d{2}-\\d{2}/, dailyDate);\n  };\n\n  return {\n    ...item,\n    published: normalizeDateTime(item.published),\n    updated: normalizeDateTime(item.updated || item.published),\n  };\n}\n\nexport const currentTurkishPosts = dailyTurkishPosts.map(normalizeDailyPost);\nexport const currentEnglishPosts = dailyEnglishPosts.map(normalizeDailyPost);\n\nfunction newestDate(items = []) {\n  return items\n    .map((item) => item.updated || item.published)\n    .filter(Boolean)\n    .sort((a, b) => String(b).localeCompare(String(a)))[0] || null;\n}\n\nexport const currentUpdateDate = newestDate([...currentTurkishPosts, ...currentEnglishPosts]);\n`;
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
