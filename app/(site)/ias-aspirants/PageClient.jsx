'use client';

import { useI18n } from '@/lib/i18n/context';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';

export default function IasAspirantsPage() {
  const { t } = useI18n();

  return (
    <>
      <PageHero
        eyebrow={t('iasAspirants.eyebrow')}
        title={t('iasAspirants.title')}
        subtitle={t('iasAspirants.subtitle')}
        titleClassName="max-w-4xl text-display-m font-normal tracking-tight"
      />
      <section className="py-12 sm:py-24">
        <div className="shell grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Reveal as="article" className="card" transition={{ duration: 0.7, ease: 'easeOut', delay: 0 }}>
            <h2 className="text-2xl font-semibold text-navy-900 dark:text-white">{t('iasAspirants.prepTitle')}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{t('iasAspirants.prepText')}</p>
          </Reveal>
          <Reveal as="article" className="card" transition={{ duration: 0.7, ease: 'easeOut', delay: 0.08 }}>
            <h2 className="text-2xl font-semibold text-navy-900 dark:text-white">{t('iasAspirants.interviewTitle')}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{t('iasAspirants.interviewText')}</p>
          </Reveal>
          <Reveal as="article" className="card" transition={{ duration: 0.7, ease: 'easeOut', delay: 0.16 }}>
            <h2 className="text-2xl font-semibold text-navy-900 dark:text-white">{t('iasAspirants.fieldTitle')}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{t('iasAspirants.fieldText')}</p>
          </Reveal>
        </div>
        <div className="shell mt-16">
          <p className="text-sm text-slate-600 dark:text-slate-400">{t('iasAspirants.placeholderNote')}</p>
        </div>
      </section>
    </>
  );
}
