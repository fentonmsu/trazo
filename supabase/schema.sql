-- Trazo schema for Supabase (Postgres).
-- Run this once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.
-- Mirrors the old SQLite schema from server/db.js, translated to Postgres types.

create table if not exists users (
  id bigint generated always as identity primary key,
  username text unique not null,
  password_hash text not null,
  created_at timestamptz not null default now()
);

create table if not exists character_progress (
  user_id bigint not null references users(id) on delete cascade,
  character_id text not null,
  best_score integer not null,
  attempts integer not null,
  primary key (user_id, character_id)
);

create table if not exists lesson_progress (
  user_id bigint not null references users(id) on delete cascade,
  lesson_id text not null,
  stars integer not null default 0,
  completed_at timestamptz,
  primary key (user_id, lesson_id)
);

create table if not exists user_state (
  user_id bigint primary key references users(id) on delete cascade,
  current_streak integer not null default 0,
  longest_streak integer not null default 0,
  last_practice_date text,
  total_xp integer not null default 0,
  hearts integer not null default 5
);

-- This backend uses its own JWT auth (not Supabase Auth) and only ever
-- talks to Postgres through the secret/service_role key, which bypasses
-- Row Level Security entirely. RLS is intentionally left off here since
-- there is no Supabase-authenticated client role accessing these tables
-- directly.
