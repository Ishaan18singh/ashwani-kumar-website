// ============================================================
// FILL THESE IN from your Supabase project:
// Dashboard → Project Settings → API
//   - "Project URL"            → SUPABASE_URL
//   - "anon public" API key    → SUPABASE_ANON_KEY
// (The anon key is safe to expose in client-side code — that's
// what it's designed for. Row Level Security policies from
// supabase-schema.sql control what it's actually allowed to do.)
// ============================================================
const SUPABASE_URL = 'https://zblqmohpsqtydqowmlqh.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_5WBsmG6lc_68Wnwmpg-1eQ_60oebbBI';

window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);