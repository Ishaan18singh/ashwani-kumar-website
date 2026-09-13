'use client';

import { useI18n } from '@/lib/i18n/context';
import PageHero from '@/components/PageHero';
import ContactForm from '@/components/ContactForm';
import Reveal from '@/components/Reveal';
import SocialIcon from '@/components/SocialIcon';
import { SITE_DATA } from '@/lib/data';

export default function ContactPage() {
  const { t } = useI18n();

  return (
    <>
      <PageHero
        eyebrow={t('contact.eyebrow')}
        title={t('contact.title')}
        titleClassName="max-w-4xl text-display-m font-normal tracking-tight"
      />
      <section className="pb-12 pt-6 sm:pb-24 sm:pt-10">
        <div className="shell flex flex-col gap-10">
          <Reveal blur>
            <ContactForm />
          </Reveal>
          <Reveal blur transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}>
            <div className="contact-social-list">
              {SITE_DATA.profile.social
                .filter((s) => !s.url.startsWith('mailto:'))
                .map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${s.label} (opens in new tab)`}
                    title={s.label}
                    className="contact-social-link"
                  >
                    <SocialIcon label={s.label} />
                  </a>
                ))}
            </div>
            <div className="mt-6 space-y-3">
              <a href={`mailto:${SITE_DATA.profile.email}`} className="block font-semibold text-gold-500">
                {SITE_DATA.profile.email}
              </a>
              <a href={`tel:+913612510237`} className="block font-semibold text-gold-500">
                {SITE_DATA.profile.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
