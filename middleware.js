import { NextResponse } from 'next/server';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zblqmohpsqtydqowmlqh.supabase.co';
const SUPABASE_WS_URL = SUPABASE_URL.replace(/^https:/, 'wss:');

export function middleware(request) {
  const isDev = process.env.NODE_ENV !== 'production';

  // No per-request nonce: pages are static (prerendered once at build time),
  // so a nonce generated per-request here could never match what's baked
  // into that static HTML. 'unsafe-inline' is required for Next's own inline
  // hydration scripts to run; this is the standard tradeoff for a statically
  // rendered Next.js app (see https://nextjs.org/docs/app/guides/content-security-policy).
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''};
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    font-src 'self' https://fonts.gstatic.com;
    img-src 'self' data:;
    connect-src 'self' ${SUPABASE_URL} ${SUPABASE_WS_URL};
    base-uri 'self';
    form-action 'self';
    object-src 'none';
    frame-ancestors 'none';
  `
    .replace(/\s{2,}/g, ' ')
    .trim();

  const response = NextResponse.next();
  response.headers.set('Content-Security-Policy', cspHeader);
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  return response;
}

export const config = {
  matcher: [
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' }
      ]
    }
  ]
};
