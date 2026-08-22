'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useI18n } from '@/lib/i18n/context';
import Html from '@/components/Html';

const EXPLORE_CARDS = [
  { href: '/about', image: '/images/ashwani-kumar-hero.webp', labelKey: 'nav.timeline' },
  { href: '/projects', image: '/images/gallery-03.webp', labelKey: 'nav.projects' },
  { href: '/awards', image: '/images/gallery-04.webp', labelKey: 'nav.awards' }
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
          className="hero-fullbleed-bg"
          fetchPriority="high"
          decoding="async"
        />
        <div className="hero-fullbleed-overlay" aria-hidden="true" />
        <div className="shell hero-fullbleed-content relative z-10 min-h-screen">
          <h1 className="hero-fullbleed-name">Ashwani Kumar</h1>
          <span className="hero-fullbleed-divider" aria-hidden="true" />
          {t('home.eyebrow')
            .split(' · ')
            .map((line, i) => (
              <p key={line} className={i === 0 ? 'hero-fullbleed-label' : 'hero-fullbleed-sublabel'}>
                {line}
              </p>
            ))}
          <p className="hero-fullbleed-text max-w-xl">{t('home.subtitle')}</p>
          <a href="#introduction" className="hero-fullbleed-cta">
            {t('home.exploreBtn')} <span aria-hidden="true">↓</span>
          </a>
        </div>
        <a href="#introduction" className="hero-fullbleed-scroll">
          <span className="hero-fullbleed-scroll-line" aria-hidden="true" />
          {t('home.scroll').replace(' ↓', '')}
        </a>
        <span className="hero-fullbleed-page">
          <span className="hero-fullbleed-page-line" aria-hidden="true" />
          01
        </span>
      </section>

      <section id="introduction" className="home-section-intro border-t border-slate-200 py-24 dark:border-slate-800">
        <div className="shell grid items-start gap-14 lg:grid-cols-[.95fr_1.05fr]">
          <div className="reveal pin-on-scroll">
            <p className="eyebrow">{t('home.introEyebrow')}</p>
            <Html as="h2" className="section-title" html={t('home.introTitleHtml')} />
          </div>
          <div className="reveal stack-center">
            <p className="text-base leading-6 text-slate-600 dark:text-slate-300">{t('home.introText')}</p>
            <div className="mt-10 grid grid-cols-3 gap-4">
              <div>
                <strong className="text-display-m font-display text-navy-900 dark:text-white">2010</strong>
                <span className="mt-1 block text-xs uppercase tracking-wider text-slate-600">{t('home.stat1Label')}</span>
              </div>
              <div>
                <strong className="text-display-m font-display text-navy-900 dark:text-white">7+</strong>
                <span className="mt-1 block text-xs uppercase tracking-wider text-slate-600">{t('home.stat2Label')}</span>
              </div>
              <div>
                <strong className="text-display-m font-display text-navy-900 dark:text-white">₹500cr</strong>
                <span className="mt-1 block text-xs uppercase tracking-wider text-slate-600">{t('home.stat3Label')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-section-devyani border-t border-slate-200 py-24 dark:border-slate-800">
        <div className="shell grid items-center gap-14 lg:grid-cols-[.95fr_1.05fr]">
          <div className="reveal">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/devyani-poster.jpg"
              alt="Devyani movie poster"
              className="devyani-poster-thumb mb-6"
              loading="lazy"
            />
            <p className="eyebrow">Beyond the Office</p>
            <h2 className="section-title">Public service doesn&apos;t end at the office door.</h2>
          </div>
          <div className="reveal stack-center">
            <p className="body-copy text-slate-600 dark:text-slate-300">
              Ashwani Kumar carries that same commitment to public storytelling onto the screen, marking his acting
              debut in <strong>Devyani</strong> — a drama-suspense film about a father&apos;s fear for his unborn
              daughter transforming into hope.
            </p>
            <Link
              className="button-primary mt-8 inline-flex w-fit"
              href="/acting-modeling/devyani"
              prefetch={false}
            >
              Learn more <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="home-section-work border-t border-slate-200 bg-ivory py-24 dark:border-slate-700 dark:bg-slate-900">
        <div className="shell">
          <p className="eyebrow">{t('home.selectedWorkEyebrow')}</p>
          <h2 className="section-title">{t('home.selectedWorkTitle')}</h2>
          <div className="mt-10 explore-grid">
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
    </div>
  );
}
