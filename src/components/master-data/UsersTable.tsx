import { useState, type ReactNode } from 'react'
import infoIcon from '@/assets/figma/info.svg'
import { Checkbox } from '@/components/ui/checkbox'
import { Switch } from '@/components/ui/switch'
import type { User } from '@/types/user'

export type SortKey = keyof Pick<
  User,
  'full_name' | 'email' | 'agency' | 'business_unit' | 'department' | 'location' | 'job_title' | 'time_lock'
>
export type Sort = { key: SortKey; direction: 'asc' | 'desc' } | null

// Scrollable columns, in Figma order. Only fields that exist in Supabase.
const columns: { key: Exclude<SortKey, 'full_name' | 'time_lock'>; label: string; width: number; strong?: boolean }[] = [
  { key: 'email', label: 'Email address', width: 250, strong: true },
  { key: 'agency', label: 'User Agency', width: 160, strong: true },
  { key: 'business_unit', label: 'Business Unit', width: 200 },
  { key: 'department', label: 'Department', width: 200 },
  { key: 'location', label: 'Location', width: 200 },
  { key: 'job_title', label: 'Job Title', width: 200 },
]

const headClass = 'h-12 border-b border-grey-400 bg-white px-4 text-left align-middle'
const cellClass = 'h-12 border-b border-grey-300 bg-white px-4 align-middle group-hover:bg-grey-200'
// Frozen columns: the "User" column casts a shadow to the right once the table is scrolled sideways
const pinnedEdgeClass = '[clip-path:inset(0_-16px_0_0)] in-data-[scrolled=true]:shadow-pinned'

type UsersTableProps = {
  status: 'pending' | 'error' | 'success'
  errorMessage?: string
  users: User[]
  sort: Sort
  onSortChange: (sort: Sort) => void
  selectedIds: Set<string>
  onSelectionChange: (ids: Set<string>) => void
}

export function UsersTable({ status, errorMessage, users, sort, onSortChange, selectedIds, onSelectionChange }: UsersTableProps) {
  const [scrolled, setScrolled] = useState(false)

  const selectedOnPage = users.filter((user) => selectedIds.has(user.id)).length
  const headerChecked = users.length > 0 && selectedOnPage === users.length ? true : selectedOnPage > 0 ? 'indeterminate' : false

  const togglePage = (checked: boolean) => {
    const next = new Set(selectedIds)
    users.forEach((user) => (checked ? next.add(user.id) : next.delete(user.id)))
    onSelectionChange(next)
  }

  const toggleRow = (id: string, checked: boolean) => {
    const next = new Set(selectedIds)
    if (checked) next.add(id)
    else next.delete(id)
    onSelectionChange(next)
  }

  // Click cycles: ascending → descending → unsorted
  const cycleSort = (key: SortKey) => {
    if (sort?.key !== key) onSortChange({ key, direction: 'asc' })
    else if (sort.direction === 'asc') onSortChange({ key, direction: 'desc' })
    else onSortChange(null)
  }

  const sortHeader = (key: SortKey, label: string, extra?: ReactNode) => (
    <button
      type="button"
      onClick={() => cycleSort(key)}
      className="flex w-full items-center gap-1 overflow-hidden text-sm leading-[22px] font-semibold whitespace-nowrap text-grey-1000"
      aria-sort={sort?.key === key ? (sort.direction === 'asc' ? 'ascending' : 'descending') : undefined}
    >
      {label}
      {extra}
      <SortIcon direction={sort?.key === key ? sort.direction : undefined} />
    </button>
  )

  const colSpan = columns.length + 3

  return (
    <div
      data-scrolled={scrolled}
      onScroll={(event) => setScrolled(event.currentTarget.scrollLeft > 0)}
      className="scrollbar-thin overflow-x-auto pb-3"
    >
      <table className="w-full min-w-max table-fixed border-separate border-spacing-0">
        <colgroup>
          <col className="w-9" />
          <col className="w-[200px]" />
          {columns.map((column) => (
            <col key={column.key} style={{ width: column.width }} />
          ))}
          <col className="w-[150px]" />
        </colgroup>
        <thead>
          <tr>
            <th className={`${headClass} sticky left-0 z-10 pr-0 pl-4`}>
              <Checkbox
                aria-label="Select all users on this page"
                checked={headerChecked}
                onCheckedChange={(checked) => togglePage(checked === true)}
                className="size-5 border-grey-600 bg-white"
              />
            </th>
            <th className={`${headClass} sticky left-9 z-10 ${pinnedEdgeClass}`}>{sortHeader('full_name', 'User')}</th>
            {columns.map((column) => (
              <th key={column.key} className={headClass}>
                {sortHeader(column.key, column.label)}
              </th>
            ))}
            <th className={headClass}>
              {sortHeader('time_lock', 'Time Lock', <img src={infoIcon} alt="" className="size-5" />)}
            </th>
          </tr>
        </thead>
        <tbody>
          {status === 'pending' && <MessageRow colSpan={colSpan}>Loading users…</MessageRow>}
          {status === 'error' && <MessageRow colSpan={colSpan}>Couldn’t load users. {errorMessage}</MessageRow>}
          {status === 'success' && users.length === 0 && (
            <MessageRow colSpan={colSpan}>No users match your search or filters.</MessageRow>
          )}
          {users.map((user) => {
            const selected = selectedIds.has(user.id)
            return (
              <tr key={user.id} className="group" aria-selected={selected}>
                <td className={`${cellClass} sticky left-0 z-10 pr-0 pl-4`}>
                  <Checkbox
                    aria-label={`Select ${user.full_name}`}
                    checked={selected}
                    onCheckedChange={(checked) => toggleRow(user.id, checked === true)}
                    className="size-5 border-grey-600 bg-white"
                  />
                </td>
                <td className={`${cellClass} sticky left-9 z-10 ${pinnedEdgeClass}`}>
                  <p className="truncate text-sm leading-[22px] text-grey-1000">{user.full_name}</p>
                </td>
                {columns.map((column) => (
                  <td key={column.key} className={cellClass}>
                    <p className={`truncate text-sm leading-[22px] ${column.strong ? 'text-grey-1000' : 'text-grey-900'}`}>
                      {user[column.key]}
                    </p>
                  </td>
                ))}
                <td className={cellClass}>
                  {/* Read-only for now: editing requires a signed-in user */}
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={user.time_lock}
                      aria-label={`Time Lock for ${user.full_name}`}
                      aria-readonly
                      tabIndex={-1}
                      className="pointer-events-none h-5 w-[34px] p-px data-unchecked:bg-grey-500"
                    />
                    <span className="text-sm leading-[22px] text-grey-1000">{user.time_lock ? 'On' : 'Off'}</span>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function MessageRow({ colSpan, children }: { colSpan: number; children: ReactNode }) {
  return (
    <tr>
      <td colSpan={colSpan} className="h-24 border-b border-grey-300 px-4 text-sm text-grey-700">
        <span className="sticky left-4">{children}</span>
      </td>
    </tr>
  )
}

// Figma "Table sort" icon; the active direction is darkened
function SortIcon({ direction }: { direction?: 'asc' | 'desc' }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="shrink-0">
      <path d="M10 4L13.4641 8.5H6.5359L10 4Z" className={direction === 'asc' ? 'fill-grey-1000' : 'fill-grey-600'} />
      <path d="M10 16L13.4641 11.5H6.5359L10 16Z" className={direction === 'desc' ? 'fill-grey-1000' : 'fill-grey-600'} />
    </svg>
  )
}
