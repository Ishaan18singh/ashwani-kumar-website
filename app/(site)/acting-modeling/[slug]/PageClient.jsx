'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useRef, useState } from 'react';
import { useI18n } from '@/lib/i18n/context';
import { FILMS } from '@/lib/films';

export default function FilmDetailPage() {
  const { slug } = useParams();
  const { t } = useI18n();
  const trailerDialogRef = useRef(null);
  const [trailerPlaying, setTrailerPlaying] = useState(false);

  const film = FILMS.find((f) => f.slug === slug);

  const openTrailer = () => {
    setTrailerPlaying(true);
    trailerDialogRef.current?.showModal();
  };
  const closeTrailer = () => {
    trailerDialogRef.current?.close();
    setTrailerPlaying(false);
  };

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
      <div className="film-detail-poster-wrap">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="film-detail-poster" src={film.image} alt="" />
      </div>
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
          {film.trailerYoutubeId && (
            <button type="button" className="film-detail-trailer" onClick={openTrailer}>
              Watch Trailer
            </button>
          )}
        </div>
      </div>
      {film.press?.length > 0 && (
        <div className="film-detail-press">
          <p className="eyebrow">Press &amp; Reactions</p>
          <h2 className="section-title">In the News</h2>
          <div className="film-detail-press-grid">
            {film.press.map((item, i) => {
              let domain = item.source;
              try {
                domain = new URL(item.url).hostname.replace(/^www\./, '');
              } catch {
                // keep source as fallback
              }
              return (
                <a key={`${item.url}-${i}`} href={item.url} target="_blank" rel="noopener noreferrer" className="film-detail-press-card">
                  <span className="film-detail-press-domain">{domain}</span>
                  <span className="film-detail-press-source">{item.source}</span>
                  <span className="film-detail-press-title">{item.title}</span>
                  <span className="film-detail-press-link">
                    Read more <span aria-hidden="true">↗</span>
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      )}
      <div className="film-detail-body">
        <Link href="/acting-modeling" prefetch={false} className="film-detail-back">
          ← {t('actingModeling.title')}
        </Link>
      </div>
      {film.trailerYoutubeId && (
        <dialog
          ref={trailerDialogRef}
          className="film-detail-trailer-dialog"
          onClick={(e) => {
            if (e.target === trailerDialogRef.current) closeTrailer();
          }}
          onClose={() => setTrailerPlaying(false)}
        >
          <button type="button" onClick={closeTrailer} className="film-detail-trailer-close" aria-label="Close trailer">
            ×
          </button>
          <div className="film-detail-trailer-frame">
            {trailerPlaying && (
              <iframe
                src={`https://www.youtube.com/embed/${film.trailerYoutubeId}?autoplay=1`}
                title={`${film.title} — Trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </dialog>
      )}
    </section>
  );
}
