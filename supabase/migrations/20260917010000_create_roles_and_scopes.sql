-- Permission roles and per-role access scopes for Master Data users
--
--   users ──< user_roles >── roles
--                 └──< user_role_scopes >── scope_types ── scope_options
--
-- Rules:
--   • A user can hold each role once.
--   • Every role assignment needs at least one access scope value.
--   • A scope type with no values on an assignment means "None" (no access on that dimension).

-- ─── Reference data ─────────────────────────────────────────────────────────

create table public.roles (
  id          uuid primary key default gen_random_uuid(),
  name        text not null unique,
  description text not null,
  sort_order  int  not null default 0
);

-- Option lists shared by scope types (e.g. "country" feeds Agency Country and Campaign Country).
-- Agency options are not stored here; they come from the user directory (see scope_option_values).
create table public.scope_options (
  list         text not null check (list in ('region', 'country', 'client', 'brand')),
  value        text not null,
  parent_list  text,
  parent_value text,
  sort_order   int  not null default 0,
  primary key (list, value),
  -- A country belongs to a region, a brand belongs to a client
  foreign key (parent_list, parent_value) references public.scope_options (list, value),
  check (
    (list = 'country' and parent_list = 'region' and parent_value is not null)
    or (list = 'brand' and parent_list = 'client' and parent_value is not null)
    or (list in ('region', 'client') and parent_list is null and parent_value is null)
  )
);

create table public.scope_types (
  key         text primary key,
  label       text not null,
  description text not null,
  level       text not null check (level in ('organisation', 'client_brand')),
  option_list text not null check (option_list in ('agency', 'region', 'country', 'client', 'brand')),
  -- Options are narrowed by what is picked in this other scope type (if anything is picked)
  filtered_by text references public.scope_types (key),
  sort_order  int  not null default 0
);

-- Every selectable value per option list, including agencies from the directory
create view public.scope_option_values
with (security_invoker = true)
as
select list, value, parent_value, sort_order
from public.scope_options
union all
select 'agency', agency, null, 0
from (
  select agency from public.org_users
  union
  select agency from public.users
) agencies;

-- ─── Assignments ────────────────────────────────────────────────────────────

create table public.user_roles (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references public.users (id) on delete cascade,
  role_id    uuid not null references public.roles (id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, role_id)
);

create index user_roles_role_id_idx on public.user_roles (role_id);

create trigger user_roles_set_updated_at
before update on public.user_roles
for each row execute function public.set_updated_at();

create table public.user_role_scopes (
  id           uuid primary key default gen_random_uuid(),
  user_role_id uuid not null references public.user_roles (id) on delete cascade,
  scope_type   text not null references public.scope_types (key),
  value        text not null,
  unique (user_role_id, scope_type, value)
);

create index user_role_scopes_scope_idx on public.user_role_scopes (scope_type, value);

-- Only allow values that exist in the scope type's option list
create or replace function public.validate_user_role_scope()
returns trigger
language plpgsql
set search_path = ''
as $$
declare
  v_list text;
begin
  select option_list into v_list from public.scope_types where key = new.scope_type;
  if not exists (
    select 1 from public.scope_option_values o where o.list = v_list and o.value = new.value
  ) then
    raise exception '"%" is not a valid value for %', new.value, new.scope_type;
  end if;
  return new;
end;
$$;

create trigger user_role_scopes_validate
before insert or update on public.user_role_scopes
for each row execute function public.validate_user_role_scope();

-- At least one scope value per role assignment, checked when the transaction commits
create or replace function public.check_role_has_scope(p_user_role_id uuid)
returns void
language plpgsql
set search_path = ''
as $$
begin
  if exists (select 1 from public.user_roles where id = p_user_role_id)
     and not exists (select 1 from public.user_role_scopes where user_role_id = p_user_role_id) then
    raise exception 'A role needs at least one access scope value';
  end if;
end;
$$;

create or replace function public.user_roles_require_scope()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  perform public.check_role_has_scope(new.id);
  return null;
end;
$$;

create or replace function public.user_role_scopes_require_scope()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  perform public.check_role_has_scope(old.user_role_id);
  return null;
end;
$$;

create constraint trigger user_roles_require_scope
after insert on public.user_roles
deferrable initially deferred
for each row execute function public.user_roles_require_scope();

create constraint trigger user_role_scopes_require_scope
after delete or update on public.user_role_scopes
deferrable initially deferred
for each row execute function public.user_role_scopes_require_scope();

-- Assign (or re-assign) a role with its scopes in one step. Used by the app.
--   p_scopes: {"client": ["Unilever"], "brand": ["Dove"], "campaign_region": ["EMEA"]}
create or replace function public.set_user_role(p_user_id uuid, p_role_id uuid, p_scopes jsonb)
returns uuid
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_id uuid;
begin
  if p_scopes is null or jsonb_typeof(p_scopes) <> 'object' or not exists (
    select 1 from jsonb_each(p_scopes) e
    where jsonb_typeof(e.value) = 'array' and jsonb_array_length(e.value) > 0
  ) then
    raise exception 'Pick at least one access scope value';
  end if;

  insert into public.user_roles (user_id, role_id)
  values (p_user_id, p_role_id)
  on conflict (user_id, role_id) do update set updated_at = now()
  returning id into v_id;

  delete from public.user_role_scopes where user_role_id = v_id;

  insert into public.user_role_scopes (user_role_id, scope_type, value)
  select v_id, e.key, v.value
  from jsonb_each(p_scopes) e
  cross join lateral jsonb_array_elements_text(
    case when jsonb_typeof(e.value) = 'array' then e.value else '[]'::jsonb end
  ) as v(value);

  return v_id;
end;
$$;

-- ─── Access rules ───────────────────────────────────────────────────────────
-- Reference data: readable by everyone, changed only from the Supabase dashboard.
-- Assignments: readable by everyone, changed only by signed-in users.

alter table public.roles enable row level security;
alter table public.scope_options enable row level security;
alter table public.scope_types enable row level security;
alter table public.user_roles enable row level security;
alter table public.user_role_scopes enable row level security;

grant select on public.roles, public.scope_options, public.scope_types, public.scope_option_values
  to anon, authenticated;
grant select on public.user_roles, public.user_role_scopes to anon, authenticated;
grant insert, update, delete on public.user_roles to authenticated;
grant insert, delete on public.user_role_scopes to authenticated;
revoke execute on function public.set_user_role(uuid, uuid, jsonb) from public, anon;
grant execute on function public.set_user_role(uuid, uuid, jsonb) to authenticated;

create policy "Roles are viewable by everyone"
on public.roles for select to anon, authenticated using (true);

create policy "Scope options are viewable by everyone"
on public.scope_options for select to anon, authenticated using (true);

create policy "Scope types are viewable by everyone"
on public.scope_types for select to anon, authenticated using (true);

create policy "Role assignments are viewable by everyone"
on public.user_roles for select to anon, authenticated using (true);

create policy "Signed-in users can assign roles"
on public.user_roles for insert to authenticated with check (true);

create policy "Signed-in users can update role assignments"
on public.user_roles for update to authenticated using (true) with check (true);

create policy "Signed-in users can remove roles"
on public.user_roles for delete to authenticated using (true);

create policy "Role scopes are viewable by everyone"
on public.user_role_scopes for select to anon, authenticated using (true);

create policy "Signed-in users can add role scopes"
on public.user_role_scopes for insert to authenticated with check (true);

create policy "Signed-in users can remove role scopes"
on public.user_role_scopes for delete to authenticated using (true);
