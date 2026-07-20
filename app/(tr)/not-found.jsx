export const metadata = {
  title: 'Sayfa bulunamadı',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="not-found-card">
      <p className="eyebrow">404</p>
      <h1>Aradığın kayıt arşivde bulunamadı.</h1>
      <p>Adres değişmiş olabilir veya sayfa kaldırılmış olabilir.</p>
      <a href="/">Ana sayfaya dön →</a>
    </section>
  );
}
