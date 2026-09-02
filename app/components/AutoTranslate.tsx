'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function AutoTranslate() {
  const pathname = usePathname() || '/';
  const initialized = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Extract locale from pathname (e.g. /de/mac -> de)
    const segments = pathname.split('/');
    const supportedLocales = ['en', 'es', 'fr', 'de', 'pt', 'ru'];
    const locale = (segments[1] && supportedLocales.includes(segments[1])) ? segments[1] : 'en';

    // Set googtrans cookie
    if (locale === 'en') {
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=" + window.location.hostname + "; path=/;";
    } else {
      const targetLang = `/en/${locale}`;
      document.cookie = `googtrans=${targetLang}; path=/`;
      document.cookie = `googtrans=${targetLang}; domain=${window.location.hostname}; path=/`;
    }

    if (!initialized.current) {
      initialized.current = true;
      // Load Google Translate script
      (window as any).googleTranslateElementInit = function() {
        try {
          new (window as any).google.translate.TranslateElement({
            pageLanguage: 'en',
            autoDisplay: false
          }, 'google_translate_element');
        } catch (err) {
          console.error('Google Translate init error:', err);
        }
      };
      
      const script = document.createElement('script');
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    } else {
      // If the locale changes, reload the page to trigger the new cookie
      // but we shouldn't infinite loop. We can store the current translation state
      // Actually, since LanguageSwitcher uses Next.js Link, Next.js does client-side routing.
      // Google translate won't automatically re-translate on client side routing without a refresh.
      // So if the cookie doesn't match the current google translate state, we should force a reload.
      const cookieMatch = document.cookie.match(/googtrans=\/en\/([a-z]{2})/);
      const activeLocale = cookieMatch ? cookieMatch[1] : 'en';
      
      if (locale !== activeLocale) {
        window.location.reload();
      }
    }
  }, [pathname]);

  return <div id="google_translate_element" style={{ display: 'none' }}></div>;
}
