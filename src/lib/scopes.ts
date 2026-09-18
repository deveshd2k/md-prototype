import type { OptionList, RoleScopes, ScopeLevel, ScopeOption, ScopeType } from '@/types/roles'

// Scope levels, in the order they appear in the designs
export const scopeLevels: { level: ScopeLevel; title: string }[] = [
  { level: 'organisation', title: 'Organisation' },
  { level: 'client_brand', title: 'Clients & Brands' },
]

// Plural nouns for "All (N …)"
const pluralNouns: Record<OptionList, string> = {
  agency: 'agencies',
  region: 'regions',
  country: 'countries',
  client: 'clients',
  brand: 'brands',
}

// Options a scope type can offer right now: narrowed by what is picked in its "filtered by" type, if anything
export function optionsFor(type: ScopeType, all: ScopeOption[], scopes: RoleScopes): string[] {
  const parentPicks = type.filtered_by ? (scopes[type.filtered_by] ?? []) : []
  return all
    .filter((option) => option.list === type.option_list)
    .filter((option) => parentPicks.length === 0 || (option.parent_value !== null && parentPicks.includes(option.parent_value)))
    .map((option) => option.value)
}

// After a change, drop picks that are no longer offered (e.g. a brand whose client was unselected)
export function pruneScopes(types: ScopeType[], all: ScopeOption[], scopes: RoleScopes): RoleScopes {
  const next: RoleScopes = { ...scopes }
  for (const type of types) {
    const picks = next[type.key]
    if (!picks?.length) continue
    const offered = optionsFor(type, all, next)
    next[type.key] = picks.filter((value) => offered.includes(value))
  }
  return next
}

// Saved scope value meaning "every value of this type, now and in future"
export const ALL_VALUES = '*'

// True "All": every option of the type is picked and the list isn't narrowed by another scope type.
// (Picking everything within a narrowed list, e.g. all EMEA countries, stays a list of specific values.)
export function isAllPicked(type: ScopeType, all: ScopeOption[], scopes: RoleScopes): boolean {
  const picks = scopes[type.key] ?? []
  const total = all.filter((option) => option.list === type.option_list).length
  return total > 1 && picks.length === total && optionsFor(type, all, scopes).length === total
}

// Long lists are shortened to what fits, plus "+N" for the rest
const VALUE_CHARS = 46

// "None" · "All (4 regions)" · "Shell, Unilever" · "Gillette, Ivory, Native, +5"
export function formatScopeValue(type: ScopeType, all: ScopeOption[], scopes: RoleScopes): string {
  const picks = scopes[type.key] ?? []
  if (picks.length === 0) return 'None'
  if (isAllPicked(type, all, scopes)) return `All (${picks.length} ${pluralNouns[type.option_list]})`
  const shown: string[] = []
  let length = 0
  for (const pick of picks) {
    const next = length + pick.length + (shown.length ? 2 : 0)
    if (shown.length > 0 && next > VALUE_CHARS) break
    shown.push(pick)
    length = next
  }
  const rest = picks.length - shown.length
  return rest > 0 ? `${shown.join(', ')}, +${rest}` : shown.join(', ')
}

// Saved scopes back into the shape the pickers use: "All" becomes every value of that type
export function expandScopes(
  types: ScopeType[],
  all: ScopeOption[],
  saved: { scope_type: string; value: string }[],
): RoleScopes {
  const scopes: RoleScopes = {}
  for (const type of types) {
    const values = saved.filter((row) => row.scope_type === type.key).map((row) => row.value)
    if (values.length === 0) continue
    scopes[type.key] = values.includes(ALL_VALUES)
      ? all.filter((option) => option.list === type.option_list).map((option) => option.value)
      : values
  }
  return scopes
}

export function hasAnyScope(scopes: RoleScopes): boolean {
  return Object.values(scopes).some((picks) => (picks?.length ?? 0) > 0)
}

// Only the scope types with picks, in the shape the database expects; true "All" is saved as '*'
export function scopesPayload(types: ScopeType[], all: ScopeOption[], scopes: RoleScopes): RoleScopes {
  const payload: RoleScopes = {}
  for (const type of types) {
    const picks = scopes[type.key] ?? []
    if (picks.length === 0) continue
    payload[type.key] = isAllPicked(type, all, scopes) ? [ALL_VALUES] : picks
  }
  return payload
}
