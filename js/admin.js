(function(){
  const sb = window.supabaseClient;
  const loginView = document.getElementById('login-view');
  const dashboardView = document.getElementById('dashboard-view');
  const loginForm = document.getElementById('login-form');
  const loginError = document.getElementById('login-error');
  const whoami = document.getElementById('whoami');

  const showDashboard = (user) => {
    loginView.classList.add('hidden');
    dashboardView.classList.remove('hidden');
    whoami.textContent = user?.email || '';
    loadMessages();
    loadPublications();
  };
  const showLogin = () => {
    dashboardView.classList.add('hidden');
    loginView.classList.remove('hidden');
  };

  sb.auth.getSession().then(({data}) => {
    if(data.session) showDashboard(data.session.user); else showLogin();
  });
  sb.auth.onAuthStateChange((_event, session) => {
    if(session) showDashboard(session.user); else showLogin();
  });

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    loginError.textContent = '';
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    const { error } = await sb.auth.signInWithPassword({ email, password });
    if(error) loginError.textContent = error.message;
  });

  document.getElementById('logout-btn').addEventListener('click', () => sb.auth.signOut());

  // ---- Tabs ----
  document.querySelectorAll('.admin-tab').forEach(btn => btn.addEventListener('click', () => {
    document.querySelectorAll('.admin-tab').forEach(b => b.classList.remove('active-tab'));
    btn.classList.add('active-tab');
    const tab = btn.dataset.tab;
    document.getElementById('tab-messages').classList.toggle('hidden', tab !== 'messages');
    document.getElementById('tab-publications').classList.toggle('hidden', tab !== 'publications');
  }));

  // ---- Messages ----
  const escapeHtml = (s) => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  async function loadMessages(){
    const { data, error } = await sb.from('contact_messages').select('*').order('created_at', { ascending: false });
    const list = document.getElementById('messages-list');
    if(error){ list.innerHTML = `<p class="text-sm text-red-600">Failed to load: ${escapeHtml(error.message)}</p>`; return; }
    const unread = (data||[]).filter(m => !m.read).length;
    const badge = document.getElementById('unread-badge');
    if(unread > 0){ badge.textContent = unread; badge.classList.remove('hidden'); } else { badge.classList.add('hidden'); }
    if(!data || !data.length){ list.innerHTML = '<p class="text-sm text-slate-500">No messages yet.</p>'; return; }
    list.innerHTML = data.map(m => `
      <article class="card ${m.read ? '' : 'border-gold-400'}">
        <div class="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p class="font-semibold text-navy-900 dark:text-white">${escapeHtml(m.name)} ${m.read ? '' : '<span class="ml-2 rounded-full bg-gold-400 px-2 py-0.5 text-xs font-bold text-navy-950">NEW</span>'}</p>
            <p class="text-sm text-slate-500">${escapeHtml(m.email)} · ${new Date(m.created_at).toLocaleString()}</p>
          </div>
          <div class="flex gap-2">
            ${m.read ? '' : `<button data-mark-read="${m.id}" class="text-sm font-semibold text-gold-500">Mark read</button>`}
            <button data-delete-msg="${m.id}" class="text-sm font-semibold text-red-600">Delete</button>
          </div>
        </div>
        <p class="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-600 dark:text-slate-300">${escapeHtml(m.message)}</p>
      </article>
    `).join('');
    list.querySelectorAll('[data-mark-read]').forEach(btn => btn.addEventListener('click', async () => {
      await sb.from('contact_messages').update({ read: true }).eq('id', btn.dataset.markRead);
      loadMessages();
    }));
    list.querySelectorAll('[data-delete-msg]').forEach(btn => btn.addEventListener('click', async () => {
      if(!confirm('Delete this message permanently?')) return;
      await sb.from('contact_messages').delete().eq('id', btn.dataset.deleteMsg);
      loadMessages();
    }));
  }

  // ---- Publications ----
  const pubFormWrap = document.getElementById('pub-form-wrap');
  const pubFormTitle = document.getElementById('pub-form-title');
  const pubFormError = document.getElementById('pub-form-error');
  const pubFields = ['id','date','publication','title','url','image'];
  const getPubField = (name) => document.getElementById(`pub-${name}`);

  document.getElementById('add-pub-btn').addEventListener('click', () => {
    pubFields.forEach(f => getPubField(f).value = '');
    pubFormTitle.textContent = 'Add publication';
    pubFormError.textContent = '';
    pubFormWrap.classList.remove('hidden');
  });
  document.getElementById('pub-cancel-btn').addEventListener('click', () => pubFormWrap.classList.add('hidden'));

  document.getElementById('pub-save-btn').addEventListener('click', async () => {
    pubFormError.textContent = '';
    const id = getPubField('id').value;
    const record = {
      date: getPubField('date').value.trim(),
      publication: getPubField('publication').value.trim(),
      title: getPubField('title').value.trim(),
      url: getPubField('url').value.trim(),
      image: getPubField('image').value.trim(),
    };
    if(!record.date || !record.publication || !record.title || !record.url){
      pubFormError.textContent = 'Date, publication, title, and URL are required.';
      return;
    }
    const { error } = id
      ? await sb.from('publications').update(record).eq('id', id)
      : await sb.from('publications').insert(record);
    if(error){ pubFormError.textContent = error.message; return; }
    pubFormWrap.classList.add('hidden');
    loadPublications();
  });

  async function loadPublications(){
    const { data, error } = await sb.from('publications').select('*').order('sort_order', { ascending: true });
    const list = document.getElementById('pub-list');
    if(error){ list.innerHTML = `<p class="text-sm text-red-600">Failed to load: ${escapeHtml(error.message)}</p>`; return; }
    if(!data || !data.length){ list.innerHTML = '<p class="text-sm text-slate-500">No publications yet.</p>'; return; }
    list.innerHTML = data.map(p => `
      <article class="card">
        <div class="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p class="text-xs font-bold uppercase tracking-wider text-slate-400">${escapeHtml(p.publication)} · ${escapeHtml(p.date)}</p>
            <p class="mt-1 font-display text-xl text-navy-900 dark:text-white">${escapeHtml(p.title)}</p>
            <a href="${p.url}" target="_blank" rel="noopener noreferrer" class="text-sm text-gold-500 hover:underline">${escapeHtml(p.url)}</a>
          </div>
          <div class="flex shrink-0 gap-2">
            <button data-edit-pub="${p.id}" class="text-sm font-semibold text-gold-500">Edit</button>
            <button data-delete-pub="${p.id}" class="text-sm font-semibold text-red-600">Delete</button>
          </div>
        </div>
      </article>
    `).join('');
    list.querySelectorAll('[data-edit-pub]').forEach(btn => btn.addEventListener('click', () => {
      const p = data.find(x => x.id === btn.dataset.editPub);
      getPubField('id').value = p.id;
      getPubField('date').value = p.date;
      getPubField('publication').value = p.publication;
      getPubField('title').value = p.title;
      getPubField('url').value = p.url;
      getPubField('image').value = p.image || '';
      pubFormTitle.textContent = 'Edit publication';
      pubFormError.textContent = '';
      pubFormWrap.classList.remove('hidden');
      pubFormWrap.scrollIntoView({ behavior: 'smooth' });
    }));
    list.querySelectorAll('[data-delete-pub]').forEach(btn => btn.addEventListener('click', async () => {
      if(!confirm('Delete this publication permanently?')) return;
      await sb.from('publications').delete().eq('id', btn.dataset.deletePub);
      loadPublications();
    }));
  }
})();