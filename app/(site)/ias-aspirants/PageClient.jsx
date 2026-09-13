'use client';

import { useI18n } from '@/lib/i18n/context';
import Reveal from '@/components/Reveal';

const MOVES = [
  { number: '01', titleKey: 'iasAspirants.move1Title', textKey: 'iasAspirants.move1Text' },
  { number: '02', titleKey: 'iasAspirants.move2Title', textKey: 'iasAspirants.move2Text' },
  { number: '03', titleKey: 'iasAspirants.move3Title', textKey: 'iasAspirants.move3Text' },
  { number: '04', titleKey: 'iasAspirants.move4Title', textKey: 'iasAspirants.move4Text' }
];

export default function IasAspirantsPage() {
  const { t } = useI18n();

  return (
    <>
      <section className="aspirants-hero relative overflow-hidden text-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/ias-aspirants-hero.webp"
          alt="Ashwani Kumar addressing students at a school event"
          className="aspirants-hero-bg"
          fetchPriority="high"
          decoding="async"
        />
        <div className="aspirants-hero-overlay" aria-hidden="true" />
        <Reveal className="shell aspirants-hero-content relative z-10" blur>
          <p className="eyebrow">{t('iasAspirants.eyebrow')}</p>
          <h1 className="max-w-4xl text-display-m font-normal tracking-tight">{t('iasAspirants.title')}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-7 aspirants-hero-subtitle">{t('iasAspirants.subtitle')}</p>
        </Reveal>
      </section>
      <section className="bg-ivory py-16 sm:py-24">
        <div className="shell">
          <Reveal className="aspirants-moves-eyebrow">
            <span aria-hidden="true" />
            {t('iasAspirants.movesEyebrow')}
          </Reveal>
          <Reveal as="h2" className="aspirants-moves-heading" transition={{ duration: 0.7, ease: 'easeOut', delay: 0.05 }}>
            {t('iasAspirants.movesTitle')}
          </Reveal>
          <div className="aspirants-moves-grid">
            {MOVES.map((move, i) => (
              <Reveal
                key={move.number}
                className="aspirants-moves-item"
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 + i * 0.08 }}
              >
                <p className="aspirants-moves-number">{move.number}</p>
                <h3 className="aspirants-moves-item-title">{t(move.titleKey)}</h3>
                <p className="aspirants-moves-item-text">{t(move.textKey)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <Reveal as="section" className="aspirants-banner">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/ias-aspirants-banner-v2.webp"
          alt="The distinction: Obvious is not simplistic. It is the conclusion that feels inevitable only after someone has done the difficult work of removing what was unnecessary. Less noise, more clarity, brighter outcomes."
          className="aspirants-banner-img"
          loading="lazy"
        />
      </Reveal>
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
