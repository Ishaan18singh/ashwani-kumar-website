'use client';

import { useI18n } from '@/lib/i18n/context';
import PageHero from '@/components/PageHero';

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
    </>
  );
}
