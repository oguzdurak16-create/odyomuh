import { posts, labels, site } from '../../site-data';
import PostCard from '../../../components/PostCard';
import Sidebar from '../../../components/Sidebar';

export const metadata = {
  title: 'Tüm Yazılar',
  description: 'ODYOMUH tarih, arkeoloji, mitoloji ve kadim uygarlık arşivindeki tüm yazılar.',
  alternates: { canonical: '/arsiv' },
};

export default function ArchivePage() {
  const allPosts = posts();
  return (
    <div className="main-wrapper">
      <section>
        <section className="hero small">
          <p className="eyebrow">ODYOMUH Arşivi</p>
          <h1>Tüm Yazılar</h1>
          <p>{allPosts.length} yazı, en yeniden en eskiye doğru listeleniyor.</p>
        </section>
        <section className="blog-posts archive-post-list">
          {allPosts.map((post) => <PostCard post={post} key={post.id} />)}
        </section>
      </section>
      <Sidebar posts={allPosts} labels={labels()} site={site} />
    </div>
  );
}
