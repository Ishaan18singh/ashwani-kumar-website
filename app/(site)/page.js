'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useI18n } from '@/lib/i18n/context';
import Html from '@/components/Html';

const EXPLORE_CARDS = [
  { href: '/projects', image: '/images/ashwani-kumar-initiatives.jpg', labelKey: 'nav.projects' },
  { href: '/awards', image: '/images/gallery-04.webp', labelKey: 'nav.awards' },
  { href: '/acting-modeling', image: '/images/devyani-poster.jpg', labelKey: 'nav.actingModeling' }
];

export default function HomePage() {
  const { t } = useI18n();
  const cardRefs = useRef([]);
  const cardSettledRef = useRef([]);

  // Desktop-only: the cards tilt-and-settle flat as they scroll into view, a
  // continuous scrub tied directly to scroll position (not a fire-once
  // threshold) and staggered card-to-card, cleared once each card fully
  // settles so the existing hover-lift CSS takes back over. Mobile just
  // shows the plain stacked grid with no scroll-driven effect. Skipped
  // entirely under prefers-reduced-motion.
  useEffect(() => {
    const pinQuery = window.matchMedia('(max-width: 1023px)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let raf = null;

    const clearCardStyle = (card) => {
      card.style.transition = '';
      card.style.opacity = '';
      card.style.transform = '';
    };

    const update = () => {
      raf = null;
      const mobile = pinQuery.matches;
      const reduced = motionQuery.matches;

      const cards = cardRefs.current;
      const settled = cardSettledRef.current;
      if (mobile || reduced) {
        cards.forEach((card, i) => {
          if (!card) return;
          if (settled[i] !== true) {
            clearCardStyle(card);
            settled[i] = true;
          }
        });
        return;
      }

      const stagger = 0.25;
      const n = cards.length;
      cards.forEach((card, i) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const start = window.innerHeight * 0.92;
        const end = window.innerHeight * 0.55;
        const base = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
        const t = Math.min(1, Math.max(0, base * (1 + stagger * (n - 1)) - i * stagger));
        if (t >= 1) {
          // Write once on the frame it settles, then leave it alone - Lenis's
          // easing can leave rect.top jittering by sub-pixels for many frames
          // near the target, and re-toggling the inline style every frame as
          // t flickers around 1 is what caused the visible stutter here.
          if (settled[i] !== true) {
            clearCardStyle(card);
            settled[i] = true;
          }
        } else {
          settled[i] = false;
          card.style.transition = 'none';
          card.style.opacity = String(t);
          card.style.transform = `perspective(1200px) rotateY(${18 * (1 - t)}deg) translateX(${30 * (1 - t)}px) scale(${0.94 + 0.06 * t})`;
        }
      });
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

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
            <div className="mt-9 flex flex-wrap gap-3">
              <Link className="button-primary" href="/projects" prefetch={false}>
                <span>{t('home.exploreBtn')}</span> <span aria-hidden="true">→</span>
              </Link>
            </div>
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
              Building trusted systems, capable institutions and citizen-first public services for Assam.
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
            <Link className="button-primary mt-8" href="/about" prefetch={false}>
              {t('home.followJourney')}
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

      <section className="home-section-work border-t border-slate-200 bg-ivory py-16 dark:border-slate-700 dark:bg-slate-900">
        <div className="shell">
          <p className="eyebrow">{t('home.selectedWorkEyebrow')}</p>
          <h2 className="section-title">{t('home.selectedWorkTitle')}</h2>
          <div className="mt-10 home-selected-work-inner">
            <div className="explore-grid">
              {EXPLORE_CARDS.map((card, i) => (
                <Link
                  key={card.href}
                  ref={(el) => (cardRefs.current[i] = el)}
                  href={card.href}
                  prefetch={false}
                  className="explore-card group"
                  aria-label={t(card.labelKey)}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="explore-card-img" src={card.image} alt="" loading="lazy" />
                  <span className="explore-card-overlay" aria-hidden="true" />
                  <span className="explore-card-title">
                    {t(card.labelKey)} <span aria-hidden="true">→</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
