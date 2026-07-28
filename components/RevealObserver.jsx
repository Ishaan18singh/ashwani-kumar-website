'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Fades in any element with the `.reveal` class as it scrolls into view,
// mirroring the IntersectionObserver in the original js/main.js.
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const els = document.querySelectorAll('.reveal:not(.is-visible)');
    if (!els.length) return undefined;
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

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [pathname]);

  return null;
}
