import addIcon from '@/assets/figma/add.svg'
import searchIcon from '@/assets/figma/search.svg'
import tuneIcon from '@/assets/figma/tune.svg'
import { FilterSelect } from '@/components/master-data/FilterSelect'

export type UserFilters = {
  agency: string[]
  department: string[]
  location: string[]
}

type UsersToolbarProps = {
  search: string
  onSearchChange: (value: string) => void
  filters: UserFilters
  filterOptions: UserFilters
  onFiltersChange: (filters: UserFilters) => void
}

// Search, quick filters and primary action (Figma: "[MD] - users toolbar")
export function UsersToolbar({ search, onSearchChange, filters, filterOptions, onFiltersChange }: UsersToolbarProps) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-start gap-3">
        <label className="flex h-8 w-60 items-center gap-2 rounded-md border border-grey-500 bg-white px-2 focus-within:border-primary-500 hover:border-grey-600">
          <img src={searchIcon} alt="" className="size-5 shrink-0" />
          <input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by name or email"
            aria-label="Search by name or email"
            className="h-[22px] min-w-0 flex-1 bg-transparent text-sm leading-[22px] text-grey-1000 outline-none placeholder:text-grey-700"
          />
        </label>
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
      <button
        type="button"
        className="flex h-8 shrink-0 items-center justify-center gap-2 rounded-md bg-primary-500 py-[5px] pr-4 pl-3 text-sm leading-[22px] font-semibold text-white hover:bg-primary-600"
      >
        <img src={addIcon} alt="" className="size-5" />
        Add user
      </button>
    </div>
  )
}
