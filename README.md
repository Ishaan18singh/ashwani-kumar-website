# Ashwani Kumar IAS — Personal Profile Website (Next.js)

Next.js 14 (App Router) rebuild of the original static HTML/Tailwind/vanilla-JS
site. Same design, same content, same 9-language i18n system, same Supabase
integration — different (more maintainable) foundation.

## Run locally

```
npm install
npm run dev
```

Open http://localhost:3000. `npm run build && npm run start` for a production build.

## Structure

- `app/(site)/` — every public page (`/`, `/about`, `/timeline`, `/projects`,
  `/projects/[slug]`, `/awards`, `/publications`, `/gallery`, `/contact`,
  `/ias-aspirants`), sharing `app/(site)/layout.js` (header, footer, i18n).
- `app/admin/` — the Supabase-backed admin dashboard (messages + publications
  management). Deliberately outside the `(site)` group, so it has no public
  header/footer/nav — same as the old standalone `admin.html`.
- `app/layout.js` — root HTML shell, global metadata defaults, the
  before-paint dark-mode/color-theme script.
- `app/globals.css` — the site's compiled stylesheet, carried over as-is from
  the previous build (`css/output.css` + `css/typography.css`) so the visual
  design is pixel-identical. No Tailwind build step is required to run this
  project; if you want to edit styles with Tailwind's utility classes again,
  reintroduce `tailwindcss`/`postcss`/`autoprefixer` and a `tailwind.config.js`
  pointing at `app/**/*.{js,jsx}` and `components/**/*.{js,jsx}`.
- `lib/data.js` — canonical (English) content: profile, positions, timeline,
  projects, awards, publications, recognition, extras. Edit this file to
  update site content.
- `lib/i18n/` — the i18n system: `strings.js` (UI copy per language),
  `data.js` (translated overlays for the content in `lib/data.js`),
  `context.jsx` (the `I18nProvider` / `useI18n()` hook that replaced the old
  `window.I18N` global), `localize.js` (merges an overlay onto the English
  base, same logic as the old `i18n.js`).
- `lib/supabase.js` — browser Supabase client, used by the contact form, the
  publications list (with a static fallback), and the admin dashboard.
- `components/` — shared UI: `Header`, `Footer`, `InitiativesRail` (the
  drag/autoplay project rail), `TimelineList`, `GalleryGrid`,
  `PublicationsList`, `ContactForm`, `AdminApp`, etc.
- `public/images/` — all photographs and the favicon, unchanged.

## Update content

Edit `lib/data.js` for English copy, and the matching entry (by array index)
in `lib/i18n/data.js` for translations. UI chrome strings (buttons, labels,
nav) live in `lib/i18n/strings.js`.

## Supabase

Copy `.env.local.example` to `.env.local` and fill in your own project's URL
and anon key to point the contact form / publications / admin dashboard at a
different Supabase project. `supabase-schema.sql` has the table definitions
and RLS policies (same as the previous version of the site).

## Deploy

Push to GitHub and import the repo in Vercel (or run `npm run build` and
deploy the `.next` output anywhere that supports Next.js). No other
server-side configuration is required.
