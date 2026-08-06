'use client';

import { useI18n } from '@/lib/i18n/context';
import PageHero from '@/components/PageHero';

export default function AwardsPage() {
  const { t, data } = useI18n();

  return (
    <>
      <PageHero
        eyebrow={t('awards.eyebrow')}
        title={t('awards.title')}
        titleClassName="max-w-4xl text-4xl font-normal tracking-tight sm:text-5xl"
      />
      <section className="overflow-hidden py-12 sm:py-24">
        <div className="shell">
          <div className="milestones-badge-row flex justify-center">
            <div className="milestones-badge">
              <span className="eyebrow milestones-badge-eyebrow">{t('awards.featuredEyebrow')}</span>
              <span className="font-display text-2xl text-navy-900 dark:text-white">{t('awards.milestones')}</span>
              <span className="milestones-badge-dot-track" aria-hidden="true" />
            </div>
          </div>
          <div className="flex snap-x gap-6 overflow-x-auto pb-6" tabIndex={0} aria-label="Featured awards carousel">
            {data.awards.map((x) => (
              <article key={`${x.year}-${x.title}`} className="card min-w-[82vw] snap-start sm:min-w-[380px]">
                <span className="text-sm font-bold text-gold-500">{x.year}</span>
                <h2 className="mt-3 text-3xl font-semibold text-navy-900 dark:text-white">{x.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{x.body}</p>
              </article>
            ))}
          </div>
          <p className="mt-3 text-center text-sm text-slate-600 dark:text-slate-400">{t('awards.swipe')}</p>
          <p className="eyebrow mt-20">{t('awards.chronologyEyebrow')}</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.awards.map((x) => (
              <article key={`grid-${x.year}-${x.title}`} className="card reveal">
                <span className="text-sm font-bold text-gold-500">{x.year}</span>
                <h3 className="mt-2 text-2xl font-semibold text-navy-900 dark:text-white">{x.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{x.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
