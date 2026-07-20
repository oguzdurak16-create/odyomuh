function formatDate(value) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value));
}

function stripHtml(value = '') {
  return String(value).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function readingTime(post) {
  const text = stripHtml(post.contentHtml || post.description || '');
  return Math.max(1, Math.ceil(text.split(/\s+/).filter(Boolean).length / 220));
}

export default function EnglishPostCard({ post, compact = false }) {
  return (
    <article className={compact ? 'english-post-card is-compact premium-english-card' : 'english-post-card premium-english-card'}>
      <a className="english-post-image" href={post.primaryPath}>
        <img src={post.image} alt={post.title} width="1672" height="941" loading="lazy" decoding="async" />
        <span className="english-card-topic">{post.labels[0]}</span>
        <span className="english-card-time">{readingTime(post)} min</span>
      </a>
      <div className="english-post-card-body">
        <div className="english-post-meta">
          <time dateTime={post.published}>{formatDate(post.published)}</time>
          <span>Evidence file</span>
        </div>
        <h3><a href={post.primaryPath}>{post.title}</a></h3>
        {!compact ? <p>{post.description}</p> : null}
        <div className="english-card-footer">
          <a className="english-card-topic-link" href={`/en/topic/${post.topic}`}>More in topic</a>
          <a className="english-read-more" href={post.primaryPath}>Read article <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </article>
  );
}
