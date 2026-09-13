'use client';

import { useI18n } from '@/lib/i18n/context';
import PageHero from '@/components/PageHero';
import TimelineList from '@/components/TimelineList';
import Reveal from '@/components/Reveal';

export default function AboutPage() {
  const { t, data } = useI18n();

  return (
    <>
      <PageHero eyebrow={t('about.eyebrow')} />

      <section className="about-journey-section">
        <div className="shell grid gap-14 lg:grid-cols-[.8fr_1.2fr]">
          <Reveal>
            <div className="about-portrait-frame">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/ashwani-kumar-portrait-bw.webp"
                alt="Ashwani Kumar, IAS, standing in a formal interior"
                width={1000}
                height={1500}
                loading="lazy"
              />
            </div>
            <h1 className="mt-6 text-2xl font-semibold tracking-tight text-navy-900 dark:text-white">
              {t('about.title')}
            </h1>
            <p className="mt-3 text-slate-600 dark:text-slate-300">{t('about.subtitle')}</p>
          </Reveal>
          <Reveal>
            <h2 className="section-title">{t('about.journeyTitle')}</h2>
            <div className="body-copy about-journey-copy mt-7 space-y-5">
              <p>{t('about.journeyP1')}</p>
              <p>{t('about.journeyP2')}</p>
              <p>{t('about.journeyP3')}</p>
            </div>
            <blockquote className="mt-10 border-l-2 border-gold-400 pl-6 font-display text-3xl italic text-navy-900 dark:text-white">
              {t('about.journeyQuote')}
            </blockquote>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory py-24 dark:bg-slate-900">
        <div className="shell">
          <h2 className="section-title max-w-3xl">{t('timeline.title')}</h2>
          <Reveal as="p" className="mt-4 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
            {t('timeline.subtitle')}
          </Reveal>
          <div className="mt-12">
            <TimelineList timeline={data.timeline} />
          </div>
        </div>
      </section>
    </>
  );
}
