-- 1. "All" access scope: a scope value of '*' means every value of that scope type, now and in future.
--    It must be the only value for that scope type on a role assignment.
-- 2. add_users_with_role: add directory people to Master Data with one role and its scope, all-or-nothing.
--    PROTOTYPE MODE: callable without signing in (security definer + granted to anon).
--    To lock down later: `alter function ... security invoker;` and revoke execute from anon.
-- 3. Sentence-case scope labels, as in the designs.

-- ─── 1. "All" support ───────────────────────────────────────────────────────

create or replace function public.validate_user_role_scope()
returns trigger
language plpgsql
set search_path = ''
as $$
declare
  v_list text;
begin
  if new.value = '*' then
    if exists (
      select 1 from public.user_role_scopes
      where user_role_id = new.user_role_id and scope_type = new.scope_type and id <> new.id
    ) then
      raise exception '"All" can''t be combined with other values for %', new.scope_type;
    end if;
    return new;
  end if;

  if exists (
    select 1 from public.user_role_scopes
    where user_role_id = new.user_role_id and scope_type = new.scope_type and value = '*'
  ) then
    raise exception '"All" is already set for %', new.scope_type;
  end if;

  select option_list into v_list from public.scope_types where key = new.scope_type;
  if not exists (
    select 1 from public.scope_option_values o where o.list = v_list and o.value = new.value
  ) then
    raise exception '"%" is not a valid value for %', new.value, new.scope_type;
  end if;
  return new;
end;
$$;

-- Same as before, but a scope type containing '*' is saved as just '*'
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
  select distinct v_id, e.key, v.value
  from jsonb_each(p_scopes) e
  cross join lateral jsonb_array_elements_text(
    case
      when jsonb_typeof(e.value) <> 'array' then '[]'::jsonb
      when e.value ? '*' then '["*"]'::jsonb
      else e.value
    end
  ) as v(value);

  return v_id;
end;
$$;

-- ─── 2. Add users (prototype mode) ──────────────────────────────────────────
--   p_scopes: {"client": ["Unilever"], "campaign_region": ["*"]}

create or replace function public.add_users_with_role(p_org_user_ids uuid[], p_role_id uuid, p_scopes jsonb)
returns setof uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_person public.org_users%rowtype;
  v_user_id uuid;
  v_found int := 0;
begin
  if coalesce(array_length(p_org_user_ids, 1), 0) = 0 then
    raise exception 'Select at least one user';
  end if;

  for v_person in
    select * from public.org_users where id = any (p_org_user_ids) order by full_name
  loop
    insert into public.users (full_name, email, agency, business_unit, department, location, job_title)
    values (v_person.full_name, v_person.email, v_person.agency, v_person.business_unit,
            v_person.department, v_person.location, v_person.job_title)
    returning id into v_user_id;

    perform public.set_user_role(v_user_id, p_role_id, p_scopes);
    v_found := v_found + 1;
    return next v_user_id;
  end loop;

  if v_found <> cardinality(p_org_user_ids) then
    raise exception 'Some selected people were not found in the directory';
  end if;
end;
$$;

revoke execute on function public.add_users_with_role(uuid[], uuid, jsonb) from public;
grant execute on function public.add_users_with_role(uuid[], uuid, jsonb) to anon, authenticated;

-- ─── 3. Labels ──────────────────────────────────────────────────────────────

update public.scope_types set label = 'Agency region' where key = 'agency_region';
update public.scope_types set label = 'Agency country' where key = 'agency_country';
update public.scope_types set label = 'Campaign region' where key = 'campaign_region';
update public.scope_types set label = 'Campaign country' where key = 'campaign_country';
