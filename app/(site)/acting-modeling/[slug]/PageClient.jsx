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
    <section className="film-detail-cinematic">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="film-detail-poster" src={film.image} alt="" />
      <div className="film-detail-body">
        <h1 className="film-detail-title">{film.title}</h1>
        <p className="film-detail-about">{film.about}</p>
        <span className="film-detail-badge">
          <span className="film-detail-badge-dot" aria-hidden="true" />
          Free on {film.platform}
        </span>
        <p className="film-detail-byline">
          A {film.productionHouse} production · Written &amp; Directed by {film.director}
        </p>
        <div className="film-detail-actions">
          <a className="film-detail-watch" href={film.watchUrl} target="_blank" rel="noopener noreferrer">
            <span aria-hidden="true">▶</span> Watch Now — Free on {film.platform}
          </a>
          <a className="film-detail-trailer" href={film.watchUrl} target="_blank" rel="noopener noreferrer">
            Watch Trailer
          </a>
        </div>
      </div>
      {film.press?.length > 0 && (
        <div className="film-detail-press">
          <p className="eyebrow">Press &amp; Reactions</p>
          <h2 className="section-title">In the News</h2>
          <ul className="film-detail-press-list">
            {film.press.map((item, i) => (
              <li key={`${item.url}-${i}`}>
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  <span className="film-detail-press-source">{item.source}</span>
                  <span className="film-detail-press-title">
                    {item.title} <span aria-hidden="true">↗</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="film-detail-body">
        <Link href="/acting-modeling" prefetch={false} className="film-detail-back">
          ← {t('actingModeling.title')}
        </Link>
      </div>
    </section>
  );
}
