'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const MEASUREMENT_ID = 'G-S7Z8Q4R0HM';
const CONSENT_KEY = 'odyomuh-cookie-consent';
const INTERNAL_TRAFFIC_KEY = 'odyomuh-internal-traffic';
const INTERNAL_QUERY_KEY = 'odyomuh_internal';
let lastPageViewUrl = '';
let lastPageViewAt = 0;

function isInternalVisit() {
  const host = window.location.hostname.toLowerCase();
  const url = new URL(window.location.href);
  const mode = url.searchParams.get(INTERNAL_QUERY_KEY);

  if (mode === '1') window.localStorage.setItem(INTERNAL_TRAFFIC_KEY, '1');
  if (mode === '0') window.localStorage.removeItem(INTERNAL_TRAFFIC_KEY);

  if (mode === '1' || mode === '0') {
    url.searchParams.delete(INTERNAL_QUERY_KEY);
    window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
  }

  return window.localStorage.getItem(INTERNAL_TRAFFIC_KEY) === '1'
    || host === 'localhost'
    || host === '127.0.0.1'
    || host.endsWith('.vercel.app');
}

function ensureGtag() {
  if (isInternalVisit()) return false;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };

  const accepted = window.localStorage.getItem(CONSENT_KEY) === 'accepted';
  window.gtag('consent', 'default', {
    analytics_storage: accepted ? 'granted' : 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    wait_for_update: 500,
  });

  if (!document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}"]`)) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
    document.head.appendChild(script);
  }

  window.gtag('js', new Date());
  window.gtag('config', MEASUREMENT_ID, {
    send_page_view: false,
    anonymize_ip: true,
  });

  return true;
}

function syncConsent() {
  const accepted = window.localStorage.getItem(CONSENT_KEY) === 'accepted';
  window.gtag?.('consent', 'update', {
    analytics_storage: accepted ? 'granted' : 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
}

function sendPageView() {
  if (isInternalVisit()) return;

  const currentUrl = window.location.href;
  const now = Date.now();
  if (currentUrl === lastPageViewUrl && now - lastPageViewAt < 2000) return;

  lastPageViewUrl = currentUrl;
  lastPageViewAt = now;
  window.gtag?.('event', 'page_view', {
    page_title: document.title,
    page_location: currentUrl,
    page_path: `${window.location.pathname}${window.location.search}`,
  });
}

export default function AnalyticsBootstrap() {
  const pathname = usePathname();
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      if (!ensureGtag()) return undefined;
    }

    if (isInternalVisit()) return undefined;
    syncConsent();
    const timer = window.setTimeout(sendPageView, 250);

    const onStorage = (event) => {
      if (!event || event.key === CONSENT_KEY) syncConsent();
    };
    window.addEventListener('storage', onStorage);
    window.addEventListener('odyomuh-consent-updated', syncConsent);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('odyomuh-consent-updated', syncConsent);
    };
  }, [pathname]);

  return null;
}
