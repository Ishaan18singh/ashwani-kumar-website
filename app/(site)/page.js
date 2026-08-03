'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n/context';
import Html from '@/components/Html';
import InitiativesRail from '@/components/InitiativesRail';

export default function HomePage() {
  const { t, data } = useI18n();

  return (
    <>
      <section className="relative min-h-screen overflow-hidden bg-ivory pt-20 text-navy-900 dark:bg-slate-950 dark:text-white">
        <div className="absolute inset-0 bg-circuit bg-[length:48px_48px] opacity-60 [mask-image:linear-gradient(to_right,black,transparent)]" />
        <div className="shell relative grid min-h-[calc(100vh-5rem)] items-center gap-10 py-16 lg:grid-cols-[1.05fr_.95fr]">
          <div className="z-10 stack-center">
            <p className="eyebrow">{t('home.eyebrow')}</p>
            <Html
              as="h1"
              className="max-w-2xl text-5xl font-normal leading-tight sm:text-6xl sm:leading-[.94] lg:text-7xl"
              html={t('home.titleHtml')}
            />
            <p className="mt-7 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
              {t('home.subtitle')}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link className="button-primary" href="/projects">
                <span>{t('home.exploreBtn')}</span> <span aria-hidden="true">→</span>
              </Link>
              <Link className="button-ghost" href="/about">
                {t('home.aboutBtn')}
              </Link>
            </div>
            <blockquote className="mt-10 max-w-xl border-l border-gold-400 pl-5 font-display text-xl italic text-slate-600 dark:text-slate-300">
              {t('home.quote')}
            </blockquote>
          </div>
          <div className="relative h-[60vh] min-h-[480px] overflow-hidden rounded-t-[9rem] rounded-b-2xl border border-navy-900/10 shadow-2xl lg:h-[75vh]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/ashwani-kumar-hero.webp"
              alt="Ashwani Kumar, IAS, in a blue suit"
              className="h-full w-full object-cover object-top"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-transparent p-7 pt-24 text-white">
              <p className="text-xs font-bold uppercase tracking-[.2em] text-gold-300">{t('home.currentOfficeLabel')}</p>
              <p className="mt-2 font-display text-2xl">{t('home.currentOfficeValue')}</p>
            </div>
          </div>
          <a
            href="#introduction"
            className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 text-xs uppercase tracking-[.2em] text-slate-500 dark:text-slate-400 lg:block"
          >
            {t('home.scroll')}
          </a>
        </div>
      </section>

      <section id="introduction" className="border-t border-slate-200 py-24 dark:border-slate-800">
        <div className="shell grid items-center gap-14 lg:grid-cols-[.95fr_1.05fr]">
          <div className="reveal">
            <p className="eyebrow">{t('home.introEyebrow')}</p>
            <Html as="h2" className="section-title" html={t('home.introTitleHtml')} />
          </div>
          <div className="reveal stack-center">
            <p className="text-base leading-6 text-slate-600 dark:text-slate-300">{t('home.introText')}</p>
            <div className="mt-10 grid grid-cols-3 gap-4">
              <div>
                <strong className="font-display text-4xl text-navy-900 dark:text-white">2010</strong>
                <span className="mt-1 block text-xs uppercase tracking-wider text-slate-500">{t('home.stat1Label')}</span>
              </div>
              <div>
                <strong className="font-display text-4xl text-navy-900 dark:text-white">7+</strong>
                <span className="mt-1 block text-xs uppercase tracking-wider text-slate-500">{t('home.stat2Label')}</span>
              </div>
              <div>
                <strong className="font-display text-4xl text-navy-900 dark:text-white">₹500cr</strong>
                <span className="mt-1 block text-xs uppercase tracking-wider text-slate-500">{t('home.stat3Label')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white py-24 dark:border-slate-700 dark:bg-slate-900">
        <div className="shell">
          <p className="eyebrow">{t('home.selectedWorkEyebrow')}</p>
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <h2 className="section-title">{t('home.selectedWorkTitle')}</h2>
            <Link href="/projects" className="text-sm font-bold text-gold-500">
              {t('home.viewAll')}
            </Link>
          </div>
          <InitiativesRail projects={data.projects} mode="marquee" />
        </div>
      </section>

      <section className="border-t border-slate-200 py-24 dark:border-slate-800">
        <div className="shell grid items-center gap-12 lg:grid-cols-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            loading="lazy"
            src="/images/ashwani-kumar-portrait.webp"
            alt="Portrait of Ashwani Kumar, IAS"
            className="reveal aspect-[4/5] w-full rounded-2xl object-cover"
          />
          <div className="reveal stack-center">
            <p className="eyebrow">{t('home.leadershipEyebrow')}</p>
            <h2 className="section-title">{t('home.leadershipTitle')}</h2>
            <p className="section-copy">{t('home.leadershipText')}</p>
            <Link className="button-primary mt-8" href="/timeline">
              {t('home.followJourney')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
