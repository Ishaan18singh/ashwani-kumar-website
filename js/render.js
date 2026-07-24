(function(){
  const d=window.I18N?window.I18N.localizedSiteData():window.SITE_DATA;
  const t=(key)=>window.I18N?window.I18N.t(key):key;
  const mount=(id,html)=>{const el=document.getElementById(id);if(el)el.innerHTML=html};
  const slugify=(s)=>s.toLowerCase().trim().replace(/&/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
  mount('positions-list',d.positions.map((x,i)=>`<li class="flex gap-3"><span class="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold-400/15 text-xs font-bold text-gold-500">${i+1}</span><span>${x}</span></li>`).join(''));
  mount('timeline-list',d.timeline.map((x,i)=>`<article class="reveal relative pl-10"><span class="absolute left-0 top-2 h-4 w-4 rounded-full border-4 border-ivory bg-gold-400 ring-1 ring-gold-400 dark:border-slate-950"></span><button data-accordion class="card w-full text-left" aria-expanded="${i===0}" aria-controls="timeline-${i}"><span class="flex items-start justify-between gap-5"><span><span class="text-xs font-bold uppercase tracking-[.15em] text-gold-500">${x.period} · ${x.type}</span><strong class="mt-2 block font-display text-2xl text-navy-900 dark:text-white">${x.role}</strong><span class="mt-1 block text-sm text-slate-500 dark:text-slate-400">${x.org}</span></span><span data-plus class="text-2xl text-gold-500">${i===0?'−':'+'}</span></span><span id="timeline-${i}" class="mt-4 block border-t border-slate-100 pt-4 text-sm leading-6 text-slate-600 dark:border-slate-800 dark:text-slate-300" ${i===0?'':'hidden'}>${x.detail}</span></button></article>`).join(''));
  const initiativeImages=['gallery-01','gallery-02','gallery-03','gallery-04','gallery-05'];
  const cardImg=(i)=>initiativeImages[i%initiativeImages.length];
  const isProjectsPage=/(^|\/)projects(\.html)?\/?$/.test(location.pathname);
  if(isProjectsPage){
    const carouselCard=(x,i)=>`<a href="project.html#${slugify(x.title)}" class="initiative-card carousel-card" aria-label="${x.title} — read more"><img class="initiative-card-img" src="images/${cardImg(i)}.webp" alt="" loading="lazy"><span class="corner corner-tl" aria-hidden="true"></span><span class="corner corner-br" aria-hidden="true"></span><span class="initiative-content"><span class="initiative-eyebrow">${t('project.initiative')}</span><span class="initiative-title">${x.title}<span class="initiative-arrow" aria-hidden="true">→</span></span><span class="initiative-summary">${x.summary}</span></span></a>`;
    const cards=d.projects.map(carouselCard).join('');
    mount('projects-grid',`<div class="projects-carousel" tabindex="0" role="region" aria-label="Key projects and initiatives — scroll or drag to browse"><div class="projects-carousel-track">${cards}</div></div>`);
    const carousel=document.querySelector('.projects-carousel');
    const track=document.querySelector('.projects-carousel-track');
    if(carousel&&track){
      const distance=track.scrollWidth-carousel.clientWidth;
      const stopAutoplay=()=>{
        track.classList.remove('autoplay');
        const computed=getComputedStyle(track).transform;
        let offset=0;
        if(computed&&computed!=='none'){
          const m=new DOMMatrixReadOnly(computed);
          offset=-m.m41;
        }
        if(offset>0)carousel.scrollLeft=offset;
        track.style.animation='none';
        track.style.transform='none';
      };
      if(distance>0&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
        const duration=Math.min(Math.max(distance/45,5),12);
        track.style.setProperty('--cp-distance',`-${distance}px`);
        track.style.setProperty('--cp-duration',`${duration}s`);
        requestAnimationFrame(()=>track.classList.add('autoplay'));
        track.addEventListener('animationend',stopAutoplay,{once:true});
        ['pointerdown','wheel','touchstart'].forEach(evt=>carousel.addEventListener(evt,stopAutoplay,{passive:true,once:true}));
      }
      let dragging=false,startX=0,startScroll=0,moved=false,pointerId=null;
      carousel.addEventListener('pointerdown',(e)=>{
        if(e.pointerType==='touch')return;
        dragging=true;moved=false;pointerId=e.pointerId;startX=e.clientX;startScroll=carousel.scrollLeft;
      });
      carousel.addEventListener('pointermove',(e)=>{
        if(!dragging)return;
        const delta=e.clientX-startX;
        if(!moved&&Math.abs(delta)>6){
          moved=true;
          carousel.classList.add('dragging');
          carousel.setPointerCapture(pointerId);
        }
        if(moved)carousel.scrollLeft=startScroll-delta;
      });
      ['pointerup','pointerleave','pointercancel'].forEach(evt=>carousel.addEventListener(evt,()=>{dragging=false;carousel.classList.remove('dragging');}));
      carousel.addEventListener('click',(e)=>{if(moved){e.preventDefault();moved=false;}},true);
    }
  } else {
    const marqueeCard=(x,i)=>`<a href="project.html#${slugify(x.title)}" class="initiative-card" aria-label="${x.title} — read more"><img class="initiative-card-img" src="images/${cardImg(i)}.webp" alt="" loading="lazy"><span class="corner corner-tl" aria-hidden="true"></span><span class="corner corner-br" aria-hidden="true"></span><span class="initiative-content"><span class="initiative-eyebrow">${t('project.initiative')}</span><span class="initiative-title">${x.title}<span class="initiative-arrow" aria-hidden="true">→</span></span></span></a>`;
    const cards=d.projects.map(marqueeCard).join('');
    mount('projects-grid',`<div class="initiatives-marquee" tabindex="0" role="region" aria-label="Selected initiatives — scroll or drag to browse"><div class="initiatives-track">${cards}</div></div>`);
    const marquee=document.querySelector('.initiatives-marquee');
    const track=document.querySelector('.initiatives-track');
    if(marquee&&track){
      const distance=track.scrollWidth-marquee.clientWidth;
      const stopAutoplay=()=>{
        track.classList.remove('autoplay');
        const computed=getComputedStyle(track).transform;
        let offset=0;
        if(computed&&computed!=='none'){
          const m=new DOMMatrixReadOnly(computed);
          offset=-m.m41;
        }
        if(offset>0)marquee.scrollLeft=offset;
        track.style.animation='none';
        track.style.transform='none';
      };
      if(distance>0&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
        const duration=Math.min(Math.max(distance/40,8),18);
        track.style.setProperty('--ip-distance',`-${distance}px`);
        track.style.setProperty('--ip-duration',`${duration}s`);
        requestAnimationFrame(()=>track.classList.add('autoplay'));
        track.addEventListener('animationend',stopAutoplay,{once:true});
        ['pointerdown','wheel','touchstart'].forEach(evt=>marquee.addEventListener(evt,stopAutoplay,{passive:true,once:true}));
      }
      let dragging=false,startX=0,startScroll=0,moved=false,pointerId=null;
      marquee.addEventListener('pointerdown',(e)=>{
        if(e.pointerType==='touch')return;
        dragging=true;moved=false;pointerId=e.pointerId;startX=e.clientX;startScroll=marquee.scrollLeft;
      });
      marquee.addEventListener('pointermove',(e)=>{
        if(!dragging)return;
        const delta=e.clientX-startX;
        if(!moved&&Math.abs(delta)>6){
          moved=true;
          marquee.classList.add('dragging');
          marquee.setPointerCapture(pointerId);
        }
        if(moved)marquee.scrollLeft=startScroll-delta;
      });
      ['pointerup','pointerleave','pointercancel'].forEach(evt=>marquee.addEventListener(evt,()=>{dragging=false;marquee.classList.remove('dragging');}));
      marquee.addEventListener('click',(e)=>{if(moved){e.preventDefault();moved=false;}},true);
    }
  }
  if(document.getElementById('project-detail')){
    const renderProjectDetail=()=>{
      const slug=decodeURIComponent((location.hash||'').replace(/^#/,''));
      const index=d.projects.findIndex(p=>slugify(p.title)===slug);
      const x=index>-1?d.projects[index]:null;
      if(x){
        document.title=`${x.title} | Ashwani Kumar, IAS`;
        const nextIndex=(index+1)%d.projects.length;
        const nextProject=d.projects[nextIndex];
        mount('project-detail',`<img class="project-detail-img" src="images/${cardImg(index)}.webp" alt=""><div class="project-detail-body"><p class="eyebrow">${t('project.initiative')}</p><h1 class="max-w-3xl text-4xl font-semibold sm:text-6xl">${x.title}</h1><p class="mt-4 text-sm font-bold uppercase tracking-[.15em] text-gold-500">${x.tag}</p><p class="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">${x.summary}</p><p class="mt-4 max-w-2xl leading-7 text-slate-600 dark:text-slate-300">${x.detail}</p><div class="mt-10 flex flex-wrap gap-3"><a href="projects.html" class="button-ghost inline-flex w-fit">${t('project.allInitiatives')}</a><a href="project.html#${slugify(nextProject.title)}" class="button-ghost inline-flex w-fit">${t('project.nextInitiative')} ${nextProject.title} →</a></div></div>`);
      } else {
        mount('project-detail',`<div class="project-detail-body"><p class="eyebrow">${t('project.notFound')}</p><h1 class="text-4xl font-semibold sm:text-5xl">${t('project.notFoundTitle')}</h1><p class="mt-4 max-w-2xl leading-7 text-slate-600 dark:text-slate-300">${t('project.notFoundText')}</p><a href="projects.html" class="button-primary mt-8 inline-flex w-fit">${t('project.allInitiatives')}</a></div>`);
      }
      window.scrollTo(0,0);
    };
    renderProjectDetail();
    window.addEventListener('hashchange',renderProjectDetail);
  }
  mount('awards-track',d.awards.map(x=>`<article class="card min-w-[82vw] snap-start sm:min-w-[380px]"><span class="text-sm font-bold text-gold-500">${x.year}</span><h2 class="mt-3 text-3xl font-semibold text-navy-900 dark:text-white">${x.title}</h2><p class="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">${x.body}</p></article>`).join(''));
  mount('awards-grid',d.awards.map(x=>`<article class="card reveal"><span class="text-sm font-bold text-gold-500">${x.year}</span><h3 class="mt-2 text-2xl font-semibold text-navy-900 dark:text-white">${x.title}</h3><p class="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">${x.body}</p></article>`).join(''));
  const pubImgTag=(x,cls)=>`<img class="${cls}" src="${x.image}" alt="${x.title.replace(/"/g,'&quot;')}" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'pub-fallback',textContent:'${x.publication.replace(/'/g,"\\'")}'}))">`;
  const renderPublications=(publications)=>{
    if(!publications || !publications.length)return;
    const [featured,...rest]=publications;
    const featuredHtml=`<a href="${featured.url}" target="_blank" rel="noopener noreferrer" class="pub-featured group">
      <span class="pub-featured-img-wrap">${pubImgTag(featured,'')}</span>
      <span>
        <span class="pub-kicker">${featured.publication} · ${featured.date}</span>
        <span class="pub-headline block group-hover:underline">${featured.title}</span>
        <span class="pub-dateline">${t('publications.readFull')}</span>
      </span>
    </a>`;
    const gridHtml=rest.map((x)=>`<a href="${x.url}" target="_blank" rel="noopener noreferrer" class="pub-grid-item group block">
      <span class="pub-grid-img-wrap block">${pubImgTag(x,'')}</span>
      <span class="pub-kicker">${x.publication} · ${x.date}</span>
      <span class="pub-headline block group-hover:underline">${x.title}</span>
    </a>`).join('');
    mount('publications-list',`${featuredHtml}${rest.length?`<div class="pub-grid">${gridHtml}</div>`:''}`);
  };
  if(document.getElementById('publications-list')){
    if(window.supabaseClient){
      window.supabaseClient.from('publications').select('*').order('sort_order',{ascending:true}).then(({data,error})=>{
        if(error||!data||!data.length){ renderPublications(d.publications); return; }
        renderPublications(data);
      });
    } else {
      renderPublications(d.publications);
    }
  }
  mount('recognition-grid',d.recognition.map(x=>`<article class="border-l-2 border-gold-400 pl-5"><h3 class="text-2xl font-semibold text-navy-900 dark:text-white">${x.title}</h3><p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">${x.text}</p></article>`).join(''));
  mount('extras-list',d.extras.map(x=>`<li class="rounded-xl bg-white p-4 text-sm shadow-sm dark:bg-slate-900">${x}</li>`).join(''));
})();