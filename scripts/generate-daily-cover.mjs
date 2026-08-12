import { createHash } from 'node:crypto';
import { access, mkdir, readFile, rename, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = process.cwd();
const POINTER_FILE = path.join(ROOT, 'data', 'current-updates.js');
const API_KEY = process.env.OPENAI_API_KEY;
const IMAGE_MODEL = process.env.OPENAI_IMAGE_MODEL || 'gpt-image-1';
const IMAGE_SIZE = process.env.OPENAI_IMAGE_SIZE || '1536x1024';
const IMAGE_QUALITY = process.env.OPENAI_IMAGE_QUALITY || 'medium';
const IMAGE_FORMAT = process.env.OPENAI_IMAGE_FORMAT || 'webp';
const IMAGE_COMPRESSION = clampNumber(process.env.OPENAI_IMAGE_COMPRESSION, 84, 0, 100);
const FORCE_REGENERATE = /^(1|true|yes)$/i.test(process.env.FORCE_REGENERATE || '');
const MAX_ATTEMPTS = 3;
const REQUEST_TIMEOUT_MS = 4 * 60 * 1000;

if (!API_KEY) {
  throw new Error('OPENAI_API_KEY is missing. Add it as a GitHub Actions repository secret.');
}
if (IMAGE_FORMAT !== 'webp') {
  throw new Error(`OPENAI_IMAGE_FORMAT must be webp for the current site pipeline, received: ${IMAGE_FORMAT}`);
}

function clampNumber(value, fallback, minimum, maximum) {
  const parsed = Number.parseInt(String(value ?? ''), 10);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(maximum, Math.max(minimum, parsed));
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
  const objectStart = new RegExp(`const\\s+${objectName}\\s*=\\s*\\{`);
  const startMatch = objectStart.exec(source);
  if (!startMatch) throw new Error(`Could not find object ${objectName}.`);

  const objectStartIndex = startMatch.index;
  const rest = source.slice(objectStartIndex + startMatch[0].length);
  const nextObjectMatch = /\nconst\s+[A-Za-z_$][\w$]*\s*=\s*\{/.exec(rest);
  const objectEndIndex = nextObjectMatch
    ? objectStartIndex + startMatch[0].length + nextObjectMatch.index
    : source.length;

  const objectSource = source.slice(objectStartIndex, objectEndIndex);
  const imagePattern = /(\n\s*image:\s*)([^,\n]+)(,)/;
  if (!imagePattern.test(objectSource)) throw new Error(`Could not find image field for ${objectName}.`);

  const updatedObject = objectSource.replace(imagePattern, `$1'${publicPath}'$3`);
  return source.slice(0, objectStartIndex) + updatedObject + source.slice(objectEndIndex);
}

async function fileExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

function hashIndex(seed, length, offset = 0) {
  const digest = createHash('sha256').update(`${seed}:${offset}`).digest();
  return digest.readUInt32BE(0) % length;
}

function visualDirection(seed) {
  const compositions = [
    'A wide environmental establishing shot with the central evidence in the foreground and the historical setting clearly readable behind it.',
    'An artifact-led composition: the key object dominates the foreground while people and architecture provide scale and archaeological context.',
    'A restrained documentary cutaway or sectional view that explains the site, vessel, structure or discovery without becoming an infographic.',
    'A low-angle cinematic field view with researchers or historical figures used only for scale, never as generic posing subjects.',
    'A layered scene with foreground evidence, a strong middle-ground action and a geographically accurate background landmark.',
    'An overhead or oblique archaeological survey composition that makes the discovery context immediately understandable at thumbnail size.'
  ];
  const lighting = [
    'cool early-morning natural light with subtle mist and restrained contrast',
    'warm late-afternoon sunlight with realistic long shadows and earth tones',
    'soft overcast documentary light with highly legible materials and textures',
    'controlled underwater or subterranean illumination appropriate to the subject',
    'museum-grade directional light blended with a historically grounded environmental setting'
  ];
  const palettes = [
    'mineral blue, weathered limestone, muted bronze and dark umber',
    'terracotta, oxidized metal, parchment beige and charcoal',
    'deep Adriatic blue, aged gold, stone grey and restrained teal',
    'desert ochre, basalt black, faded linen and copper',
    'forest green, wet earth, worn timber and antique ivory'
  ];
  return {
    composition: compositions[hashIndex(seed, compositions.length, 1)],
    lighting: lighting[hashIndex(seed, lighting.length, 2)],
    palette: palettes[hashIndex(seed, palettes.length, 3)]
  };
}

function buildPrompt({ turkishPost, englishPost, seed }) {
  const labels = [...new Set([...(englishPost.labels || []), ...(turkishPost.labels || [])])]
    .slice(0, 10)
    .join(', ');
  const direction = visualDirection(seed);
  const coverBrief = englishPost.coverBrief || turkishPost.coverBrief || '';

  return [
    'Create one premium cinematic editorial cover for a serious evidence-led history and archaeology publication.',
    `Article subject: ${englishPost.title || turkishPost.title}.`,
    `Editorial context: ${englishPost.description || turkishPost.description || ''}`,
    coverBrief ? `Mandatory article-specific scene brief: ${coverBrief}` : '',
    labels ? `Historically relevant themes: ${labels}.` : '',
    `Composition mandate: ${direction.composition}`,
    `Lighting mandate: ${direction.lighting}.`,
    `Palette direction: ${direction.palette}.`,
    'Landscape 3:2 composition designed to crop safely to 16:9. Keep the main subject inside the central safe area.',
    'Follow the article-specific scene brief as the primary visual concept. Do not replace it with a generic historical scene.',
    'Use historically and archaeologically plausible clothing, materials, architecture, geography, tools, vessels and artifacts.',
    'Do not fall back to a generic marble bust, open book, scroll, library desk, anonymous ruins, treasure chest or fantasy temple unless that object is central to the actual subject.',
    'The image must be visually distinct from every other publication cover: unique focal object, camera position, action and environmental context.',
    'Documentary realism, natural textures, strong depth, clear silhouette and immediate readability at small thumbnail size.',
    'No text, letters, captions, logos, watermark, decorative border, modern objects, split screen, collage or fabricated inscription.',
    `Internal visual seed: ${seed.slice(0, 16)}. Do not render the seed as text.`
  ].filter(Boolean).join(' ');
}

function isValidWebp(buffer) {
  return buffer.length > 20
    && buffer.subarray(0, 4).toString('ascii') === 'RIFF'
    && buffer.subarray(8, 12).toString('ascii') === 'WEBP';
}

function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function retryableStatus(status) {
  return status === 408 || status === 409 || status === 429 || status >= 500;
}

async function requestImage(prompt) {
  let lastError;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    try {
      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: IMAGE_MODEL,
          prompt,
          size: IMAGE_SIZE,
          quality: IMAGE_QUALITY,
          output_format: IMAGE_FORMAT,
          output_compression: IMAGE_COMPRESSION,
          background: 'opaque',
          n: 1
        }),
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS)
      });

      if (!response.ok) {
        const details = (await response.text()).slice(0, 1200);
        const requestId = response.headers.get('x-request-id');
        const error = new Error(`OpenAI image generation failed (${response.status})${requestId ? ` [${requestId}]` : ''}: ${details}`);
        if (!retryableStatus(response.status) || attempt === MAX_ATTEMPTS) throw error;
        lastError = error;
      } else {
        const payload = await response.json();
        const base64Image = payload?.data?.[0]?.b64_json;
        if (!base64Image) throw new Error('OpenAI response did not contain base64 image data.');
        return Buffer.from(base64Image, 'base64');
      }
    } catch (error) {
      lastError = error;
      const networkError = error?.name === 'TimeoutError' || error?.name === 'AbortError' || error instanceof TypeError;
      if (!networkError || attempt === MAX_ATTEMPTS) throw error;
    }
    const delay = 1500 * (2 ** (attempt - 1));
    console.warn(`Image request attempt ${attempt} failed. Retrying in ${delay} ms...`);
    await sleep(delay);
  }
  throw lastError || new Error('Image generation failed after all retry attempts.');
}

async function appendSummary(lines) {
  const summaryFile = process.env.GITHUB_STEP_SUMMARY;
  if (!summaryFile) return;
  await writeFile(summaryFile, `${lines.join('\n')}\n`, { encoding: 'utf8', flag: 'a' });
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

const seed = createHash('sha256')
  .update(`${date}|${slug}|${englishPost.title || ''}|${turkishPost.title || ''}|${englishPost.coverBrief || turkishPost.coverBrief || ''}`)
  .digest('hex');
const relativeFile = path.join('public', 'generated-daily', `${date}-${slug}.webp`);
const outputFile = path.join(ROOT, relativeFile);
const temporaryFile = `${outputFile}.tmp`;
const publicPath = `/${relativeFile.replace(/^public[\\/]/, '').replaceAll('\\', '/')}`;
let datedSource = await readFile(datedModulePath, 'utf8');

if (!FORCE_REGENERATE && await fileExists(outputFile)) {
  const existing = await readFile(outputFile);
  if (isValidWebp(existing)) {
    const updated = updateImageField(updateImageField(datedSource, 'turkishPost', publicPath), 'englishPost', publicPath);
    if (updated !== datedSource) await writeFile(datedModulePath, updated, 'utf8');
    console.log(`Valid cover already exists: ${publicPath}`);
    await appendSummary(['### Daily AI Cover', '', `Mevcut geçerli kapak kullanıldı: \`${publicPath}\``]);
    process.exit(0);
  }
  console.warn(`Existing cover is invalid and will be regenerated: ${publicPath}`);
}

const prompt = buildPrompt({ turkishPost, englishPost, seed });
console.log(`Generating ${publicPath} with ${IMAGE_MODEL}, ${IMAGE_SIZE}, quality=${IMAGE_QUALITY}.`);
const imageBuffer = await requestImage(prompt);
if (!isValidWebp(imageBuffer)) throw new Error('Generated image payload is not a valid WebP file.');

await mkdir(path.dirname(outputFile), { recursive: true });
await writeFile(temporaryFile, imageBuffer);
await rename(temporaryFile, outputFile);
await rm(temporaryFile, { force: true });

datedSource = updateImageField(datedSource, 'turkishPost', publicPath);
datedSource = updateImageField(datedSource, 'englishPost', publicPath);
await writeFile(datedModulePath, datedSource, 'utf8');

console.log(`Generated cover: ${publicPath}`);
console.log(`Updated content file: ${path.relative(ROOT, datedModulePath)}`);
await appendSummary([
  '### Daily AI Cover',
  '',
  `- Model: \`${IMAGE_MODEL}\``,
  `- Boyut: \`${IMAGE_SIZE}\``,
  `- Kalite: \`${IMAGE_QUALITY}\``,
  `- Dosya: \`${publicPath}\``,
  `- İçerik: \`${path.relative(ROOT, datedModulePath)}\``
]);
