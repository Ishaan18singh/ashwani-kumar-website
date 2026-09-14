'use client';

import { useEffect, useState } from 'react';
import { useI18n } from '@/lib/i18n/context';
import { getSupabaseClient } from '@/lib/supabase';
import Reveal from '@/components/Reveal';
import PublicationsFeatured from '@/components/PublicationsFeatured';

export default function PublicationsPage() {
  const { t, data } = useI18n();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [publications, setPublications] = useState(data.publications || []);

  useEffect(() => {
    const sb = getSupabaseClient();
    if (!sb) return;
    sb.from('publications')
      .select('*')
      .order('sort_order', { ascending: true })
      .then(({ data: rows, error }) => {
        if (error || !rows || !rows.length) return;
        setPublications(rows);
      });
  }, []);

  const onSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
  };

  return (
    <>
      <section className="pub-hero">
        <div className="shell pub-hero-grid">
          <Reveal blur>
            <p className="pub-hero-eyebrow">
              <span aria-hidden="true" />
              {t('publications.eyebrow')}
            </p>
            <h1 className="pub-hero-title">{t('publications.title')}</h1>
            <span className="pub-hero-rule" aria-hidden="true" />
          </Reveal>
        </div>
      </section>

      <section className="pub-featured-section">
        <div className="shell">
          <p className="pub-more-eyebrow">
            <span aria-hidden="true" />
            {t('publications.publishedArticles')}
          </p>
          {publications.length ? <PublicationsFeatured items={publications} /> : null}
        </div>
      </section>

      <section className="pub-cta">
        <div className="shell pub-cta-grid">
          <Reveal>
            <h2 className="pub-cta-title">{t('publications.ctaTitle')}</h2>
            <p className="pub-cta-tag">
              <span aria-hidden="true" />
              {t('publications.ctaTag')}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pub-newsletter-section">
        <div className="shell">
          <Reveal className="pub-newsletter">
            <div>
              <h2 className="pub-newsletter-title">{t('publications.newsletterTitle')}</h2>
              <p className="pub-newsletter-text">{t('publications.newsletterText')}</p>
            </div>
            {subscribed ? (
              <p className="pub-newsletter-success">{t('publications.readArticle') && '✓'} Thanks — you’re on the list.</p>
            ) : (
              <form className="pub-newsletter-form" onSubmit={onSubscribe}>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('publications.newsletterPlaceholder')}
                  className="pub-newsletter-input"
                  aria-label={t('publications.newsletterPlaceholder')}
                />
                <button type="submit" className="pub-newsletter-btn">
                  {t('publications.newsletterBtn')} <span aria-hidden="true">→</span>
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}
