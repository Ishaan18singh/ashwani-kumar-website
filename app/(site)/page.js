'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useI18n } from '@/lib/i18n/context';
import Html from '@/components/Html';

const EXPLORE_CARDS = [
  { href: '/timeline', image: '/images/gallery-01.webp', labelKey: 'nav.timeline' },
  { href: '/projects', image: '/images/gallery-03.webp', labelKey: 'nav.projects' },
  { href: '/awards', image: '/images/gallery-04.webp', labelKey: 'nav.awards' }
];

export default function HomePage() {
  const { t } = useI18n();
  const pinWrapperRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [mobilePinActive, setMobilePinActive] = useState(false);
  const activeIndex = Math.min(EXPLORE_CARDS.length - 1, Math.round(progress * (EXPLORE_CARDS.length - 1)));

  // Mobile-only scroll-pin: as the user scrolls through a tall wrapper, the
  // three cards slide right-to-left across the screen (Timeline ->
  // Initiatives -> Awards) as a continuous track, then the section releases
  // and the page continues scrolling normally. Desktop keeps the plain
  // 3-column grid untouched - this effect never engages there. Skipped
  // entirely under prefers-reduced-motion.
  useEffect(() => {
    const pinQuery = window.matchMedia('(max-width: 1023px)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let raf = null;

    const update = () => {
      raf = null;
      const wrapper = pinWrapperRef.current;
      const active = pinQuery.matches && !motionQuery.matches;
      setMobilePinActive(active);
      if (!wrapper || !active) return;
      const rect = wrapper.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 0);
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
      <section className="home-section-hero relative min-h-screen overflow-hidden bg-ivory pt-20 text-navy-900 dark:bg-slate-950 dark:text-white">
        <div className="absolute inset-0 bg-circuit bg-[length:48px_48px] opacity-60 [mask-image:linear-gradient(to_right,black,transparent)]" />
        <div className="shell relative grid min-h-[calc(100vh-5rem)] items-center gap-10 py-16 lg:grid-cols-[1.05fr_.95fr]">
          <div className="z-10 stack-center">
            <p className="eyebrow">{t('home.eyebrow')}</p>
            <Html
              as="h1"
              className="max-w-2xl text-5xl font-normal leading-tight sm:text-6xl sm:leading-[.94] lg:text-7xl"
              html={t('home.titleHtml')}
            />
            <p className="mt-7 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
              {t('home.subtitle')}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link className="button-primary" href="/projects" prefetch={false}>
                <span>{t('home.exploreBtn')}</span> <span aria-hidden="true">→</span>
              </Link>
              <Link className="button-ghost" href="/about" prefetch={false}>
                {t('home.aboutBtn')}
              </Link>
            </div>
            <blockquote className="mt-10 max-w-xl border-l border-gold-400 pl-5 font-display text-xl italic text-slate-600 dark:text-slate-300">
              {t('home.quote')}
            </blockquote>
          </div>
          <div className="hero-media relative h-[60vh] min-h-[480px] overflow-hidden rounded-t-[9rem] rounded-b-2xl border border-navy-900/10 shadow-2xl lg:h-[75vh]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/ashwani-kumar-hero.webp"
              srcSet="/images/ashwani-kumar-hero-mobile.webp 750w, /images/ashwani-kumar-hero.webp 1302w"
              sizes="(min-width: 1024px) 45vw, 100vw"
              alt="Ashwani Kumar, IAS, in a blue suit"
              className="h-full w-full object-cover object-top"
              fetchPriority="high"
              decoding="async"
            />
          </div>
          <a
            href="#introduction"
            className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 text-xs uppercase tracking-[.2em] text-slate-600 dark:text-slate-400 lg:block"
          >
            {t('home.scroll')}
          </a>
        </div>
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
                <strong className="font-display text-4xl text-navy-900 dark:text-white">2010</strong>
                <span className="mt-1 block text-xs uppercase tracking-wider text-slate-600">{t('home.stat1Label')}</span>
              </div>
              <div>
                <strong className="font-display text-4xl text-navy-900 dark:text-white">7+</strong>
                <span className="mt-1 block text-xs uppercase tracking-wider text-slate-600">{t('home.stat2Label')}</span>
              </div>
              <div>
                <strong className="font-display text-4xl text-navy-900 dark:text-white">₹500cr</strong>
                <span className="mt-1 block text-xs uppercase tracking-wider text-slate-600">{t('home.stat3Label')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-section-work border-t border-slate-200 bg-white py-24 dark:border-slate-700 dark:bg-slate-900">
        <div className="shell">
          <p className="eyebrow">{t('home.selectedWorkEyebrow')}</p>
          <h2 className="section-title">{t('home.selectedWorkTitle')}</h2>
          <div ref={pinWrapperRef} className={mobilePinActive ? 'explore-pin-wrapper' : undefined}>
            <div className={mobilePinActive ? 'explore-pin-sticky' : undefined}>
              <div
                className={`mt-10 explore-grid${mobilePinActive ? ' is-sliding' : ''}`}
                style={
                  mobilePinActive
                    ? { transform: `translateX(-${progress * (EXPLORE_CARDS.length - 1) * 100}%)` }
                    : undefined
                }
              >
                {EXPLORE_CARDS.map((card, i) => (
                  <Link
                    key={card.href}
                    href={card.href}
                    prefetch={false}
                    className="explore-card group"
                    aria-label={t(card.labelKey)}
                    aria-hidden={mobilePinActive && i !== activeIndex ? 'true' : undefined}
                    tabIndex={mobilePinActive && i !== activeIndex ? -1 : undefined}
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
        </div>
      </section>

      <section className="home-section-leadership border-t border-slate-200 py-24 dark:border-slate-800">
        <div className="shell grid items-center gap-12 lg:grid-cols-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            loading="lazy"
            src="/images/ashwani-kumar-portrait.webp"
            alt="Portrait of Ashwani Kumar, IAS"
            className="reveal aspect-[4/5] w-full rounded-2xl object-cover"
          />
          <div className="reveal stack-center">
            <p className="eyebrow">{t('home.leadershipEyebrow')}</p>
            <h2 className="section-title">{t('home.leadershipTitle')}</h2>
            <p className="section-copy">{t('home.leadershipText')}</p>
            <Link className="button-primary mt-8" href="/timeline" prefetch={false}>
              {t('home.followJourney')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
