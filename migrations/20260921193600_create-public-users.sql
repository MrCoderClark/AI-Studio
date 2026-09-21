-- Application-facing users table. auth.users remains the source of truth;
-- this table is populated/kept in sync from the app on sign-in and sign-up
-- (see lib/insforge/sync-user.ts) because the managed auth schema cannot be
-- modified with triggers.

create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  name text,
  avatar_url text,
  providers text[] not null default '{}',
  email_verified boolean not null default false,
  auth_created_at timestamptz,
  last_sign_in_at timestamptz,
  last_seen_at timestamptz,
  metadata jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.users is 'App-facing mirror of auth.users, synced from the app on sign-in/sign-up.';

-- Row Level Security: a user can read only their own record.
-- Writes are performed server-side with the admin key (bypasses RLS), so there
-- is no client INSERT/UPDATE/DELETE policy.
alter table public.users enable row level security;

drop policy if exists "Users can view own record" on public.users;
create policy "Users can view own record"
  on public.users for select
  using (auth.uid() = id);
