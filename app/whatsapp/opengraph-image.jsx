import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Follow Ashwani Kumar on WhatsApp';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px 96px',
          backgroundColor: '#06182d',
          backgroundImage: 'linear-gradient(135deg, #06182d 0%, #0d2534 60%, #06182d 100%)',
          fontFamily: 'sans-serif'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 44 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 64,
              height: 64,
              borderRadius: 9999,
              backgroundColor: '#25D366'
            }}
          >
            <svg width="34" height="34" viewBox="0 0 24 24" fill="white">
              <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.7.8-.8.9-.1.2-.3.2-.5.1-.2-.1-1-.4-1.9-1.2-.7-.6-1.2-1.4-1.3-1.6-.1-.2 0-.4.1-.5.1-.1.2-.3.4-.4.1-.1.2-.2.2-.4.1-.1 0-.3 0-.4 0-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9 0 1.1.8 2.2.9 2.4.1.2 1.6 2.5 4 3.5.6.2 1 .4 1.3.5.6.2 1.1.2 1.5.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.2-.2-.4-.3z" />
            </svg>
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: 4,
              textTransform: 'uppercase',
              color: '#ddb65a'
            }}
          >
            Ashwani Kumar, IAS
          </div>
        </div>

        <div style={{ display: 'flex', fontSize: 66, fontWeight: 600, color: '#fff', lineHeight: 1.12, maxWidth: 920 }}>
          Follow my WhatsApp channel
        </div>

        <div style={{ display: 'flex', fontSize: 34, color: '#ddb65a', marginTop: 22 }}>Ashwani Kumar | Updates</div>

        <div style={{ display: 'flex', marginTop: 52 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#ddb65a',
              color: '#06182d',
              fontSize: 28,
              fontWeight: 700,
              padding: '16px 36px',
              borderRadius: 9999
            }}
          >
            ashwanikumarias.com/whatsapp
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
