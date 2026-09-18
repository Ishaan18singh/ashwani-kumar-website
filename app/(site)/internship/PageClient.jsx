'use client';

import { useRef, useState } from 'react';
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

const TESTIMONIALS = [
  { src: '/videos/internship-testimonial-01.mp4', poster: '/images/internship-testimonial-01.webp' },
  { src: '/videos/internship-testimonial-02.mp4', poster: '/images/internship-testimonial-02.webp' },
  { src: '/videos/internship-testimonial-03.mp4', poster: '/images/internship-testimonial-03.webp' },
  { src: '/videos/internship-testimonial-04.mp4', poster: '/images/internship-testimonial-04.webp' },
  { src: '/videos/internship-testimonial-05.mp4', poster: '/images/internship-testimonial-05.webp' },
  { src: '/videos/internship-testimonial-06.mp4', poster: '/images/internship-testimonial-06.webp' },
  { src: '/videos/internship-testimonial-07.mp4', poster: '/images/internship-testimonial-07.webp' }
];

const PHOTOS = [
  { src: '/images/internship-photo-01.webp', alt: 'Interns at their workstations during a session' },
  { src: '/images/internship-photo-02.webp', alt: 'Interns working together in the office' },
  { src: '/images/internship-photo-03.webp', alt: 'Ashwani Kumar interacting with interns' },
  { src: '/images/internship-photo-04.webp', alt: 'Interns during a discussion' },
  { src: '/images/internship-photo-05.webp', alt: 'Interns at work in the conference room' },
  { src: '/images/internship-photo-06.webp', alt: 'Ashwani Kumar with the interns' },
  { src: '/images/internship-photo-07.webp', alt: 'Interns in a group session' },
  { src: '/images/internship-photo-08.webp', alt: 'Interns presenting their work' },
  { src: '/images/internship-photo-09.webp', alt: 'Group photo of interns with Ashwani Kumar' },
  { src: '/images/internship-photo-10.webp', alt: 'Interns posing for a group photo' },
  { src: '/images/internship-photo-11.webp', alt: 'Interns at the office' },
  { src: '/images/internship-photo-12.webp', alt: 'Interns during the programme' },
  { src: '/images/internship-photo-13.webp', alt: 'Interns in conversation' },
  { src: '/images/internship-photo-14.webp', alt: 'Interns wrapping up a session' }
];

export default function InternshipPage() {
  const { t } = useI18n();
  const dialogRef = useRef(null);
  const [activePhoto, setActivePhoto] = useState(null);
  const [showAllTestimonials, setShowAllTestimonials] = useState(false);

  const openPhoto = (photo) => {
    setActivePhoto(photo);
    dialogRef.current?.showModal();
  };
  const closePhoto = () => dialogRef.current?.close();

  const visibleTestimonials = showAllTestimonials ? TESTIMONIALS : TESTIMONIALS.slice(0, 3);

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
              <button
                key={`${photo.src}-${i}`}
                type="button"
                onClick={() => openPhoto(photo)}
                aria-hidden={isDuplicate}
                tabIndex={isDuplicate ? -1 : undefined}
                className="internship-photo-item-btn"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.src}
                  alt={isDuplicate ? '' : photo.alt}
                  loading="lazy"
                  className="internship-photo-item"
                />
              </button>
            );
          })}
        </div>
      </Reveal>

      <dialog
        ref={dialogRef}
        className="internship-lightbox m-auto w-[min(94vw,1000px)] bg-transparent text-white backdrop:bg-black/80"
        onClick={(e) => {
          if (e.target === dialogRef.current) closePhoto();
        }}
      >
        <button
          type="button"
          onClick={closePhoto}
          className="absolute right-5 top-5 z-10 grid h-10 w-10 place-items-center rounded-full bg-black/60 text-xl"
          aria-label="Close image"
        >
          ×
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={activePhoto?.src} alt={activePhoto?.alt || ''} className="block max-h-[90vh] w-full object-contain" />
      </dialog>

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
          <Reveal className="aspirants-moves-eyebrow">
            <span aria-hidden="true" />
            {t('internship.testimonialsEyebrow')}
          </Reveal>
          <Reveal as="h2" className="internship-testimonials-heading" transition={{ duration: 0.7, ease: 'easeOut', delay: 0.05 }}>
            {t('internship.testimonialsTitle')}
          </Reveal>
          {TESTIMONIALS.length > 0 ? (
            <>
              <div className="internship-testimonials-grid">
                {visibleTestimonials.map((item, i) => (
                  <Reveal key={item.src} className="internship-testimonial-card" transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.08 }}>
                    {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                    <video
                      className="internship-testimonial-video"
                      src={item.src}
                      poster={item.poster}
                      controls
                      preload="metadata"
                    />
                  </Reveal>
                ))}
              </div>
              {TESTIMONIALS.length > 3 && !showAllTestimonials && (
                <button
                  type="button"
                  onClick={() => setShowAllTestimonials(true)}
                  className="internship-testimonials-viewall"
                >
                  {t('internship.testimonialsViewAll')} <span aria-hidden="true">→</span>
                </button>
              )}
            </>
          ) : (
            <Reveal className="internship-testimonials-empty">{t('internship.testimonialsEmpty')}</Reveal>
          )}
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
