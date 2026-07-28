import { headers } from 'next/headers';
import './globals.css';

const SITE_URL = 'https://www.ashwanikumarias.com';
const DEFAULT_DESCRIPTION =
  'Official profile of Ashwani Kumar, IAS Officer, 2010 Batch and Director, DITEC, Government of Assam.';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Ashwani Kumar, IAS | Digital Governance & Public Service',
    template: '%s | Ashwani Kumar, IAS'
  },
  description: DEFAULT_DESCRIPTION,
  alternates: { canonical: '/' },
  icons: { icon: '/images/favicon.png' },
  openGraph: {
    siteName: 'Ashwani Kumar, IAS',
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    title: 'Ashwani Kumar, IAS | Digital Governance & Public Service',
    description: DEFAULT_DESCRIPTION,
    images: [{ url: '/images/ashwani-kumar-hero.webp', width: 1200, height: 1200 }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ashwani Kumar, IAS | Digital Governance & Public Service',
    description: DEFAULT_DESCRIPTION,
    images: ['/images/ashwani-kumar-hero.webp']
  }
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Ashwani Kumar',
  alternateName: 'Ashwani Kumar IAS',
  jobTitle: 'Director, Directorate of Information Technology, Electronics and Communication (DITEC)',
  affiliation: { '@type': 'GovernmentOrganization', name: 'Government of Assam' },
  worksFor: {
    '@type': 'GovernmentOrganization',
    name: 'Directorate of Information Technology, Electronics and Communication (DITEC), Government of Assam'
  },
  url: SITE_URL,
  image: `${SITE_URL}/images/ashwani-kumar-hero.webp`,
  email: 'mailto:ashiascor@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Assam Secretariat, Behind I Block (Old CM Block)',
    addressLocality: 'Dispur, Guwahati',
    postalCode: '781006',
    addressCountry: 'IN'
  },
  sameAs: [
    'https://www.linkedin.com/in/ashwaniias/',
    'https://www.instagram.com/ashwaniias/',
    'https://x.com/ashwaniias2010',
    'https://www.facebook.com/AshwaniIAS',
    'https://www.youtube.com/results?search_query=IAS+Ashwani+Kumar'
  ]
};

// Runs before paint (server-injected inline script) so dark mode / color
// theme are applied without a flash — same technique as the original
// per-page inline <script> in the static site. Shared by every route,
// including /admin, which also respects the saved theme.
const themeInitScript = `(function(){var r=document.documentElement;if(localStorage.theme==='dark'||(!('theme' in localStorage)&&matchMedia('(prefers-color-scheme: dark)').matches))r.classList.add('dark');r.setAttribute('data-theme',localStorage.colorTheme||'classic')})()`;

export default function RootLayout({ children }) {
  const nonce = headers().get('x-nonce') || undefined;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* React SSR strips the rendered nonce attribute value (browsers hide it
            from the DOM after parsing, by design) which trips a harmless
            hydration-mismatch warning in dev; the nonce itself is still applied
            correctly for CSP enforcement. suppressHydrationWarning silences it. */}
        <script nonce={nonce} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {/* JSON-LD is exempt from CSP script-src (non-executable data block), so no nonce needed. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
