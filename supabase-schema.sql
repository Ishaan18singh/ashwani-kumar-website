-- ============================================================
-- Run this ENTIRE file once in your Supabase project's
-- SQL Editor (left sidebar → SQL Editor → New query → paste → Run)
-- ============================================================

-- 1. Contact messages table (people submitting the contact form)
create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now(),
  read boolean not null default false
);

-- 2. Publications table (replaces the hardcoded list in data.js)
create table if not exists publications (
  id uuid primary key default gen_random_uuid(),
  date text not null,
  publication text not null,
  title text not null,
  url text not null,
  image text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- Seed the 3 publications you already have, so the site keeps working immediately
insert into publications (date, publication, title, url, image, sort_order) values
('5 May 2025', 'Dainik Bhaskar', 'Bhedbhav with girls: Punishment for being a girl in India — when will the thinking change?', 'https://www.rninews.co.in/bhedbhav-with-girls-punishment-for-being-a-girl-in-india-when-will-the-thinking-change-179904-4/', 'images/publications/Pub 01 bhedbhav.png', 0),
('15 January 2024', 'Economic Times Government', 'Cyber security: Are we misunderstanding it and exaggerating its risks?', 'https://government.economictimes.indiatimes.com/news/secure-india/cyber-security-are-we-misunderstanding-it-and-exaggerating-its-risks/106853720', 'images/publications/Pub 02 cybersecurity .png', 1),
('21 November 2022', 'Economic Times Government', 'Opinion: Are coaching institutes really responsible for rote learning?', 'https://government.economictimes.indiatimes.com/news/education/opinion-how-coaching-institutes-are-responsible-for-deteriorating-education-quality-of-top-level-aspirants/95638030', 'images/publications/Pub 03 coaching.png', 2);

-- 3. Row Level Security — public can submit messages + read publications,
--    only a logged-in admin can read messages or edit publications.
alter table contact_messages enable row level security;
alter table publications enable row level security;

create policy "Anyone can submit a contact message"
  on contact_messages for insert
  to anon
  with check (true);

create policy "Only authenticated users can view/manage messages"
  on contact_messages for all
  to authenticated
  using (true)
  with check (true);

create policy "Anyone can read publications"
  on publications for select
  to anon
  using (true);

create policy "Only authenticated users can manage publications"
  on publications for all
  to authenticated
  using (true)
  with check (true);