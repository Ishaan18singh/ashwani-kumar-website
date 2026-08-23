'use client';

import { useI18n } from '@/lib/i18n/context';
import { SITE_DATA } from '@/lib/data';
import SocialIcon from '@/components/SocialIcon';

export default function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="footer-black py-14 text-white">
      <div className="shell flex flex-col items-center gap-6 text-center">
        {(() => {
          const mail = SITE_DATA.profile.social.find((s) => s.url.startsWith('mailto:'));
          return mail ? (
            <a href={mail.url} className="footer-email-link">
              {mail.url.replace('mailto:', '')}
            </a>
          ) : null;
        })()}
        <div className="footer-social-list">
          {SITE_DATA.profile.social.map((s) => {
            const isMail = s.url.startsWith('mailto:');
            return (
              <a
                key={s.label}
                href={s.url}
                target={isMail ? undefined : '_blank'}
                rel={isMail ? undefined : 'noopener noreferrer'}
                aria-label={isMail ? s.label : `${s.label} (opens in new tab)`}
                title={s.label}
                className="footer-social-link"
              >
                <SocialIcon label={s.label} />
              </a>
            );
          })}
        </div>
      </div>
      <div className="shell footer-black-rule mt-12 pt-6 text-center text-xs">
        © <span>{year}</span> Ashwani Kumar. {t('common.allRightsReserved')}
      </div>
    </footer>
  );
}
