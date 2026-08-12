import { createHash } from 'node:crypto';
import { access, readdir, readFile, writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import path from 'node:path';

const ROOT = process.cwd();
const DATA_DIR = path.join(ROOT, 'data');
const POINTER_FILE = path.join(DATA_DIR, 'current-updates.js');
const GENERATOR_FILE = path.join(ROOT, 'scripts', 'generate-daily-cover.mjs');
const FROM_DATE = process.env.COVER_BACKFILL_FROM || '2026-07-23';
const TO_DATE = process.env.COVER_BACKFILL_TO || '9999-12-31';

function dateFromName(name = '') {
  return name.match(/^current-updates-(\d{4}-\d{2}-\d{2})\.js$/)?.[1] || null;
}

function pointerForDate(source, date) {
  const pattern = /current-updates-\d{4}-\d{2}-\d{2}\.js/;
  if (!pattern.test(source)) throw new Error('Could not locate dated import in data/current-updates.js');
  return source.replace(pattern, `current-updates-${date}.js`);
}

function imagePaths(source) {
  const sharedImagePath = source.match(/const\s+imagePath\s*=\s*['"]([^'"]+)['"]/)?.[1] || null;

  const readObjectImage = (objectName) => {
    const pattern = new RegExp(`const\\s+${objectName}\\s*=\\s*\\{[\\s\\S]*?\\bimage:\\s*(?:['\"]([^'\"]+)['\"]|imagePath)`);
    const match = source.match(pattern);
    if (!match) return null;
    return match[1] || sharedImagePath;
  };

  return {
    turkish: readObjectImage('turkishPost'),
    english: readObjectImage('englishPost')
  };
}

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

function runGenerator(date) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [GENERATOR_FILE], {
      cwd: ROOT,
      env: { ...process.env, COVER_TARGET_DATE: date },
      stdio: 'inherit'
    });
    child.on('error', reject);
    child.on('exit', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Cover generation failed for ${date} with exit code ${code}`));
    });
  });
}

async function fileHash(filePath) {
  const buffer = await readFile(filePath);
  return createHash('sha256').update(buffer).digest('hex');
}

async function appendSummary(lines) {
  const summaryFile = process.env.GITHUB_STEP_SUMMARY;
  if (!summaryFile) return;
  await writeFile(summaryFile, `${lines.join('\n')}\n`, { encoding: 'utf8', flag: 'a' });
}

const originalPointer = await readFile(POINTER_FILE, 'utf8');
const datedFiles = (await readdir(DATA_DIR))
  .map((name) => ({ name, date: dateFromName(name) }))
  .filter((item) => item.date && item.date >= FROM_DATE && item.date <= TO_DATE)
  .sort((a, b) => a.date.localeCompare(b.date));

if (!datedFiles.length) {
  throw new Error(`No daily content files found between ${FROM_DATE} and ${TO_DATE}`);
}

try {
  for (const item of datedFiles) {
    console.log(`\n=== Unique cover check: ${item.date} ===`);
    await writeFile(POINTER_FILE, pointerForDate(originalPointer, item.date), 'utf8');
    await runGenerator(item.date);
  }
} finally {
  await writeFile(POINTER_FILE, originalPointer, 'utf8');
}

const usedPaths = new Map();
const usedHashes = new Map();
const verified = [];

for (const item of datedFiles) {
  const modulePath = path.join(DATA_DIR, item.name);
  const source = await readFile(modulePath, 'utf8');
  const images = imagePaths(source);

  if (!images.turkish || !images.english) {
    throw new Error(`${item.name} does not contain resolvable Turkish and English image paths.`);
  }
  if (images.turkish !== images.english) {
    throw new Error(`${item.name} uses different covers for the same bilingual article pair.`);
  }
  if (!images.turkish.startsWith('/generated-daily/')) {
    throw new Error(`${item.name} still uses a shared fallback cover: ${images.turkish}`);
  }
  if (usedPaths.has(images.turkish)) {
    throw new Error(`${item.name} reuses the cover path from ${usedPaths.get(images.turkish)}: ${images.turkish}`);
  }

  const imageFile = path.join(ROOT, 'public', images.turkish.replace(/^\//, ''));
  if (!(await exists(imageFile))) throw new Error(`Generated cover file is missing: ${imageFile}`);

  const hash = await fileHash(imageFile);
  if (usedHashes.has(hash)) {
    throw new Error(`${item.name} contains duplicate image bytes matching ${usedHashes.get(hash)}.`);
  }

  usedPaths.set(images.turkish, item.name);
  usedHashes.set(hash, item.name);
  verified.push(`${item.date}: ${images.turkish}`);
}

console.log('\nAll daily article covers are unique and verified.');
verified.forEach((line) => console.log(`- ${line}`));
await appendSummary([
  '### Unique Daily Cover Audit',
  '',
  `Verified ${verified.length} bilingual article pairs.`,
  '',
  ...verified.map((line) => `- ${line}`)
]);
