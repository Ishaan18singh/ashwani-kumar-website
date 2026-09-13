'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { useI18n } from '@/lib/i18n/context';
import { useInView, useReducedMotion } from 'framer-motion';
import Html from '@/components/Html';

// Mockup settings: Auto play on, every 5 s.
const AUTOPLAY_MS = 5000;

export default function AwardsShowcase({ items, titleHtml }) {
  const { t } = useI18n();
  const count = items.length;
  const headingId = useId();
  const rootRef = useRef(null);
  const gridRef = useRef(null);
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const inView = useInView(rootRef, { amount: 0.4 });
  const reduceMotion = useReducedMotion();

  const current = Math.min(active, count - 1);
  const item = items[current];
  const go = useCallback((i) => setActive(((i % count) + count) % count), [count]);

  useEffect(() => {
    if (reduceMotion || hovered || focused || !inView || count < 2) return undefined;
    const id = setTimeout(() => go(current + 1), AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [current, count, go, hovered, focused, inView, reduceMotion]);

  if (!count || !item) return null;

  const onFocus = (e) => {
    let keyboard = true;
    try {
      keyboard = e.target.matches(':focus-visible');
    } catch {
      // Safari < 15.4 can't parse :focus-visible; treat every focus as keyboard.
    }
    if (keyboard) setFocused(true);
  };

  return (
    <div
      ref={rootRef}
      className="awards-showcase"
      role="region"
      aria-roledescription="carousel"
      aria-labelledby={headingId}
      onPointerEnter={(e) => e.pointerType === 'mouse' && setHovered(true)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && setHovered(false)}
      onFocus={onFocus}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
      }}
    >
      <h2 id={headingId} className="sr-only">
        {t('awards.honorsTitle')}
      </h2>

      <div className="awards-showcase-media">
        <div className="awards-showcase-frame">
          {items.map((slide, i) => (
            <div
              key={`${slide.year}-${slide.title}`}
              className={`awards-showcase-slide${i === current ? ' is-active' : ''}`}
              aria-hidden={i !== current}
            >
              {slide.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={slide.image} alt={i === current ? slide.title : ''} loading="lazy" decoding="async" />
              ) : (
                <div className="awards-showcase-fallback">{slide.year}</div>
              )}
            </div>
          ))}
          <span className="awards-showcase-year-badge">{item.year}</span>
          <div className="awards-showcase-caption">
            <p className="awards-showcase-caption-title">{item.title}</p>
            <p className="awards-showcase-caption-meta">{item.body}</p>
          </div>
        </div>
        <div className="awards-showcase-controls">
          <div className="awards-showcase-arrows-row">
            <span className="awards-showcase-counter">
              {String(current + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
            </span>
            <div className="awards-showcase-arrows">
              <button type="button" className="awards-showcase-arrow" aria-label="Previous award" onClick={() => go(current - 1)}>
                <span aria-hidden="true">←</span>
              </button>
              <button type="button" className="awards-showcase-arrow is-accent" aria-label="Next award" onClick={() => go(current + 1)}>
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="awards-featured-panel">
        <p className="awards-showcase-eyebrow">
          <span aria-hidden="true" />
          {t('awards.featuredEyebrow')}
        </p>
        <p className="awards-featured-year">{item.year}</p>
        <h3 className="awards-featured-title">{item.title}</h3>
        <p className="awards-featured-body">{item.body}</p>
        {item.impact ? <p className="awards-featured-body awards-featured-impact">{item.impact}</p> : null}
        <hr className="awards-featured-divider" />
        {titleHtml ? <Html as="h1" className="awards-hero-title awards-featured-heading" html={titleHtml} /> : null}
      </div>

      <div ref={gridRef} className="awards-tray">
        {items.map((tile, i) => (
          <button
            type="button"
            key={`tile-${tile.year}-${tile.title}`}
            className={`awards-tray-card${i === current ? ' is-active' : ''}`}
            onClick={() => go(i)}
          >
            <span className="awards-tray-thumb">
              {tile.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={tile.image} alt="" loading="lazy" />
              ) : (
                <span className="awards-tray-thumb-fallback">{tile.year}</span>
              )}
            </span>
            <span className="awards-tray-body">
              <span className="awards-tray-year-row">
                <span className="awards-tray-year">{tile.year}</span>
                {i === 0 ? <span className="awards-tray-latest">Latest</span> : null}
              </span>
              <span className="awards-tray-title">{tile.title}</span>
              <span className="awards-tray-text">{tile.body}</span>
            </span>
            <span className="awards-tray-arrow" aria-hidden="true">
              →
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
