import { MotionConfig } from 'framer-motion';
import { I18nProvider } from '@/lib/i18n/context';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';
import SkipLink from '@/components/SkipLink';
import PageTransition from '@/components/PageTransition';

// Chrome (header/footer/nav) for every public page. The /admin route sits
// outside this group and intentionally has none of this, matching the
// original standalone admin.html.
export default function SiteLayout({ children }) {
  return (
    <I18nProvider>
      {/* reducedMotion="user" makes every <Reveal>/motion.* element respect
          prefers-reduced-motion automatically, with no per-component check. */}
      <MotionConfig reducedMotion="user">
        <SkipLink />
        <Header />
        <main id="main">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <SmoothScroll />
      </MotionConfig>
    </I18nProvider>
  );
}
