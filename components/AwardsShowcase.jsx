'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';

// Mockup settings: Auto play on, every 3 s.
const AUTOPLAY_MS = 3000;
const DESCRIPTION_MS = 350;
// Let the descriptions finish opening/closing before the list glides, so the
// two motions read as one sequence instead of competing.
const ALIGN_DELAY_MS = DESCRIPTION_MS + 100;

export default function AwardsShowcase({ heading, items }) {
  const count = items.length;
  const headingId = useId();
  const rootRef = useRef(null);
  const listRef = useRef(null);
  const itemRefs = useRef([]);
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const inView = useInView(rootRef, { amount: 0.4 });
  const reduceMotion = useReducedMotion();

  const current = Math.min(active, count - 1);
  const go = useCallback((i) => setActive(((i % count) + count) % count), [count]);

  useEffect(() => {
    if (reduceMotion || hovered || focused || !inView || count < 2) return undefined;
    const id = setTimeout(() => go(current + 1), AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [current, count, go, hovered, focused, inView, reduceMotion]);

  const align = useCallback(
    (behavior) => {
      const list = listRef.current;
      const els = itemRefs.current.slice(0, count);
      if (!list || !els.length || els.some((el) => !el)) return;
      const style = getComputedStyle(list);
      const pad = parseFloat(style.paddingTop);
      // The bottom padding doubles as the fade-out zone; keep the active caption above it.
      const view = list.clientHeight - parseFloat(style.paddingBottom);
      const gap = els.length > 1 ? parseFloat(getComputedStyle(els[1]).marginTop) : 0;
      // Measure the layout the list is heading towards (only the active
      // description open), not the one on screen, so a description that is
      // still mid-animation can't skew where the list stops.
      const heights = els.map((el, i) => {
        const body = i === current ? el.querySelector('.awards-showcase-body p') : null;
        return el.firstElementChild.offsetHeight + (body ? body.offsetHeight : 0);
      });
      const starts = heights.map((_, i) => heights.slice(0, i).reduce((sum, h) => sum + h + gap, 0));
      const top = starts[current];
      const bottom = pad + top + heights[current];
      let target = list.scrollTop;
      if (top < target) {
        target = top;
      } else if (bottom > target + view) {
        // Advance by whole captions so the top edge never cuts one in half.
        target = starts.find((s) => bottom <= s + view) ?? top;
      }
      // Scroll the list itself: scrollIntoView would also drag the whole
      // page to this section on every autoplay tick.
      list.scrollTo({ top: target, behavior });
    },
    [current, count]
  );

  useEffect(() => {
    const id = setTimeout(() => align(reduceMotion ? 'auto' : 'smooth'), ALIGN_DELAY_MS);
    const onResize = () => align('auto');
    window.addEventListener('resize', onResize);
    return () => {
      clearTimeout(id);
      window.removeEventListener('resize', onResize);
    };
  }, [align, reduceMotion]);

  if (!count) return null;

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
      <h2 id={headingId} className="awards-group-heading">
        {heading}
      </h2>

      <div className="awards-showcase-media">
        <div className="awards-showcase-frame">
          {items.map((item, i) => (
            <div
              key={`${item.year}-${item.title}`}
              className={`awards-showcase-slide${i === current ? ' is-active' : ''}`}
              aria-hidden={i !== current}
            >
              {item.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.image} alt={i === current ? item.title : ''} loading="lazy" decoding="async" />
              ) : (
                <div className="awards-showcase-fallback">{item.year}</div>
              )}
            </div>
          ))}
        </div>
        <div className="awards-showcase-controls">
          <div className="awards-showcase-dots" aria-hidden="true">
            {items.map((item, i) => (
              <button
                key={`${item.year}-${item.title}`}
                type="button"
                tabIndex={-1}
                className={`awards-showcase-dot${i === current ? ' is-active' : ''}`}
                onClick={() => go(i)}
              />
            ))}
          </div>
          <div className="awards-showcase-arrows">
            <button type="button" className="awards-showcase-arrow" aria-label="Previous award" onClick={() => go(current - 1)}>
              <span aria-hidden="true">←</span>
            </button>
            <button type="button" className="awards-showcase-arrow" aria-label="Next award" onClick={() => go(current + 1)}>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>

      <div className="awards-showcase-list-wrap">
        <ul ref={listRef} className="awards-showcase-list">
          {items.map((item, i) => {
            const isActive = i === current;
            return (
              <li
                key={`${item.year}-${item.title}`}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                className={`awards-showcase-item${isActive ? ' is-active' : ''}`}
              >
                <button
                  type="button"
                  className="awards-showcase-caption"
                  aria-current={isActive ? 'true' : undefined}
                  onClick={() => go(i)}
                >
                  <span className="awards-showcase-year">{item.year}</span>
                  <span className="awards-showcase-title">{item.title}</span>
                </button>
                <AnimatePresence initial={false}>
                  {isActive && item.body ? (
                    <motion.div
                      key="body"
                      className="awards-showcase-body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: DESCRIPTION_MS / 1000, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <p>{item.body}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
