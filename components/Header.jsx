'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useI18n } from '@/lib/i18n/context';
import { NAV_PAGES, HEADER_PICKS } from '@/lib/nav';
import ThemeToggle from '@/components/ThemeToggle';

// Pages whose hero is dark behind the transparent header: the nav needs
// light text there, or it renders dark-on-dark until the user scrolls.
const DARK_HERO_ROUTES = ['/', '/contact', '/ias-aspirants'];

export default function Header() {
  const pathname = usePathname();
  const { t, lang, setLang, langs } = useI18n();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleRef = useRef(null);
  const panelRef = useRef(null);
  const lastFocused = useRef(null);

  useEffect(() => {
    let ticking = false;
    const GLASS_AT = 24;

    const onScroll = () => {
      setScrolled(window.scrollY > GLASS_AT);
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
  }, []);

  const setMenu = (open) => {
    setMenuOpen(open);
    if (open) {
      lastFocused.current = document.activeElement;
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

  const headerLinks = NAV_PAGES.filter(([href]) => HEADER_PICKS.includes(href));

  return (
    <>
      <header
        id="site-header-bar"
        className={`site-header fixed inset-x-0 top-0 z-40${scrolled ? ' is-scrolled' : ''}${
          DARK_HERO_ROUTES.includes(pathname) ? ' on-dark-hero' : ''
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
              <span className="menu-bar" />
            </span>
            <span className="header-menu-label">{t('common.menu')}</span>
          </button>
          <div className="header-right">
            <nav className="header-links" aria-label="Quick links">
              {headerLinks.map(([href, key]) => (
                <Link key={href} href={href} prefetch={false} className={`header-link${pathname === href ? ' active' : ''}`}>
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
            <ThemeToggle />
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
                  prefetch={false}
                  style={{ '--i': i }}
                  className={`fullscreen-menu-link${pathname === href ? ' active' : ''}`}
                >
                  {t(key)}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
