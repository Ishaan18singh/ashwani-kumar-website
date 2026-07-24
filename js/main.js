(function(){
  const root=document.documentElement, stored=localStorage.getItem('theme');
  if(stored==='dark'||(!stored&&matchMedia('(prefers-color-scheme: dark)').matches)) root.classList.add('dark');
  document.getElementById('theme-toggle')?.addEventListener('click',()=>{root.classList.toggle('dark');localStorage.setItem('theme',root.classList.contains('dark')?'dark':'light')});

  const storedColorTheme=localStorage.getItem('colorTheme')||'classic';
  root.setAttribute('data-theme',storedColorTheme);
  const markActiveSwatch=(theme)=>{document.querySelectorAll('[data-color-theme]').forEach(btn=>btn.setAttribute('aria-pressed',String(btn.dataset.colorTheme===theme)))};
  markActiveSwatch(storedColorTheme);
  document.querySelectorAll('[data-color-theme]').forEach(btn=>btn.addEventListener('click',()=>{
    const theme=btn.dataset.colorTheme;
    root.setAttribute('data-theme',theme);
    localStorage.setItem('colorTheme',theme);
    markActiveSwatch(theme);
  }));

  /* ---- Premium header: glass-on-scroll + hide on scroll-down / reveal on scroll-up ---- */
  const headerBar=document.getElementById('site-header-bar');
  if(headerBar && !matchMedia('(prefers-reduced-motion: reduce)').matches){
    let lastY=window.scrollY, ticking=false;
    const GLASS_AT=24, HIDE_AFTER=96;
    const onScroll=()=>{
      const y=window.scrollY;
      headerBar.classList.toggle('is-scrolled', y>GLASS_AT);
      const menuOpen=document.getElementById('menu-toggle')?.getAttribute('aria-expanded')==='true';
      if(!menuOpen){
        if(y>lastY && y>HIDE_AFTER) headerBar.classList.add('header-hidden');
        else headerBar.classList.remove('header-hidden');
      }
      lastY=y; ticking=false;
    };
    window.addEventListener('scroll',()=>{ if(!ticking){ requestAnimationFrame(onScroll); ticking=true; } },{passive:true});
    onScroll();
  } else if(headerBar){
    headerBar.classList.toggle('is-scrolled', window.scrollY>24);
  }

  /* ---- Compact menu panel: open/close, focus trap, Escape, backdrop click ---- */
  const toggle=document.getElementById('menu-toggle'),menu=document.getElementById('mobile-menu'),backdrop=menu?.querySelector('[data-menu-backdrop]');
  let lastFocused=null;
  const panelFocusables=()=>menu?menu.querySelectorAll('.fullscreen-menu-panel a[href], .fullscreen-menu-panel button:not([disabled])'):[];
  const setMenu=(open)=>{
    if(!toggle||!menu)return;
    toggle.setAttribute('aria-expanded',String(open));
    toggle.classList.toggle('is-active',open);
    toggle.setAttribute('aria-label',open?'Close menu':'Open menu');
    menu.classList.toggle('is-open',open);
    menu.setAttribute('aria-hidden',String(!open));
    document.body.classList.toggle('overflow-hidden',open);
    headerBar?.classList.remove('header-hidden');
    if(open){ lastFocused=document.activeElement; panelFocusables()[0]?.focus(); }
    else if(lastFocused){ lastFocused.focus(); }
  };
  toggle?.addEventListener('click',()=>setMenu(toggle.getAttribute('aria-expanded')!=='true'));
  backdrop?.addEventListener('click',()=>setMenu(false));
  menu?.addEventListener('click',e=>{if(e.target.closest('a'))setMenu(false)});
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'&&toggle?.getAttribute('aria-expanded')==='true'){ setMenu(false); return; }
    if(e.key==='Tab'&&toggle?.getAttribute('aria-expanded')==='true'){
      const items=Array.from(panelFocusables());
      if(!items.length)return;
      const first=items[0], last=items[items.length-1];
      if(e.shiftKey && document.activeElement===first){ e.preventDefault(); last.focus(); }
      else if(!e.shiftKey && document.activeElement===last){ e.preventDefault(); first.focus(); }
    }
  });
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');observer.unobserve(e.target)}}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
  document.getElementById('year').textContent=new Date().getFullYear();
  document.querySelectorAll('[data-accordion]').forEach(button=>button.addEventListener('click',()=>{const panel=document.getElementById(button.getAttribute('aria-controls'));const open=button.getAttribute('aria-expanded')==='true';button.setAttribute('aria-expanded',String(!open));panel.hidden=open;button.querySelector('[data-plus]').textContent=open?'+':'−'}));
  const form=document.getElementById('contact-form');
  form?.addEventListener('submit',async e=>{
    e.preventDefault();
    const status=document.getElementById('form-status');
    const submitBtn=form.querySelector('button[type="submit"]');
    const name=form.querySelector('[name="name"]').value.trim();
    const email=form.querySelector('[name="email"]').value.trim();
    const message=form.querySelector('[name="message"]').value.trim();
    if(!window.supabaseClient){
      status.textContent='Form is not connected yet. Please contact via email directly.';
      status.focus();
      return;
    }
    submitBtn.disabled=true;
    submitBtn.textContent='Sending…';
    const {error}=await window.supabaseClient.from('contact_messages').insert({name,email,message});
    submitBtn.disabled=false;
    submitBtn.textContent='Send message';
    if(error){
      status.textContent='Something went wrong sending your message. Please try again or email directly.';
    } else {
      status.textContent='Thank you — your message has been sent.';
      form.reset();
    }
    status.focus();
  });
})();