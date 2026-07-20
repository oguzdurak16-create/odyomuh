import { sanitizeContent } from '../lib/sanitize-content';

export default function HtmlContent({ html, imageAlt = 'ODYOMUH tarih görseli', className = '' }) {
  const safeHtml = sanitizeContent(html, { imageAlt });
  const classes = ['content', className].filter(Boolean).join(' ');
  return <div className={classes} dangerouslySetInnerHTML={{ __html: safeHtml }} />;
}
