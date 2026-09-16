import fs from 'node:fs';
import path from 'node:path';
import { GeistSans } from 'geist/font/sans';
import { Playfair_Display } from 'next/font/google';
import './globals.css';

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap'
});

const SITE_URL = 'https://www.ashwanikumarias.com';
const DEFAULT_DESCRIPTION =
  'Official profile of Ashwani Kumar, IAS Officer, 2010 Batch and Director, DITEC, Government of Assam.';

// /images/* is served with a 1-year immutable Cache-Control header (see
// next.config.mjs), so CDNs and social-share crawlers (Facebook/WhatsApp)
// never re-fetch og-image.jpg by filename alone even after "Scrape Again" -
// appending the file's own mtime busts that cache automatically on every
// deploy where the photo actually changed.
const OG_IMAGE_VERSION = (() => {
  try {
    return Math.round(fs.statSync(path.join(process.cwd(), 'public/images/og-image.jpg')).mtimeMs);
  } catch {
    return 0;
  }
})();
const OG_IMAGE_URL = `/images/og-image.jpg?v=${OG_IMAGE_VERSION}`;

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
    images: [{ url: OG_IMAGE_URL, width: 1200, height: 630 }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ashwani Kumar, IAS | Digital Governance & Public Service',
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE_URL]
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

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${playfairDisplay.variable}`}>
      <head>
        {/* JSON-LD is exempt from CSP script-src (non-executable data block), so no nonce needed. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {/* Applies the saved color-theme choice before paint, so switching
            to the taupe theme doesn't flash the default palette first on
            reload. Reads the same localStorage key ThemeToggle writes. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(localStorage.getItem('colorTheme')==='taupe'){document.documentElement.setAttribute('data-theme','taupe')}}catch(e){}"
          }}
        />
      </head>
      <body className={GeistSans.className}>{children}</body>
    </html>
  );
}
