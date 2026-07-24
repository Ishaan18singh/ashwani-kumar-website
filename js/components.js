(function () {
  const t = (key) => (window.I18N ? window.I18N.t(key) : key);
  const pages = [['index.html','nav.home'],['about.html','nav.about'],['timeline.html','nav.timeline'],['projects.html','nav.projects'],['awards.html','nav.awards'],['publications.html','nav.publications'],['gallery.html','nav.gallery'],['ias-aspirants.html','nav.iasAspirants'],['contact.html','nav.contact']];
  const current = location.pathname.split('/').pop() || 'index.html';

  // Curated header links — Contact removed per design update; full list still lives in the fullscreen menu
  const headerPicks = ['projects.html','gallery.html'];
  const headerLinks = pages.filter(([h]) => headerPicks.includes(h))
    .map(([href,key]) => `<a class="header-link ${current===href?'active':''}" href="${href}" data-i18n="${key}">${t(key)}</a>`).join('');

  const menuLinks = pages.map(([href,key],i) =>
    `<a class="fullscreen-menu-link ${current===href?'active':''}" style="--i:${i}" href="${href}" data-i18n="${key}">${t(key)}</a>`
  ).join('');

  const langs = (window.I18N ? window.I18N.LANGS : [{code:'en',native:'English'}]);
  const currentLang = window.I18N ? window.I18N.getLang() : 'en';
  const langOptions = langs.map(l => `<option value="${l.code}" ${l.code===currentLang?'selected':''}>${l.native}</option>`).join('');
  const langSwitcher = `<div class="header-lang">
    <label class="sr-only" for="lang-select" data-i18n="common.chooseLanguage">${t('common.chooseLanguage')}</label>
    <select id="lang-select" class="lang-select" aria-label="${t('common.chooseLanguage')}" data-i18n-aria-label="common.chooseLanguage">${langOptions}</select>
  </div>`;

  const footerNav = pages.map(([href,key]) => `<a class="nav-link ${current===href?'active':''}" href="${href}" data-i18n="${key}">${t(key)}</a>`).join('');

  // Monochrome (currentColor) icon set — social links live only in the footer now
  const socialIcons = {
    LinkedIn: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4V8.5zM8.5 8.5h3.8v1.98h.05c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.78 2.65 4.78 6.1V23h-4v-6.65c0-1.59-.03-3.63-2.22-3.63-2.22 0-2.56 1.73-2.56 3.51V23h-4V8.5z"/></svg>',
    X: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M18.9 2h3.3l-7.2 8.2L23.5 22h-6.6l-5.2-6.8L5.7 22H2.4l7.7-8.8L1 2h6.8l4.7 6.2L18.9 2zm-1.2 18h1.8L7.4 3.9H5.5L17.7 20z"/></svg>',
    Instagram: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none"/></svg>',
    Facebook: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z"/></svg>',
    YouTube: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="2" y="5" width="20" height="14" rx="4"/><path d="M9.5 8.5v7L16 12l-6.5-3.5z" fill="currentColor" stroke="none"/></svg>'
  };
  const footerSocials = window.SITE_DATA.profile.social.map(s=>`<a href="${s.url}" target="_blank" rel="noopener noreferrer" aria-label="${s.label} (opens in new tab)" title="${s.label}" class="footer-social-link">${socialIcons[s.label]||''}</a>`).join('');

  const swatch = (theme,label,grad,size) => `<button type="button" data-color-theme="${theme}" class="theme-swatch ${size} rounded-full" style="background:${grad}" aria-pressed="false" aria-label="${label}" role="menuitemradio"></button>`;
  const swatches = [
    swatch('classic','Classic Navy & Gold','conic-gradient(#06182d 0 50%,#ddb65a 50% 100%)','h-9 w-9'),
    swatch('emerald','Emerald','conic-gradient(#05211c 0 50%,#7ab889 50% 100%)','h-9 w-9'),
    swatch('terracotta','Terracotta & Sand','conic-gradient(#261a14 0 50%,#c47c56 50% 100%)','h-9 w-9'),
    swatch('teal','Teal & Slate','conic-gradient(#081c1e 0 50%,#5eb4b1 50% 100%)','h-9 w-9'),
    swatch('plum','Muted Plum','conic-gradient(#1a0e1c 0 50%,#ac79a8 50% 100%)','h-9 w-9')
  ].join('');

  document.getElementById('site-header').innerHTML = `
  <header id="site-header-bar" class="site-header fixed inset-x-0 top-0 z-40">
    <div class="header-inner shell">
      <button id="menu-toggle" class="header-menu-btn" type="button" aria-haspopup="dialog" aria-controls="mobile-menu" aria-expanded="false" aria-label="${t('common.openMenu')}" data-i18n-aria-label="common.openMenu">
        <span class="header-menu-icon" aria-hidden="true"><span class="menu-bar"></span><span class="menu-bar"></span></span>
        <span class="header-menu-label" data-i18n="common.menu">${t('common.menu')}</span>
      </button>
      <a href="index.html" class="header-brand" aria-label="Ashwani Kumar home">
        <span class="header-brand-text">
          <strong class="header-brand-name">Ashwani Kumar</strong>
          <small class="header-brand-sub">IAS · Government of Assam</small>
        </span>
      </a>
      <div class="header-right">
        <nav class="header-links" aria-label="Quick links">${headerLinks}</nav>
        ${langSwitcher}
      </div>
    </div>
  </header>
  <div id="mobile-menu" class="fullscreen-menu" role="dialog" aria-modal="true" aria-label="Site navigation" aria-hidden="true">
    <div class="fullscreen-menu-backdrop" data-menu-backdrop></div>
    <div class="shell fullscreen-menu-align">
      <div class="fullscreen-menu-panel">
        <nav class="fullscreen-menu-list" aria-label="All pages">${menuLinks}</nav>
        <div class="fullscreen-menu-footer">
          <div class="fullscreen-menu-block">
            <p class="fullscreen-menu-label" data-i18n="common.appearance">${t('common.appearance')}</p>
            <div class="fullscreen-menu-appearance-row">
              <button id="theme-toggle" type="button" class="fullscreen-menu-pill" aria-label="Toggle dark mode"><span aria-hidden="true">◐</span> <span data-i18n="common.darkMode">${t('common.darkMode')}</span></button>
              <div class="fullscreen-menu-swatches" role="group" aria-label="Color theme options">${swatches}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;

  document.getElementById('site-footer').innerHTML = `
  <footer class="bg-ivory border-t border-slate-200 py-14 text-navy-900"><div class="shell grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
    <div><p class="font-display text-3xl">Ashwani Kumar</p><p class="mt-3 max-w-sm text-sm leading-6 text-slate-600" data-i18n="common.footerTagline">${t('common.footerTagline')}</p></div>
    <div><p class="mb-4 text-xs font-bold uppercase tracking-[.2em] text-gold-500" data-i18n="common.navigate">${t('common.navigate')}</p><div class="grid grid-cols-2 gap-3 text-sm text-slate-600">${footerNav}</div></div>
    <div><p class="mb-4 text-xs font-bold uppercase tracking-[.2em] text-gold-500" data-i18n="common.connect">${t('common.connect')}</p><div class="flex flex-wrap gap-3">${footerSocials}</div></div>
  </div><div class="shell mt-12 border-t border-slate-200 pt-6 text-xs text-slate-500">© <span id="year"></span> Ashwani Kumar. <span data-i18n="common.allRightsReserved">${t('common.allRightsReserved')}</span></div></footer>`;

  document.getElementById('lang-select')?.addEventListener('change', (e) => {
    if (window.I18N) window.I18N.setLang(e.target.value);
  });

  if (window.I18N) window.I18N.translateStaticDOM(document);
})();