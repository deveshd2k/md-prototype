// Shapes of the permission role and access scope tables in Supabase

export type Role = {
  id: string
  name: string
  description: string
  sort_order: number
}

export type ScopeLevel = 'organisation' | 'client_brand'
export type OptionList = 'agency' | 'region' | 'country' | 'client' | 'brand'

export type ScopeTypeKey =
  | 'agency'
  | 'agency_region'
  | 'agency_country'
  | 'client'
  | 'brand'
  | 'campaign_region'
  | 'campaign_country'

export type ScopeType = {
  key: ScopeTypeKey
  label: string
  description: string
  level: ScopeLevel
  option_list: OptionList
  filtered_by: ScopeTypeKey | null // options narrow to what is picked in this scope type
  sort_order: number
}

// Row of the `scope_option_values` view; parent_value is the region of a country or client of a brand
export type ScopeOption = {
  list: OptionList
  value: string
  parent_value: string | null
  sort_order: number
}

export type UserRole = {
  id: string
  user_id: string
  role_id: string
  created_at: string
  updated_at: string
}

export type UserRoleScope = {
  id: string
  user_role_id: string
  scope_type: ScopeTypeKey
  value: string
}

// Payload for `set_user_role` / `add_users_with_role`. Scope types left out mean "None"; ["*"] means All (incl. future values).
export type RoleScopes = Partial<Record<ScopeTypeKey, string[]>>
