import { notFound } from 'next/navigation';

// Route-group not-found.js only fires for notFound() calls or dynamic-segment
// misses inside routes that already exist in this group — a fully unmatched
// URL otherwise falls through to Next's bare root 404, which has no header,
// footer, or i18n. This catch-all pulls every unmatched path into the group
// so app/(site)/not-found.js (branded, with the site chrome) handles it.
export default function CatchAll() {
  notFound();
}
