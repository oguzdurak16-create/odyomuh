import sanitizeHtml from 'sanitize-html';
import localImages from '../data/local-images.json';

const imageDimensions = new Map(localImages.map((item) => {
  const [width, height] = String(item.size || '').split('x');
  return [item.local, { width, height }];
}));

const ALLOWED_IFRAME_HOSTS = [
  'www.youtube.com',
  'youtube.com',
  'www.youtube-nocookie.com',
  'player.vimeo.com',
];
const BLOCKED_SOURCE_HOSTS = ['wikipedia.org', 'wikimedia.org', 'fandom.com'];
const TRACKING_PARAM = /^(utm_|gclid$|fbclid$|mc_cid$|mc_eid$)/i;

function cleanLegacyNoise(value = '') {
  return String(value || '')
    .replace(/<[^>]+>\s*Yükleniyor\.\.\.\s*Son güncelleme:[\s\S]*?<\/[^>]+>/gi, '')
    .replace(/Yükleniyor\.\.\.\s*Son güncelleme:[^<\n]*/gi, '')
    .replace(/<p[^>]*>\s*Yazan:\s*ODYOMUH\s*<\/p>/gi, '')
    .replace(/<div[^>]*>\s*Yükleniyor\.\.\.\s*<\/div>/gi, '')
    .replace(/<p[^>]*>\s*Son güncelleme:\s*<\/p>/gi, '')
    .replace(/\s*\(\[(?:[^\]]*\.)?(?:wikipedia\.org|wikimedia\.org|fandom\.com)\]\(https?:\/\/[^)]+\)\)/gi, '')
    .replace(/https:\/\/www\.tcmb\.org\.tr\//gi, 'https://www.tcmb.gov.tr/')
    .replace(/\?utm_source=openai(?=[)"'<\s]|$)/gi, '')
    .replace(/&utm_source=openai(?=[)"'<\s]|$)/gi, '')
    // Known language artifacts from older/daily generated copy. Keep these
    // corrections at render time so already-published archives improve too.
    .replace(/boyama\/ozon etkileri/gi, 'pigment amaçlı kullanım')
    .replace(/\bradiokarbon\b/gi, 'radyokarbon')
    .replace(/\banalizlar\b/gi, 'analizler')
    .trim();
}

function cleanParsedUrl(url) {
  let host = url.hostname.toLowerCase().replace(/^www\./, '');
  if (BLOCKED_SOURCE_HOSTS.some((blocked) => host === blocked || host.endsWith(`.${blocked}`))) return null;

  if (host === 'tcmb.org.tr') {
    url.hostname = 'www.tcmb.gov.tr';
    host = 'tcmb.gov.tr';
  }

  for (const key of [...url.searchParams.keys()]) {
    if (TRACKING_PARAM.test(key)) url.searchParams.delete(key);
  }
  url.hash = '';
  return url;
}

function rewriteLegacyHref(value = '') {
  const href = String(value).trim();
  if (!href) return href;

  const legacyLabel = href.match(/^\/search\/label\/([^?#]+)(.*)$/i);
  if (legacyLabel) return `/label/${legacyLabel[1]}${legacyLabel[2] || ''}`;

  try {
    const parsed = cleanParsedUrl(new URL(href));
    if (!parsed) return '';
    if (['odyomuh.net', 'www.odyomuh.net'].includes(parsed.hostname)) {
      const match = parsed.pathname.match(/^\/search\/label\/([^/]+)$/i);
      if (match) return `/label/${match[1]}${parsed.search}`;
      return `${parsed.pathname}${parsed.search}`;
    }
    return parsed.toString();
  } catch {
    // Relative links are handled without URL parsing.
  }

  return href;
}

function isExternalHref(href = '') {
  try {
    const url = new URL(href);
    return !['odyomuh.net', 'www.odyomuh.net'].includes(url.hostname);
  } catch {
    return false;
  }
}

export function sanitizeContent(html = '', { imageAlt = 'ODYOMUH tarih görseli' } = {}) {
  return sanitizeHtml(cleanLegacyNoise(html), {
    disallowedTagsMode: 'discard',
    allowedTags: [
      'article', 'section', 'header', 'footer', 'nav', 'main', 'aside',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'div', 'span', 'br', 'hr',
      'strong', 'b', 'em', 'i', 'u', 's', 'small', 'mark', 'sub', 'sup',
      'blockquote', 'pre', 'code', 'kbd', 'samp',
      'ul', 'ol', 'li', 'dl', 'dt', 'dd',
      'table', 'caption', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td',
      'figure', 'figcaption', 'picture', 'source', 'img',
      'a', 'iframe', 'details', 'summary', 'time', 'abbr', 'cite',
    ],
    allowedAttributes: {
      '*': ['class', 'id', 'title', 'dir', 'lang', 'role', 'aria-*', 'data-*', 'style'],
      a: ['href', 'name', 'target', 'rel', 'title'],
      img: ['src', 'srcset', 'sizes', 'alt', 'title', 'width', 'height', 'loading', 'decoding'],
      source: ['src', 'srcset', 'sizes', 'type', 'media'],
      iframe: ['src', 'title', 'allow', 'allowfullscreen', 'loading', 'referrerpolicy'],
      ol: ['start', 'type', 'reversed'],
      li: ['value'],
      table: ['summary'],
      th: ['scope', 'colspan', 'rowspan', 'headers'],
      td: ['colspan', 'rowspan', 'headers'],
      time: ['datetime'],
      abbr: ['title'],
    },
    allowedSchemes: ['http', 'https', 'mailto', 'tel'],
    allowedSchemesByTag: {
      img: ['http', 'https', 'data'],
      source: ['http', 'https', 'data'],
      iframe: ['https'],
    },
    allowedSchemesAppliedToAttributes: ['href', 'src', 'cite'],
    allowProtocolRelative: false,
    allowedIframeHostnames: ALLOWED_IFRAME_HOSTS,
    allowedStyles: {
      '*': {
        'text-align': [/^left$/, /^right$/, /^center$/, /^justify$/],
        'font-weight': [/^normal$/, /^bold$/, /^\d{3}$/],
        'font-style': [/^normal$/, /^italic$/],
        'text-decoration': [/^(none|underline|line-through)$/],
        'margin-left': [/^\d+(?:\.\d+)?(?:px|em|rem|%)$/],
        'margin-right': [/^\d+(?:\.\d+)?(?:px|em|rem|%)$/],
      },
      img: {
        width: [/^\d+(?:\.\d+)?(?:px|%)$/],
        height: [/^auto$/, /^\d+(?:\.\d+)?px$/],
        'max-width': [/^100%$/],
      },
    },
    transformTags: {
      a: (tagName, attribs) => {
        const href = rewriteLegacyHref(attribs.href || '');
        const external = isExternalHref(href);
        const nextAttribs = { ...attribs };
        if (href) nextAttribs.href = href;
        else delete nextAttribs.href;
        if (external) {
          nextAttribs.target = '_blank';
          nextAttribs.rel = 'noopener noreferrer';
        }
        return { tagName, attribs: nextAttribs };
      },
      img: (tagName, attribs) => {
        let pathname = attribs.src || '';
        try {
          pathname = new URL(pathname).pathname;
        } catch {
          // Relative image path.
        }
        const dimensions = imageDimensions.get(pathname);
        return {
          tagName,
          attribs: {
            ...attribs,
            ...(dimensions && !attribs.width ? { width: dimensions.width, height: dimensions.height } : {}),
            alt: attribs.alt || imageAlt,
            loading: attribs.loading || 'lazy',
            decoding: 'async',
          },
        };
      },
      iframe: (tagName, attribs) => ({
        tagName,
        attribs: {
          ...attribs,
          loading: 'lazy',
          referrerpolicy: 'strict-origin-when-cross-origin',
        },
      }),
    },
  });
}
