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
        <button id="theme-toggle" class="grid h-10 w-10 place-items-center rounded-full border border-slate-200 text-navy-900 dark:border-slate-700 dark:text-white" aria-label="Toggle dark mode"><span aria-hidden="true">◐</span></button>
        <button id="menu-toggle" class="grid h-10 w-10 place-items-center rounded-full border border-slate-200 text-navy-900 xl:hidden dark:border-slate-700 dark:text-white" aria-controls="mobile-menu" aria-expanded="false" aria-label="Open menu"><span class="text-xl" aria-hidden="true">☰</span></button>
      </div>
    </nav>
    <div id="mobile-menu" class="invisible fixed inset-0 top-20 z-50 translate-x-full bg-navy-950 p-8 opacity-0 transition duration-300 xl:hidden" aria-hidden="true"><div class="flex flex-col gap-6">${pages.map(([h,l])=>`<a class="font-display text-3xl text-white hover:text-gold-300" href="${h}">${l}</a>`).join('')}</div></div>
  </header>`;
  const socials = window.SITE_DATA.profile.social.map(s=>`<a href="${s.url}" target="_blank" rel="noopener noreferrer" class="text-sm text-slate-300 hover:text-gold-300">${s.label}<span class="sr-only"> (opens in new tab)</span></a>`).join('');
  document.getElementById('site-footer').innerHTML = `
  <footer class="bg-navy-950 py-14 text-white"><div class="shell grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
    <div><p class="font-display text-3xl">Ashwani Kumar</p><p class="mt-3 max-w-sm text-sm leading-6 text-slate-300">IAS Officer, 2010 Batch. Building trusted digital public systems for Assam.</p></div>
    <div><p class="mb-4 text-xs font-bold uppercase tracking-[.2em] text-gold-400">Navigate</p><div class="grid grid-cols-2 gap-3 text-sm text-slate-300">${nav}</div></div>
    <div><p class="mb-4 text-xs font-bold uppercase tracking-[.2em] text-gold-400">Connect</p><div class="grid grid-cols-2 gap-3">${socials}</div></div>
  </div><div class="shell mt-12 border-t border-white/10 pt-6 text-xs text-slate-400">© <span id="year"></span> Ashwani Kumar. All rights reserved.</div></footer>`;
})();
