import { readFile, writeFile, access, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = process.cwd();
const POINTER_FILE = path.join(ROOT, 'data', 'current-updates.js');
const API_KEY = process.env.OPENAI_API_KEY;
const IMAGE_MODEL = process.env.OPENAI_IMAGE_MODEL || 'gpt-image-1';

if (!API_KEY) {
  throw new Error('OPENAI_API_KEY is missing. Add it as a GitHub Actions repository secret.');
}

function currentModulePath(pointerSource) {
  const match = pointerSource.match(/from\s+['"]\.\/(current-updates-\d{4}-\d{2}-\d{2}\.js)['"]/);
  if (!match) throw new Error('Could not resolve the dated current-updates module.');
  return path.join(ROOT, 'data', match[1]);
}

function dateFromFilename(filePath) {
  const match = path.basename(filePath).match(/current-updates-(\d{4}-\d{2}-\d{2})\.js/);
  if (!match) throw new Error(`Could not derive date from ${filePath}`);
  return match[1];
}

function cleanSlug(value = '') {
  return String(value)
    .replace(/^\/en\//, '')
    .replace(/^\/+|\/+$/g, '')
    .replace(/\.html$/i, '')
    .replace(/[^a-zA-Z0-9-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
}

function updateImageField(source, objectName, publicPath) {
  const pattern = new RegExp(`(const\\s+${objectName}\\s*=\\s*\\{[\\s\\S]*?\\n\\s*image:\\s*)([^,\\n]+)(,)`);
  if (!pattern.test(source)) {
    throw new Error(`Could not find image field for ${objectName}.`);
  }
  return source.replace(pattern, `$1'${publicPath}'$3`);
}

async function fileExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

const pointerSource = await readFile(POINTER_FILE, 'utf8');
const datedModulePath = currentModulePath(pointerSource);
const moduleUrl = `${pathToFileURL(datedModulePath).href}?cover=${Date.now()}`;
const contentModule = await import(moduleUrl);

const turkishPost = contentModule.dailyTurkishPosts?.[0];
const englishPost = contentModule.dailyEnglishPosts?.[0];
if (!turkishPost || !englishPost) {
  throw new Error('The current content module must export Turkish and English posts.');
}

const date = dateFromFilename(datedModulePath);
const slug = cleanSlug(englishPost.slug || englishPost.primaryPath || turkishPost.primaryPath || turkishPost.id);
if (!slug) throw new Error('Could not create an image filename from the current article.');

const relativeFile = path.join('public', 'generated-daily', `${date}-${slug}.webp`);
const outputFile = path.join(ROOT, relativeFile);
const publicPath = `/${relativeFile.replace(/^public[\\/]/, '').replaceAll('\\', '/')}`;
let datedSource = await readFile(datedModulePath, 'utf8');

if (await fileExists(outputFile)) {
  const updated = updateImageField(updateImageField(datedSource, 'turkishPost', publicPath), 'englishPost', publicPath);
  if (updated !== datedSource) await writeFile(datedModulePath, updated, 'utf8');
  console.log(`Cover already exists: ${publicPath}`);
  process.exit(0);
}

const labels = [...new Set([...(englishPost.labels || []), ...(turkishPost.labels || [])])].slice(0, 8).join(', ');
const prompt = [
  'Create a premium cinematic editorial cover image for a serious history and archaeology publication.',
  `Subject: ${englishPost.title || turkishPost.title}.`,
  `Context: ${englishPost.description || turkishPost.description || ''}`,
  labels ? `Relevant themes: ${labels}.` : '',
  'Landscape composition, historically plausible details, documentary realism, atmospheric natural light, strong depth, clear central subject, visually compelling at thumbnail size.',
  'No text, no letters, no captions, no logos, no watermark, no borders, no modern objects, no fantasy elements unless explicitly required by the historical subject.',
  'Avoid generic stock-photo appearance. Produce one unique scene suitable for both Turkish and English versions of the article.'
].filter(Boolean).join(' ');

const response = await fetch('https://api.openai.com/v1/images/generations', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: IMAGE_MODEL,
    prompt,
    size: '1536x1024',
    quality: 'medium',
    output_format: 'webp',
    background: 'opaque',
    n: 1
  })
});

if (!response.ok) {
  const details = await response.text();
  throw new Error(`OpenAI image generation failed (${response.status}): ${details.slice(0, 1000)}`);
}

const payload = await response.json();
const base64Image = payload?.data?.[0]?.b64_json;
if (!base64Image) throw new Error('OpenAI response did not contain base64 image data.');

await mkdir(path.dirname(outputFile), { recursive: true });
await writeFile(outputFile, Buffer.from(base64Image, 'base64'));

datedSource = updateImageField(datedSource, 'turkishPost', publicPath);
datedSource = updateImageField(datedSource, 'englishPost', publicPath);
await writeFile(datedModulePath, datedSource, 'utf8');

console.log(`Generated cover: ${publicPath}`);
console.log(`Updated content file: ${path.relative(ROOT, datedModulePath)}`);
