import { useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'

// Takes one permission role away from a user (Supabase function `remove_user_role`)
export function useRemoveRole() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ userId, roleId }: { userId: string; roleId: string }) => {
      if (!supabase) throw new Error('Supabase is not configured. Add keys to .env.local.')
      const { error } = await supabase.rpc('remove_user_role', { p_user_id: userId, p_role_id: roleId })
      if (error) throw new Error(error.code === 'PGRST202' ? 'The remove-role function isn’t installed in Supabase yet.' : error.message)
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['user-roles', variables.userId] })
    },
  })
}
