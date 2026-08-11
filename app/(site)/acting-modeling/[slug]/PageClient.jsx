'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useI18n } from '@/lib/i18n/context';
import { FILMS } from '@/lib/films';

export default function FilmDetailPage() {
  const { slug } = useParams();
  const { t } = useI18n();

  const film = FILMS.find((f) => f.slug === slug);

  if (!film) {
    return (
      <section className="pt-40 pb-20 sm:pt-48">
        <div className="shell max-w-4xl">
          <p className="eyebrow">{t('project.notFound')}</p>
          <h1 className="text-4xl font-semibold sm:text-5xl">{t('project.notFoundTitle')}</h1>
          <p className="mt-4 max-w-2xl leading-7 text-slate-600 dark:text-slate-300">{t('project.notFoundText')}</p>
          <Link href="/acting-modeling" prefetch={false} className="button-primary mt-8 inline-flex w-fit">
            {t('actingModeling.title')}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-40 pb-20 sm:pt-48">
      <div className="shell max-w-4xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="film-card-img rounded-2xl" src={film.image} alt="" />
        <p className="eyebrow mt-8">{t('actingModeling.eyebrow')}</p>
        <h1 className="max-w-3xl text-4xl font-semibold text-gold-500 sm:text-6xl">{film.title}</h1>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm font-bold uppercase tracking-[.15em] text-gold-500">
          <span>{film.year}</span>
          <span aria-hidden="true">·</span>
          <span>{film.genres.join(', ')}</span>
          <span aria-hidden="true">·</span>
          <span>{film.language}</span>
          <span aria-hidden="true">·</span>
          <span>{film.duration}</span>
        </div>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">{film.synopsis}</p>
        <div className="mt-6">
          <div className="flex gap-2 text-sm text-slate-600 dark:text-slate-300">
            <span className="font-semibold text-navy-900 dark:text-white">{t('actingModeling.cast')}:</span>
            <span>{film.cast.join(', ')}</span>
          </div>
          <div className="mt-1 flex gap-2 text-sm text-slate-600 dark:text-slate-300">
            <span className="font-semibold text-navy-900 dark:text-white">{t('actingModeling.director')}:</span>
            <span>{film.director}</span>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/acting-modeling" prefetch={false} className="button-ghost inline-flex w-fit">
            {t('actingModeling.title')}
          </Link>
          <a className="button-primary inline-flex w-fit" href={film.watchUrl} target="_blank" rel="noopener noreferrer">
            <span>{t('actingModeling.watchOn')}</span> <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
