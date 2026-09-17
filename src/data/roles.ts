import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { Role } from '@/types/roles'

// The permission roles, in their defined order (Supabase table `roles`)
export function useRoles() {
  return useQuery({
    queryKey: ['roles'],
    queryFn: async (): Promise<Role[]> => {
      if (!supabase) throw new Error('Supabase is not configured. Add keys to .env.local.')
      const { data, error } = await supabase.from('roles').select('*').order('sort_order')
      if (error) throw error
      return data
    },
  })
}
