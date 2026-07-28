'use client';

import { useI18n } from '@/lib/i18n/context';
import PageHero from '@/components/PageHero';
import PublicationsList from '@/components/PublicationsList';

export default function PublicationsPage() {
  const { t, data } = useI18n();

  return (
    <>
      <PageHero eyebrow={t('publications.eyebrow')} title={t('publications.title')} wide />
      <section className="py-24">
        <div className="shell">
          <p className="eyebrow pub-masthead-rule">{t('publications.publishedArticles')}</p>
          <div className="mt-10">
            <PublicationsList fallback={data.publications} />
          </div>
        </div>
      </section>
      <section className="bg-white py-24 dark:bg-slate-900">
        <div className="shell">
          <p className="eyebrow">{t('publications.mediaEyebrow')}</p>
          <h2 className="section-title">{t('publications.mediaTitle')}</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <article className="card">
              <span className="text-xs font-bold text-gold-500">{t('publications.card1Tag')}</span>
              <h3 className="mt-3 text-2xl font-semibold">{t('publications.card1Title')}</h3>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{t('publications.card1Sub')}</p>
            </article>
            <article className="card">
              <span className="text-xs font-bold text-gold-500">{t('publications.card2Tag')}</span>
              <h3 className="mt-3 text-2xl font-semibold">{t('publications.card2Title')}</h3>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{t('publications.card2Sub')}</p>
            </article>
            <article className="card">
              <span className="text-xs font-bold text-gold-500">{t('publications.card3Tag')}</span>
              <h3 className="mt-3 text-2xl font-semibold">{t('publications.card3Title')}</h3>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{t('publications.card3Sub')}</p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
