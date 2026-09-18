-- Assign one permission role (with its access scope) to a user who is already in Master Data.
-- PROTOTYPE MODE: callable without signing in, like add_users_with_role.
-- To lock down later: `alter function ... security invoker;` and revoke execute from anon.
--   p_scopes: {"agency": ["Harbor & Vine"], "campaign_region": ["*"]}

create or replace function public.assign_user_role(p_user_id uuid, p_role_id uuid, p_scopes jsonb)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_id uuid;
begin
  if not exists (select 1 from public.users where id = p_user_id) then
    raise exception 'That user no longer exists';
  end if;
  if not exists (select 1 from public.roles where id = p_role_id) then
    raise exception 'That permission role no longer exists';
  end if;

  select public.set_user_role(p_user_id, p_role_id, p_scopes) into v_id;
  return v_id;
end;
$$;

revoke execute on function public.assign_user_role(uuid, uuid, jsonb) from public;
grant execute on function public.assign_user_role(uuid, uuid, jsonb) to anon, authenticated;
