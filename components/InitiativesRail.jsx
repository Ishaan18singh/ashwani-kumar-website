'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useI18n } from '@/lib/i18n/context';
import { slugify, cardImage } from '@/lib/utils';

/**
 * Auto-scrolling, drag-to-browse rail of project cards.
 * `mode="marquee"` is the compact home-page strip (no summary text).
 * `mode="carousel"` is the fuller version used on the Projects page.
 * Ported from the vanilla drag/autoplay logic in the old js/render.js.
 */
export default function InitiativesRail({ projects, mode = 'marquee' }) {
  const { t } = useI18n();
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return undefined;

    const cleanups = [];
    const distance = track.scrollWidth - container.clientWidth;

    const stopAutoplay = () => {
      track.classList.remove('autoplay');
      const computed = getComputedStyle(track).transform;
      let offset = 0;
      if (computed && computed !== 'none') {
        const m = new DOMMatrixReadOnly(computed);
        offset = -m.m41;
      }
      if (offset > 0) container.scrollLeft = offset;
      track.style.animation = 'none';
      track.style.transform = 'none';
    };

    if (distance > 0 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const duration =
        mode === 'carousel' ? Math.min(Math.max(distance / 45, 5), 12) : Math.min(Math.max(distance / 40, 8), 18);
      const distanceVar = mode === 'carousel' ? '--cp-distance' : '--ip-distance';
      const durationVar = mode === 'carousel' ? '--cp-duration' : '--ip-duration';
      track.style.setProperty(distanceVar, `-${distance}px`);
      track.style.setProperty(durationVar, `${duration}s`);
      const raf = requestAnimationFrame(() => track.classList.add('autoplay'));
      track.addEventListener('animationend', stopAutoplay, { once: true });
      ['pointerdown', 'wheel', 'touchstart'].forEach((evt) =>
        container.addEventListener(evt, stopAutoplay, { passive: true, once: true })
      );
      cleanups.push(() => cancelAnimationFrame(raf));
      cleanups.push(() => track.removeEventListener('animationend', stopAutoplay));
    }

    let dragging = false;
    let startX = 0;
    let startScroll = 0;
    let moved = false;
    let pointerId = null;

    const onPointerDown = (e) => {
      if (e.pointerType === 'touch') return;
      dragging = true;
      moved = false;
      pointerId = e.pointerId;
      startX = e.clientX;
      startScroll = container.scrollLeft;
    };
    const onPointerMove = (e) => {
      if (!dragging) return;
      const delta = e.clientX - startX;
      if (!moved && Math.abs(delta) > 6) {
        moved = true;
        container.classList.add('dragging');
        container.setPointerCapture(pointerId);
      }
      if (moved) container.scrollLeft = startScroll - delta;
    };
    const onPointerEnd = () => {
      dragging = false;
      container.classList.remove('dragging');
    };
    const onClickCapture = (e) => {
      if (moved) {
        e.preventDefault();
        moved = false;
      }
    };

    container.addEventListener('pointerdown', onPointerDown);
    container.addEventListener('pointermove', onPointerMove);
    ['pointerup', 'pointerleave', 'pointercancel'].forEach((evt) => container.addEventListener(evt, onPointerEnd));
    container.addEventListener('click', onClickCapture, true);

    return () => {
      cleanups.forEach((fn) => fn());
      container.removeEventListener('pointerdown', onPointerDown);
      container.removeEventListener('pointermove', onPointerMove);
      ['pointerup', 'pointerleave', 'pointercancel'].forEach((evt) => container.removeEventListener(evt, onPointerEnd));
      container.removeEventListener('click', onClickCapture, true);
    };
  }, [projects, mode]);

  const outerClass = mode === 'carousel' ? 'projects-carousel' : 'initiatives-marquee';
  const trackClass = mode === 'carousel' ? 'projects-carousel-track' : 'initiatives-track';
  const cardClass = mode === 'carousel' ? 'initiative-card carousel-card' : 'initiative-card';

  return (
    <div id="projects-grid" className="mt-12">
      <div
        ref={containerRef}
        className={`${outerClass} reveal`}
        tabIndex={0}
        role="region"
        aria-label={mode === 'carousel' ? 'Key projects and initiatives — scroll or drag to browse' : 'Selected initiatives — scroll or drag to browse'}
      >
        <div ref={trackRef} className={trackClass}>
          {projects.map((x, i) => (
            <Link key={x.title} href={`/projects/${slugify(x.title)}`} prefetch={false} className={cardClass} aria-label={`${x.title} — read more`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="initiative-card-img" src={`/images/${cardImage(i)}.webp`} alt="" loading="lazy" />
              <span className="corner corner-tl" aria-hidden="true" />
              <span className="corner corner-br" aria-hidden="true" />
              <span className="initiative-content">
                <span className="initiative-eyebrow">{t('project.initiative')}</span>
                <span className="initiative-title">
                  {x.title}
                  <span className="initiative-arrow" aria-hidden="true">→</span>
                </span>
                {mode === 'carousel' ? <span className="initiative-summary">{x.summary}</span> : null}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
