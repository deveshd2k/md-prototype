-- Users table for the Master Data workspace

create table public.users (
  id            uuid primary key default gen_random_uuid(),
  full_name     text not null,
  email         text not null unique,
  agency        text not null,
  business_unit text not null,
  department    text not null,
  location      text not null,
  job_title     text not null,
  time_lock     boolean not null default false,  -- shown as On / Off in the UI
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- Keep updated_at current on every edit
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger users_set_updated_at
before update on public.users
for each row execute function public.set_updated_at();

-- Access rules: anyone with the app can view; only signed-in users can change data
alter table public.users enable row level security;

grant select on public.users to anon, authenticated;
grant insert, update, delete on public.users to authenticated;

create policy "Users are viewable by everyone"
on public.users for select
to anon, authenticated
using (true);

create policy "Signed-in users can add users"
on public.users for insert
to authenticated
with check (true);

create policy "Signed-in users can edit users"
on public.users for update
to authenticated
using (true)
with check (true);

create policy "Signed-in users can delete users"
on public.users for delete
to authenticated
using (true);
