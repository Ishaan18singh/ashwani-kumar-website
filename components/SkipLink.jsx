'use client';

import { useI18n } from '@/lib/i18n/context';

export default function SkipLink() {
  const { t } = useI18n();
  return (
    <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:z-50 focus:bg-white focus:p-3">
      {t('common.skip')}
    </a>
  );
}
