'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n/context';
import Html from '@/components/Html';

const LATEST_UPDATES = [
  {
    image: '/images/ashwani-kumar-initiatives.jpg',
    title: 'Phase 3 Mid-Career Training Programme',
    date: '12 May – 6 June 2025 · LBSNAA, Mussoorie'
  },
  {
    image: '/images/ashwani-kumar-hero-new.jpg',
    title: 'Distinguished Panelist, 18th DigiTech Conclave',
    date: '2025 · Delhi'
  },
  {
    image: '/images/ashwani-kumar-hero-new2.jpg',
    title: 'Aadhaar Samvaad — National Stakeholder Conference, UIDAI',
    date: '8 April 2025 · Bharat Mandapam, New Delhi'
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
          fetchPriority="high"
          decoding="async"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/ashwani-kumar-hero-mobile.png"
          alt="Ashwani Kumar, IAS"
          className="hero-fullbleed-bg hero-bg-mobile"
          fetchPriority="high"
          decoding="async"
        />
        <div className="hero-fullbleed-overlay" aria-hidden="true" />
        <div className="shell hero-fullbleed-content hero-desktop-content relative z-10 min-h-screen">
          <div className="hero-fullbleed-top">
            <p className="eyebrow">{t('home.eyebrow')}</p>
            <Html as="h1" className="text-hero-headline max-w-2xl font-normal" html={t('home.titleHtml')} />
          </div>
          <div className="hero-fullbleed-bottom">
            <p className="hero-fullbleed-text mt-7 max-w-xl">{t('home.subtitle')}</p>
            <blockquote className="hero-fullbleed-quote mt-10 max-w-xl pl-5 font-display text-xl italic">
              {t('home.quote')}
            </blockquote>
            <a
              href="#introduction"
              className="hero-fullbleed-scroll absolute bottom-5 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[.2em] text-white"
            >
              {t('home.scroll')}
            </a>
          </div>
        </div>

        <div className="hero-mobile-content relative z-10">
          <div className="hero-mobile-top">
            <p className="hero-mobile-eyebrow">Indian Administrative Service</p>
            <p className="hero-mobile-eyebrow hero-mobile-eyebrow-sub">Assam-Meghalaya Cadre</p>
            <h1 className="hero-mobile-heading">
              <span className="block">Digital governance.</span>
              <span className="block">Public purpose.</span>
            </h1>
            <div className="hero-mobile-divider" />
          </div>
          <div className="hero-mobile-bottom">
            <p className="hero-mobile-name">Ashwani Kumar, IAS</p>
            <p className="hero-mobile-role">Director, DITEC</p>
            <p className="hero-mobile-role">Government of Assam</p>
            <p className="hero-mobile-subtitle">
              From leading flood relief and grassroots reform in Assam’s field districts to driving statewide digital governance through e-Prastuti, PGRS and citizen-first public services.
            </p>
            <a href="#introduction" className="hero-mobile-cta">
              <span>Explore the journey</span> <span aria-hidden="true">→</span>
            </a>
            <div className="hero-mobile-scroll">
              <span>Scroll</span> <span aria-hidden="true">↓</span>
            </div>
          </div>
        </div>
      </section>

      <section className="home-section-leadership border-t border-slate-200 py-24 dark:border-slate-800">
        <div className="shell">
          <div className="reveal stack-center max-w-2xl">
            <p className="eyebrow">{t('home.leadershipEyebrow')}</p>
            <h2 className="section-title">{t('home.leadershipTitle')}</h2>
            <p className="section-copy">{t('home.leadershipText')}</p>
            <Link className="button-primary mt-8" href="/projects" prefetch={false}>
              <span>{t('home.exploreBtn')}</span> <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section id="introduction" className="home-section-intro journey-section">
        <div className="journey-grid">
          <div className="reveal journey-text">
            <p className="eyebrow">My Journey</p>
            <h2 className="journey-heading">A Journey of Purpose and Progress</h2>
            <div className="journey-divider" />
            <p className="journey-copy">
              From a small town with big dreams to the journey of serving lakhs of people — every step has been
              driven by purpose.
            </p>
            <Link className="journey-cta" href="/about" prefetch={false}>
              Read My Story <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="reveal journey-image-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/ashwani-kumar-portrait.webp"
              alt="Ashwani Kumar, IAS at his desk"
              className="journey-image"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="home-section-updates border-t border-slate-200 py-24">
        <div className="shell">
          <p className="eyebrow">Latest Updates</p>
          <div className="mt-10 updates-grid">
            {LATEST_UPDATES.map((update, i) => (
              <Link key={i} href="/awards" prefetch={false} className="update-card reveal">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="update-card-img" src={update.image} alt="" loading="lazy" />
                <div className="update-card-body">
                  <p className="update-card-title">{update.title}</p>
                  <div className="update-card-meta">
                    <span>{update.date}</span>
                    <span aria-hidden="true">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
