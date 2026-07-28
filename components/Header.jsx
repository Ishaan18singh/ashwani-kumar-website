'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useI18n } from '@/lib/i18n/context';
import { NAV_PAGES, HEADER_PICKS, COLOR_THEMES } from '@/lib/nav';

export default function Header() {
  const pathname = usePathname();
  const { t, lang, setLang, langs } = useI18n();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [colorTheme, setColorTheme] = useState('classic');
  const [isDark, setIsDark] = useState(false);

  const toggleRef = useRef(null);
  const panelRef = useRef(null);
  const lastFocused = useRef(null);

  // Sync color theme + dark mode reads (the blocking inline script in layout
  // already applied classes before paint; this just mirrors that into state
  // so the swatches/toggle reflect reality).
  useEffect(() => {
    const root = document.documentElement;
    setColorTheme(root.getAttribute('data-theme') || 'classic');
    setIsDark(root.classList.contains('dark'));
  }, []);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const GLASS_AT = 24;
    const HIDE_AFTER = 96;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > GLASS_AT);
      if (!menuOpen) {
        if (reduceMotion) {
          setHidden(false);
        } else if (y > lastY && y > HIDE_AFTER) {
          setHidden(true);
        } else {
          setHidden(false);
        }
      }
      lastY = y;
      ticking = false;
    };

    const handler = () => {
      if (!ticking) {
        requestAnimationFrame(onScroll);
        ticking = true;
      }
    };
    onScroll();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [menuOpen]);

  const setMenu = (open) => {
    setMenuOpen(open);
    if (open) {
      lastFocused.current = document.activeElement;
      setHidden(false);
      document.body.classList.add('overflow-hidden');
      requestAnimationFrame(() => {
        const first = panelRef.current?.querySelector('a[href], button:not([disabled])');
        first?.focus();
      });
    } else {
      document.body.classList.remove('overflow-hidden');
      lastFocused.current?.focus?.();
    }
  };

  useEffect(() => {
    const onKeydown = (e) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenu(false);
        return;
      }
      if (e.key === 'Tab' && menuOpen && panelRef.current) {
        const items = Array.from(panelRef.current.querySelectorAll('a[href], button:not([disabled])'));
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuOpen]);

  // Close the menu automatically on route changes.
  useEffect(() => {
    setMenuOpen(false);
    document.body.classList.remove('overflow-hidden');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const toggleDark = () => {
    const root = document.documentElement;
    root.classList.toggle('dark');
    const nowDark = root.classList.contains('dark');
    window.localStorage.setItem('theme', nowDark ? 'dark' : 'light');
    setIsDark(nowDark);
  };

  const applyColorTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem('colorTheme', theme);
    setColorTheme(theme);
  };

  const headerLinks = NAV_PAGES.filter(([href]) => HEADER_PICKS.includes(href));

  return (
    <>
      <header
        id="site-header-bar"
        className={`site-header fixed inset-x-0 top-0 z-40${scrolled ? ' is-scrolled' : ''}${
          hidden ? ' header-hidden' : ''
        }`}
      >
        <div className="header-inner shell">
          <button
            ref={toggleRef}
            id="menu-toggle"
            className={`header-menu-btn${menuOpen ? ' is-active' : ''}`}
            type="button"
            aria-haspopup="dialog"
            aria-controls="mobile-menu"
            aria-expanded={menuOpen}
            aria-label={t(menuOpen ? 'common.closeMenu' : 'common.openMenu')}
            onClick={() => setMenu(!menuOpen)}
          >
            <span className="header-menu-icon" aria-hidden="true">
              <span className="menu-bar" />
              <span className="menu-bar" />
            </span>
            <span className="header-menu-label">{t('common.menu')}</span>
          </button>
          <Link href="/" className="header-brand" aria-label="Ashwani Kumar home">
            <span className="header-brand-text">
              <strong className="header-brand-name">Ashwani Kumar</strong>
              <small className="header-brand-sub">IAS · Government of Assam</small>
            </span>
          </Link>
          <div className="header-right">
            <nav className="header-links" aria-label="Quick links">
              {headerLinks.map(([href, key]) => (
                <Link key={href} href={href} className={`header-link${pathname === href ? ' active' : ''}`}>
                  {t(key)}
                </Link>
              ))}
            </nav>
            <div className="header-lang">
              <label className="sr-only" htmlFor="lang-select">
                {t('common.chooseLanguage')}
              </label>
              <select
                id="lang-select"
                className="lang-select"
                aria-label={t('common.chooseLanguage')}
                value={lang}
                onChange={(e) => setLang(e.target.value)}
              >
                {langs.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.native}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`fullscreen-menu${menuOpen ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        aria-hidden={!menuOpen}
      >
        <div className="fullscreen-menu-backdrop" onClick={() => setMenu(false)} />
        <div className="shell fullscreen-menu-align">
          <div className="fullscreen-menu-panel" ref={panelRef}>
            <nav className="fullscreen-menu-list" aria-label="All pages">
              {NAV_PAGES.map(([href, key], i) => (
                <Link
                  key={href}
                  href={href}
                  style={{ '--i': i }}
                  className={`fullscreen-menu-link${pathname === href ? ' active' : ''}`}
                >
                  {t(key)}
                </Link>
              ))}
            </nav>
            <div className="fullscreen-menu-footer">
              <div className="fullscreen-menu-block">
                <p className="fullscreen-menu-label">{t('common.appearance')}</p>
                <div className="fullscreen-menu-appearance-row">
                  <button
                    id="theme-toggle"
                    type="button"
                    className="fullscreen-menu-pill"
                    aria-label="Toggle dark mode"
                    onClick={toggleDark}
                  >
                    <span aria-hidden="true">◐</span> <span>{t('common.darkMode')}</span>
                  </button>
                  <div className="fullscreen-menu-swatches" role="group" aria-label="Color theme options">
                    {COLOR_THEMES.map((s) => (
                      <button
                        key={s.theme}
                        type="button"
                        className="theme-swatch h-9 w-9 rounded-full"
                        style={{ background: s.gradient }}
                        aria-pressed={colorTheme === s.theme}
                        aria-label={s.label}
                        role="menuitemradio"
                        onClick={() => applyColorTheme(s.theme)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
