'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n/context';
import PageHero from '@/components/PageHero';
import GalleryGrid from '@/components/GalleryGrid';
import Reveal from '@/components/Reveal';
import { FILMS } from '@/lib/films';

export default function ActingModelingPage() {
  const { t } = useI18n();

  return (
    <>
      <PageHero
        eyebrow={t('actingModeling.eyebrow')}
        title={t('actingModeling.title')}
        subtitle={t('actingModeling.subtitle')}
        titleClassName="max-w-4xl text-display-m font-normal tracking-tight"
      />
      <section className="py-12 sm:py-24">
        <div className="shell grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {FILMS.map((film) => (
            <Reveal as="article" key={film.title} className="film-card">
              <Link href={`/acting-modeling/${film.slug}`} prefetch={false} aria-label={`${t('project.learnMore')}: ${film.title}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="film-card-img" src={film.image} alt="" loading="lazy" />
              </Link>
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
                <h2 className="mt-2 text-2xl font-semibold text-gold-500">
                  <Link href={`/acting-modeling/${film.slug}`} prefetch={false}>
                    {film.title}
                  </Link>
                </h2>
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
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href={`/acting-modeling/${film.slug}`} prefetch={false} className="button-primary">
                    {t('project.learnMore')} <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="border-t border-slate-200 dark:border-slate-800">
        <div className="shell pt-12 sm:pt-24">
          <h2 className="section-title">{t('actingModeling.galleryEyebrow')}</h2>
        </div>
        <GalleryGrid />
      </section>
    </>
  );
}
