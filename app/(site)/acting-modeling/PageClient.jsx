'use client';

import { useRef, useState } from 'react';
import { useI18n } from '@/lib/i18n/context';
import PageHero from '@/components/PageHero';

const PORTRAITS = [
  { src: '/images/screen-style-01.webp', alt: 'Studio portrait of Ashwani Kumar in a cream knit polo' },
  { src: '/images/screen-style-02.webp', alt: 'Black and white studio portrait of Ashwani Kumar' }
];

const FILMS = [
  {
    title: 'Devyani',
    image: '/images/devyani-poster.jpg',
    year: 2026,
    genres: ['Drama', 'Suspense'],
    language: 'Hindi',
    duration: '20m',
    synopsis: "A father's fear for his unborn daughter transforms into hope through an extraordinary vision.",
    cast: ['Archana Gautam', 'Ashwani Kumar'],
    director: 'Ashish Panda',
    platform: 'ZEE5',
    watchUrl: 'https://www.zee5.com/movies/details/devyani/0-0-1z51017722'
  }
];

export default function ActingModelingPage() {
  const { t } = useI18n();
  const dialogRef = useRef(null);
  const [active, setActive] = useState(null);

  const open = (item) => {
    setActive(item);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();

  return (
    <>
      <PageHero
        eyebrow={t('actingModeling.eyebrow')}
        title={t('actingModeling.title')}
        subtitle={t('actingModeling.subtitle')}
        titleClassName="max-w-4xl text-5xl font-normal tracking-tight sm:text-7xl"
      />
      <section className="py-12 sm:py-24">
        <div className="shell grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {FILMS.map((film) => (
            <article key={film.title} className="film-card reveal">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="film-card-img" src={film.image} alt="" loading="lazy" />
              <div className="film-card-body">
                <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  <span>{film.year}</span>
                  <span aria-hidden="true">·</span>
                  <span>{film.genres.join(', ')}</span>
                  <span aria-hidden="true">·</span>
                  <span>{film.language}</span>
                  <span aria-hidden="true">·</span>
                  <span>{film.duration}</span>
                </div>
                <h2 className="mt-2 text-2xl font-semibold text-navy-900 dark:text-white">{film.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{film.synopsis}</p>
                <div className="mt-5">
                  <div className="flex gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <span className="font-semibold text-navy-900 dark:text-white">{t('actingModeling.cast')}:</span>
                    <span>{film.cast.join(', ')}</span>
                  </div>
                  <div className="mt-1 flex gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <span className="font-semibold text-navy-900 dark:text-white">{t('actingModeling.director')}:</span>
                    <span>{film.director}</span>
                  </div>
                </div>
                <a className="button-primary mt-6" href={film.watchUrl} target="_blank" rel="noopener noreferrer">
                  <span>{t('actingModeling.watchOn')}</span> <span aria-hidden="true">→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="border-t border-slate-200 py-12 dark:border-slate-800 sm:py-24">
        <div className="shell">
          <p className="eyebrow">{t('actingModeling.galleryEyebrow')}</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {PORTRAITS.map((item) => (
              <button
                key={item.src}
                type="button"
                onClick={() => open(item)}
                className="group reveal overflow-hidden rounded-2xl"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover object-center transition duration-500 group-hover:scale-105"
                />
              </button>
            ))}
          </div>
        </div>
      </section>
      <dialog
        ref={dialogRef}
        className="m-auto w-[min(94vw,1000px)] rounded-2xl bg-navy-950 p-3 text-white backdrop:bg-black/80"
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
      >
        <button
          type="button"
          onClick={close}
          className="absolute right-5 top-5 z-10 grid h-10 w-10 place-items-center rounded-full bg-black/60 text-xl"
          aria-label="Close image"
        >
          ×
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={active?.src} alt="" className="max-h-[82vh] w-full rounded-xl object-contain" />
        <p className="p-3 text-center text-sm text-slate-300">{active?.alt}</p>
      </dialog>
    </>
  );
}
