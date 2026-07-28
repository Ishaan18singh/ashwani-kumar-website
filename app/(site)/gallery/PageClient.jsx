'use client';

import { useI18n } from '@/lib/i18n/context';
import PageHero from '@/components/PageHero';
import GalleryGrid from '@/components/GalleryGrid';

export default function GalleryPage() {
  const { t } = useI18n();

  return (
    <>
      <PageHero eyebrow={t('gallery.eyebrow')} title={t('gallery.title')} subtitle={t('gallery.subtitle')} />
      <GalleryGrid />
    </>
  );
}
