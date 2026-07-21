(function(){
  const dialog=document.getElementById('lightbox'),image=dialog?.querySelector('img'),caption=dialog?.querySelector('p');
  document.querySelectorAll('[data-gallery]').forEach(btn=>btn.addEventListener('click',()=>{image.src=btn.dataset.src;image.alt=btn.dataset.alt;caption.textContent=btn.dataset.alt;dialog.showModal()}));
  dialog?.querySelector('[data-close]')?.addEventListener('click',()=>dialog.close());
  dialog?.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
})();
