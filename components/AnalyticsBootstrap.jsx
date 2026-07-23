'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const GTM_ID = 'GTM-5N62TLPD';
const CONSENT_KEY = 'odyomuh-cookie-consent';
const GTM_SELECTOR = `script[src*="googletagmanager.com/gtm.js?id=${GTM_ID}"]`;

function sendPageView(pathname) {
  if (window.localStorage.getItem(CONSENT_KEY) !== 'accepted') return false;
  if (!window.google_tag_manager?.[GTM_ID]) return false;

  const pagePath = `${pathname}${window.location.search || ''}`;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };
  window.gtag('event', 'page_view', {
    page_title: document.title,
    page_location: window.location.href,
    page_path: pagePath,
  });
  return true;
}

export default function AnalyticsBootstrap() {
  const pathname = usePathname();
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return undefined;
    }

    if (sendPageView(pathname)) return undefined;

    const gtmScript = document.querySelector(GTM_SELECTOR);
    const onLoad = () => sendPageView(pathname);
    gtmScript?.addEventListener('load', onLoad, { once: true });

    const fallbackTimer = window.setTimeout(onLoad, 1500);
    return () => {
      window.clearTimeout(fallbackTimer);
      gtmScript?.removeEventListener('load', onLoad);
    };
  }, [pathname]);

  return null;
}
