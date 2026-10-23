'use client';

import { useEffect, useState } from 'react';
import { useI18n } from '@/lib/i18n/context';
import { formatArticleDate } from '@/lib/i18n/formatDate';
import { getSupabaseClient } from '@/lib/supabase';
import Reveal from '@/components/Reveal';

// The Supabase "publications" table has no language column, so the
// language shown is derived from the publication name for outlets that
// publish in a language other than English (rather than always falling
// back to "English").
const NON_ENGLISH_PUBLICATIONS = { 'Dainik Bhaskar': 'lang.hindi' };

function PubImage({ item }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return <div className="pub-fallback">{item.publication}</div>;
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={item.image} alt={item.title} loading="lazy" onError={() => setFailed(true)} />;
}

export default function PublicationsList({ fallback }) {
  const { t, lang } = useI18n();
  const [publications, setPublications] = useState(fallback);

  useEffect(() => {
    const sb = getSupabaseClient();
    if (!sb) return;
    sb.from('publications')
      .select('*')
      .order('sort_order', { ascending: true })
      .then(({ data, error }) => {
        if (error || !data || !data.length) return;
        setPublications(data);
      });
  }, []);

  if (!publications || !publications.length) return null;

  return (
    <div className="pub-card-grid">
      {publications.map((x) => (
        <Reveal as="article" key={x.url || x.title} className="pub-card">
          <span className="pub-card-img-wrap">
            <PubImage item={x} />
          </span>
          <div className="pub-card-body">
            <p className="pub-card-meta">
              {formatArticleDate(x.iso, lang, x.date)} ·{' '}
              {t(x.language === 'Hindi' ? 'lang.hindi' : NON_ENGLISH_PUBLICATIONS[x.publication] || 'lang.english')}
            </p>
            <p className="pub-card-source">{x.publication}</p>
            <a href={x.url} target="_blank" rel="noopener noreferrer" className="button-primary">
              {t('publications.readFull')} <span aria-hidden="true">→</span>
            </a>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
