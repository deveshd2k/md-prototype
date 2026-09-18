import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { ScopeTypeKey } from '@/types/roles'

export type AssignedRole = {
  id: string
  role_id: string
  role: { name: string; description: string; sort_order: number }
  scopes: { scope_type: ScopeTypeKey; value: string }[]
}

// The roles assigned to one user, with the access scope values of each
export function useUserRoles(userId: string | undefined) {
  return useQuery({
    queryKey: ['user-roles', userId],
    enabled: Boolean(userId),
    queryFn: async (): Promise<AssignedRole[]> => {
      if (!supabase) throw new Error('Supabase is not configured. Add keys to .env.local.')
      const { data, error } = await supabase
        .from('user_roles')
        .select('id, role_id, role:roles(name, description, sort_order), scopes:user_role_scopes(scope_type, value)')
        .eq('user_id', userId!)
      if (error) throw error
      return (data as unknown as AssignedRole[]).sort((a, b) => a.role.sort_order - b.role.sort_order)
    },
  })
}
