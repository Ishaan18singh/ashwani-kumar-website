'use client';

import { useState } from 'react';

export default function TimelineList({ timeline }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="relative mx-auto max-w-4xl space-y-7 before:absolute before:bottom-5 before:left-[7px] before:top-5 before:w-px before:bg-gold-400/50">
      {timeline.map((x, i) => {
        const open = openIndex === i;
        return (
          <article key={`${x.role}-${x.period}`} className="reveal relative pl-10">
            <span className="absolute left-0 top-2 h-4 w-4 rounded-full border-4 border-ivory bg-gold-400 ring-1 ring-gold-400 dark:border-slate-950" />
            <button
              type="button"
              className="card w-full text-left"
              aria-expanded={open}
              aria-controls={`timeline-${i}`}
              onClick={() => setOpenIndex(open ? -1 : i)}
            >
              <span className="flex items-start justify-between gap-5">
                <span>
                  <span className="text-xs font-bold uppercase tracking-[.15em] text-gold-500">
                    {x.period} · {x.type}
                  </span>
                  <strong className="mt-2 block font-display text-2xl text-navy-900 dark:text-white">{x.role}</strong>
                  <span className="mt-1 block text-sm text-slate-500 dark:text-slate-400">{x.org}</span>
                </span>
                <span className="text-2xl text-gold-500">{open ? '−' : '+'}</span>
              </span>
              <span
                id={`timeline-${i}`}
                hidden={!open}
                className="mt-4 block border-t border-slate-100 pt-4 text-sm leading-6 text-slate-600 dark:border-slate-800 dark:text-slate-300"
              >
                {x.detail}
              </span>
            </button>
          </article>
        );
      })}
    </div>
  );
}
