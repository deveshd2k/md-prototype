-- Remove one permission role (and its access scope) from a user.
-- PROTOTYPE MODE: callable without signing in, like add_users_with_role and assign_user_role.
-- To lock down later: `alter function ... security invoker;` and revoke execute from anon.

create or replace function public.remove_user_role(p_user_id uuid, p_role_id uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  delete from public.user_role_scopes
  where user_role_id in (
    select id from public.user_roles where user_id = p_user_id and role_id = p_role_id
  );

  delete from public.user_roles where user_id = p_user_id and role_id = p_role_id;

  if not found then
    raise exception 'That permission role is not assigned to this user';
  end if;
end;
$$;

revoke execute on function public.remove_user_role(uuid, uuid) from public;
grant execute on function public.remove_user_role(uuid, uuid) to anon, authenticated;
