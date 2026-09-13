'use client';

import { useI18n } from '@/lib/i18n/context';
import Reveal from '@/components/Reveal';
import AwardsShowcase from '@/components/AwardsShowcase';

export default function AwardsPage() {
  const { t, data } = useI18n();

  // Anything not explicitly tagged 'honor' falls under Recognition, so a
  // newly added award can never silently disappear from the page.
  const honors = data.awards.filter((x) => x.category === 'honor');
  const recognition = data.awards.filter((x) => x.category !== 'honor');

  return (
    <>
      <section className="awards-hero">
        <div className="shell awards-hero-grid">
          <Reveal blur>
            <p className="eyebrow">
              <span aria-hidden="true" />
              {t('awards.eyebrow')}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-12 pt-4 sm:pb-24 sm:pt-6">
        <div className="shell">
          {honors.length ? (
            <>
              <Reveal>
                <AwardsShowcase items={honors} titleHtml={t('awards.titleHtml')} />
              </Reveal>
              <p className="awards-milestones-footer">
                <span aria-hidden="true" />
                {t('awards.milestonesFooter')}
              </p>
            </>
          ) : null}
          {recognition.length ? (
            <section className={honors.length ? 'mt-20' : undefined}>
              <h2 className="awards-group-heading">{t('awards.recognitionTitle')}</h2>
              <div className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {recognition.map((x) => (
                  <Reveal as="article" key={`grid-${x.year}-${x.title}`} className="card">
                    <span className="text-sm font-bold text-gold-500">{x.year}</span>
                    <h3 className="mt-2 text-2xl font-semibold text-navy-900 dark:text-white">{x.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{x.body}</p>
                  </Reveal>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </section>
    </>
  );
}
