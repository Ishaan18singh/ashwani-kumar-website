'use client';

import { useRef, useState } from 'react';
import { useI18n } from '@/lib/i18n/context';
import { getSupabaseClient } from '@/lib/supabase';

const ENQUIRY_OPTIONS = [
  'enquiryOfficialTitle',
  'enquirySpeakingTitle',
  'enquiryMediaTitle',
  'enquiryIdeasTitle',
  'enquiryGeneralTitle',
];

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
    const organisation = form.organisation.value.trim();
    const nature = form.nature.value;
    const message = form.message.value.trim();
    const honeypot = form.company?.value;

    if (honeypot || Date.now() - loadedAtRef.current < 1500) {
      setStatus('Thank you, your message has been sent.');
      form.reset();
      return;
    }

    const sb = getSupabaseClient();
    if (!sb) {
      setStatus('Form is not connected yet. Please contact via email directly.');
      statusRef.current?.focus();
      return;
    }

    // contact_messages has no organisation/nature columns yet, so fold them
    // into the message body rather than failing the insert on unknown fields.
    const context = [organisation && `Organisation: ${organisation}`, nature && `Nature of enquiry: ${nature}`]
      .filter(Boolean)
      .join('\n');
    const fullMessage = context ? `${context}\n\n${message}` : message;

    setSending(true);
    const { error } = await sb.from('contact_messages').insert({ name, email, message: fullMessage });
    setSending(false);

    if (error) {
      setStatus('Something went wrong sending your message. Please try again or email directly.');
    } else {
      setStatus('Thank you, your message has been sent.');
      form.reset();
    }
    statusRef.current?.focus();
  };

  return (
    <form ref={formRef} id="contact-form" onSubmit={onSubmit}>
      <div className="hidden" aria-hidden="true">
        <label>
          Leave this field empty
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="contact-field">
        <span className="contact-field-label">{t('contact.nameLabel')}</span>
        <input required autoComplete="name" name="name" className="contact-field-input" placeholder={t('contact.namePlaceholder')} />
      </label>

      <label className="contact-field">
        <span className="contact-field-label">{t('contact.emailLabel')}</span>
        <input
          required
          type="email"
          autoComplete="email"
          name="email"
          className="contact-field-input"
          placeholder={t('contact.emailPlaceholder')}
        />
      </label>

      <label className="contact-field">
        <span className="contact-field-label">{t('contact.orgLabel')}</span>
        <input autoComplete="organization" name="organisation" className="contact-field-input" placeholder={t('contact.orgPlaceholder')} />
      </label>

      <label className="contact-field">
        <span className="contact-field-label">{t('contact.natureLabel')}</span>
        <select name="nature" defaultValue="" className="contact-field-input contact-field-select">
          <option value="" disabled>
            {t('contact.naturePlaceholder')}
          </option>
          {ENQUIRY_OPTIONS.map((key) => (
            <option key={key} value={t(`contact.${key}`)}>
              {t(`contact.${key}`)}
            </option>
          ))}
        </select>
      </label>

      <label className="contact-field">
        <span className="contact-field-label">{t('contact.messageLabel')}</span>
        <textarea
          required
          name="message"
          rows={4}
          className="contact-field-input contact-field-textarea"
          placeholder={t('contact.messagePlaceholder')}
        />
      </label>

      <button className="contact-send-btn" type="submit" disabled={sending}>
        {sending ? 'Sending…' : t('contact.sendBtn')} <span aria-hidden="true">→</span>
      </button>
      <p className="contact-respond-note">{t('contact.respondNote')}</p>
      <p ref={statusRef} className="mt-2 text-sm text-slate-600 dark:text-slate-400" role="status" tabIndex={-1}>
        {status}
      </p>
    </form>
  );
}
