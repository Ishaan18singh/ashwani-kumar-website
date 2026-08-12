'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useRef, useState } from 'react';
import { useI18n } from '@/lib/i18n/context';
import { FILMS } from '@/lib/films';
import SocialIcon from '@/components/SocialIcon';

export default function FilmDetailPage() {
  const { slug } = useParams();
  const { t } = useI18n();
  const trailerDialogRef = useRef(null);
  const shareDialogRef = useRef(null);
  const [trailerPlaying, setTrailerPlaying] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [showEmbed, setShowEmbed] = useState(false);
  const [embedCopied, setEmbedCopied] = useState(false);

  const film = FILMS.find((f) => f.slug === slug);

  const openTrailer = () => {
    setTrailerPlaying(true);
    trailerDialogRef.current?.showModal();
  };
  const closeTrailer = () => {
    trailerDialogRef.current?.close();
    setTrailerPlaying(false);
  };

  const openShare = () => shareDialogRef.current?.showModal();
  const closeShare = () => shareDialogRef.current?.close();
  const copyShareLink = async () => {
    try {
      await navigator.clipboard.writeText(film.watchUrl);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    } catch {
      // clipboard unavailable
    }
  };
  const shareToInstagram = async () => {
    // Instagram has no web share-intent URL for arbitrary links, so the
    // standard workaround is to copy the link and let people paste it
    // into a story or DM once Instagram opens.
    try {
      await navigator.clipboard.writeText(film.watchUrl);
    } catch {
      // clipboard unavailable
    }
    window.open('https://www.instagram.com/', '_blank', 'noopener,noreferrer');
  };
  const embedCode = film?.trailerYoutubeId
    ? `<iframe width="560" height="315" src="https://www.youtube.com/embed/${film.trailerYoutubeId}" title="${film.title} — Trailer" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
    : '';
  const copyEmbedCode = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      setEmbedCopied(true);
      setTimeout(() => setEmbedCopied(false), 2000);
    } catch {
      // clipboard unavailable
    }
  };

  if (!film) {
    return (
      <section className="pt-40 pb-20 sm:pt-48">
        <div className="shell max-w-4xl">
          <p className="eyebrow">{t('project.notFound')}</p>
          <h1 className="text-4xl font-semibold sm:text-5xl">{t('project.notFoundTitle')}</h1>
          <p className="body-copy mt-4 max-w-2xl text-slate-600 dark:text-slate-300">{t('project.notFoundText')}</p>
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
          <button type="button" className="film-detail-trailer" onClick={openShare}>
            Share
          </button>
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
      <dialog
        ref={shareDialogRef}
        className="film-detail-share-dialog"
        onClick={(e) => {
          if (e.target === shareDialogRef.current) closeShare();
        }}
      >
        <div className="film-detail-share-header">
          <h3>Share</h3>
          <button type="button" onClick={closeShare} className="film-detail-share-close" aria-label="Close share">
            ×
          </button>
        </div>
        <div className="film-detail-share-row">
          <a
            className="film-detail-share-btn film-detail-share-btn--whatsapp"
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`Watch ${film.title} on ${film.platform}: ${film.watchUrl}`)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="film-detail-share-icon">
              <SocialIcon label="WhatsApp" />
            </span>
            <span>WhatsApp</span>
          </a>
          <button type="button" className="film-detail-share-btn film-detail-share-btn--instagram" onClick={shareToInstagram}>
            <span className="film-detail-share-icon">
              <SocialIcon label="Instagram" />
            </span>
            <span>Instagram</span>
          </button>
          <a
            className="film-detail-share-btn film-detail-share-btn--facebook"
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(film.watchUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="film-detail-share-icon">
              <SocialIcon label="Facebook" />
            </span>
            <span>Facebook</span>
          </a>
          <a
            className="film-detail-share-btn film-detail-share-btn--x"
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(film.watchUrl)}&text=${encodeURIComponent(`Watch ${film.title} on ${film.platform}`)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="film-detail-share-icon">
              <SocialIcon label="X" />
            </span>
            <span>X</span>
          </a>
          <a
            className="film-detail-share-btn film-detail-share-btn--linkedin"
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(film.watchUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="film-detail-share-icon">
              <SocialIcon label="LinkedIn" />
            </span>
            <span>LinkedIn</span>
          </a>
          <a
            className="film-detail-share-btn film-detail-share-btn--reddit"
            href={`https://www.reddit.com/submit?url=${encodeURIComponent(film.watchUrl)}&title=${encodeURIComponent(`${film.title} — Watch on ${film.platform}`)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="film-detail-share-icon">
              <SocialIcon label="Reddit" />
            </span>
            <span>Reddit</span>
          </a>
          <a
            className="film-detail-share-btn film-detail-share-btn--messages"
            href={`sms:?&body=${encodeURIComponent(`Watch ${film.title} on ${film.platform}: ${film.watchUrl}`)}`}
          >
            <span className="film-detail-share-icon">
              <SocialIcon label="Messages" />
            </span>
            <span>Messages</span>
          </a>
          <a
            className="film-detail-share-btn film-detail-share-btn--mail"
            href={`mailto:?subject=${encodeURIComponent(film.title)}&body=${encodeURIComponent(`Watch ${film.title} on ${film.platform}: ${film.watchUrl}`)}`}
          >
            <span className="film-detail-share-icon">
              <SocialIcon label="Mail" />
            </span>
            <span>Email</span>
          </a>
          {film.trailerYoutubeId && (
            <button
              type="button"
              className="film-detail-share-btn film-detail-share-btn--embed"
              onClick={() => setShowEmbed((v) => !v)}
            >
              <span className="film-detail-share-icon">
                <SocialIcon label="Embed" />
              </span>
              <span>Embed</span>
            </button>
          )}
        </div>
        {showEmbed ? (
          <div className="film-detail-share-linkrow film-detail-share-linkrow--embed">
            <textarea readOnly value={embedCode} onFocus={(e) => e.target.select()} />
            <button type="button" onClick={copyEmbedCode} className="film-detail-share-copy">
              {embedCopied ? 'Copied' : 'Copy'}
            </button>
          </div>
        ) : (
          <div className="film-detail-share-linkrow">
            <input type="text" readOnly value={film.watchUrl} onFocus={(e) => e.target.select()} />
            <button type="button" onClick={copyShareLink} className="film-detail-share-copy">
              {shareCopied ? 'Copied' : 'Copy'}
            </button>
          </div>
        )}
      </dialog>
    </section>
  );
}
