import { useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { RoleScopes } from '@/types/roles'

type AddUsersInput = {
  orgUserIds: string[]
  roleId: string
  scopes: RoleScopes
}

// Adds directory people to Master Data with one role and its access scope, all-or-nothing
// (Supabase function `add_users_with_role`)
export function useAddUsers() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ orgUserIds, roleId, scopes }: AddUsersInput) => {
      if (!supabase) throw new Error('Supabase is not configured. Add keys to .env.local.')
      const { error } = await supabase.rpc('add_users_with_role', {
        p_org_user_ids: orgUserIds,
        p_role_id: roleId,
        p_scopes: scopes,
      })
      if (error) throw new Error(friendlyMessage(error))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      queryClient.invalidateQueries({ queryKey: ['available-org-users'] })
    },
  })
}

// Plain-language versions of the database errors people can actually run into
function friendlyMessage(error: { code?: string; message: string }): string {
  if (error.code === '23505') return 'One or more of these people have already been added. Refresh and try again.'
  if (error.code === 'PGRST202') return 'The add-users function isn’t installed in Supabase yet.'
  return error.message
}
