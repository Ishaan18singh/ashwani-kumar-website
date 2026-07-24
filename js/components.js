(function () {
  const pages = [['index.html','Home'],['about.html','About'],['timeline.html','Timeline'],['projects.html','Initiatives'],['awards.html','Awards'],['publications.html','Publications'],['gallery.html','Gallery'],['contact.html','Contact']];
  const current = location.pathname.split('/').pop() || 'index.html';

  // Curated header links (kept to 3, per design spec — full list lives in the fullscreen menu)
  const headerPicks = ['projects.html','gallery.html','contact.html'];
  const headerLinks = pages.filter(([h]) => headerPicks.includes(h))
    .map(([href,label]) => `<a class="header-link ${current===href?'active':''}" href="${href}">${label}</a>`).join('');

  const menuLinks = pages.map(([href,label],i) =>
    `<a class="fullscreen-menu-link ${current===href?'active':''}" style="--i:${i}" href="${href}">${label}</a>`
  ).join('');

  const socials = window.SITE_DATA.profile.social.map(s=>`<a href="${s.url}" target="_blank" rel="noopener noreferrer" class="fullscreen-menu-social-link">${s.label}<span class="sr-only"> (opens in new tab)</span></a>`).join('');
  const footerNav = pages.map(([href,label]) => `<a class="nav-link ${current===href?'active':''}" href="${href}">${label}</a>`).join('');

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
      <button id="menu-toggle" class="header-menu-btn" type="button" aria-haspopup="dialog" aria-controls="mobile-menu" aria-expanded="false" aria-label="Open menu">
        <span class="header-menu-icon" aria-hidden="true"><span class="menu-bar"></span><span class="menu-bar"></span></span>
        <span class="header-menu-label">Menu</span>
      </button>
      <a href="index.html" class="header-brand" aria-label="Ashwani Kumar home">
        <span class="header-brand-avatar" aria-hidden="true">AK</span>
        <span class="header-brand-text">
          <strong class="header-brand-name">Ashwani Kumar</strong>
          <small class="header-brand-sub">IAS · Government of Assam</small>
        </span>
      </a>
      <nav class="header-links" aria-label="Quick links">${headerLinks}</nav>
    </div>
  </header>
  <div id="mobile-menu" class="fullscreen-menu" role="dialog" aria-modal="true" aria-label="Site navigation" aria-hidden="true">
    <div class="fullscreen-menu-backdrop" data-menu-backdrop></div>
    <div class="shell fullscreen-menu-align">
      <div class="fullscreen-menu-panel">
        <nav class="fullscreen-menu-list" aria-label="All pages">${menuLinks}</nav>
        <div class="fullscreen-menu-footer">
          <div class="fullscreen-menu-block">
            <p class="fullscreen-menu-label">Appearance</p>
            <div class="fullscreen-menu-appearance-row">
              <button id="theme-toggle" type="button" class="fullscreen-menu-pill" aria-label="Toggle dark mode"><span aria-hidden="true">◐</span> Dark mode</button>
              <div class="fullscreen-menu-swatches" role="group" aria-label="Color theme options">${swatches}</div>
            </div>
          </div>
          <div class="fullscreen-menu-block">
            <p class="fullscreen-menu-label">Connect</p>
            <div class="fullscreen-menu-social">${socials}</div>
          </div>
        </div>
      </div>
    </div>
  </div>`;

  document.getElementById('site-footer').innerHTML = `
  <footer class="bg-ivory border-t border-slate-200 py-14 text-navy-900"><div class="shell grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
    <div><p class="font-display text-3xl">Ashwani Kumar</p><p class="mt-3 max-w-sm text-sm leading-6 text-slate-600">IAS Officer, 2010 Batch. Building trusted digital public systems for Assam.</p></div>
    <div><p class="mb-4 text-xs font-bold uppercase tracking-[.2em] text-gold-500">Navigate</p><div class="grid grid-cols-2 gap-3 text-sm text-slate-600">${footerNav}</div></div>
    <div><p class="mb-4 text-xs font-bold uppercase tracking-[.2em] text-gold-500">Connect</p><div class="grid grid-cols-2 gap-3">${window.SITE_DATA.profile.social.map(s=>`<a href="${s.url}" target="_blank" rel="noopener noreferrer" class="text-sm text-slate-600 hover:text-gold-500">${s.label}<span class="sr-only"> (opens in new tab)</span></a>`).join('')}</div></div>
  </div><div class="shell mt-12 border-t border-slate-200 pt-6 text-xs text-slate-500">© <span id="year"></span> Ashwani Kumar. All rights reserved.</div></footer>`;
})();