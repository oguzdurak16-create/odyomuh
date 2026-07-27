import { access, mkdir, readFile, rename, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = process.cwd();
const DATA_DIR = path.join(ROOT, 'data');
const POINTER_FILE = path.join(DATA_DIR, 'current-updates.js');
const API_KEY = process.env.OPENAI_API_KEY;
const TEXT_MODEL = process.env.OPENAI_TEXT_MODEL || 'gpt-5-mini';
const REASONING_EFFORT = process.env.OPENAI_REASONING_EFFORT || 'low';
const FORCE_REGENERATE = /^(1|true|yes)$/i.test(process.env.FORCE_REGENERATE || '');
const REQUEST_TIMEOUT_MS = 12 * 60 * 1000;
const MAX_API_ATTEMPTS = 3;
const MAX_CONTENT_ATTEMPTS = 2;
const TIME_ZONE = 'Europe/Istanbul';

if (!API_KEY) {
  throw new Error('OPENAI_API_KEY is missing. Add it as a GitHub Actions repository secret.');
}

function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function fileExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

function localDateString(date = new Date()) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-CA', {
      timeZone: TIME_ZONE,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).formatToParts(date).map((part) => [part.type, part.value])
  );
  return `${parts.year}-${parts.month}-${parts.day}`;
}

function normalizeRequestedDate(value) {
  const candidate = String(value || '').trim();
  if (!candidate) return localDateString();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(candidate)) {
    throw new Error(`CONTENT_DATE must use YYYY-MM-DD, received: ${candidate}`);
  }
  const parsed = new Date(`${candidate}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) throw new Error(`Invalid CONTENT_DATE: ${candidate}`);
  return candidate;
}

function cleanSlug(value = '') {
  return String(value)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ı/g, 'i')
    .replace(/İ/g, 'I')
    .replace(/ğ/g, 'g')
    .replace(/Ğ/g, 'G')
    .replace(/ş/g, 's')
    .replace(/Ş/g, 'S')
    .replace(/ö/g, 'o')
    .replace(/Ö/g, 'O')
    .replace(/ü/g, 'u')
    .replace(/Ü/g, 'U')
    .replace(/ç/g, 'c')
    .replace(/Ç/g, 'C')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 96);
}

function decodeXml(value = '') {
  return String(value)
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .trim();
}

function xmlTag(block, name) {
  const escaped = name.replace(':', '\\:');
  const match = block.match(new RegExp(`<${escaped}[^>]*>([\\s\\S]*?)<\\/${escaped}>`, 'i'));
  return decodeXml(match?.[1] || '');
}

function parseTrendRss(xml, geo) {
  const items = [];
  for (const match of String(xml).matchAll(/<item>([\s\S]*?)<\/item>/gi)) {
    const block = match[1];
    const keyword = xmlTag(block, 'title');
    if (!keyword) continue;
    const relatedNews = [...block.matchAll(/<ht:news_item_title[^>]*>([\s\S]*?)<\/ht:news_item_title>/gi)]
      .map((item) => decodeXml(item[1]))
      .filter(Boolean)
      .slice(0, 3);
    items.push({
      geo,
      keyword,
      traffic: xmlTag(block, 'ht:approx_traffic'),
      published: xmlTag(block, 'pubDate'),
      relatedNews
    });
  }
  return items;
}

async function fetchWithRetry(url, options = {}, attempts = 3) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'User-Agent': 'ODYOMUH-Daily-History/1.0',
          ...(options.headers || {})
        },
        signal: AbortSignal.timeout(options.timeout || 30_000)
      });
      if (!response.ok) {
        const details = (await response.text()).slice(0, 600);
        throw new Error(`${url} returned ${response.status}: ${details}`);
      }
      return response;
    } catch (error) {
      lastError = error;
      if (attempt === attempts) break;
      await sleep(1200 * (2 ** (attempt - 1)));
    }
  }
  throw lastError || new Error(`Request failed: ${url}`);
}

async function fetchTrendCandidates() {
  const feeds = [
    { geo: 'TR', url: 'https://trends.google.com/trending/rss?geo=TR&hl=tr' },
    { geo: 'US', url: 'https://trends.google.com/trending/rss?geo=US&hl=en-US' }
  ];
  const combined = [];
  for (const feed of feeds) {
    try {
      const response = await fetchWithRetry(feed.url, {}, 2);
      combined.push(...parseTrendRss(await response.text(), feed.geo));
    } catch (error) {
      console.warn(`Trend feed unavailable for ${feed.geo}: ${error.message}`);
    }
  }
  const seen = new Set();
  return combined.filter((item) => {
    const key = item.keyword.toLocaleLowerCase('tr-TR');
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, 30);
}

function currentModuleName(pointerSource) {
  const match = pointerSource.match(/from\s+['"]\.\/(current-updates-\d{4}-\d{2}-\d{2}\.js)['"]/);
  if (!match) throw new Error('Could not resolve the dated module from data/current-updates.js.');
  return match[1];
}

function importedPreviousModuleName(datedSource) {
  const match = datedSource.match(/from\s+['"]\.\/(current-updates-\d{4}-\d{2}-\d{2}\.js)['"]/);
  if (!match) throw new Error('Could not resolve the previous dated module from the existing daily file.');
  return match[1];
}

function responseSchema() {
  const faqItem = {
    type: 'object',
    additionalProperties: false,
    required: ['question', 'answer'],
    properties: {
      question: { type: 'string' },
      answer: { type: 'string' }
    }
  };
  const article = {
    type: 'object',
    additionalProperties: false,
    required: ['slug', 'title', 'seoTitle', 'description', 'metaDescription', 'labels', 'contentHtml', 'faq'],
    properties: {
      slug: { type: 'string' },
      title: { type: 'string' },
      seoTitle: { type: 'string' },
      description: { type: 'string' },
      metaDescription: { type: 'string' },
      labels: { type: 'array', items: { type: 'string' } },
      contentHtml: { type: 'string' },
      faq: { type: 'array', items: faqItem }
    }
  };
  return {
    type: 'object',
    additionalProperties: false,
    required: ['trend', 'coverBrief', 'sources', 'turkish', 'english'],
    properties: {
      trend: {
        type: 'object',
        additionalProperties: false,
        required: ['keyword', 'source', 'selectionReasonTr', 'selectionReasonEn', 'historicalAngleTr', 'historicalAngleEn'],
        properties: {
          keyword: { type: 'string' },
          source: { type: 'string' },
          selectionReasonTr: { type: 'string' },
          selectionReasonEn: { type: 'string' },
          historicalAngleTr: { type: 'string' },
          historicalAngleEn: { type: 'string' }
        }
      },
      coverBrief: { type: 'string' },
      sources: {
        type: 'array',
        items: {
          type: 'object',
          additionalProperties: false,
          required: ['title', 'publisher', 'url', 'publishedDate'],
          properties: {
            title: { type: 'string' },
            publisher: { type: 'string' },
            url: { type: 'string' },
            publishedDate: { type: 'string' }
          }
        }
      },
      turkish: article,
      english: article
    }
  };
}

function extractOutputText(payload) {
  if (typeof payload?.output_text === 'string' && payload.output_text.trim()) return payload.output_text;
  const chunks = [];
  for (const item of payload?.output || []) {
    if (item?.type !== 'message') continue;
    for (const content of item.content || []) {
      if (content?.type === 'output_text' && typeof content.text === 'string') chunks.push(content.text);
    }
  }
  return chunks.join('\n').trim();
}

function parseJsonOutput(text) {
  const cleaned = String(text || '').trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '');
  try {
    return JSON.parse(cleaned);
  } catch {
    const start = cleaned.indexOf('{');
    const end = cleaned.lastIndexOf('}');
    if (start >= 0 && end > start) return JSON.parse(cleaned.slice(start, end + 1));
    throw new Error('OpenAI response did not contain valid JSON.');
  }
}

function retryableStatus(status) {
  return status === 408 || status === 409 || status === 429 || status >= 500;
}

async function requestPackage(prompt) {
  let lastError;
  let useStrictSchema = true;
  for (let attempt = 1; attempt <= MAX_API_ATTEMPTS; attempt += 1) {
    try {
      const format = useStrictSchema
        ? {
            type: 'json_schema',
            name: 'odyomuh_daily_history_package',
            strict: true,
            schema: responseSchema()
          }
        : { type: 'json_object' };
      const response = await fetch('https://api.openai.com/v1/responses', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
          'X-Client-Request-Id': `odyomuh-${Date.now()}-${attempt}`
        },
        body: JSON.stringify({
          model: TEXT_MODEL,
          store: false,
          max_output_tokens: 20_000,
          reasoning: { effort: REASONING_EFFORT },
          tools: [
            {
              type: 'web_search',
              search_context_size: 'high',
              user_location: {
                type: 'approximate',
                country: 'TR',
                timezone: TIME_ZONE
              }
            }
          ],
          input: [
            {
              role: 'system',
              content: [
                {
                  type: 'input_text',
                  text: 'You are the senior bilingual history editor and fact-checker for ODYOMUH. Use web search actively. Select a genuinely relevant current search trend, connect it to a defensible historical angle, verify claims with authoritative sources, and produce publication-ready Turkish and English long-form articles. Never invent sources, quotations, discoveries, dates or URLs.'
                }
              ]
            },
            {
              role: 'user',
              content: [{ type: 'input_text', text: prompt }]
            }
          ],
          text: {
            verbosity: 'high',
            format
          }
        }),
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS)
      });

      if (!response.ok) {
        const details = (await response.text()).slice(0, 1800);
        if (response.status === 400 && useStrictSchema && /json_schema|text\.format|schema/i.test(details)) {
          console.warn('Strict Structured Outputs request was rejected; retrying with JSON object mode.');
          useStrictSchema = false;
          continue;
        }
        const requestId = response.headers.get('x-request-id');
        const error = new Error(`OpenAI content generation failed (${response.status})${requestId ? ` [${requestId}]` : ''}: ${details}`);
        if (!retryableStatus(response.status) || attempt === MAX_API_ATTEMPTS) throw error;
        lastError = error;
      } else {
        const payload = await response.json();
        if (payload.status === 'incomplete') {
          throw new Error(`OpenAI response was incomplete: ${JSON.stringify(payload.incomplete_details || {})}`);
        }
        const outputText = extractOutputText(payload);
        if (!outputText) throw new Error('OpenAI response contained no output text.');
        return parseJsonOutput(outputText);
      }
    } catch (error) {
      lastError = error;
      const networkError = error?.name === 'TimeoutError' || error?.name === 'AbortError' || error instanceof TypeError;
      if (!networkError || attempt === MAX_API_ATTEMPTS) throw error;
    }
    const delay = 1800 * (2 ** (attempt - 1));
    console.warn(`Content request attempt ${attempt} failed. Retrying in ${delay} ms...`);
    await sleep(delay);
  }
  throw lastError || new Error('OpenAI content generation failed.');
}

function stripHtml(html = '') {
  return String(html).replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ');
}

function wordCount(html = '') {
  return stripHtml(html).match(/[A-Za-zÀ-žĞğİıÖöŞşÜüÇç0-9’'-]+/g)?.length || 0;
}

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function safeUrl(value = '') {
  const url = new URL(String(value));
  if (!['http:', 'https:'].includes(url.protocol)) throw new Error(`Unsupported source URL: ${value}`);
  return url.toString();
}

function formatSources(sources, language) {
  const heading = language === 'tr' ? 'Kaynaklar ve ileri okuma' : 'Sources and further reading';
  const items = sources.map((source) => {
    const url = safeUrl(source.url);
    const date = source.publishedDate ? `, ${escapeHtml(source.publishedDate)}` : '';
    return `<li><a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.title)}</a> — ${escapeHtml(source.publisher)}${date}</li>`;
  }).join('');
  return `<h2>${heading}</h2><ul>${items}</ul>`;
}

function formatFaq(faq, language) {
  const heading = language === 'tr' ? 'Sık sorulan sorular' : 'Frequently asked questions';
  return `<h2>${heading}</h2>${faq.map((item) => `<h3>${escapeHtml(item.question)}</h3><p>${escapeHtml(item.answer)}</p>`).join('')}`;
}

function validateHtml(html, language) {
  const errors = [];
  if (!html.includes('<h2>')) errors.push(`${language} content has no H2 headings`);
  if (!html.includes('<p>')) errors.push(`${language} content has no paragraphs`);
  if (/```/.test(html)) errors.push(`${language} content contains Markdown fences`);
  if (/<(?:script|iframe|object|embed|style|form)\b/i.test(html)) errors.push(`${language} content contains unsafe HTML`);
  if (/\son[a-z]+\s*=|javascript:/i.test(html)) errors.push(`${language} content contains unsafe attributes`);
  if (wordCount(html) < 1000) errors.push(`${language} article is below 1000 words (${wordCount(html)})`);
  return errors;
}

function normalizeLabels(values) {
  const seen = new Set();
  return (Array.isArray(values) ? values : [])
    .map((value) => String(value || '').trim())
    .filter((value) => value && !seen.has(value.toLocaleLowerCase('tr-TR')) && seen.add(value.toLocaleLowerCase('tr-TR')))
    .slice(0, 8);
}

function normalizeFaq(values) {
  return (Array.isArray(values) ? values : [])
    .map((item) => ({ question: String(item?.question || '').trim(), answer: String(item?.answer || '').trim() }))
    .filter((item) => item.question && item.answer)
    .slice(0, 6);
}

function normalizeSources(values) {
  const seen = new Set();
  return (Array.isArray(values) ? values : [])
    .map((source) => ({
      title: String(source?.title || '').trim(),
      publisher: String(source?.publisher || '').trim(),
      url: String(source?.url || '').trim(),
      publishedDate: String(source?.publishedDate || '').trim()
    }))
    .filter((source) => {
      if (!source.title || !source.publisher || !source.url) return false;
      try {
        const url = safeUrl(source.url);
        const key = url.replace(/\/$/, '').toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        source.url = url;
        return true;
      } catch {
        return false;
      }
    })
    .slice(0, 8);
}

function normalizePackage(raw) {
  const sources = normalizeSources(raw?.sources);
  const trFaq = normalizeFaq(raw?.turkish?.faq);
  const enFaq = normalizeFaq(raw?.english?.faq);
  const turkish = {
    ...raw?.turkish,
    slug: cleanSlug(raw?.turkish?.slug || raw?.turkish?.title),
    title: String(raw?.turkish?.title || '').trim(),
    seoTitle: String(raw?.turkish?.seoTitle || '').trim(),
    description: String(raw?.turkish?.description || '').trim(),
    metaDescription: String(raw?.turkish?.metaDescription || '').trim(),
    labels: normalizeLabels(raw?.turkish?.labels),
    contentHtml: String(raw?.turkish?.contentHtml || '').trim(),
    faq: trFaq
  };
  const english = {
    ...raw?.english,
    slug: cleanSlug(raw?.english?.slug || raw?.english?.title),
    title: String(raw?.english?.title || '').trim(),
    seoTitle: String(raw?.english?.seoTitle || '').trim(),
    description: String(raw?.english?.description || '').trim(),
    metaDescription: String(raw?.english?.metaDescription || '').trim(),
    labels: normalizeLabels(raw?.english?.labels),
    contentHtml: String(raw?.english?.contentHtml || '').trim(),
    faq: enFaq
  };
  turkish.contentHtml = `${turkish.contentHtml}\n${formatFaq(trFaq, 'tr')}\n${formatSources(sources, 'tr')}`;
  english.contentHtml = `${english.contentHtml}\n${formatFaq(enFaq, 'en')}\n${formatSources(sources, 'en')}`;
  return {
    trend: {
      keyword: String(raw?.trend?.keyword || '').trim(),
      source: String(raw?.trend?.source || '').trim(),
      selectionReasonTr: String(raw?.trend?.selectionReasonTr || '').trim(),
      selectionReasonEn: String(raw?.trend?.selectionReasonEn || '').trim(),
      historicalAngleTr: String(raw?.trend?.historicalAngleTr || '').trim(),
      historicalAngleEn: String(raw?.trend?.historicalAngleEn || '').trim()
    },
    coverBrief: String(raw?.coverBrief || '').trim(),
    sources,
    turkish,
    english
  };
}

function validatePackage(content, existingPaths, existingTitles) {
  const errors = [];
  if (!content.trend.keyword) errors.push('Trend keyword is missing');
  if (!content.coverBrief) errors.push('Cover brief is missing');
  if (content.sources.length < 4) errors.push(`At least four verified sources are required (${content.sources.length})`);
  for (const [language, article] of [['Turkish', content.turkish], ['English', content.english]]) {
    for (const field of ['slug', 'title', 'seoTitle', 'description', 'metaDescription']) {
      if (!article[field]) errors.push(`${language} ${field} is missing`);
    }
    if (article.labels.length < 4) errors.push(`${language} needs at least four labels`);
    if (article.faq.length < 4) errors.push(`${language} needs at least four FAQ entries`);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(article.slug)) errors.push(`${language} slug is invalid: ${article.slug}`);
    errors.push(...validateHtml(article.contentHtml, language));
  }
  if (content.turkish.slug === content.english.slug) errors.push('Turkish and English slugs must be independently localized');
  const trTitleKey = content.turkish.title.toLocaleLowerCase('tr-TR');
  const enTitleKey = content.english.title.toLowerCase();
  if (existingTitles.has(trTitleKey) || existingTitles.has(enTitleKey)) errors.push('Generated title duplicates an existing daily article');
  const candidatePaths = [content.turkish.slug, content.english.slug];
  for (const slug of candidatePaths) {
    if ([...existingPaths].some((value) => value.includes(`/${slug}`))) errors.push(`Generated slug duplicates an existing route: ${slug}`);
  }
  return [...new Set(errors)];
}

function buildPrompt({ date, trends, recentTitles, validationFeedback = [] }) {
  const trendText = trends.length
    ? JSON.stringify(trends, null, 2)
    : 'Google Trends RSS could not be reached. Use web search to identify current search interest in Türkiye and select a suitable history-related angle.';
  return `Publication date: ${date} (${TIME_ZONE}).

Goal: Produce exactly one daily ODYOMUH story package in Turkish and English, based on current search interest and verified historical evidence.

Current trend candidates collected from Google Trends RSS:
${trendText}

Recent ODYOMUH daily titles that must not be repeated:
${recentTitles.length ? recentTitles.map((title) => `- ${title}`).join('\n') : '- None supplied'}

Editorial selection rules:
1. Prefer a Turkish trend. A global trend may be used only when it has clear relevance for Turkish and English readers.
2. The historical connection must be natural and substantial. Do not force a historical angle onto a celebrity scandal, live tragedy, betting topic or disposable meme.
3. If none of the supplied trend candidates supports a strong article, use web search to find a currently trending archaeology discovery, historical anniversary, museum event, cultural heritage issue or major research development. Record the trend source honestly.
4. Avoid partisan advocacy. Explain evidence, uncertainty and competing interpretations where relevant.
5. Use at least four distinct, working source URLs. Prefer primary excavation pages, universities, museums, government heritage bodies, peer-reviewed research and major reputable news agencies. At least two sources should be primary, official or academic whenever available.
6. Open and verify every source with web search. Never fabricate a URL, publication, quotation, date or discovery.
7. The Turkish and English articles must cover the same researched subject and evidence, but each must read naturally in its own language rather than as a literal translation.

Article requirements for BOTH languages:
- 1,050 to 1,400 words in contentHtml before the automatically appended FAQ and source list.
- Valid HTML fragments only: div, h2, h3, p, strong, em, ul, ol, li and a.
- Begin with one concise <div class="odyomuh-note"> summary.
- Use 7 to 10 informative H2 sections and evidence-led paragraphs.
- Include one <div class="odyomuh-fact"><strong>...</strong>...</div> that clearly separates confirmed evidence from inference.
- No Markdown, no code fences, no H1, no scripts, no inline styles and no fake quotations.
- Do not mention content automation, prompts, Google Trends mechanics or SEO strategy inside the article.
- Supply 4 to 6 FAQ pairs separately; do not place FAQ or sources inside contentHtml because the publishing script appends them.
- Provide 4 to 8 concise labels.
- Turkish slug must be natural ASCII Turkish transliteration; English slug must be natural English. They must be different.
- Meta descriptions should be roughly 130 to 160 characters.

Cover brief:
- Describe one specific, historically plausible, text-free, cinematic 16:9 editorial scene tied to the article.
- It must have a distinct focal object, location, camera angle and action, not a generic ruin, bust, scroll, library or treasure chest.

Return only the requested JSON structure.${validationFeedback.length ? `\n\nThe previous draft failed validation. Correct every issue:\n- ${validationFeedback.join('\n- ')}` : ''}`;
}

function toJsObject(value) {
  return JSON.stringify(value, null, 2).replace(/^(\s*)"([A-Za-z_$][A-Za-z0-9_$]*)":/gm, '$1$2:');
}

function buildDatedModule({ date, previousModule, content }) {
  const [year, month] = date.split('-');
  const trPath = `/${year}/${month}/${content.turkish.slug}.html`;
  const enPath = `/en/${content.english.slug}`;
  const image = `/generated-daily/${date}-${content.english.slug}.webp`;
  const published = new Date().toISOString();
  const sourceStrings = content.sources.map((source) => `${source.publisher}, ${source.title}${source.publishedDate ? `, ${source.publishedDate}` : ''}, ${source.url}`);
  const turkishPost = {
    id: `tr-${content.turkish.slug}`,
    primaryPath: trPath,
    routes: [trPath],
    englishPath: enPath,
    title: content.turkish.title,
    description: content.turkish.description,
    seoTitle: content.turkish.seoTitle,
    metaDescription: content.turkish.metaDescription,
    published,
    updated: published,
    labels: content.turkish.labels,
    image,
    trendKeyword: content.trend.keyword,
    trendSource: content.trend.source,
    historicalAngle: content.trend.historicalAngleTr,
    coverBrief: content.coverBrief,
    contentHtml: content.turkish.contentHtml,
    faq: content.turkish.faq,
    sources: sourceStrings
  };
  const englishPost = {
    id: `en-${content.english.slug}`,
    slug: content.english.slug,
    primaryPath: enPath,
    routes: [enPath],
    turkishPath: trPath,
    title: content.english.title,
    description: content.english.description,
    seoTitle: content.english.seoTitle,
    metaDescription: content.english.metaDescription,
    published,
    updated: published,
    labels: content.english.labels,
    image,
    trendKeyword: content.trend.keyword,
    trendSource: content.trend.source,
    historicalAngle: content.trend.historicalAngleEn,
    coverBrief: content.coverBrief,
    contentHtml: content.english.contentHtml,
    faq: content.english.faq,
    sources: sourceStrings
  };
  return `import { dailyTurkishPosts as previousTurkishPosts, dailyEnglishPosts as previousEnglishPosts } from './${previousModule}';\n\nconst turkishPost = ${toJsObject(turkishPost)};\n\nconst englishPost = ${toJsObject(englishPost)};\n\nexport const dailyTurkishPosts = [turkishPost, ...previousTurkishPosts];\nexport const dailyEnglishPosts = [englishPost, ...previousEnglishPosts];\n`;
}

function buildPointer(date) {
  return `import { dailyTurkishPosts, dailyEnglishPosts } from './current-updates-${date}.js';\n\nexport const currentTurkishPosts = dailyTurkishPosts;\nexport const currentEnglishPosts = dailyEnglishPosts;\n\nfunction newestDate(items = []) {\n  return items\n    .map((item) => item.updated || item.published)\n    .filter(Boolean)\n    .sort((a, b) => String(b).localeCompare(String(a)))[0] || null;\n}\n\nexport const currentUpdateDate = newestDate([...currentTurkishPosts, ...currentEnglishPosts]);\n`;
}

async function atomicWrite(filePath, content) {
  await mkdir(path.dirname(filePath), { recursive: true });
  const temporary = `${filePath}.tmp`;
  await writeFile(temporary, content, 'utf8');
  await rename(temporary, filePath);
  await rm(temporary, { force: true });
}

async function appendSummary(lines) {
  const summaryFile = process.env.GITHUB_STEP_SUMMARY;
  if (!summaryFile) return;
  await writeFile(summaryFile, `${lines.join('\n')}\n`, { encoding: 'utf8', flag: 'a' });
}

const date = normalizeRequestedDate(process.env.CONTENT_DATE);
const targetName = `current-updates-${date}.js`;
const targetFile = path.join(DATA_DIR, targetName);
const targetExists = await fileExists(targetFile);
const pointerSource = await readFile(POINTER_FILE, 'utf8');
const pointerModule = currentModuleName(pointerSource);

if (targetExists && !FORCE_REGENERATE) {
  console.log(`Daily bilingual content already exists for ${date}: data/${targetName}`);
  await appendSummary(['### Daily bilingual history', '', `İçerik zaten mevcut: \`data/${targetName}\``]);
  process.exit(0);
}

const previousModule = targetExists
  ? importedPreviousModuleName(await readFile(targetFile, 'utf8'))
  : pointerModule;
const pointerDate = pointerModule.match(/current-updates-(\d{4}-\d{2}-\d{2})\.js/)?.[1];
if (!targetExists && pointerDate && date <= pointerDate) {
  throw new Error(`Refusing to insert ${date} after current pointer ${pointerDate}. Use an existing dated file for regeneration or choose a later date.`);
}
const referenceModule = targetExists && pointerModule === targetName ? previousModule : pointerModule;
const currentModulePath = path.join(DATA_DIR, referenceModule);
const currentContent = await import(`${pathToFileURL(currentModulePath).href}?daily=${Date.now()}`);
const existingTurkish = currentContent.dailyTurkishPosts || [];
const existingEnglish = currentContent.dailyEnglishPosts || [];
const existingPaths = new Set([...existingTurkish, ...existingEnglish].flatMap((post) => [post.primaryPath, ...(post.routes || [])]).filter(Boolean));
const existingTitles = new Set([
  ...existingTurkish.map((post) => String(post.title || '').toLocaleLowerCase('tr-TR')),
  ...existingEnglish.map((post) => String(post.title || '').toLowerCase())
]);
const recentTitles = [...existingTurkish.slice(0, 20).map((post) => post.title), ...existingEnglish.slice(0, 20).map((post) => post.title)].filter(Boolean);
const trends = await fetchTrendCandidates();
console.log(`Collected ${trends.length} trend candidates; generating ${date} with ${TEXT_MODEL}.`);

let content;
let validationFeedback = [];
for (let attempt = 1; attempt <= MAX_CONTENT_ATTEMPTS; attempt += 1) {
  const raw = await requestPackage(buildPrompt({ date, trends, recentTitles, validationFeedback }));
  content = normalizePackage(raw);
  validationFeedback = validatePackage(content, existingPaths, existingTitles);
  if (!validationFeedback.length) break;
  console.warn(`Generated package failed validation on attempt ${attempt}:\n- ${validationFeedback.join('\n- ')}`);
}
if (validationFeedback.length) {
  throw new Error(`Could not produce a valid daily package:\n- ${validationFeedback.join('\n- ')}`);
}

const moduleSource = buildDatedModule({ date, previousModule, content });
await atomicWrite(targetFile, moduleSource);
await atomicWrite(POINTER_FILE, buildPointer(date));

console.log(`Created Turkish article: ${content.turkish.title}`);
console.log(`Created English article: ${content.english.title}`);
console.log(`Selected trend: ${content.trend.keyword} (${content.trend.source})`);
await appendSummary([
  '### Daily bilingual history',
  '',
  `- Tarih: \`${date}\``,
  `- Trend: **${content.trend.keyword}**`,
  `- Türkçe: **${content.turkish.title}**`,
  `- English: **${content.english.title}**`,
  `- Kaynak sayısı: \`${content.sources.length}\``,
  `- Veri dosyası: \`data/${targetName}\``
]);
