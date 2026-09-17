import { useState, type ReactNode } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import type { Sort } from '@/lib/table'

export type Column<T> = {
  key: keyof T & string
  label: string
  width: number
  strong?: boolean // darker text (Grey 1000) instead of Grey 900
  render?: (row: T) => ReactNode
  headerExtra?: ReactNode
}

type DataTableProps<T extends { id: string }> = {
  rows: T[]
  columns: Column<T>[] // the first column is pinned next to the checkboxes
  status: 'pending' | 'error' | 'success'
  errorMessage?: string
  loadingMessage: string
  emptyMessage: string
  rowLabel: (row: T) => string
  selectAllLabel: string
  sort: Sort<keyof T & string>
  onSortChange: (sort: Sort<keyof T & string>) => void
  selectedIds: Set<string>
  onSelectionChange: (ids: Set<string>) => void
  className?: string // scroll container; add a height + overflow-y to get a sticky header
}

const headClass = 'sticky top-0 z-20 h-12 border-b border-grey-400 bg-white px-4 text-left align-middle'
// Hovered and selected rows share the same background
const cellClass =
  'h-12 border-b border-grey-300 bg-white px-4 align-middle group-hover:bg-grey-200 group-data-selected:bg-grey-200'
// The pinned column casts a shadow to the right once the table is scrolled sideways
const pinnedEdgeClass = '[clip-path:inset(0_-16px_0_0)] in-data-[scrolled=true]:shadow-pinned'

// Figma "Table" pattern: checkbox column, sortable headers, pinned first column
export function DataTable<T extends { id: string }>({
  rows,
  columns,
  status,
  errorMessage,
  loadingMessage,
  emptyMessage,
  rowLabel,
  selectAllLabel,
  sort,
  onSortChange,
  selectedIds,
  onSelectionChange,
  className = 'overflow-x-auto pb-3',
}: DataTableProps<T>) {
  const [scrolled, setScrolled] = useState(false)
  const [pinned, ...rest] = columns

  const selectedCount = rows.filter((row) => selectedIds.has(row.id)).length
  const headerChecked =
    rows.length > 0 && selectedCount === rows.length ? true : selectedCount > 0 ? 'indeterminate' : false

  const toggleAll = (checked: boolean) => {
    const next = new Set(selectedIds)
    rows.forEach((row) => (checked ? next.add(row.id) : next.delete(row.id)))
    onSelectionChange(next)
  }

  const toggleRow = (id: string, checked: boolean) => {
    const next = new Set(selectedIds)
    if (checked) next.add(id)
    else next.delete(id)
    onSelectionChange(next)
  }

  // Click cycles: ascending → descending → unsorted
  const cycleSort = (key: keyof T & string) => {
    if (sort?.key !== key) onSortChange({ key, direction: 'asc' })
    else if (sort.direction === 'asc') onSortChange({ key, direction: 'desc' })
    else onSortChange(null)
  }

  const header = (column: Column<T>) => (
    <button
      type="button"
      onClick={() => cycleSort(column.key)}
      className="flex w-full items-center gap-1 overflow-hidden text-sm leading-[22px] font-semibold whitespace-nowrap text-grey-1000"
      aria-sort={sort?.key === column.key ? (sort.direction === 'asc' ? 'ascending' : 'descending') : undefined}
    >
      {column.label}
      {column.headerExtra}
      <SortIcon direction={sort?.key === column.key ? sort.direction : undefined} />
    </button>
  )

  const cell = (column: Column<T>, row: T) =>
    column.render ? (
      column.render(row)
    ) : (
      <p className={`truncate text-sm leading-[22px] ${column.strong ? 'text-grey-1000' : 'text-grey-900'}`}>
        {String(row[column.key])}
      </p>
    )

  const colSpan = columns.length + 1

  return (
    <div
      data-scrolled={scrolled}
      onScroll={(event) => setScrolled(event.currentTarget.scrollLeft > 0)}
      className={`scrollbar-thin ${className}`}
    >
      <table className="w-full min-w-max table-fixed border-separate border-spacing-0">
        <colgroup>
          <col className="w-9" />
          {columns.map((column) => (
            <col key={column.key} style={{ width: column.width }} />
          ))}
        </colgroup>
        <thead>
          <tr>
            <th className={`${headClass} left-0 z-30 pr-0 pl-4`}>
              <Checkbox
                aria-label={selectAllLabel}
                checked={headerChecked}
                onCheckedChange={(checked) => toggleAll(checked === true)}
               
              />
            </th>
            <th className={`${headClass} left-9 z-30 ${pinnedEdgeClass}`}>{header(pinned)}</th>
            {rest.map((column) => (
              <th key={column.key} className={headClass}>
                {header(column)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {status === 'pending' && <MessageRow colSpan={colSpan}>{loadingMessage}</MessageRow>}
          {status === 'error' && <MessageRow colSpan={colSpan}>{errorMessage}</MessageRow>}
          {status === 'success' && rows.length === 0 && <MessageRow colSpan={colSpan}>{emptyMessage}</MessageRow>}
          {status === 'success' &&
            rows.map((row) => {
              const selected = selectedIds.has(row.id)
              return (
                <tr key={row.id} className="group" data-selected={selected || undefined}>
                  <td className={`${cellClass} sticky left-0 z-10 pr-0 pl-4`}>
                    <Checkbox
                      aria-label={`Select ${rowLabel(row)}`}
                      checked={selected}
                      onCheckedChange={(checked) => toggleRow(row.id, checked === true)}
                     
                    />
                  </td>
                  <td className={`${cellClass} sticky left-9 z-10 ${pinnedEdgeClass}`}>{cell(pinned, row)}</td>
                  {rest.map((column) => (
                    <td key={column.key} className={cellClass}>
                      {cell(column, row)}
                    </td>
                  ))}
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
