'use client';

import { useState } from 'react';
import { useI18n } from '@/lib/i18n/context';
import { formatArticleDate } from '@/lib/i18n/formatDate';

// The Supabase "publications" table has no language column, so the
// language shown is derived from the publication name for outlets that
// publish in a language other than English (rather than always falling
// back to "English"). The values are string keys so the label itself
// renders in the reader's language.
const NON_ENGLISH_PUBLICATIONS = { 'Dainik Bhaskar': 'lang.hindi' };

function langKeyFor(item) {
  if (item.language === 'Hindi') return 'lang.hindi';
  // A language we have no key for falls through and prints as stored.
  if (item.language && item.language !== 'English') return null;
  return NON_ENGLISH_PUBLICATIONS[item.publication] || 'lang.english';
}

function PubImage({ item, className }) {
  const [failed, setFailed] = useState(false);
  // No image at all falls back too, otherwise src={undefined} leaves an
  // empty box with no error event to catch.
  if (failed || !item.image) {
    return <div className="pub-fallback">{item.publication}</div>;
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img className={className} src={item.image} alt={item.title} loading="lazy" onError={() => setFailed(true)} />;
}

export default function PublicationsFeatured({ items }) {
  const { t, lang } = useI18n();

  return (
    <div className="pub-list">
      {items.map((x, i) => {
        const langKey = langKeyFor(x);
        return (
          <a key={x.url || x.title} href={x.url} target="_blank" rel="noopener noreferrer" className="pub-list-row">
            <span className="pub-list-number">{String(i + 1).padStart(2, '0')}</span>
            <span className="pub-list-thumb">
              <PubImage item={x} className="pub-list-thumb-img" />
            </span>
            <span className="pub-list-content">
              <span className="pub-list-meta">
                {formatArticleDate(x.iso, lang, x.date).toUpperCase()} <span aria-hidden="true">|</span>{' '}
                {(langKey ? t(langKey) : x.language).toUpperCase()} <span aria-hidden="true">|</span>{' '}
                {x.publication.toUpperCase()}
              </span>
              <span className="pub-list-title">{x.title}</span>
              <span className="pub-list-link">
                {t('publications.readArticle')}
                <span className="pub-list-link-line" aria-hidden="true" />
                <span aria-hidden="true">→</span>
              </span>
            </span>
          </a>
        );
      })}
    </div>
  );
}
