export default function DailyUpdateBanner({ locale = 'tr' }) {
  const english = locale === 'en';
  const items = english ? [
    { href: '/en/turin-shroud-dna-study-2026-what-it-found-and-did-not-prove', title: 'Turin Shroud DNA Study 2026' },
    { href: '/en/aquincum-roman-faces-dna-facial-reconstruction', title: 'Faces of Ancient Rome: Aquincum' },
  ] : [
    { href: '/2026/07/torino-kefeni-dna-analizi-2026-ne-bulundu.html', title: 'Torino Kefeni DNA Analizi 2026' },
    { href: '/2026/07/aquincum-antik-roma-yuzleri-dna-rekonstruksiyon.html', title: 'Aquincum’da Antik Roma’nın Yüzleri' },
  ];

  return (
    <aside aria-label={english ? 'Today’s new articles' : 'Bugünün yeni yazıları'} style={{
      maxWidth: '1440px', margin: '18px auto 0', padding: '14px 20px', border: '1px solid rgba(201,164,107,.28)',
      borderRadius: '16px', background: 'linear-gradient(135deg, rgba(201,164,107,.13), rgba(24,18,14,.8))',
      display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px 18px'
    }}>
      <strong style={{ color: 'var(--gold)', fontFamily: 'var(--font-inter), sans-serif', whiteSpace: 'nowrap' }}>{english ? 'NEW TODAY' : 'BUGÜN YENİ'}</strong>
      {items.map((item) => <a key={item.href} href={item.href} style={{ color: 'var(--text)', fontWeight: 700, textDecoration: 'none' }}>{item.title} →</a>)}
    </aside>
  );
}
