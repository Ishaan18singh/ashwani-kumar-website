// Small inline icon set for the contact page: the "Get in touch" / "Enquiries"
// rows and the form's own fields. Kept together (rather than folded into the
// general-purpose SocialIcon component) since these are contact-page-specific
// and several need to accept a className for absolute positioning.

export function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}>
      <rect x="2.5" y="4.5" width="19" height="15" rx="3" />
      <path d="M3.5 6.5l8.5 7 8.5-7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function LinkIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}>
      <path d="M9.5 14.5 14.5 9.5" strokeLinecap="round" />
      <path
        d="M11 7.5 12.3 6.2a3.8 3.8 0 0 1 5.5 5.5l-1.3 1.3M13 16.5 11.7 17.8a3.8 3.8 0 0 1-5.5-5.5l1.3-1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PersonIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}>
      <circle cx="12" cy="8" r="3.75" />
      <path d="M4.5 20c1.4-4 4.2-6 7.5-6s6.1 2 7.5 6" strokeLinecap="round" />
    </svg>
  );
}

export function PhoneIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}>
      <path
        d="M5 4.5h3.2l1.3 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.3V17.7c0 1-.8 1.8-1.8 1.7A15.3 15.3 0 0 1 5.3 6.3C5.2 5.3 4 5 5 4.5Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}>
      <path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" strokeLinejoin="round" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

export function InstitutionIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}>
      <path d="M3 9.5 12 4l9 5.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4.5 10v8.5M9 10v8.5M15 10v8.5M19.5 10v8.5" strokeLinecap="round" />
      <path d="M2.5 20.5h19" strokeLinecap="round" />
    </svg>
  );
}

export function MicIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}>
      <rect x="9" y="2.5" width="6" height="11" rx="3" />
      <path d="M5.5 11.5a6.5 6.5 0 0 0 13 0" strokeLinecap="round" />
      <path d="M12 18v3.5M9 21.5h6" strokeLinecap="round" />
    </svg>
  );
}

export function PressIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}>
      <rect x="3" y="4.5" width="14" height="15" rx="1.5" />
      <path d="M17 8.5h3.5v8a2.5 2.5 0 0 1-2.5 2.5H6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.5 8h8M6.5 11.5h8M6.5 15h5" strokeLinecap="round" />
    </svg>
  );
}

export function IdeaIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}>
      <path d="M9 17.5h6M9.75 20h4.5" strokeLinecap="round" />
      <path d="M12 3a6.5 6.5 0 0 0-3.8 11.8c.6.45 1 1.15 1 1.95v.25h5.6v-.25c0-.8.4-1.5 1-1.95A6.5 6.5 0 0 0 12 3Z" strokeLinejoin="round" />
    </svg>
  );
}
