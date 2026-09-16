import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(url && anonKey)

// The single connection to Supabase, shared by the whole app.
// Null until keys are added to .env.local, so the app still starts without them.
export const supabase = url && anonKey ? createClient(url, anonKey) : null
