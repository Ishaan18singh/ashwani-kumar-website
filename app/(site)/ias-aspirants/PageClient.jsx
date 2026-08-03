'use client';

import { useI18n } from '@/lib/i18n/context';
import PageHero from '@/components/PageHero';

export default function IasAspirantsPage() {
  const { t } = useI18n();

  return (
    <>
      <PageHero
        eyebrow={t('iasAspirants.eyebrow')}
        title={t('iasAspirants.title')}
        subtitle={t('iasAspirants.subtitle')}
        titleClassName="max-w-4xl text-5xl font-normal tracking-tight sm:text-7xl"
      />
      <section className="py-12 sm:py-24">
        <div className="shell grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <article className="card">
            <h2 className="text-2xl font-semibold text-navy-900 dark:text-white">{t('iasAspirants.prepTitle')}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{t('iasAspirants.prepText')}</p>
          </article>
          <article className="card">
            <h2 className="text-2xl font-semibold text-navy-900 dark:text-white">{t('iasAspirants.interviewTitle')}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{t('iasAspirants.interviewText')}</p>
          </article>
          <article className="card">
            <h2 className="text-2xl font-semibold text-navy-900 dark:text-white">{t('iasAspirants.fieldTitle')}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{t('iasAspirants.fieldText')}</p>
          </article>
        </div>
        <div className="shell mt-16">
          <p className="text-sm text-slate-600 dark:text-slate-400">{t('iasAspirants.placeholderNote')}</p>
        </div>
      </section>
    </>
  );
}
