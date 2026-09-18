'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n/context';
import Html from '@/components/Html';
import Reveal from '@/components/Reveal';
import { EyeIcon, PeopleIcon, TrendingUpIcon } from '@/components/IasAspirantsIcons';
import { SITE_DATA } from '@/lib/data';

const PILLARS = [
  { Icon: EyeIcon, titleKey: 'internship.pillar1Title', textKey: 'internship.pillar1Text' },
  { Icon: PeopleIcon, titleKey: 'internship.pillar2Title', textKey: 'internship.pillar2Text' },
  { Icon: TrendingUpIcon, titleKey: 'internship.pillar3Title', textKey: 'internship.pillar3Text' }
];

const STEPS = [
  { titleKey: 'internship.step1Title', textKey: 'internship.step1Text' },
  { titleKey: 'internship.step2Title', textKey: 'internship.step2Text' },
  { titleKey: 'internship.step3Title', textKey: 'internship.step3Text' },
  { titleKey: 'internship.step4Title', textKey: 'internship.step4Text' }
];

const PHOTOS = [
  { src: '/images/ias-aspirants-internship-photo.webp', alt: 'Ashwani Kumar with a group of interns in a conference room' },
  { src: '/images/ias-aspirants-hero.webp', alt: 'Ashwani Kumar addressing students at a school event' },
  { src: '/images/gallery-01.webp', alt: 'Ashwani Kumar in a blue suit, full-length portrait' },
  { src: '/images/gallery-04.webp', alt: 'Ashwani Kumar in a formal portrait' }
];

export default function InternshipPage() {
  const { t } = useI18n();

  return (
    <>
      <section className="internship-hero">
        <div className="shell internship-hero-grid">
          <Reveal blur>
            <p className="eyebrow">
              <span aria-hidden="true" />
              {t('internship.eyebrow')}
            </p>
            <Html as="h1" className="internship-hero-title" html={t('internship.titleHtml')} />
            <p className="internship-hero-subtitle">{t('internship.subtitle')}</p>
          </Reveal>
          <Reveal className="internship-hero-photo-wrap" transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/ias-aspirants-internship-photo.webp"
              alt="Ashwani Kumar with a group of interns in a conference room"
              className="internship-hero-photo"
              loading="lazy"
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory py-16 sm:py-24">
        <div className="shell">
          <Reveal className="aspirants-moves-eyebrow">
            <span aria-hidden="true" />
            {t('internship.pillarsEyebrow')}
          </Reveal>
          <div className="internship-pillars">
            {PILLARS.map(({ Icon, titleKey, textKey }, i) => (
              <Reveal key={titleKey} className="internship-pillar" transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.08 }}>
                <span className="internship-pillar-icon">
                  <Icon />
                </span>
                <h3 className="internship-pillar-title">{t(titleKey)}</h3>
                <p className="internship-pillar-text">{t(textKey)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Reveal as="section" className="internship-photo-banner">
        <div className="internship-photo-track">
          {[...PHOTOS, ...PHOTOS].map((photo, i) => {
            const isDuplicate = i >= PHOTOS.length;
            return (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                key={`${photo.src}-${i}`}
                src={photo.src}
                alt={isDuplicate ? '' : photo.alt}
                aria-hidden={isDuplicate}
                loading="lazy"
                className="internship-photo-item"
              />
            );
          })}
        </div>
      </Reveal>

      <section className="py-16 sm:py-24">
        <div className="shell">
          <Reveal className="aspirants-moves-eyebrow">
            <span aria-hidden="true" />
            {t('internship.howEyebrow')}
          </Reveal>
          <div className="internship-steps">
            {STEPS.map(({ titleKey, textKey }, i) => (
              <Reveal key={titleKey} className="internship-step" transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.08 }}>
                <span className="internship-step-number">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="internship-step-title">{t(titleKey)}</h3>
                <p className="internship-step-text">{t(textKey)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory py-16 sm:py-24">
        <div className="shell">
          <Reveal className="internship-who">
            <p className="aspirants-moves-eyebrow">
              <span aria-hidden="true" />
              {t('internship.whoEyebrow')}
            </p>
            <p className="internship-who-text">{t('internship.whoText')}</p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="shell">
          <Reveal className="internship-apply">
            <h2 className="internship-apply-title">{t('internship.applyTitle')}</h2>
            <p className="internship-apply-text">{t('internship.applyText')}</p>
            <div className="internship-apply-actions">
              <Link href="/contact" className="aspirants-cta-btn" prefetch={false}>
                {t('internship.applyBtn')} <span aria-hidden="true">→</span>
              </Link>
              <a href={`mailto:${SITE_DATA.profile.email}`} className="internship-apply-link">
                {t('internship.emailBtn')} <span aria-hidden="true">→</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
