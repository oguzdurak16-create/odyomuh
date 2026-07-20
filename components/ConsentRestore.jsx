"use client";

import { useEffect } from 'react';

export default function ConsentRestore() {
  useEffect(() => {
    const saved = window.localStorage.getItem('odyomuh-cookie-consent');
    if (saved !== 'accepted' && saved !== 'rejected') return;
    const granted = saved === 'accepted' ? 'granted' : 'denied';
    window.gtag?.('consent', 'update', {
      ad_user_data: granted,
      ad_personalization: granted,
      ad_storage: granted,
      analytics_storage: granted,
    });
  }, []);

  return null;
}
