import type { User } from '@/types/user'

// Row in the Supabase `org_users` directory (and the `available_org_users` view).
// Same fields as a workspace user, minus Time Lock, which is set when the person is added.
export type OrgUser = Omit<User, 'time_lock'>
