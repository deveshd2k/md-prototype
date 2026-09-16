// Shape of a row in the Supabase `users` table
export type User = {
  id: string
  full_name: string
  email: string
  agency: string
  business_unit: string
  department: string
  location: string
  job_title: string
  time_lock: boolean // true = On, false = Off
  created_at: string
  updated_at: string
}
