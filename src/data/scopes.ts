import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { ScopeOption, ScopeType } from '@/types/roles'

// The access scope types, in their defined order (Supabase table `scope_types`)
export function useScopeTypes() {
  return useQuery({
    queryKey: ['scope-types'],
    queryFn: async (): Promise<ScopeType[]> => {
      if (!supabase) throw new Error('Supabase is not configured. Add keys to .env.local.')
      const { data, error } = await supabase.from('scope_types').select('*').order('sort_order')
      if (error) throw error
      return data
    },
  })
}

// Every selectable value, including agencies from the directory (Supabase view `scope_option_values`)
export function useScopeOptions() {
  return useQuery({
    queryKey: ['scope-options'],
    queryFn: async (): Promise<ScopeOption[]> => {
      if (!supabase) throw new Error('Supabase is not configured. Add keys to .env.local.')
      const { data, error } = await supabase
        .from('scope_option_values')
        .select('*')
        .order('sort_order')
        .order('value')
      if (error) throw error
      return data
    },
  })
}
