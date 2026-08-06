export default function SocialIcon({ label }) {
  switch (label) {
    case 'LinkedIn':
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4V8.5zM8.5 8.5h3.8v1.98h.05c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.78 2.65 4.78 6.1V23h-4v-6.65c0-1.59-.03-3.63-2.22-3.63-2.22 0-2.56 1.73-2.56 3.51V23h-4V8.5z" />
        </svg>
      );
    case 'X':
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
          <path d="M18.9 2h3.3l-7.2 8.2L23.5 22h-6.6l-5.2-6.8L5.7 22H2.4l7.7-8.8L1 2h6.8l4.7 6.2L18.9 2zm-1.2 18h1.8L7.4 3.9H5.5L17.7 20z" />
        </svg>
      );
    case 'Instagram':
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'Facebook':
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
          <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z" />
        </svg>
      );
    case 'YouTube':
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7">
          <rect x="2" y="5" width="20" height="14" rx="4" />
          <path d="M9.5 8.5v7L16 12l-6.5-3.5z" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'Pinterest':
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M12 0C5.4 0 0 5.4 0 12c0 5.1 3.2 9.4 7.6 11.1-.1-.9-.2-2.4 0-3.4l1.5-6.4s-.4-.8-.4-1.9c0-1.8 1-3.2 2.3-3.2 1.1 0 1.6.8 1.6 1.8 0 1.1-.7 2.7-1.1 4.2-.3 1.3.6 2.3 1.9 2.3 2.2 0 3.9-2.4 3.9-5.8 0-3-2.2-5.2-5.3-5.2-3.6 0-5.7 2.7-5.7 5.5 0 1.1.4 2.2.9 2.9.1.1.1.2.1.3-.1.4-.3 1.3-.4 1.5-.1.2-.2.3-.4.2-1.5-.7-2.4-2.9-2.4-4.7 0-3.8 2.8-7.3 8-7.3 4.2 0 7.5 3 7.5 7 0 4.2-2.6 7.5-6.3 7.5-1.2 0-2.4-.6-2.8-1.4l-.8 2.9c-.3 1-1 2.4-1.6 3.1.9.3 1.9.4 2.9.4 6.6 0 12-5.4 12-12S18.6 0 12 0z" />
        </svg>
      );
    case 'Threads':
      return (
        <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
          <path d="M13.4 10.9c-.1-3.9-1.6-6.1-4.6-6.1-1.8 0-3.2.8-4.1 2.2l1.7 1.2c.5-.8 1.2-1.3 2.3-1.3 1.4 0 2.3.9 2.5 2.5-.6-.1-1.3-.2-2-.2-2.9 0-4.9 1.4-4.9 3.7 0 2.1 1.7 3.5 4.1 3.5 1.8 0 3.1-.7 3.9-2 .1.5.3.9.6 1.3l1.8-1.2c-.4-.6-.7-1.4-.8-2.4.4-.1.5-.1.5-1.2zm-5 3.6c-1.1 0-1.9-.5-1.9-1.4 0-1 1-1.6 2.6-1.6.6 0 1.1.1 1.6.2-.2 1.8-1.1 2.8-2.3 2.8z" />
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z" opacity=".35" />
        </svg>
      );
    case 'IMDb':
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7">
          <rect x="2" y="5" width="20" height="14" rx="3" />
          <text x="12" y="15.3" fontSize="7.2" fontWeight="700" textAnchor="middle" fill="currentColor" stroke="none" fontFamily="Arial, Helvetica, sans-serif">
            IMDb
          </text>
        </svg>
      );
    case 'Mail':
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7">
          <rect x="2.5" y="4.5" width="19" height="15" rx="3" />
          <path d="M3.5 6.5l8.5 7 8.5-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return null;
  }
}
