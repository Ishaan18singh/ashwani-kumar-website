'use client';

import { useI18n } from '@/lib/i18n/context';
import PageHero from '@/components/PageHero';
import Html from '@/components/Html';
import ContactForm from '@/components/ContactForm';
import { SITE_DATA } from '@/lib/data';

export default function ContactPage() {
  const { t } = useI18n();

  return (
    <>
      <PageHero
        eyebrow={t('contact.eyebrow')}
        title={t('contact.title')}
        titleClassName="max-w-4xl text-5xl font-normal tracking-tight sm:text-7xl"
      />
      <section className="py-12 sm:py-24">
        <div className="shell grid gap-14 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="eyebrow">{t('contact.officeEyebrow')}</p>
            <h2 className="section-title">{t('contact.officeTitle')}</h2>
            <Html
              as="address"
              className="mt-7 not-italic leading-7 text-slate-600 dark:text-slate-300"
              html={t('contact.addressHtml')}
            />
            <div className="mt-8 space-y-3">
              <a href={`mailto:${SITE_DATA.profile.email}`} className="block font-semibold text-gold-500">
                {SITE_DATA.profile.email}
              </a>
              <a href={`tel:+913612510237`} className="block font-semibold text-gold-500">
                {SITE_DATA.profile.phone}
              </a>
            </div>
            <p className="mt-10 text-sm leading-6 text-slate-500 dark:text-slate-400">{t('contact.formalNote')}</p>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
