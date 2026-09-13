'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n/context';
import Reveal from '@/components/Reveal';
import { EyeIcon, PeopleIcon, TrendingUpIcon, GraduationCapIcon } from '@/components/IasAspirantsIcons';

const FEATURES = [
  { Icon: EyeIcon, key: 'iasAspirants.ctaFeature1' },
  { Icon: PeopleIcon, key: 'iasAspirants.ctaFeature2' },
  { Icon: TrendingUpIcon, key: 'iasAspirants.ctaFeature3' }
];

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
      <section id="four-moves" className="bg-ivory py-16 sm:py-24">
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

      <section className="aspirants-cta bg-ivory relative overflow-hidden">
        <span className="aspirants-cta-blob aspirants-cta-blob-1" aria-hidden="true" />
        <span className="aspirants-cta-blob aspirants-cta-blob-2" aria-hidden="true" />
        <div className="shell aspirants-cta-grid">
          <Reveal>
            <div className="aspirants-moves-eyebrow">
              <span aria-hidden="true" />
              {t('iasAspirants.ctaEyebrow')}
            </div>
            <h2 className="aspirants-cta-heading">
              <span>{t('iasAspirants.ctaHeadingLine1')}</span>
              <span className="aspirants-cta-heading-accent">{t('iasAspirants.ctaHeadingLine2')}</span>
            </h2>
            <p className="aspirants-cta-text">{t('iasAspirants.subtitle')}</p>
            <div className="aspirants-cta-features">
              {FEATURES.map(({ Icon, key }, i) => (
                <div key={key} className="aspirants-cta-feature">
                  {i > 0 && <span className="aspirants-cta-feature-divider" aria-hidden="true" />}
                  <span className="aspirants-cta-feature-icon">
                    <Icon />
                  </span>
                  <p className="aspirants-cta-feature-label">{t(key)}</p>
                </div>
              ))}
            </div>
            <div className="aspirants-cta-actions">
              <Link href="/contact" className="aspirants-cta-btn" prefetch={false}>
                {t('iasAspirants.ctaPrimaryBtn')} <span aria-hidden="true">→</span>
              </Link>
              <a href="#four-moves" className="aspirants-cta-link">
                {t('iasAspirants.ctaSecondaryBtn')}
              </a>
            </div>
          </Reveal>

          <Reveal className="aspirants-cta-visual" transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}>
            <p className="aspirants-cta-tag aspirants-cta-tag-top">
              {t('iasAspirants.ctaTagTop')} <span aria-hidden="true" />
            </p>
            <div className="aspirants-cta-photo-wrap">
              <span className="aspirants-cta-photo-blob" aria-hidden="true" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/ias-aspirants-internship-photo.webp"
                alt="Ashwani Kumar with a group of interns in a conference room"
                className="aspirants-cta-photo"
                loading="lazy"
              />
              <div className="aspirants-cta-badge">
                <span className="aspirants-cta-badge-icon">
                  <GraduationCapIcon />
                </span>
                <p>
                  {t('iasAspirants.ctaBadgeLine1')}
                  <br />
                  {t('iasAspirants.ctaBadgeLine2')}
                </p>
              </div>
            </div>
            <p className="aspirants-cta-tag aspirants-cta-tag-bottom">
              <span aria-hidden="true" /> {t('iasAspirants.ctaTagBottom')}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
