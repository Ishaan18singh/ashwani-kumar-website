(function(){
  const root=document.documentElement, stored=localStorage.getItem('theme');
  if(stored==='dark'||(!stored&&matchMedia('(prefers-color-scheme: dark)').matches)) root.classList.add('dark');
  document.getElementById('theme-toggle')?.addEventListener('click',()=>{root.classList.toggle('dark');localStorage.setItem('theme',root.classList.contains('dark')?'dark':'light')});
  const toggle=document.getElementById('menu-toggle'),menu=document.getElementById('mobile-menu');
  toggle?.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!open));toggle.setAttribute('aria-label',open?'Open menu':'Close menu');menu.classList.toggle('invisible',open);menu.classList.toggle('translate-x-full',open);menu.classList.toggle('opacity-0',open);menu.setAttribute('aria-hidden',String(open));document.body.classList.toggle('overflow-hidden',!open)});
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');observer.unobserve(e.target)}}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
  document.getElementById('year').textContent=new Date().getFullYear();
  document.querySelectorAll('[data-accordion]').forEach(button=>button.addEventListener('click',()=>{const panel=document.getElementById(button.getAttribute('aria-controls'));const open=button.getAttribute('aria-expanded')==='true';button.setAttribute('aria-expanded',String(!open));panel.hidden=open;button.querySelector('[data-plus]').textContent=open?'+':'−'}));
  const form=document.getElementById('contact-form');
  form?.addEventListener('submit',e=>{e.preventDefault();const status=document.getElementById('form-status');status.textContent='Thank you. This preview form is ready to connect to Formspree; no message has been sent yet.';status.focus()});
})();
