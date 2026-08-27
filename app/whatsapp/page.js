const DESTINATION = 'https://whatsapp.com/channel/0029VbDOAeI30LKQtRNd6L20';
const TITLE = 'Follow my WhatsApp channel — Ashwani Kumar | Updates';
const DESCRIPTION = 'Join the "Ashwani Kumar | Updates" channel on WhatsApp for updates from Ashwani Kumar, IAS.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/whatsapp' },
  robots: { index: false, follow: true },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: '/whatsapp',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION
  }
};

export default function WhatsAppRedirectPage() {
  return (
    <>
      <meta httpEquiv="refresh" content={`0;url=${DESTINATION}`} />
      <script
        dangerouslySetInnerHTML={{ __html: `window.location.replace(${JSON.stringify(DESTINATION)});` }}
      />
      <main
        style={{
          minHeight: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.25rem',
          padding: '2rem',
          textAlign: 'center',
          backgroundColor: '#06182d',
          color: '#fff'
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: '.75rem',
            fontWeight: 700,
            letterSpacing: '.2em',
            textTransform: 'uppercase',
            color: '#ddb65a'
          }}
        >
          Ashwani Kumar, IAS
        </p>
        <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 600, maxWidth: '28rem' }}>
          Taking you to the WhatsApp channel&hellip;
        </h1>
        <a
          href={DESTINATION}
          style={{
            marginTop: '.5rem',
            display: 'inline-flex',
            borderRadius: '9999px',
            backgroundColor: '#ddb65a',
            color: '#06182d',
            fontWeight: 600,
            fontSize: '.9rem',
            padding: '.75rem 1.75rem',
            textDecoration: 'none'
          }}
        >
          Open Ashwani Kumar | Updates
        </a>
      </main>
    </>
  );
}
