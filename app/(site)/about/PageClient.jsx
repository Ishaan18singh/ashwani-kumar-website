'use client';

import { useI18n } from '@/lib/i18n/context';
import PageHero from '@/components/PageHero';

export default function AboutPage() {
  const { t, data } = useI18n();

  return (
    <>
      <PageHero eyebrow={t('about.eyebrow')} title={t('about.title')} subtitle={t('about.subtitle')} />

      <section className="py-24">
        <div className="shell grid gap-14 lg:grid-cols-[.8fr_1.2fr]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/ashwani-kumar-wide.webp"
            alt="Ashwani Kumar, IAS, standing in a formal interior"
            className="reveal h-full max-h-[700px] w-full rounded-2xl object-cover object-center"
          />
          <div className="reveal">
            <p className="eyebrow">{t('about.journeyEyebrow')}</p>
            <h2 className="section-title">{t('about.journeyTitle')}</h2>
            <div className="mt-7 space-y-5 leading-7 text-slate-600 dark:text-slate-300">
              <p>{t('about.journeyP1')}</p>
              <p>{t('about.journeyP2')}</p>
              <p>{t('about.journeyP3')}</p>
            </div>
            <blockquote className="mt-10 border-l-2 border-gold-400 pl-6 font-display text-3xl italic text-navy-900 dark:text-white">
              {t('about.journeyQuote')}
            </blockquote>
          </div>
        </div>
      </section>

      <section className="bg-white py-24 dark:bg-slate-900">
        <div className="shell">
          <p className="eyebrow">{t('about.responsibilitiesEyebrow')}</p>
          <h2 className="section-title">{t('about.responsibilitiesTitle')}</h2>
          <ol className="mt-12 grid gap-5 text-sm leading-6 md:grid-cols-2">
            {data.positions.map((x, i) => (
              <li key={x} className="reveal flex gap-3">
                <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold-400/15 text-xs font-bold text-gold-500">
                  {i + 1}
                </span>
                <span>{x}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-24">
        <div className="shell">
          <p className="eyebrow">{t('about.leadershipEyebrow')}</p>
          <h2 className="section-title">{t('about.leadershipTitle')}</h2>
          <div className="mt-12 grid gap-10 md:grid-cols-2">
            {data.recognition.map((x) => (
              <article key={x.title} className="reveal border-l-2 border-gold-400 pl-5">
                <h3 className="text-2xl font-semibold text-navy-900 dark:text-white">{x.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{x.text}</p>
              </article>
            ))}
          </div>
          <h2 className="mt-24 text-4xl font-semibold text-navy-900 dark:text-white">{t('about.beyondOffice')}</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.extras.map((x) => (
              <li key={x} className="reveal rounded-xl bg-white p-4 text-sm shadow-sm dark:bg-slate-900">
                {x}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
