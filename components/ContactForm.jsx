'use client';

import { useRef, useState } from 'react';
import { useI18n } from '@/lib/i18n/context';
import { getSupabaseClient } from '@/lib/supabase';

export default function ContactForm() {
  const { t } = useI18n();
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);
  const statusRef = useRef(null);
  const formRef = useRef(null);
  const loadedAtRef = useRef(Date.now());

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = formRef.current;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    const honeypot = form.company?.value;

    if (honeypot || Date.now() - loadedAtRef.current < 1500) {
      setStatus('Thank you — your message has been sent.');
      form.reset();
      return;
    }

    const sb = getSupabaseClient();
    if (!sb) {
      setStatus('Form is not connected yet. Please contact via email directly.');
      statusRef.current?.focus();
      return;
    }

    setSending(true);
    const { error } = await sb.from('contact_messages').insert({ name, email, message });
    setSending(false);

    if (error) {
      setStatus('Something went wrong sending your message. Please try again or email directly.');
    } else {
      setStatus('Thank you — your message has been sent.');
      form.reset();
    }
    statusRef.current?.focus();
  };

  return (
    <form ref={formRef} id="contact-form" className="card" onSubmit={onSubmit}>
      <p className="eyebrow">{t('contact.sendNote')}</p>
      <div className="hidden" aria-hidden="true">
        <label>
          Leave this field empty
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="text-sm font-semibold">
          <span>{t('contact.nameLabel')}</span>
          <input
            required
            autoComplete="name"
            name="name"
            className="mt-2 w-full rounded-xl border border-slate-200 bg-transparent px-4 py-3 font-normal dark:border-slate-700"
            placeholder={t('contact.namePlaceholder')}
          />
        </label>
        <label className="text-sm font-semibold">
          <span>{t('contact.emailLabel')}</span>
          <input
            required
            type="email"
            autoComplete="email"
            name="email"
            className="mt-2 w-full rounded-xl border border-slate-200 bg-transparent px-4 py-3 font-normal dark:border-slate-700"
            placeholder={t('contact.emailPlaceholder')}
          />
        </label>
      </div>
      <label className="mt-6 block text-sm font-semibold">
        <span>{t('contact.messageLabel')}</span>
        <textarea
          required
          name="message"
          rows={7}
          className="mt-2 w-full rounded-xl border border-slate-200 bg-transparent px-4 py-3 font-normal dark:border-slate-700"
          placeholder={t('contact.messagePlaceholder')}
        />
      </label>
      <button className="button-primary mt-6" type="submit" disabled={sending}>
        {sending ? 'Sending…' : t('contact.sendBtn')}
      </button>
      <p ref={statusRef} className="mt-4 text-sm text-slate-500 dark:text-slate-400" role="status" tabIndex={-1}>
        {status}
      </p>
    </form>
  );
}
