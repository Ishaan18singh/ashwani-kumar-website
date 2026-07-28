'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n/context';
import PageHero from '@/components/PageHero';
import InitiativesRail from '@/components/InitiativesRail';

export default function ProjectsPage() {
  const { t, data } = useI18n();

  return (
    <>
      <PageHero
        eyebrow={t('projects.eyebrow')}
        title={t('projects.title')}
        subtitle={t('projects.subtitle')}
        titleClassName="max-w-5xl text-5xl font-normal tracking-tight sm:text-7xl"
      />
      <section className="py-24">
        <div className="shell">
          <InitiativesRail projects={data.projects} mode="carousel" />
        </div>
      </section>
      <section className="bg-white border-t border-slate-200 py-20 text-navy-900 dark:bg-slate-900 dark:text-white">
        <div className="shell flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="eyebrow">{t('projects.principleEyebrow')}</p>
            <h2 className="max-w-3xl text-4xl font-semibold sm:text-5xl">{t('projects.principleTitle')}</h2>
          </div>
          <Link className="button-primary" href="/contact">
            {t('projects.startConversation')}
          </Link>
        </div>
      </section>
    </>
  );
}
