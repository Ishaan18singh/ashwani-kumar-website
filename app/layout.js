import { Jost, Atkinson_Hyperlegible, Inter } from 'next/font/google';
import './globals.css';

const jost = Jost({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jost',
  display: 'swap'
});
const atkinson = Atkinson_Hyperlegible({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-atkinson',
  display: 'swap'
});
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap'
});

const SITE_URL = 'https://ashwani-kumar-website.vercel.app';
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
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630 }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ashwani Kumar, IAS | Digital Governance & Public Service',
    description: DEFAULT_DESCRIPTION,
    images: ['/images/og-image.jpg']
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
    <html lang="en" className={`${jost.variable} ${atkinson.variable} ${inter.variable}`}>
      <head>
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
