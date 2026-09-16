'use client';

import { useEffect, useState } from 'react';
import { useI18n } from '@/lib/i18n/context';

const STORAGE_KEY = 'colorTheme';
const TAUPE = 'taupe';

// Mirrors the inline anti-flash script in layout.js: read the stored
// preference once on mount so the toggle's own state matches what the
// script already painted, rather than defaulting to "off" and flashing.
export default function ThemeToggle() {
  const { t } = useI18n();
  const [isTaupe, setIsTaupe] = useState(false);

  useEffect(() => {
    setIsTaupe(document.documentElement.getAttribute('data-theme') === TAUPE);
  }, []);

  const toggle = () => {
    const next = !isTaupe;
    setIsTaupe(next);
    if (next) {
      document.documentElement.setAttribute('data-theme', TAUPE);
      window.localStorage.setItem(STORAGE_KEY, TAUPE);
    } else {
      document.documentElement.removeAttribute('data-theme');
      window.localStorage.setItem(STORAGE_KEY, 'default');
    }
  };

  return (
    <button
      type="button"
      className={`theme-toggle${isTaupe ? ' is-active' : ''}`}
      onClick={toggle}
      aria-pressed={isTaupe}
      aria-label={t(isTaupe ? 'common.useDefaultTheme' : 'common.useTaupeTheme')}
      title={t(isTaupe ? 'common.useDefaultTheme' : 'common.useTaupeTheme')}
    >
      <span className="theme-toggle-swatch" aria-hidden="true" />
    </button>
  );
}
