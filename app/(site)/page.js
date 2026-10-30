'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n/context';
import { formatArticleDate } from '@/lib/i18n/formatDate';
import Html from '@/components/Html';
import Reveal from '@/components/Reveal';

const LATEST_UPDATES = [
  {
    image: '/images/publications/press-jamui-et-government.webp',
    width: 513,
    height: 283,
    titleKey: 'updates.jamui',
    iso: '2026-09-25',
    source: 'ET Government',
    url: 'https://government.economictimes.indiatimes.com/blog/ashwani-kumar-on-jamui-incident-moving-beyond-viral-outrage-to-real-reform/134474437'
  },
  {
    image: '/images/press-devyani-nbsb.jpg',
    width: 885,
    height: 484,
    titleKey: 'updates.devyani',
    iso: '2026-08-24',
    source: 'North Block South Block',
    url: 'https://www.northblocksouthblock.com/ias-officer-ashwani-kumar-steps-into-acting-with-devyani/'
  },
  {
    image: '/images/press-bhedbhav-rninews.jpg',
    width: 700,
    height: 400,
    titleKey: 'updates.bhedbhav',
    iso: '2025-05-05',
    source: 'RNI News',
    url: 'https://www.rninews.co.in/bhedbhav-with-girls-punishment-for-being-a-girl-in-india-when-will-the-thinking-change-179904-4/'
  },
  {
    image: '/images/press-cybersecurity-etgov.jpg',
    width: 1200,
    height: 627,
    titleKey: 'updates.cyber',
    iso: '2024-01-15',
    source: 'ET Government',
    url: 'https://government.economictimes.indiatimes.com/news/secure-india/cyber-security-are-we-misunderstanding-it-and-exaggerating-its-risks/106853720'
  },
  {
    image: '/images/press-coaching-etgov.jpg',
    width: 1198,
    height: 627,
    titleKey: 'updates.coaching',
    iso: '2022-11-20',
    source: 'ET Government',
    url: 'https://government.economictimes.indiatimes.com/news/education/opinion-how-coaching-institutes-are-responsible-for-deteriorating-education-quality-of-top-level-aspirants/95638030'
  }
];

// Breaks the tagline between sentences rather than mid-phrase. Each part
// keeps the space that followed it, so nothing is added to the text; CJK
// needs its own pattern because nothing follows the full stop there.
const SENTENCE_END = /(?<=。)|(?<=[.।]\s)/;

function taglineParts(tagline) {
  return tagline.split(SENTENCE_END).filter(Boolean);
}

export default function HomePage() {
  const { t, lang } = useI18n();

  return (
    <div className="home-sections">
      <section className="home-section-hero hero-fullbleed relative min-h-screen overflow-hidden text-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/ashwani-kumar-hero-fullbleed.jpg"
          alt="Ashwani Kumar, IAS"
          className="hero-fullbleed-bg hero-bg-desktop"
          width={1672}
          height={941}
          fetchPriority="high"
          decoding="async"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/ashwani-kumar-hero-mobile-bg.webp"
          alt="Ashwani Kumar, IAS"
          className="hero-fullbleed-bg hero-bg-mobile"
          width={1086}
          height={1448}
          fetchPriority="high"
          decoding="async"
        />
        <div className="hero-fullbleed-overlay" aria-hidden="true" />
        <div className="shell hero-fullbleed-content hero-desktop-content relative z-10 min-h-screen">
          <div className="hero-fullbleed-name-wrap">
            <h1 className="text-hero-headline max-w-2xl font-bold">{t('home.heroName')}</h1>
            <p className="eyebrow">{t('home.eyebrow')}</p>
          </div>
          <div className="hero-fullbleed-bottom">
            <Html as="p" className="hero-fullbleed-text max-w-xl" html={t('home.heroRole')} />
            <p className="hero-fullbleed-text max-w-xl">{t('home.heroDept')}</p>
            <p className="hero-tagline">
              {taglineParts(t('home.tagline')).flatMap((part, i) => [
                // A zero-width space between the spans gives the line
                // somewhere to break without adding a visible character,
                // which matters for the languages that use no space here.
                i > 0 ? '​' : null,
                <span key={part} className="hero-tagline-part">
                  {part}
                </span>
              ])}
            </p>
          </div>
        </div>

        <div className="hero-mobile-content relative z-10">
          <div className="hero-mobile-name-wrap">
            <h1 className="hero-mobile-heading font-bold">{t('home.heroName')}</h1>
            <p className="hero-mobile-eyebrow">{t('home.eyebrow')}</p>
          </div>
          <div className="hero-mobile-bottom">
            <div className="hero-mobile-divider" />
            <p className="hero-mobile-role">{t('home.heroRole').replace(/<br\s*\/?>/i, ' ')}</p>
            <p className="hero-mobile-role">{t('home.heroDept')}</p>
            <p className="hero-tagline hero-tagline-mobile">
              {taglineParts(t('home.tagline')).flatMap((part, i) => [
                // A zero-width space between the spans gives the line
                // somewhere to break without adding a visible character,
                // which matters for the languages that use no space here.
                i > 0 ? '​' : null,
                <span key={part} className="hero-tagline-part">
                  {part}
                </span>
              ])}
            </p>
          </div>
        </div>
      </section>

      <section className="home-section-updates border-t border-slate-200 py-24">
        <div className="shell">
          <h2 className="section-title">{t('home.latestUpdates')}</h2>
          <div className="mt-10 updates-marquee">
            <div className="updates-track">
              {[...LATEST_UPDATES, ...LATEST_UPDATES].map((update, i) => {
                const isDuplicate = i >= LATEST_UPDATES.length;
                const cardContent = (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="update-card-img"
                      src={update.image}
                      alt=""
                      width={update.width}
                      height={update.height}
                    />
                    <div className="update-card-body">
                      <p className="update-card-title">{t(update.titleKey)}</p>
                      <div className="update-card-meta">
                        <span>
                          {formatArticleDate(update.iso, lang)} <span aria-hidden="true">·</span> {update.source}
                        </span>
                        <span aria-hidden="true">→</span>
                      </div>
                    </div>
                  </>
                );

                return update.url ? (
                  <a
                    key={i}
                    href={update.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="update-card"
                    aria-hidden={isDuplicate}
                    tabIndex={isDuplicate ? -1 : undefined}
                  >
                    {cardContent}
                  </a>
                ) : (
                  <Link
                    key={i}
                    href="/awards"
                    prefetch={false}
                    className="update-card"
                    aria-hidden={isDuplicate}
                    tabIndex={isDuplicate ? -1 : undefined}
                  >
                    {cardContent}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="home-section-leadership border-t border-slate-200 py-24 dark:border-slate-800">
        <div className="shell">
          <Reveal className="leadership-content">
            <p className="leadership-eyebrow">
              <span aria-hidden="true" />
              {t('home.leadershipEyebrow')}
            </p>
            <Html as="h2" className="leadership-title" html={t('home.leadershipTitleHtml')} />
            <p className="leadership-text">{t('home.leadershipText')}</p>
            <div className="leadership-actions">
              <Link className="leadership-btn" href="/projects" prefetch={false}>
                {t('home.exploreBtn')} <span aria-hidden="true">→</span>
              </Link>
              <div className="leadership-tags">
                {t('home.leadershipTags')
                  .split('|')
                  .map((word) => (
                    <span key={word} className="leadership-tag-item">
                      {word}
                    </span>
                  ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="introduction" className="home-section-intro journey-section">
        <div className="journey-grid">
          <Reveal className="journey-text">
            <h2 className="journey-heading">{t('home.journeyTitle')}</h2>
            <div className="journey-divider" />
            <p className="journey-copy">{t('home.journeyText')}</p>
            <Link className="journey-cta" href="/about" prefetch={false}>
              {t('home.journeyCta')} <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
          <Reveal className="journey-image-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/ashwani-kumar-home-journey-desk.webp"
              alt={t('home.journeyAlt')}
              className="journey-image"
              width={1189}
              height={682}
              loading="lazy"
            />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
