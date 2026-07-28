'use client';

import { useCallback, useEffect, useState } from 'react';
import { getSupabaseClient } from '@/lib/supabase';

const emptyPubForm = { id: '', date: '', publication: '', title: '', url: '', image: '' };

export default function AdminApp() {
  const [sb, setSb] = useState(null);
  const [session, setSession] = useState(undefined); // undefined = loading, null = signed out
  const [loginError, setLoginError] = useState('');
  const [tab, setTab] = useState('messages');

  const [messages, setMessages] = useState(null);
  const [messagesError, setMessagesError] = useState('');

  const [publications, setPublications] = useState(null);
  const [publicationsError, setPublicationsError] = useState('');
  const [pubForm, setPubForm] = useState(emptyPubForm);
  const [pubFormOpen, setPubFormOpen] = useState(false);
  const [pubFormError, setPubFormError] = useState('');

  useEffect(() => {
    const client = getSupabaseClient();
    setSb(client);
    if (!client) return;
    client.auth.getSession().then(({ data }) => setSession(data.session || null));
    const { data: sub } = client.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  const loadMessages = useCallback(async () => {
    if (!sb) return;
    const { data, error } = await sb.from('contact_messages').select('*').order('created_at', { ascending: false });
    if (error) {
      setMessagesError(error.message);
      return;
    }
    setMessagesError('');
    setMessages(data || []);
  }, [sb]);

  const loadPublications = useCallback(async () => {
    if (!sb) return;
    const { data, error } = await sb.from('publications').select('*').order('sort_order', { ascending: true });
    if (error) {
      setPublicationsError(error.message);
      return;
    }
    setPublicationsError('');
    setPublications(data || []);
  }, [sb]);

  useEffect(() => {
    if (session) {
      loadMessages();
      loadPublications();
    }
  }, [session, loadMessages, loadPublications]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    const email = e.target.email.value.trim();
    const password = e.target.password.value;
    const { error } = await sb.auth.signInWithPassword({ email, password });
    if (error) setLoginError(error.message);
  };

  const handleLogout = () => sb.auth.signOut();

  const markRead = async (id) => {
    await sb.from('contact_messages').update({ read: true }).eq('id', id);
    loadMessages();
  };
  const deleteMessage = async (id) => {
    if (!window.confirm('Delete this message permanently?')) return;
    await sb.from('contact_messages').delete().eq('id', id);
    loadMessages();
  };

  const openAddPub = () => {
    setPubForm(emptyPubForm);
    setPubFormError('');
    setPubFormOpen(true);
  };
  const openEditPub = (p) => {
    setPubForm({ id: p.id, date: p.date, publication: p.publication, title: p.title, url: p.url, image: p.image || '' });
    setPubFormError('');
    setPubFormOpen(true);
  };
  const savePub = async () => {
    setPubFormError('');
    const record = {
      date: pubForm.date.trim(),
      publication: pubForm.publication.trim(),
      title: pubForm.title.trim(),
      url: pubForm.url.trim(),
      image: pubForm.image.trim()
    };
    if (!record.date || !record.publication || !record.title || !record.url) {
      setPubFormError('Date, publication, title, and URL are required.');
      return;
    }
    const { error } = pubForm.id
      ? await sb.from('publications').update(record).eq('id', pubForm.id)
      : await sb.from('publications').insert(record);
    if (error) {
      setPubFormError(error.message);
      return;
    }
    setPubFormOpen(false);
    loadPublications();
  };
  const deletePub = async (id) => {
    if (!window.confirm('Delete this publication permanently?')) return;
    await sb.from('publications').delete().eq('id', id);
    loadPublications();
  };

  if (!sb || session === undefined) {
    return null;
  }

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center px-5">
        <form onSubmit={handleLogin} className="card w-full max-w-sm">
          <p className="eyebrow">Admin</p>
          <h1 className="text-2xl font-semibold text-navy-900 dark:text-white">Sign in</h1>
          <label className="mt-6 block text-sm font-semibold">
            Email
            <input
              required
              type="email"
              name="email"
              autoComplete="username"
              className="mt-2 w-full rounded-xl border border-slate-200 bg-transparent px-4 py-3 dark:border-slate-700"
              placeholder="you@example.com"
            />
          </label>
          <label className="mt-4 block text-sm font-semibold">
            Password
            <input
              required
              type="password"
              name="password"
              autoComplete="current-password"
              className="mt-2 w-full rounded-xl border border-slate-200 bg-transparent px-4 py-3 dark:border-slate-700"
              placeholder="••••••••"
            />
          </label>
          <button className="button-primary mt-6 w-full" type="submit">
            Sign in
          </button>
          <p className="mt-3 text-sm text-red-600" role="alert">
            {loginError}
          </p>
        </form>
      </div>
    );
  }

  const unread = (messages || []).filter((m) => !m.read).length;

  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
        <div className="shell flex h-20 items-center justify-between">
          <div>
            <p className="font-display text-xl text-navy-900 dark:text-white">Admin dashboard</p>
            <p className="text-xs text-slate-500">{session.user?.email}</p>
          </div>
          <button onClick={handleLogout} className="button-ghost">
            Sign out
          </button>
        </div>
      </header>

      <div className="shell py-10">
        <div className="flex gap-3 border-b border-slate-200 dark:border-slate-700">
          <button
            className={`admin-tab${tab === 'messages' ? ' active-tab' : ''}`}
            onClick={() => setTab('messages')}
          >
            Messages{' '}
            {unread > 0 ? (
              <span className="ml-1 rounded-full bg-gold-400 px-2 py-0.5 text-xs font-bold text-navy-950">{unread}</span>
            ) : null}
          </button>
          <button
            className={`admin-tab${tab === 'publications' ? ' active-tab' : ''}`}
            onClick={() => setTab('publications')}
          >
            Publications
          </button>
        </div>

        {tab === 'messages' ? (
          <section className="mt-8">
            <p className="mb-4 text-sm text-slate-500">Contact form submissions, newest first.</p>
            {messagesError ? (
              <p className="text-sm text-red-600">Failed to load: {messagesError}</p>
            ) : !messages || !messages.length ? (
              <p className="text-sm text-slate-500">No messages yet.</p>
            ) : (
              <div className="space-y-4">
                {messages.map((m) => (
                  <article key={m.id} className={`card ${m.read ? '' : 'border-gold-400'}`}>
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-navy-900 dark:text-white">
                          {m.name}{' '}
                          {!m.read ? (
                            <span className="ml-2 rounded-full bg-gold-400 px-2 py-0.5 text-xs font-bold text-navy-950">
                              NEW
                            </span>
                          ) : null}
                        </p>
                        <p className="text-sm text-slate-500">
                          {m.email} · {new Date(m.created_at).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        {!m.read ? (
                          <button onClick={() => markRead(m.id)} className="text-sm font-semibold text-gold-500">
                            Mark read
                          </button>
                        ) : null}
                        <button onClick={() => deleteMessage(m.id)} className="text-sm font-semibold text-red-600">
                          Delete
                        </button>
                      </div>
                    </div>
                    <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-600 dark:text-slate-300">
                      {m.message}
                    </p>
                  </article>
                ))}
              </div>
            )}
          </section>
        ) : (
          <section className="mt-8">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-slate-500">Manage the articles shown on your Publications page.</p>
              <button onClick={openAddPub} className="button-primary">
                + Add publication
              </button>
            </div>

            {pubFormOpen ? (
              <div className="card mb-6">
                <h3 className="text-lg font-semibold">{pubForm.id ? 'Edit publication' : 'Add publication'}</h3>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <label className="text-sm font-semibold">
                    Date
                    <input
                      value={pubForm.date}
                      onChange={(e) => setPubForm((f) => ({ ...f, date: e.target.value }))}
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-transparent px-4 py-3 dark:border-slate-700"
                      placeholder="5 May 2025"
                    />
                  </label>
                  <label className="text-sm font-semibold">
                    Publication name
                    <input
                      value={pubForm.publication}
                      onChange={(e) => setPubForm((f) => ({ ...f, publication: e.target.value }))}
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-transparent px-4 py-3 dark:border-slate-700"
                      placeholder="Economic Times Government"
                    />
                  </label>
                </div>
                <label className="mt-4 block text-sm font-semibold">
                  Title
                  <input
                    value={pubForm.title}
                    onChange={(e) => setPubForm((f) => ({ ...f, title: e.target.value }))}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-transparent px-4 py-3 dark:border-slate-700"
                    placeholder="Article headline"
                  />
                </label>
                <label className="mt-4 block text-sm font-semibold">
                  Article URL
                  <input
                    value={pubForm.url}
                    onChange={(e) => setPubForm((f) => ({ ...f, url: e.target.value }))}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-transparent px-4 py-3 dark:border-slate-700"
                    placeholder="https://..."
                  />
                </label>
                <label className="mt-4 block text-sm font-semibold">
                  Image path
                  <input
                    value={pubForm.image}
                    onChange={(e) => setPubForm((f) => ({ ...f, image: e.target.value }))}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-transparent px-4 py-3 dark:border-slate-700"
                    placeholder="images/publications/example.png"
                  />
                </label>
                <div className="mt-6 flex gap-3">
                  <button onClick={savePub} className="button-primary">
                    Save
                  </button>
                  <button onClick={() => setPubFormOpen(false)} type="button" className="button-ghost">
                    Cancel
                  </button>
                </div>
                <p className="mt-3 text-sm text-red-600" role="alert">
                  {pubFormError}
                </p>
              </div>
            ) : null}

            {publicationsError ? (
              <p className="text-sm text-red-600">Failed to load: {publicationsError}</p>
            ) : !publications || !publications.length ? (
              <p className="text-sm text-slate-500">No publications yet.</p>
            ) : (
              <div className="space-y-4">
                {publications.map((p) => (
                  <article key={p.id} className="card">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          {p.publication} · {p.date}
                        </p>
                        <p className="mt-1 font-display text-xl text-navy-900 dark:text-white">{p.title}</p>
                        <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-sm text-gold-500 hover:underline">
                          {p.url}
                        </a>
                      </div>
                      <div className="flex shrink-0 gap-2">
                        <button onClick={() => openEditPub(p)} className="text-sm font-semibold text-gold-500">
                          Edit
                        </button>
                        <button onClick={() => deletePub(p.id)} className="text-sm font-semibold text-red-600">
                          Delete
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
