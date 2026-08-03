'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useI18n } from '@/lib/i18n/context';
import { NAV_PAGES } from '@/lib/nav';
import { SITE_DATA } from '@/lib/data';
import SocialIcon from '@/components/SocialIcon';

export default function Footer() {
  const pathname = usePathname();
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ivory border-t border-slate-200 py-14 text-navy-900">
      <div className="shell grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="font-display text-3xl">Ashwani Kumar</p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-slate-600">{t('common.footerTagline')}</p>
        </div>
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[.2em] text-gold-500">{t('common.navigate')}</p>
          <div className="grid grid-cols-2 gap-3 text-sm text-slate-600">
            {NAV_PAGES.map(([href, key]) => (
              <Link key={href} href={href} prefetch={false} className={`nav-link${pathname === href ? ' active' : ''}`}>
                {t(key)}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[.2em] text-gold-500">{t('common.connect')}</p>
          <div className="flex flex-wrap gap-3">
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
      </div>
      <div className="shell mt-12 border-t border-slate-200 pt-6 text-xs text-slate-600">
        © <span>{year}</span> Ashwani Kumar. {t('common.allRightsReserved')}
      </div>
    </footer>
  );
}
