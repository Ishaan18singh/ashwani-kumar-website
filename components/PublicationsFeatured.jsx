'use client';

import { useState } from 'react';
import { useI18n } from '@/lib/i18n/context';

// The Supabase "publications" table has no language column, so the
// language shown is derived from the publication name for outlets that
// publish in a language other than English (rather than always falling
// back to "English").
const NON_ENGLISH_PUBLICATIONS = { 'Dainik Bhaskar': 'Hindi' };

function langFor(item) {
  return item.language || NON_ENGLISH_PUBLICATIONS[item.publication] || 'English';
}

function PubImage({ item, className }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return <div className="pub-fallback">{item.publication}</div>;
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img className={className} src={item.image} alt={item.title} loading="lazy" onError={() => setFailed(true)} />;
}

export default function PublicationsFeatured({ items }) {
  const { t } = useI18n();

  return (
    <div className="pub-list">
      {items.map((x, i) => (
        <a key={x.url || x.title} href={x.url} target="_blank" rel="noopener noreferrer" className="pub-list-row">
          <span className="pub-list-number">{String(i + 1).padStart(2, '0')}</span>
          <span className="pub-list-content">
            <span className="pub-list-meta">
              {x.date.toUpperCase()} <span aria-hidden="true">|</span> {langFor(x).toUpperCase()} <span aria-hidden="true">|</span>{' '}
              {x.publication.toUpperCase()}
            </span>
            <span className="pub-list-title">{x.title}</span>
            {x.summary ? <span className="pub-list-desc">{x.summary}</span> : null}
            <span className="pub-list-link">
              {t('publications.readArticle')}
              <span className="pub-list-link-line" aria-hidden="true" />
              <span aria-hidden="true">→</span>
            </span>
          </span>
          <span className="pub-list-thumb">
            <PubImage item={x} className="pub-list-thumb-img" />
          </span>
        </a>
      ))}
    </div>
  );
}
