import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { User } from '@/types/user'

// Loads every user once; search, filters, sorting and paging happen in the browser.
// Fine for demo-sized data — switch to server-side queries if the table grows large.
export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: async (): Promise<User[]> => {
      if (!supabase) throw new Error('Supabase is not configured. Add keys to .env.local.')
      const { data, error } = await supabase.from('users').select('*').order('full_name')
      if (error) throw error
      return data
    },
  })
}
