'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { LANGS, LANG_CODES } from '@/lib/i18n/langs';
import { I18N_STRINGS } from '@/lib/i18n/strings';
import { localizedSiteData } from '@/lib/i18n/localize';

const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState('en');

  // Read the stored preference after mount only, so the server-rendered
  // (English) markup matches the first client render and hydration is clean.
  useEffect(() => {
    const stored = window.localStorage.getItem('lang');
    if (stored && LANG_CODES.includes(stored) && stored !== 'en') {
      setLangState(stored);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  }, [lang]);

  const setLang = useCallback((code) => {
    if (!LANG_CODES.includes(code)) return;
    window.localStorage.setItem('lang', code);
    setLangState(code);
  }, []);

  const t = useCallback(
    (key) => {
      const dict = I18N_STRINGS[lang] || {};
      const en = I18N_STRINGS.en || {};
      return dict[key] || en[key] || key;
    },
    [lang]
  );

  const data = useMemo(() => localizedSiteData(lang), [lang]);

  const value = useMemo(
    () => ({ lang, setLang, t, data, langs: LANGS }),
    [lang, setLang, t, data]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within an I18nProvider');
  return ctx;
}
