// Helpers shared by the data tables

export type Sort<K extends string> = { key: K; direction: 'asc' | 'desc' } | null

export function sortRows<T, K extends keyof T & string>(rows: T[], sort: Sort<K>): T[] {
  if (!sort) return rows
  const factor = sort.direction === 'asc' ? 1 : -1
  return [...rows].sort((a, b) => {
    const left = a[sort.key]
    const right = b[sort.key]
    const result =
      typeof left === 'boolean' ? Number(left) - Number(right) : String(left).localeCompare(String(right))
    return result * factor
  })
}

// Distinct values of a field, alphabetically — used for filter options
export function uniqueSorted<T>(rows: T[], key: keyof T): string[] {
  return [...new Set(rows.map((row) => String(row[key])))].sort((a, b) => a.localeCompare(b))
}

export type Filters<K extends string> = Record<K, string[]>

// A field as the table shows it, so search matches what people can actually read
export function searchText(value: unknown): string {
  if (typeof value === 'boolean') return value ? 'On' : 'Off'
  return value == null ? '' : String(value)
}

// Search across the given columns plus "any of" matching per filter; an empty filter matches everything
export function matchesSearchAndFilters<T, K extends keyof T & string>(
  row: T,
  search: string,
  filters: Filters<K>,
  searchKeys: (keyof T & string)[],
): boolean {
  const query = search.trim().toLowerCase()
  if (query && !searchKeys.some((key) => searchText(row[key]).toLowerCase().includes(query))) return false
  return (Object.keys(filters) as K[]).every(
    (key) => filters[key].length === 0 || filters[key].includes(String(row[key])),
  )
}
