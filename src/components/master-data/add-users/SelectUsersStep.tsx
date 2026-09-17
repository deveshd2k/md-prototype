import { useMemo, useState } from 'react'
import { DataTable, type Column } from '@/components/master-data/DataTable'
import { FilterSelect } from '@/components/master-data/FilterSelect'
import { SearchInput } from '@/components/master-data/SearchInput'
import { useAvailableOrgUsers } from '@/data/users'
import { matchesSearchAndFilters, sortRows, uniqueSorted, type Filters, type Sort } from '@/lib/table'
import type { OrgUser } from '@/types/org-user'

type FilterKey = 'agency' | 'business_unit' | 'department' | 'location' | 'job_title'

const filterFields: { key: FilterKey; label: string }[] = [
  { key: 'agency', label: 'Agency' },
  { key: 'business_unit', label: 'Business unit' },
  { key: 'department', label: 'Department' },
  { key: 'location', label: 'Location' },
  { key: 'job_title', label: 'Job title' },
]

const noFilters: Filters<FilterKey> = { agency: [], business_unit: [], department: [], location: [], job_title: [] }

const columns: Column<OrgUser>[] = [
  { key: 'full_name', label: 'User', width: 200, strong: true },
  { key: 'email', label: 'Email address', width: 250, strong: true },
  { key: 'agency', label: 'User agency', width: 160, strong: true },
  { key: 'business_unit', label: 'Business unit', width: 200 },
  { key: 'department', label: 'Department', width: 200 },
  { key: 'location', label: 'Location', width: 200 },
  { key: 'job_title', label: 'Job title', width: 200 },
]

type SelectUsersStepProps = {
  selectedIds: Set<string>
  onSelectionChange: (ids: Set<string>) => void
}

// Add users · step 1: pick people from the organisation directory who aren't in Master Data yet
export function SelectUsersStep({ selectedIds, onSelectionChange }: SelectUsersStepProps) {
  const { data: people = [], status, error } = useAvailableOrgUsers()
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState(noFilters)
  const [sort, setSort] = useState<Sort<keyof OrgUser & string>>(null)

  const visible = useMemo(
    () => sortRows(people.filter((person) => matchesSearchAndFilters(person, search, filters)), sort),
    [people, search, filters, sort],
  )

  return (
    <div className="flex min-h-0 flex-1 flex-col pt-6">
      <p className="text-sm leading-[22px] text-grey-1000">
        Select one or more users. The same permission role and access scope will apply to all selected users.
      </p>
      <div className="mt-5 flex items-start gap-3">
        <SearchInput value={search} onChange={setSearch} autoFocus />
        {filterFields.map(({ key, label }) => (
          <FilterSelect
            key={key}
            label={label}
            options={uniqueSorted(people, key)}
            selected={filters[key]}
            onChange={(values) => setFilters({ ...filters, [key]: values })}
          />
        ))}
      </div>
      <DataTable
        className="mt-3 min-h-0 flex-1 overflow-auto"
        rows={visible}
        columns={columns}
        status={status}
        errorMessage={`Couldn’t load your organisation’s users. ${error?.message ?? ''}`}
        loadingMessage="Loading users…"
        emptyMessage={
          people.length === 0
            ? 'Everyone in your organisation has already been added.'
            : 'No users match your search or filters.'
        }
        rowLabel={(person) => person.full_name}
        selectAllLabel="Select all users shown"
        sort={sort}
        onSortChange={setSort}
        selectedIds={selectedIds}
        onSelectionChange={onSelectionChange}
      />
    </div>
  )
}
