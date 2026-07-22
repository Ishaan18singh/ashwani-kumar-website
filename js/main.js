(function(){
  const root=document.documentElement, stored=localStorage.getItem('theme');
  if(stored==='dark'||(!stored&&matchMedia('(prefers-color-scheme: dark)').matches)) root.classList.add('dark');
  document.getElementById('theme-toggle')?.addEventListener('click',()=>{root.classList.toggle('dark');localStorage.setItem('theme',root.classList.contains('dark')?'dark':'light')});

  const storedColorTheme=localStorage.getItem('colorTheme')||'classic';
  root.setAttribute('data-theme',storedColorTheme);
  const markActiveSwatch=(theme)=>{document.querySelectorAll('[data-color-theme]').forEach(btn=>btn.setAttribute('aria-pressed',String(btn.dataset.colorTheme===theme)))};
  markActiveSwatch(storedColorTheme);
  const colorToggle=document.getElementById('theme-color-toggle'),colorMenu=document.getElementById('theme-color-menu');
  document.querySelectorAll('[data-color-theme]').forEach(btn=>btn.addEventListener('click',()=>{
    const theme=btn.dataset.colorTheme;
    root.setAttribute('data-theme',theme);
    localStorage.setItem('colorTheme',theme);
    markActiveSwatch(theme);
    colorMenu?.classList.add('hidden');
    colorToggle?.setAttribute('aria-expanded','false');
  }));
  colorToggle?.addEventListener('click',e=>{
    e.stopPropagation();
    const open=colorMenu.classList.toggle('hidden')===false;
    colorToggle.setAttribute('aria-expanded',String(open));
  });
  document.addEventListener('click',e=>{
    if(colorMenu&&!colorMenu.classList.contains('hidden')&&!colorMenu.contains(e.target)&&e.target!==colorToggle){
      colorMenu.classList.add('hidden');
      colorToggle.setAttribute('aria-expanded','false');
    }
  });
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'&&colorMenu&&!colorMenu.classList.contains('hidden')){
      colorMenu.classList.add('hidden');
      colorToggle.setAttribute('aria-expanded','false');
      colorToggle.focus();
    }
  });
  const toggle=document.getElementById('menu-toggle'),menu=document.getElementById('mobile-menu'),closeBtn=document.getElementById('menu-close');
  const setMenu=(open)=>{toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close menu':'Open menu');menu.classList.toggle('hidden',!open);menu.classList.toggle('flex',open);menu.setAttribute('aria-hidden',String(!open));document.body.classList.toggle('overflow-hidden',open);if(open)menu.querySelector('a,button')?.focus()};
  toggle?.addEventListener('click',()=>setMenu(toggle.getAttribute('aria-expanded')!=='true'));
  closeBtn?.addEventListener('click',()=>{setMenu(false);toggle.focus()});
  menu?.addEventListener('click',e=>{if(e.target.closest('a'))setMenu(false)});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&toggle?.getAttribute('aria-expanded')==='true'){setMenu(false);toggle.focus()}});
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');observer.unobserve(e.target)}}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
  document.getElementById('year').textContent=new Date().getFullYear();
  document.querySelectorAll('[data-accordion]').forEach(button=>button.addEventListener('click',()=>{const panel=document.getElementById(button.getAttribute('aria-controls'));const open=button.getAttribute('aria-expanded')==='true';button.setAttribute('aria-expanded',String(!open));panel.hidden=open;button.querySelector('[data-plus]').textContent=open?'+':'−'}));
  const form=document.getElementById('contact-form');
  form?.addEventListener('submit',e=>{e.preventDefault();const status=document.getElementById('form-status');status.textContent='Thank you. This preview form is ready to connect to Formspree; no message has been sent yet.';status.focus()});
})();