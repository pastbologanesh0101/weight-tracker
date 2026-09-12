create table settings (
  id int primary key default 1 check (id = 1),
  height_cm numeric,
  start_weight numeric,
  goal_weight numeric,
  start_date date,
  target_date date
);

create table weight_entries (
  id uuid primary key default gen_random_uuid(),
  logged_date date not null unique,
  weight_kg numeric not null,
  created_at timestamptz not null default now()
);

create table gym_logs (
  id uuid primary key default gen_random_uuid(),
  logged_date date not null unique,
  day_type text not null check (day_type in ('push', 'pull', 'legs', 'rest')),
  completed boolean not null default true,
  created_at timestamptz not null default now()
);

create table water_logs (
  id uuid primary key default gen_random_uuid(),
  logged_date date not null unique,
  liters numeric not null default 0
);

create table step_logs (
  id uuid primary key default gen_random_uuid(),
  logged_date date not null unique,
  steps int not null default 0
);

alter table settings enable row level security;
alter table weight_entries enable row level security;
alter table gym_logs enable row level security;
alter table water_logs enable row level security;
alter table step_logs enable row level security;
-- No policies are defined: the app only talks to Postgres through the
-- service role key (server-side), which bypasses RLS by design. The
-- publishable/anon key has no policies granting it access to these tables.
