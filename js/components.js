(function () {
  const pages = [['index.html','Home'],['about.html','About'],['timeline.html','Timeline'],['projects.html','Projects'],['awards.html','Awards'],['publications.html','Publications'],['gallery.html','Gallery'],['contact.html','Contact']];
  const current = location.pathname.split('/').pop() || 'index.html';
  const nav = pages.map(([href,label]) => `<a class="nav-link ${current===href?'active':''}" href="${href}">${label}</a>`).join('');
  document.getElementById('site-header').innerHTML = `
  <header class="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-white/90 backdrop-blur-xl dark:bg-navy-950/90">
    <nav class="shell flex h-20 items-center justify-between" aria-label="Primary navigation">
      <a href="index.html" class="group flex items-center gap-3" aria-label="Ashwani Kumar home">
        <span class="grid h-10 w-10 place-items-center rounded-full border border-gold-400 font-display text-lg font-bold text-gold-500">AK</span>
        <span><strong class="block font-display text-lg leading-none text-navy-900 dark:text-white">Ashwani Kumar</strong><small class="mt-1 block text-[10px] font-bold uppercase tracking-[.18em] text-slate-500 dark:text-slate-400">IAS · Government of Assam</small></span>
      </a>
      <div class="hidden items-center gap-5 xl:flex">${nav}</div>
      <div class="flex items-center gap-2">
        <div class="relative">
          <button id="theme-color-toggle" class="grid h-10 w-10 place-items-center rounded-full border border-slate-200 text-navy-900 dark:border-slate-700 dark:text-white" aria-haspopup="true" aria-expanded="false" aria-label="Choose color theme"><span aria-hidden="true">🎨</span></button>
          <div id="theme-color-menu" class="absolute right-0 top-12 z-50 hidden w-60 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl dark:border-slate-700 dark:bg-slate-900" role="menu" aria-label="Color theme options">
            <p class="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Color theme</p>
            <div class="grid grid-cols-5 gap-3">
              <button type="button" data-color-theme="classic" class="theme-swatch h-9 w-9 rounded-full" style="background:conic-gradient(#06182d 0 50%,#ddb65a 50% 100%)" aria-pressed="false" aria-label="Classic Navy & Gold" role="menuitemradio"></button>
              <button type="button" data-color-theme="emerald" class="theme-swatch h-9 w-9 rounded-full" style="background:conic-gradient(#05211c 0 50%,#7ab889 50% 100%)" aria-pressed="false" aria-label="Emerald & Champagne" role="menuitemradio"></button>
              <button type="button" data-color-theme="burgundy" class="theme-swatch h-9 w-9 rounded-full" style="background:conic-gradient(#220911 0 50%,#c77a4f 50% 100%)" aria-pressed="false" aria-label="Burgundy & Brass" role="menuitemradio"></button>
              <button type="button" data-color-theme="sapphire" class="theme-swatch h-9 w-9 rounded-full" style="background:conic-gradient(#081022 0 50%,#5c96d6 50% 100%)" aria-pressed="false" aria-label="Charcoal & Sapphire" role="menuitemradio"></button>
              <button type="button" data-color-theme="indigo" class="theme-swatch h-9 w-9 rounded-full" style="background:conic-gradient(#150b2a 0 50%,#ac79c7 50% 100%)" aria-pressed="false" aria-label="Indigo & Rose" role="menuitemradio"></button>
            </div>
          </div>
        </div>
        <button id="theme-toggle" class="grid h-10 w-10 place-items-center rounded-full border border-slate-200 text-navy-900 dark:border-slate-700 dark:text-white" aria-label="Toggle dark mode"><span aria-hidden="true">◐</span></button>
        <button id="menu-toggle" class="grid h-10 w-10 place-items-center rounded-full border border-slate-200 text-navy-900 xl:hidden dark:border-slate-700 dark:text-white" aria-controls="mobile-menu" aria-expanded="false" aria-label="Open menu"><span class="text-xl" aria-hidden="true">☰</span></button>
      </div>
    </nav>
    <div id="mobile-menu" class="fixed inset-0 top-0 z-[60] hidden h-[100dvh] w-full flex-col overflow-y-auto bg-navy-950 xl:hidden" aria-hidden="true">
      <div class="shell flex h-20 items-center justify-between border-b border-white/10">
        <a href="index.html" class="flex items-center gap-3" aria-label="Ashwani Kumar home">
          <span class="grid h-10 w-10 place-items-center rounded-full border border-gold-400 font-display text-lg font-bold text-gold-500">AK</span>
          <strong class="font-display text-lg text-white">Ashwani Kumar</strong>
        </a>
        <button id="menu-close" class="grid h-10 w-10 place-items-center rounded-full border border-white/30 text-white" aria-label="Close menu"><span class="text-xl" aria-hidden="true">×</span></button>
      </div>
      <div class="shell border-b border-white/10 py-5">
        <p class="text-xs font-bold uppercase tracking-[.2em] text-gold-400">Color theme</p>
        <div class="mt-3 flex gap-3" role="group" aria-label="Color theme options">
          <button type="button" data-color-theme="classic" class="theme-swatch h-10 w-10 rounded-full" style="background:conic-gradient(#06182d 0 50%,#ddb65a 50% 100%)" aria-pressed="false" aria-label="Classic Navy & Gold"></button>
          <button type="button" data-color-theme="emerald" class="theme-swatch h-10 w-10 rounded-full" style="background:conic-gradient(#05211c 0 50%,#7ab889 50% 100%)" aria-pressed="false" aria-label="Emerald & Champagne"></button>
          <button type="button" data-color-theme="burgundy" class="theme-swatch h-10 w-10 rounded-full" style="background:conic-gradient(#220911 0 50%,#c77a4f 50% 100%)" aria-pressed="false" aria-label="Burgundy & Brass"></button>
          <button type="button" data-color-theme="sapphire" class="theme-swatch h-10 w-10 rounded-full" style="background:conic-gradient(#081022 0 50%,#5c96d6 50% 100%)" aria-pressed="false" aria-label="Charcoal & Sapphire"></button>
          <button type="button" data-color-theme="indigo" class="theme-swatch h-10 w-10 rounded-full" style="background:conic-gradient(#150b2a 0 50%,#ac79c7 50% 100%)" aria-pressed="false" aria-label="Indigo & Rose"></button>
        </div>
      </div>
      <div class="shell flex flex-1 flex-col justify-center gap-2 py-10">${pages.map(([h,l])=>`<a class="border-b border-white/10 py-3 font-display text-3xl text-white hover:text-gold-300" href="${h}">${l}</a>`).join('')}</div>
    </div>
  </header>`;
  const socials = window.SITE_DATA.profile.social.map(s=>`<a href="${s.url}" target="_blank" rel="noopener noreferrer" class="text-sm text-slate-300 hover:text-gold-300">${s.label}<span class="sr-only"> (opens in new tab)</span></a>`).join('');
  document.getElementById('site-footer').innerHTML = `
  <footer class="bg-navy-950 py-14 text-white"><div class="shell grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
    <div><p class="font-display text-3xl">Ashwani Kumar</p><p class="mt-3 max-w-sm text-sm leading-6 text-slate-300">IAS Officer, 2010 Batch. Building trusted digital public systems for Assam.</p></div>
    <div><p class="mb-4 text-xs font-bold uppercase tracking-[.2em] text-gold-400">Navigate</p><div class="grid grid-cols-2 gap-3 text-sm text-slate-300">${nav}</div></div>
    <div><p class="mb-4 text-xs font-bold uppercase tracking-[.2em] text-gold-400">Connect</p><div class="grid grid-cols-2 gap-3">${socials}</div></div>
  </div><div class="shell mt-12 border-t border-white/10 pt-6 text-xs text-slate-400">© <span id="year"></span> Ashwani Kumar. All rights reserved.</div></footer>`;
})();