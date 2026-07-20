"use client";

import { useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';

const LEGAL_TITLES = ['KVKK Aydınlatma Metni', 'Çerez Politikası', 'Kullanım Şartları', 'Gizlilik Politikası'];
const AUX_TITLES = ['Hakkımızda', 'İletişim'];
const FEATURED_LABEL_ORDER = ['Anadolu Tarihi', 'Antik Uygarlıklar', 'antik uygarlıklar', 'Antik Teknoloji', 'Antik Yazılar'];

function niceLabel(label) {
  if (!label) return label;
  if (label.toLowerCase() === 'antik uygarlıklar') return 'Antik Uygarlıklar';
  return label;
}

function findPageByTitle(pages, title) {
  return pages.find((page) => page.title === title);
}

export default function SiteChrome({ site, pages, labels, children }) {
  const pathname = usePathname();
  const isEnglish = pathname?.startsWith('/en');
  const [menuOpen, setMenuOpen] = useState(false);
  const [light, setLight] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [consent, setConsent] = useState('unset');
  const year = new Date().getFullYear();

  const primaryPages = useMemo(
    () => pages.filter((page) => !LEGAL_TITLES.includes(page.title) && !AUX_TITLES.includes(page.title)),
    [pages]
  );
  const utilityPages = useMemo(() => pages.filter((page) => AUX_TITLES.includes(page.title)), [pages]);
  const legalPages = useMemo(() => pages.filter((page) => LEGAL_TITLES.includes(page.title)), [pages]);
  const featuredLabels = useMemo(() => {
    const found = [];
    for (const desired of FEATURED_LABEL_ORDER) {
      const actual = labels.find((label) => label === desired);
      if (actual && !found.includes(actual)) found.push(actual);
    }
    return found.slice(0, 3);
  }, [labels]);

  const timelinePage = findPageByTitle(primaryPages, 'Tarih Kronolojisi');
  const quizPage = findPageByTitle(primaryPages, 'Tarih Quiz');
  const notesPage = findPageByTitle(primaryPages, 'Ders Notları');

  useEffect(() => {
    const saved = window.localStorage.getItem('odyomuh-theme');
    const isLight = saved === 'light';
    setLight(isLight);
    document.documentElement.setAttribute('data-theme', isLight ? 'light' : 'dark');
  }, []);

  useEffect(() => {
    const savedConsent = window.localStorage.getItem('odyomuh-cookie-consent');
    setConsent(savedConsent === 'accepted' || savedConsent === 'rejected' ? savedConsent : 'unset');
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', light ? 'light' : 'dark');
    window.localStorage.setItem('odyomuh-theme', light ? 'light' : 'dark');
  }, [light]);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 450);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    if (!menuOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const closeMenu = () => setMenuOpen(false);
  const updateConsent = (value) => {
    window.localStorage.setItem('odyomuh-cookie-consent', value);
    setConsent(value);
    window.gtag?.('consent', 'update', {
      ad_user_data: value === 'accepted' ? 'granted' : 'denied',
      ad_personalization: value === 'accepted' ? 'granted' : 'denied',
      ad_storage: value === 'accepted' ? 'granted' : 'denied',
      analytics_storage: value === 'accepted' ? 'granted' : 'denied',
    });
  };

  const isActive = (href, exact = false) => {
    if (!pathname || !href) return false;
    if (exact || href === '/' || href === '/en') return pathname === href;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const activeLinkProps = (href, exact = false) => {
    const active = isActive(href, exact);
    return {
      className: active ? 'is-active' : undefined,
      'aria-current': active ? 'page' : undefined,
    };
  };

  const categoryActive = pathname?.startsWith('/label/');
  const englishTopicActive = pathname?.startsWith('/en/topic/');
  const archiveActive = pathname === '/arsiv' || pathname === '/search' || pathname === '/etiketler';
  const middleEastActive = pathname === '/gundem/orta-dogu' || pathname?.startsWith('/2026/07/iran-') || pathname?.includes('husiler') || pathname?.includes('sii-sunni') || pathname?.includes('yahudilik-israil');
  const englishArchiveActive = pathname === '/en/archive' || pathname === '/en/search';

  const homeHref = isEnglish ? '/en' : '/';
  const topbarText = isEnglish
    ? 'An independent history archive. Archaeology, ancient worlds and historical mysteries.'
    : 'Dijital tarih arşivi. Antik dünya, savaşlar, uygarlıklar ve gizem dosyaları.';
  const kicker = isEnglish ? 'Digital History Archive · English Edition' : 'Dijital Tarih Arşivi';
  const description = isEnglish
    ? 'History, archaeology and historical mysteries for readers around the world.'
    : (site.description || 'Tarihin derinliklerinde bir yolculuk');

  const englishTopics = [
    { href: '/en/topic/middle-east', label: 'Middle East' },
    { href: '/en/topic/new-discoveries', label: 'New Discoveries' },
    { href: '/en/topic/mesopotamia', label: 'Mesopotamia' },
    { href: '/en/topic/undeciphered-scripts', label: 'Ancient Scripts' },
    { href: '/en/topic/lost-technology', label: 'Lost Technology' },
    { href: '/en/topic/archaeological-mysteries', label: 'Archaeological Mysteries' },
    { href: '/en/topic/myths-vs-evidence', label: 'Claims Checked' },
  ];

  const englishMenu = [
    { href: '/en', label: 'Home' },
    { href: '/en/archive', label: 'Archive' },
    ...englishTopics,
    { href: '/en/search', label: 'Search' },
  ];

  const englishPolicyMenu = [
    { href: '/en/about', label: 'About' },
    { href: '/en/editorial-policy', label: 'Editorial Policy' },
    { href: '/en/sources-and-fact-checking', label: 'Fact-Checking' },
    { href: '/en/corrections', label: 'Corrections' },
    { href: '/en/privacy', label: 'Privacy' },
    { href: '/en/cookie-policy', label: 'Cookies' },
    { href: '/en/contact', label: 'Contact' },
  ];

  return (
    <>
      <Script id="odyomuh-consent" strategy="beforeInteractive">{`
        window.dataLayer = window.dataLayer || [];
        window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
        window.gtag('consent', 'default', {
          ad_user_data: 'denied',
          ad_personalization: 'denied',
          ad_storage: 'denied',
          analytics_storage: 'denied',
          functionality_storage: 'granted',
          security_storage: 'granted',
          wait_for_update: 500
        });
      `}</Script>
      {consent === 'accepted' ? (
        <>
          <Script id="gtm-loader" strategy="afterInteractive">{`
            (function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5N62TLPD');
          `}</Script>
          <Script async crossOrigin="anonymous" src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4491868887846507" strategy="afterInteractive" />
        </>
      ) : null}

      <a className="skip-link" href="#main-content">{isEnglish ? 'Skip to content' : 'İçeriğe geç'}</a>
      <div className="reading-progress"><div className="reading-progress-bar" id="reading-progress-bar" /></div>
      <ReadingProgress />

      <div className="header-topbar">
        <div className="container header-topbar-inner">
          <p>{topbarText}</p>
          <div className="header-topbar-links">
            {isEnglish ? (
              <>
                <a href="/">Türkçe</a>
                <a href="/en/about">About</a>
                <a href="/en/contact">Contact</a>
              </>
            ) : (
              <>
                {utilityPages.map((page) => <a key={page.id} href={page.primaryPath}>{page.title}</a>)}
                <a href="/gundem/orta-dogu">Orta Doğu Gündemi</a>
                <a href="/arsiv">Tüm Yazılar</a>
                <a href="/search">Arşivde Ara</a>
              </>
            )}
          </div>
        </div>
      </div>

      <header id="header-wrapper">
        <div id="header" className="container antique-header-main">
          <a className="brand-lockup" href={homeHref} aria-label={site.name}>
            <img className="brand-mark" src="/theme/odyomuh-mark.svg" alt="ODYOMUH" width="220" height="220" />
            <div className="brand-copy">
              <span className="brand-kicker">{kicker}</span>
              <span className="site-title">{site.name}</span>
              <span className="description">{description}</span>
            </div>
          </a>

          <div className="header-actions-desktop">
            <a className="header-language-link" href={isEnglish ? '/' : '/en'} aria-label={isEnglish ? 'Türkçe siteye geç' : 'Switch to English'}>
              <span>{isEnglish ? 'TR' : 'EN'}</span>
              <small>{isEnglish ? 'Türkçe' : 'English'}</small>
            </a>
            <button className="header-theme-button" type="button" aria-label={isEnglish ? 'Change theme' : 'Tema değiştir'} onClick={() => setLight((v) => !v)}>
              <span className="header-theme-icon" aria-hidden="true">{light ? '☾' : '☀'}</span>
              <span className="header-theme-label">{light ? (isEnglish ? 'Dark' : 'Koyu') : (isEnglish ? 'Light' : 'Açık')}</span>
            </button>
            <button
              className={menuOpen ? 'mobile-menu-button is-open' : 'mobile-menu-button'}
              type="button"
              aria-label={menuOpen ? (isEnglish ? 'Close menu' : 'Menüyü kapat') : (isEnglish ? 'Open menu' : 'Menüyü aç')}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu-drawer"
              onClick={() => setMenuOpen((value) => !value)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      <nav id="navbar-wrapper" aria-label={isEnglish ? 'Main navigation' : 'Ana menü'}>
        <div className="container navbar-inner">
          <div className="desktop-nav-shell">
            <ul id="navbar-desktop" aria-label={isEnglish ? 'Desktop menu' : 'Masaüstü menü'}>
              {isEnglish ? (
                <>
                  <li><a href="/en" {...activeLinkProps('/en', true)}>Home</a></li>
                  <li><a href="/en/archive" {...activeLinkProps('/en/archive')}>Archive</a></li>
                  <li className="nav-dropdown-item">
                    <details className={englishTopicActive ? 'nav-dropdown is-active' : 'nav-dropdown'}>
                      <summary>Topics <span aria-hidden="true">⌄</span></summary>
                      <div className="nav-dropdown-panel">
                        <p>Explore by subject</p>
                        {englishTopics.map((item) => <a key={item.href} href={item.href} {...activeLinkProps(item.href)}>{item.label}</a>)}
                      </div>
                    </details>
                  </li>
                  <li><a href="/en/sources-and-fact-checking" {...activeLinkProps('/en/sources-and-fact-checking')}>Fact-Checking</a></li>
                  <li><a href="/en/search" {...activeLinkProps('/en/search')}>Search</a></li>
                </>
              ) : (
                <>
                  <li><a href="/" {...activeLinkProps('/', true)}>Ana Sayfa</a></li>
                  {timelinePage ? <li><a href={timelinePage.primaryPath} {...activeLinkProps(timelinePage.primaryPath)}>Kronoloji</a></li> : null}
                  {quizPage ? <li><a href={quizPage.primaryPath} {...activeLinkProps(quizPage.primaryPath)}>Tarih Quiz</a></li> : null}
                  {notesPage ? <li><a href={notesPage.primaryPath} {...activeLinkProps(notesPage.primaryPath)}>Ders Notları</a></li> : null}
                  <li><a href="/gundem/orta-dogu" {...activeLinkProps('/gundem/orta-dogu')}>Gündem</a></li>
                  <li className="nav-dropdown-item">
                    <details className={categoryActive ? 'nav-dropdown is-active' : 'nav-dropdown'}>
                      <summary>Kategoriler <span aria-hidden="true">⌄</span></summary>
                      <div className="nav-dropdown-panel">
                        <p>Konuya göre keşfet</p>
                        {featuredLabels.map((label) => (
                          <a key={label} href={`/label/${encodeURIComponent(label)}`} {...activeLinkProps(`/label/${encodeURIComponent(label)}`)}>{niceLabel(label)}</a>
                        ))}
                        <a href="/etiketler" {...activeLinkProps('/etiketler')}>Tüm Etiketler</a>
                      </div>
                    </details>
                  </li>
                  <li className="nav-dropdown-item">
                    <details className={archiveActive ? 'nav-dropdown is-active' : 'nav-dropdown'}>
                      <summary>Arşiv <span aria-hidden="true">⌄</span></summary>
                      <div className="nav-dropdown-panel nav-dropdown-panel-end">
                        <p>Aradığını hızlı bul</p>
                        <a href="/arsiv" {...activeLinkProps('/arsiv')}>Tüm Yazılar</a>
                        <a href="/etiketler" {...activeLinkProps('/etiketler')}>Etiket İndeksi</a>
                        <a href="/search" {...activeLinkProps('/search')}>Arşivde Ara</a>
                      </div>
                    </details>
                  </li>
                </>
              )}
            </ul>

            <div className="desktop-nav-meta">
              <span className="desktop-nav-divider" aria-hidden="true" />
              <a className="desktop-nav-search" href={isEnglish ? '/en/search' : '/search'}>
                <span className="desktop-nav-search-icon" aria-hidden="true" />
                <span>{isEnglish ? 'Search' : 'Ara'}</span>
              </a>
              <a className="desktop-nav-language" href={isEnglish ? '/' : '/en'}>{isEnglish ? 'TR' : 'EN'}</a>
            </div>
          </div>
        </div>
      </nav>

      <button type="button" className={menuOpen ? 'mobile-menu-backdrop is-open' : 'mobile-menu-backdrop'} aria-label={isEnglish ? 'Close menu' : 'Menüyü kapat'} tabIndex={menuOpen ? 0 : -1} onClick={closeMenu} />
      <aside id="mobile-menu-drawer" className={menuOpen ? 'mobile-menu-drawer is-open' : 'mobile-menu-drawer'} aria-hidden={!menuOpen} aria-label={isEnglish ? 'Mobile menu' : 'Mobil menü'}>
        <div className="mobile-menu-head">
          <a className="mobile-menu-brand" href={homeHref} onClick={closeMenu}>
            <img src="/theme/odyomuh-mark.svg" alt="" width="46" height="46" />
            <span>
              <strong>ODYOMUH</strong>
              <small>{isEnglish ? 'English Edition' : 'Dijital Tarih Arşivi'}</small>
            </span>
          </a>
          <button type="button" className="mobile-menu-close" aria-label={isEnglish ? 'Close menu' : 'Menüyü kapat'} onClick={closeMenu}>×</button>
        </div>

        <nav className="mobile-menu-nav" aria-label={isEnglish ? 'Mobile main menu' : 'Mobil ana menü'}>
          <p className="mobile-menu-kicker">{isEnglish ? 'Quick access' : 'Hızlı erişim'}</p>
          <div className="mobile-quick-grid">
            {isEnglish ? (
              <>
                <a href="/en" onClick={closeMenu} {...activeLinkProps('/en', true)}><span>Home</span><small>Latest stories</small></a>
                <a href="/en/archive" onClick={closeMenu} {...activeLinkProps('/en/archive')}><span>Archive</span><small>All articles</small></a>
                <a href="/en/search" onClick={closeMenu} {...activeLinkProps('/en/search')}><span>Search</span><small>Find a topic</small></a>
                <a href="/en/sources-and-fact-checking" onClick={closeMenu} {...activeLinkProps('/en/sources-and-fact-checking')}><span>Evidence</span><small>Our method</small></a>
              </>
            ) : (
              <>
                <a href="/" onClick={closeMenu} {...activeLinkProps('/', true)}><span>Ana Sayfa</span><small>Son içerikler</small></a>
                {timelinePage ? <a href={timelinePage.primaryPath} onClick={closeMenu} {...activeLinkProps(timelinePage.primaryPath)}><span>Kronoloji</span><small>Zaman çizelgesi</small></a> : null}
                {quizPage ? <a href={quizPage.primaryPath} onClick={closeMenu} {...activeLinkProps(quizPage.primaryPath)}><span>Tarih Quiz</span><small>Bilgini test et</small></a> : null}
                {notesPage ? <a href={notesPage.primaryPath} onClick={closeMenu} {...activeLinkProps(notesPage.primaryPath)}><span>Ders Notları</span><small>Konu özetleri</small></a> : null}
                <a href="/gundem/orta-dogu" onClick={closeMenu} {...activeLinkProps('/gundem/orta-dogu')}><span>Orta Doğu Gündemi</span><small>İran, İsrail, Husiler</small></a>
              </>
            )}
          </div>

          <div className="mobile-menu-groups">
            <details className="mobile-menu-group" open>
              <summary>{isEnglish ? 'Topics' : 'Kategoriler'} <span aria-hidden="true">+</span></summary>
              <div>
                {isEnglish ? englishTopics.map((item) => (
                  <a key={item.href} href={item.href} onClick={closeMenu} {...activeLinkProps(item.href)}>{item.label}<span aria-hidden="true">→</span></a>
                )) : <>
                  {featuredLabels.map((label) => {
                    const href = `/label/${encodeURIComponent(label)}`;
                    return <a key={label} href={href} onClick={closeMenu} {...activeLinkProps(href)}>{niceLabel(label)}<span aria-hidden="true">→</span></a>;
                  })}
                  <a href="/etiketler" onClick={closeMenu} {...activeLinkProps('/etiketler')}>Tüm Etiketler<span aria-hidden="true">→</span></a>
                </>}
              </div>
            </details>

            <details className="mobile-menu-group">
              <summary>{isEnglish ? 'Publication' : 'Arşiv ve site'} <span aria-hidden="true">+</span></summary>
              <div>
                {isEnglish ? (
                  <>
                    <a href="/en/about" onClick={closeMenu}>About<span aria-hidden="true">→</span></a>
                    <a href="/en/editorial-policy" onClick={closeMenu}>Editorial Policy<span aria-hidden="true">→</span></a>
                    <a href="/en/contact" onClick={closeMenu}>Contact<span aria-hidden="true">→</span></a>
                  </>
                ) : (
                  <>
                    <a href="/arsiv" onClick={closeMenu} {...activeLinkProps('/arsiv')}>Tüm Yazılar<span aria-hidden="true">→</span></a>
                    <a href="/etiketler" onClick={closeMenu} {...activeLinkProps('/etiketler')}>Etiket İndeksi<span aria-hidden="true">→</span></a>
                    <a href="/search" onClick={closeMenu} {...activeLinkProps('/search')}>Arşivde Ara<span aria-hidden="true">→</span></a>
                    {utilityPages.map((page) => <a key={page.id} href={page.primaryPath} onClick={closeMenu}>{page.title}<span aria-hidden="true">→</span></a>)}
                  </>
                )}
              </div>
            </details>
          </div>
        </nav>

        <div className="mobile-menu-footer-actions">
          <a href={isEnglish ? '/' : '/en'} onClick={closeMenu}>
            <span>{isEnglish ? 'TR' : 'EN'}</span>
            <strong>{isEnglish ? 'Türkçe sürüm' : 'English edition'}</strong>
          </a>
          <button type="button" onClick={() => setLight((value) => !value)}>
            <span aria-hidden="true">{light ? '☾' : '☀'}</span>
            <strong>{light ? (isEnglish ? 'Dark theme' : 'Koyu tema') : (isEnglish ? 'Light theme' : 'Açık tema')}</strong>
          </button>
        </div>
      </aside>

      <main id="main-content" className="container content-wrapper">{children}</main>

      <footer id="footer">
        <div className="footer-top-glow" aria-hidden="true" />
        <div className="container footer-main-grid">
          <div className="footer-brand-panel">
            <a className="footer-brand-lockup" href={homeHref}>
              <img src="/theme/odyomuh-mark.svg" alt="" width="62" height="62" />
              <span><strong>{site.name}</strong><small>{isEnglish ? 'Independent History Archive' : 'Dijital Tarih Arşivi'}</small></span>
            </a>
            <p>{isEnglish ? 'Evidence-led articles on archaeology, ancient texts, lost technology and historical mysteries.' : 'Tarih, arkeoloji, mitoloji ve kadim uygarlıklar üzerine kaynak odaklı, düzenli bir dijital arşiv.'}</p>
            <form className="footer-search" action={isEnglish ? '/en/search' : '/search'} method="get">
              <input name="q" type="search" placeholder={isEnglish ? 'Search the archive' : 'Arşivde konu ara'} aria-label={isEnglish ? 'Search the archive' : 'Arşivde ara'} />
              <button type="submit" aria-label={isEnglish ? 'Search' : 'Ara'}>→</button>
            </form>
            <div className="footer-social-row" aria-label={isEnglish ? 'Social media' : 'Sosyal medya'}>
              <a href="https://www.facebook.com/profile.php?id=61554477900461" target="_blank" rel="noopener noreferrer" aria-label="Facebook">f</a>
              <a href="https://instagram.com/tarihdedektifi0" target="_blank" rel="noopener noreferrer" aria-label="Instagram">◎</a>
              <a href="https://www.youtube.com/@tarihdedektifi0" target="_blank" rel="noopener noreferrer" aria-label="YouTube">▶</a>
            </div>
          </div>

          <div className="footer-link-column">
            <h4>{isEnglish ? 'Explore' : 'Keşfet'}</h4>
            <ul className="footer-menu">
              {isEnglish ? englishMenu.slice(0, 5).map((item) => <li key={item.label}><a href={item.href}>{item.label}<span>→</span></a></li>) : (
                <>
                  <li><a href="/">Ana Sayfa<span>→</span></a></li>
                  <li><a href="/gundem/orta-dogu">Orta Doğu Gündemi<span>→</span></a></li>
                  <li><a href="/arsiv">Tüm Yazılar<span>→</span></a></li>
                  <li><a href="/etiketler">Etiket İndeksi<span>→</span></a></li>
                  <li><a href="/search">Arşivde Ara<span>→</span></a></li>
                  {primaryPages.slice(0, 3).map((page) => <li key={page.id}><a href={page.primaryPath}>{page.title}<span>→</span></a></li>)}
                </>
              )}
            </ul>
          </div>

          <div className="footer-link-column">
            <h4>{isEnglish ? 'Research clusters' : 'Öne çıkan konular'}</h4>
            <ul className="footer-menu">
              {isEnglish ? englishTopics.map((item) => <li key={item.href}><a href={item.href}>{item.label}<span>→</span></a></li>) : featuredLabels.map((label) => <li key={label}><a href={`/label/${encodeURIComponent(label)}`}>{niceLabel(label)}<span>→</span></a></li>)}
            </ul>
          </div>

          <div className="footer-link-column">
            <h4>{isEnglish ? 'Publication' : 'Kurumsal'}</h4>
            <ul className="footer-menu">
              {isEnglish ? <>{englishPolicyMenu.slice(0, 6).map((item) => <li key={item.label}><a href={item.href}>{item.label}<span>→</span></a></li>)}<li><a href="/en/feed.xml">RSS Feed<span>→</span></a></li></> : <>{utilityPages.map((page) => <li key={page.id}><a href={page.primaryPath}>{page.title}<span>→</span></a></li>)}{legalPages.slice(0, 4).map((page) => <li key={page.id}><a href={page.primaryPath}>{page.title}<span>→</span></a></li>)}</>}
            </ul>
          </div>
        </div>
        <div className="container footer-bottomline">
          <p>© {year} {site.name}. {isEnglish ? 'All rights reserved.' : 'Tüm hakları saklıdır.'}</p>
          <div>
            <a href={isEnglish ? '/' : '/en'}>{isEnglish ? 'Türkçe' : 'English'}</a>
            <a href={isEnglish ? '/en/privacy' : '/p/gizlilik-politikasi.html'}>{isEnglish ? 'Privacy' : 'Gizlilik'}</a>
            <a href="/sitemap.xml">Sitemap</a>
          </div>
        </div>
      </footer>

      {consent === 'unset' ? (
        <aside className="cookie-consent" role="dialog" aria-label={isEnglish ? 'Cookie preferences' : 'Çerez tercihleri'}>
          <div>
            <strong>{isEnglish ? 'Cookie preferences' : 'Çerez tercihleri'}</strong>
            <p>{isEnglish ? 'Analytics and advertising scripts load only after your permission.' : 'Analitik ve reklam komut dosyaları yalnızca izin verdiğinde yüklenir.'}</p>
          </div>
          <div className="cookie-consent-actions">
            <button type="button" className="cookie-reject" onClick={() => updateConsent('rejected')}>{isEnglish ? 'Reject' : 'Reddet'}</button>
            <button type="button" className="cookie-accept" onClick={() => updateConsent('accepted')}>{isEnglish ? 'Accept' : 'Kabul et'}</button>
          </div>
        </aside>
      ) : null}

      <button className="dark-mode-toggle" type="button" aria-label={isEnglish ? 'Change theme' : 'Tema değiştir'} onClick={() => setLight((v) => !v)}>{light ? '☾' : '☀'}</button>
      <button id="backTop" className={showTop ? 'show' : ''} type="button" aria-label={isEnglish ? 'Back to top' : 'Yukarı çık'} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>↑</button>
    </>
  );
}

function ReadingProgress() {
  useEffect(() => {
    const bar = document.getElementById('reading-progress-bar');
    if (!bar) return;
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const percent = max > 0 ? (window.scrollY / max) * 100 : 0;
      bar.style.width = `${Math.min(100, Math.max(0, percent))}%`;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return null;
}
