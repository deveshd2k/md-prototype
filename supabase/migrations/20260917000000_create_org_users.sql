-- Organisation-wide user directory: people who can be added to the Master Data users table

create table public.org_users (
  id            uuid primary key default gen_random_uuid(),
  full_name     text not null,
  email         text not null unique,
  agency        text not null,
  business_unit text not null,
  department    text not null,
  location      text not null,
  job_title     text not null,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create trigger org_users_set_updated_at
before update on public.org_users
for each row execute function public.set_updated_at();

-- Access rules: anyone with the app can view; only signed-in users can change the directory
alter table public.org_users enable row level security;

grant select on public.org_users to anon, authenticated;
grant insert, update, delete on public.org_users to authenticated;

create policy "Org users are viewable by everyone"
on public.org_users for select
to anon, authenticated
using (true);

create policy "Signed-in users can add org users"
on public.org_users for insert
to authenticated
with check (true);

create policy "Signed-in users can edit org users"
on public.org_users for update
to authenticated
using (true)
with check (true);

create policy "Signed-in users can delete org users"
on public.org_users for delete
to authenticated
using (true);

-- Directory people who are not yet in the users table (matched by email).
-- security_invoker makes the view respect the access rules above.
create view public.available_org_users
with (security_invoker = true)
as
select o.*
from public.org_users o
where not exists (
  select 1 from public.users u where lower(u.email) = lower(o.email)
);

grant select on public.available_org_users to anon, authenticated;
