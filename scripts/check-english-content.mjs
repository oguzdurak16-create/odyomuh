import fs from 'node:fs';

const source = fs.readFileSync(new URL('../data/en-posts.js', import.meta.url), 'utf8');
const topicSource = fs.readFileSync(new URL('../data/en-topics.js', import.meta.url), 'utf8');
const ids = [...source.matchAll(/^\s*id:\s*`([^`]+)`/gm)].map((match) => match[1]);
const slugs = [...source.matchAll(/^\s*slug:\s*`([^`]+)`/gm)].map((match) => match[1]);
const topics = [...source.matchAll(/^\s*topic:\s*`([^`]+)`/gm)].map((match) => match[1]);
const validTopics = new Set([...topicSource.matchAll(/^\s*slug:\s*'([^']+)'/gm)].map((match) => match[1]));
const errors = [];

function parseContentBlocks(text) {
  const blocks = [];
  let cursor = 0;
  while (true) {
    const marker = text.indexOf('contentHtml:', cursor);
    if (marker < 0) break;
    let pos = marker + 'contentHtml:'.length;
    while (/\s/.test(text[pos] || '')) pos += 1;
    if (text[pos] === '`') {
      const start = pos + 1;
      const end = text.indexOf('`,', start);
      if (end < 0) throw new Error(`Unterminated template-literal contentHtml near byte ${marker}`);
      blocks.push(text.slice(start, end));
      cursor = end + 2;
      continue;
    }
    if (text[pos] === '"') {
      const start = pos;
      pos += 1;
      let escaped = false;
      while (pos < text.length) {
        const ch = text[pos];
        if (escaped) escaped = false;
        else if (ch === '\\') escaped = true;
        else if (ch === '"') break;
        pos += 1;
      }
      if (pos >= text.length) throw new Error(`Unterminated JSON-string contentHtml near byte ${marker}`);
      const raw = text.slice(start, pos + 1);
      blocks.push(JSON.parse(raw));
      cursor = pos + 1;
      continue;
    }
    throw new Error(`Unsupported contentHtml value near byte ${marker}`);
  }
  return blocks;
}

let contentBlocks = [];
try {
  contentBlocks = parseContentBlocks(source);
} catch (error) {
  errors.push(error.message);
}

const duplicates = (values) => values.filter((value, index) => values.indexOf(value) !== index);
for (const value of new Set(duplicates(ids))) errors.push(`Duplicate id: ${value}`);
for (const value of new Set(duplicates(slugs))) errors.push(`Duplicate slug: ${value}`);
for (const topic of topics) if (!validTopics.has(topic)) errors.push(`Unknown topic: ${topic}`);
const sourceBlocks = (source.match(/^\s*sources:\s*\[/gm) || []).length;
const faqBlocks = (source.match(/^\s*faq:\s*\[/gm) || []).length;
if (!ids.length || ids.length !== slugs.length || ids.length !== topics.length || ids.length !== contentBlocks.length) {
  errors.push(`Article field counts are inconsistent: ids=${ids.length}, slugs=${slugs.length}, topics=${topics.length}, content=${contentBlocks.length}`);
}
if (sourceBlocks !== ids.length) errors.push(`Source block count mismatch: ${sourceBlocks}/${ids.length}`);
if (faqBlocks !== ids.length) errors.push(`FAQ block count mismatch: ${faqBlocks}/${ids.length}`);
contentBlocks.forEach((html, index) => {
  const text = html.replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ');
  const words = text.match(/[A-Za-zÀ-ž0-9’'-]+/g)?.length || 0;
  if (words < 1000) errors.push(`Article below 1000 words: ${slugs[index]} (${words})`);
});
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
const minimum = Math.min(...contentBlocks.map((html) => (html.replace(/<[^>]+>/g, ' ').match(/[A-Za-zÀ-ž0-9’'-]+/g) || []).length));
console.log(`English content check passed: ${ids.length} articles, ${validTopics.size} topics, minimum ${minimum} words.`);
