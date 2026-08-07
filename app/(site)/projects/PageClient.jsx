'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n/context';
import PageHero from '@/components/PageHero';
import { slugify, cardImage } from '@/lib/utils';

export default function ProjectsPage() {
  const { t, data } = useI18n();

  return (
    <>
      <PageHero
        eyebrow={t('projects.eyebrow')}
        title={t('projects.title')}
        subtitle={t('projects.subtitle')}
        titleClassName="max-w-5xl text-4xl font-normal tracking-tight sm:text-5xl"
      />
      <section className="py-12 sm:py-24">
        <div className="shell flex flex-col initiative-rows-gap">
          {data.projects.map((x, i) => (
            <article
              key={x.title}
              className={`initiative-row grid items-center gap-8 lg:grid-cols-2 lg:gap-14${
                i % 2 === 1 ? ' initiative-row-reverse' : ''
              }`}
            >
              <img
                src={`/images/${cardImage(i)}.webp`}
                alt=""
                loading="lazy"
                className="initiative-row-img w-full rounded-2xl object-cover shadow-2xl"
              />
              <div>
                <p className="eyebrow">{x.tag}</p>
                <h2 className="text-3xl font-semibold text-navy-900 dark:text-white sm:text-4xl">{x.title}</h2>
                <p className="mt-5 max-w-xl leading-7 text-slate-600 dark:text-slate-300">{x.detail}</p>
                <Link
                  className="button-primary mt-8"
                  href={`/projects/${slugify(x.title)}`}
                  prefetch={false}
                  aria-label={`${t('project.learnMore')}: ${x.title}`}
                >
                  {t('project.learnMore')}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="bg-white border-t border-slate-200 py-20 text-navy-900 dark:bg-slate-900 dark:text-white">
        <div className="shell flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="eyebrow">{t('projects.principleEyebrow')}</p>
            <h2 className="max-w-3xl text-4xl font-semibold sm:text-5xl">{t('projects.principleTitle')}</h2>
          </div>
          <Link className="button-primary" href="/contact" prefetch={false}>
            {t('projects.startConversation')}
          </Link>
        </div>
      </section>
    </>
  );
}
