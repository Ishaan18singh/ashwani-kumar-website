'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Fades in any element with the `.reveal` class as it scrolls into view,
// mirroring the IntersectionObserver in the original js/main.js.
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    // Fail-safe: content already sitting in the initial viewport (e.g. the
    // hero) shouldn't wait on an async observer callback to appear — reveal
    // it immediately so a slow/blocked observer never leaves it stuck at
    // opacity:0.
    const vh = window.innerHeight;
    document.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < vh && rect.bottom > 0) el.classList.add('is-visible');
    });

    const els = document.querySelectorAll('.reveal:not(.is-visible)');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));

    // Some content (e.g. Supabase-fetched publications) mounts after this
    // effect runs, so also watch for later-inserted .reveal elements —
    // otherwise they'd stay permanently at opacity:0.
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((m) =>
        m.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return;
          if (node.matches?.('.reveal')) observer.observe(node);
          node.querySelectorAll?.('.reveal').forEach((el) => observer.observe(el));
        })
      );
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    // Second fail-safe: whatever the cause, nothing should stay invisible
    // forever — force-reveal any stragglers a few seconds in.
    const safetyTimer = setTimeout(() => {
      document.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => el.classList.add('is-visible'));
    }, 4000);

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      clearTimeout(safetyTimer);
    };
  }, [pathname]);

  return null;
}
