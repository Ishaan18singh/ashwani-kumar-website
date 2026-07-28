(function () {
  const LANGS = [
    { code: 'en', native: 'English' },
    { code: 'hi', native: 'हिन्दी' },
    { code: 'fr', native: 'Français' },
    { code: 'de', native: 'Deutsch' },
    { code: 'ru', native: 'Русский' },
    { code: 'as', native: 'অসমীয়া' },
    { code: 'zh', native: '中文' },
    { code: 'ja', native: '日本語' },
    { code: 'ar', native: 'العربية' }
  ];
  const CODES = LANGS.map(l => l.code);

  const getLang = () => {
    const stored = localStorage.getItem('lang');
    return CODES.includes(stored) ? stored : 'en';
  };

  const setLang = (code) => {
    if (!CODES.includes(code)) return;
    localStorage.setItem('lang', code);
    location.reload();
  };

  const t = (key) => {
    const lang = getLang();
    const dict = (window.I18N_STRINGS && window.I18N_STRINGS[lang]) || {};
    const en = (window.I18N_STRINGS && window.I18N_STRINGS.en) || {};
    return dict[key] || en[key] || key;
  };

  const translateStaticDOM = (root) => {
    root = root || document;
    root.querySelectorAll('[data-i18n]').forEach(el => {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    root.querySelectorAll('[data-i18n-html]').forEach(el => {
      el.innerHTML = t(el.getAttribute('data-i18n-html'));
    });
    root.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      el.setAttribute('placeholder', t(el.getAttribute('data-i18n-placeholder')));
    });
    root.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
      el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria-label')));
    });
    root.querySelectorAll('[data-i18n-title]').forEach(el => {
      el.setAttribute('title', t(el.getAttribute('data-i18n-title')));
    });
  };

  // Merge translated overlay fields (by array index) onto the canonical
  // English SITE_DATA, so pages can keep using window.SITE_DATA as before.
  const localizedSiteData = () => {
    const base = window.SITE_DATA;
    const lang = getLang();
    if (lang === 'en' || !base) return base;
    const overlay = window.SITE_DATA_I18N && window.SITE_DATA_I18N[lang];
    if (!overlay) return base;
    const merge = (baseArr, overlayArr, fields) => {
      if (!Array.isArray(baseArr) || !Array.isArray(overlayArr)) return baseArr;
      return baseArr.map((item, i) => {
        const o = overlayArr[i];
        if (!o) return item;
        const copy = Object.assign({}, item);
        fields.forEach(f => { if (o[f] !== undefined) copy[f] = o[f]; });
        return copy;
      });
    };
    const out = Object.assign({}, base);
    out.profile = Object.assign({}, base.profile);
    if (overlay.profile) {
      ['shortTitle', 'title', 'quote'].forEach(f => {
        if (overlay.profile[f] !== undefined) out.profile[f] = overlay.profile[f];
      });
    }
    if (overlay.positions) out.positions = overlay.positions;
    out.timeline = merge(base.timeline, overlay.timeline, ['role', 'org', 'type', 'detail']);
    out.projects = merge(base.projects, overlay.projects, ['summary', 'detail', 'tag']);
    out.awards = merge(base.awards, overlay.awards, ['title', 'body']);
    out.recognition = merge(base.recognition, overlay.recognition, ['title', 'text']);
    if (overlay.extras) out.extras = overlay.extras;
    return out;
  };

  window.I18N = { LANGS, getLang, setLang, t, translateStaticDOM, localizedSiteData };
  const lang = getLang();
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
})();
