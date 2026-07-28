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
  const [featured, ...rest] = publications;

  return (
    <>
      <a href={featured.url} target="_blank" rel="noopener noreferrer" className="pub-featured reveal group">
        <span className="pub-featured-img-wrap">
          <PubImage item={featured} />
        </span>
        <span>
          <span className="pub-kicker">
            {featured.publication} · {featured.date}
          </span>
          <span className="pub-headline block group-hover:underline">{featured.title}</span>
          <span className="pub-dateline">{t('publications.readFull')}</span>
        </span>
      </a>
      {rest.length ? (
        <div className="pub-grid">
          {rest.map((x) => (
            <a key={x.title} href={x.url} target="_blank" rel="noopener noreferrer" className="pub-grid-item reveal group block">
              <span className="pub-grid-img-wrap block">
                <PubImage item={x} />
              </span>
              <span className="pub-kicker">
                {x.publication} · {x.date}
              </span>
              <span className="pub-headline block group-hover:underline">{x.title}</span>
            </a>
          ))}
        </div>
      ) : null}
    </>
  );
}
