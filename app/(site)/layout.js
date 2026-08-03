import { I18nProvider } from '@/lib/i18n/context';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RevealObserver from '@/components/RevealObserver';
import SmoothScroll from '@/components/SmoothScroll';
import SkipLink from '@/components/SkipLink';

// Chrome (header/footer/nav) for every public page. The /admin route sits
// outside this group and intentionally has none of this, matching the
// original standalone admin.html.
export default function SiteLayout({ children }) {
  return (
    <I18nProvider>
      <SkipLink />
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <RevealObserver />
      <SmoothScroll />
    </I18nProvider>
  );
}
