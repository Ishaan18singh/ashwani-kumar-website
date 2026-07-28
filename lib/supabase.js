'use client';

import { createClient } from '@supabase/supabase-js';

// Same project as the previous static site (js/supabase-config.js).
// The anon key is safe to expose client-side; Row Level Security policies
// in supabase-schema.sql control what it's actually allowed to do.
// Override via .env.local (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY)
// if you move to a different Supabase project.
const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zblqmohpsqtydqowmlqh.supabase.co';
const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_5WBsmG6lc_68Wnwmpg-1eQ_60oebbBI';

let client = null;

export function getSupabaseClient() {
  if (typeof window === 'undefined') return null;
  if (!client) {
    client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
  return client;
}
