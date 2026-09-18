import { useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { RoleScopes } from '@/types/roles'

type AssignRoleInput = {
  userId: string
  roleId: string
  scopes: RoleScopes
}

// Gives an existing Master Data user one permission role with its access scope
// (Supabase function `assign_user_role`)
export function useAssignRole() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ userId, roleId, scopes }: AssignRoleInput) => {
      if (!supabase) throw new Error('Supabase is not configured. Add keys to .env.local.')
      const { error } = await supabase.rpc('assign_user_role', {
        p_user_id: userId,
        p_role_id: roleId,
        p_scopes: scopes,
      })
      if (error) throw new Error(friendlyMessage(error))
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['user-roles', variables.userId] })
    },
  })
}

function friendlyMessage(error: { code?: string; message: string }): string {
  if (error.code === 'PGRST202') return 'The assign-role function isn’t installed in Supabase yet.'
  return error.message
}
