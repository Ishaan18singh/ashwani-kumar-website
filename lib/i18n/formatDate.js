// Article dates render in the reader's language. Entries carry an ISO
// `iso` field alongside the original English `date`; the ISO one is
// formatted per language, and `date` stays as the fallback for rows that
// come from Supabase, which has no iso column.
//
// A two-part ISO value ("2026-08") means the piece is dated to a month
// only, and renders without a day.

const LOCALES = {
  en: 'en-GB',
  hi: 'hi-IN',
  fr: 'fr-FR',
  de: 'de-DE',
  ru: 'ru-RU',
  as: 'as-IN',
  zh: 'zh-CN',
  ja: 'ja-JP',
  ar: 'ar'
};

export function formatArticleDate(iso, lang, fallback = '') {
  if (!iso) return fallback;

  const parts = String(iso).split('-').map(Number);
  if (!parts[0] || Number.isNaN(parts[0])) return fallback;

  const monthOnly = parts.length < 3;
  const date = new Date(Date.UTC(parts[0], (parts[1] || 1) - 1, parts[2] || 1));
  const options = monthOnly
    ? { year: 'numeric', month: 'long', timeZone: 'UTC' }
    : { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };

  // Not every browser ships data for every locale. Asking for one it does
  // not have resolves silently to the browser's own default, which on a US
  // machine reads "September 25, 2026" in the middle of Assamese copy, so
  // check what actually resolved and fall back deliberately instead.
  const requested = LOCALES[lang] || lang;
  try {
    const formatter = new Intl.DateTimeFormat(requested, options);
    const resolved = formatter.resolvedOptions().locale || '';
    if (resolved.split('-')[0] === requested.split('-')[0]) {
      return formatter.format(date);
    }
  } catch {
    // fall through to English
  }
  return new Intl.DateTimeFormat('en-GB', options).format(date);
}
