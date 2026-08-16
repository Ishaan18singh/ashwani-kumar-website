'use client';

import { useEffect, useState } from 'react';
import { useI18n } from '@/lib/i18n/context';
import { getSupabaseClient } from '@/lib/supabase';

function PubImage({ item }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return <div className="pub-fallback">{item.publication}</div>;
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={item.image} alt={item.title} loading="lazy" onError={() => setFailed(true)} />;
}

export default function PublicationsList({ fallback }) {
  const { t } = useI18n();
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
        <article key={x.url || x.title} className="pub-card reveal">
          <span className="pub-card-img-wrap">
            <PubImage item={x} />
          </span>
          <div className="pub-card-body">
            <p className="pub-card-meta">
              {x.date} · {x.language || 'English'}
            </p>
            <h3 className="pub-card-title">{x.title}</h3>
            <p className="pub-card-source">{x.publication}</p>
            <a href={x.url} target="_blank" rel="noopener noreferrer" className="button-primary mt-6">
              {t('publications.readFull')} <span aria-hidden="true">→</span>
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}
