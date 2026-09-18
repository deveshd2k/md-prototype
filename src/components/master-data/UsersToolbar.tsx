import addIcon from '@/assets/figma/add.svg'
import tuneIcon from '@/assets/figma/tune.svg'
import { FilterSelect } from '@/components/master-data/FilterSelect'
import { SearchInput } from '@/components/master-data/SearchInput'
import { RegularButton } from '@/components/ui/regular-button'
import type { Filters } from '@/lib/table'

export type UserFilters = Filters<'agency' | 'department' | 'location'>

type UsersToolbarProps = {
  search: string
  onSearchChange: (value: string) => void
  filters: UserFilters
  filterOptions: UserFilters
  onFiltersChange: (filters: UserFilters) => void
  onAddUser: () => void
}

// Search, quick filters and primary action (Figma: "[MD] - users toolbar")
export function UsersToolbar({ search, onSearchChange, filters, filterOptions, onFiltersChange, onAddUser }: UsersToolbarProps) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-start gap-3">
        <SearchInput value={search} onChange={onSearchChange} />
        <div className="flex items-start gap-3">
          <FilterSelect
            label="Agency"
            options={filterOptions.agency}
            selected={filters.agency}
            onChange={(agency) => onFiltersChange({ ...filters, agency })}
          />
          <FilterSelect
            label="Department"
            options={filterOptions.department}
            selected={filters.department}
            onChange={(department) => onFiltersChange({ ...filters, department })}
          />
          <FilterSelect
            label="Location"
            options={filterOptions.location}
            selected={filters.location}
            onChange={(location) => onFiltersChange({ ...filters, location })}
          />
        </div>
        <button
          type="button"
          className="flex h-8 items-center justify-center gap-2 rounded-md border border-grey-500 bg-white pr-4 pl-3 text-sm leading-[22px] font-semibold text-grey-900 hover:bg-grey-200"
        >
          <img src={tuneIcon} alt="" className="size-5" />
          Filters
        </button>
      </div>
      <RegularButton size="s" onClick={onAddUser} icon={<img src={addIcon} alt="" className="size-5" />}>
        Add users
      </RegularButton>
    </div>
  )
}
