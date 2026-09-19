'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n/context';
import Html from '@/components/Html';
import Reveal from '@/components/Reveal';

const LATEST_UPDATES = [
  {
    image: '/images/ashwani-kumar-initiatives.webp',
    width: 520,
    height: 716,
    title: 'Phase 3 Mid-Career Training Programme',
    date: '12 May – 6 June 2025 · LBSNAA, Mussoorie'
  },
  {
    image: '/images/ashwani-kumar-hero-new.webp',
    width: 520,
    height: 778,
    title: 'Distinguished Panelist, 18th DigiTech Conclave',
    date: '2025 · Delhi'
  },
  {
    image: '/images/ashwani-kumar-hero-new2.webp',
    width: 520,
    height: 692,
    title: 'Aadhaar Samvaad: National Stakeholder Conference, UIDAI',
    date: '8 April 2025 · Bharat Mandapam, New Delhi'
  },
  {
    image: '/images/press-devyani-nbsb.jpg',
    width: 885,
    height: 484,
    title: 'IAS Officer Ashwani Kumar Steps Into Acting With Devyani',
    date: '24 August 2026 · North Block South Block',
    url: 'https://www.northblocksouthblock.com/ias-officer-ashwani-kumar-steps-into-acting-with-devyani/'
  },
  {
    image: '/images/press-bhedbhav-rninews.jpg',
    width: 700,
    height: 400,
    title: 'Bhedbhav with Girls: Punishment for Being a Girl in India',
    date: '5 May 2025 · RNI News',
    url: 'https://www.rninews.co.in/bhedbhav-with-girls-punishment-for-being-a-girl-in-india-when-will-the-thinking-change-179904-4/'
  },
  {
    image: '/images/press-cybersecurity-etgov.jpg',
    width: 1200,
    height: 627,
    title: 'Cyber Security: Are We Misunderstanding It and Exaggerating Its Risks?',
    date: '15 January 2024 · ET Government',
    url: 'https://government.economictimes.indiatimes.com/news/secure-india/cyber-security-are-we-misunderstanding-it-and-exaggerating-its-risks/106853720'
  },
  {
    image: '/images/press-coaching-etgov.jpg',
    width: 1198,
    height: 627,
    title: 'Opinion: Are Coaching Institutes Really Responsible for Rote Learning?',
    date: '20 November 2022 · ET Government',
    url: 'https://government.economictimes.indiatimes.com/news/education/opinion-how-coaching-institutes-are-responsible-for-deteriorating-education-quality-of-top-level-aspirants/95638030'
  }
];

export default function HomePage() {
  const { t } = useI18n();

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
            <p className="hero-fullbleed-text max-w-xl">{t('home.heroRole')}</p>
            <p className="hero-fullbleed-text max-w-xl">{t('home.heroDept')}</p>
          </div>
        </div>

        <div className="hero-mobile-content relative z-10">
          <div className="hero-mobile-name-wrap">
            <h1 className="hero-mobile-heading font-bold">{t('home.heroName')}</h1>
            <p className="hero-mobile-eyebrow">{t('home.eyebrow')}</p>
          </div>
          <div className="hero-mobile-bottom">
            <div className="hero-mobile-divider" />
            <p className="hero-mobile-role">{t('home.heroRole')}</p>
            <p className="hero-mobile-role">{t('home.heroDept')}</p>
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
            <h2 className="journey-heading">A Journey of Purpose and Progress</h2>
            <div className="journey-divider" />
            <p className="journey-copy">
              From a small town with big dreams to the journey of serving lakhs of people, every step has been
              driven by purpose.
            </p>
            <Link className="journey-cta" href="/about" prefetch={false}>
              Read My Story <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
          <Reveal className="journey-image-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/ashwani-kumar-portrait-sm.webp"
              alt="Ashwani Kumar, IAS at his desk"
              className="journey-image"
              width={800}
              height={1200}
              loading="lazy"
            />
          </Reveal>
        </div>
      </section>

      <section className="home-section-updates border-t border-slate-200 py-24">
        <div className="shell">
          <h2 className="section-title">Latest Updates</h2>
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
                      <p className="update-card-title">{update.title}</p>
                      <div className="update-card-meta">
                        <span>{update.date}</span>
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
    </div>
  );
}
