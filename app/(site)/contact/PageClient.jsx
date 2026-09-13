'use client';

import { useI18n } from '@/lib/i18n/context';
import ContactForm from '@/components/ContactForm';
import Reveal from '@/components/Reveal';
import SocialIcon from '@/components/SocialIcon';
import { MailIcon, InstitutionIcon, MicIcon, PressIcon, IdeaIcon } from '@/components/ContactIcons';
import { SITE_DATA } from '@/lib/data';

const ENQUIRIES = [
  { icon: InstitutionIcon, titleKey: 'enquiryOfficialTitle', bodyKey: 'enquiryOfficialBody' },
  { icon: MicIcon, titleKey: 'enquirySpeakingTitle', bodyKey: 'enquirySpeakingBody' },
  { icon: PressIcon, titleKey: 'enquiryMediaTitle', bodyKey: 'enquiryMediaBody' },
  { icon: IdeaIcon, titleKey: 'enquiryIdeasTitle', bodyKey: 'enquiryIdeasBody' },
  { icon: MailIcon, titleKey: 'enquiryGeneralTitle', bodyKey: 'enquiryGeneralBody' },
];

const ELSEWHERE_LABELS = ['Instagram', 'LinkedIn', 'X', 'YouTube', 'Facebook'];

export default function ContactPage() {
  const { t } = useI18n();

  return (
    <>
      <section className="contact-hero">
        <div className="shell">
          <Reveal blur>
            <div className="contact-hero-eyebrow-row">
              <p className="eyebrow contact-hero-eyebrow">{t('contact.eyebrow')}</p>
              <span className="contact-hero-eyebrow-line" />
            </div>
            <div className="contact-hero-grid">
              <div>
                <h1 className="contact-hero-title">{t('contact.heroTitle')}</h1>
                <p className="contact-hero-subtitle">{t('contact.heroSubtitle')}</p>
                <p className="contact-hero-note">{t('contact.heroNote')}</p>
              </div>
              <div className="contact-hero-quote">
                <p className="contact-hero-quote-text">{t('contact.heroQuote')}</p>
                <span className="contact-hero-quote-rule" />
                <p className="contact-hero-quote-tags">{t('contact.heroTags')}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="shell grid gap-14 lg:grid-cols-2">
          <Reveal blur>
            <h2 className="contact-heading">{t('contact.getInTouchTitle')}</h2>
            <span className="contact-heading-rule" />

            <div className="contact-info-row mt-6">
              <span className="contact-icon-badge">
                <MailIcon />
              </span>
              <div>
                <p className="contact-info-label">{t('contact.emailLabel')}</p>
                <a href={`mailto:${SITE_DATA.profile.email}`} className="contact-info-value">
                  {SITE_DATA.profile.email}
                </a>
                <a href={`mailto:${SITE_DATA.profile.email}`} className="contact-text-link">
                  {t('contact.writeEmailLink')} <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>

            <hr className="contact-divider" />

            <h2 className="contact-heading">{t('contact.enquiriesTitle')}</h2>
            <span className="contact-heading-rule" />
            <ul className="contact-enquiry-list">
              {ENQUIRIES.map(({ icon: Icon, titleKey, bodyKey }) => (
                <li key={titleKey} className="contact-info-row">
                  <span className="contact-icon-badge">
                    <Icon />
                  </span>
                  <div>
                    <p className="contact-enquiry-title">{t(`contact.${titleKey}`)}</p>
                    <p className="contact-enquiry-body">{t(`contact.${bodyKey}`)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal blur transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}>
            <h2 className="contact-heading">{t('contact.sendMessageTitle')}</h2>
            <span className="contact-heading-rule" />
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <section className="contact-cta">
        <div className="shell grid gap-14 lg:grid-cols-2">
          <Reveal blur>
            <p className="contact-cta-title">{t('contact.ctaTitle')}</p>
            <span className="contact-heading-rule" />
            <p className="contact-cta-tags">{t('contact.ctaTags')}</p>
          </Reveal>
          <Reveal blur transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}>
            <h2 className="contact-heading">{t('contact.elsewhereTitle')}</h2>
            <span className="contact-heading-rule" />
            <div className="contact-elsewhere-icons">
              {ELSEWHERE_LABELS.map((label) => {
                const s = SITE_DATA.profile.social.find((x) => x.label === label);
                if (!s) return null;
                return (
                  <a
                    key={label}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${label} (opens in new tab)`}
                    title={label}
                    className="contact-elsewhere-link"
                  >
                    <SocialIcon label={label} />
                  </a>
                );
              })}
            </div>
            <a
              href={SITE_DATA.profile.linktree}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-text-link"
            >
              {t('contact.viewAllSocialLink')} <span aria-hidden="true">→</span>
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
