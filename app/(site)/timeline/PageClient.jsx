'use client';

import { useI18n } from '@/lib/i18n/context';
import PageHero from '@/components/PageHero';
import TimelineList from '@/components/TimelineList';

export default function TimelinePage() {
  const { t, data } = useI18n();

  return (
    <>
      <PageHero
        eyebrow={t('timeline.eyebrow')}
        title={t('timeline.title')}
        subtitle={t('timeline.subtitle')}
        titleClassName="max-w-4xl text-4xl font-normal tracking-tight sm:text-5xl"
      />
      <section className="py-12 sm:py-24">
        <div className="shell">
          <TimelineList timeline={data.timeline} />
        </div>
      </section>
    </>
  );
}
