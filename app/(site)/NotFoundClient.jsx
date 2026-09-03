'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n/context';
import PageHero from '@/components/PageHero';

export default function NotFoundClient() {
  const { t } = useI18n();

  return (
    <>
      <PageHero
        eyebrow="404"
        title={t('common.notFoundTitle')}
        subtitle={t('common.notFoundText')}
        titleClassName="max-w-4xl text-display-m font-normal tracking-tight"
      />
      <section className="pb-20 sm:pb-24">
        <div className="shell">
          <Link href="/" className="button-primary inline-flex w-fit">
            {t('common.notFoundBack')}
          </Link>
        </div>
      </section>
    </>
  );
}
