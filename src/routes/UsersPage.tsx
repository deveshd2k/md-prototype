import { useMemo, useState } from 'react'
import { TablePagination } from '@/components/master-data/TablePagination'
import { UsersTable, type Sort } from '@/components/master-data/UsersTable'
import { UsersToolbar, type UserFilters } from '@/components/master-data/UsersToolbar'
import { SettingsBar } from '@/components/layout/SettingsBar'
import { useUsers } from '@/data/users'
import type { User } from '@/types/user'

const noFilters: UserFilters = { agency: [], department: [], location: [] }

const uniqueSorted = (users: User[], key: keyof UserFilters) =>
  [...new Set(users.map((user) => user[key]))].sort((a, b) => a.localeCompare(b))

// Settings → Users (Figma: "Settings - users - user details")
export function UsersPage() {
  const { data: allUsers = [], status, error } = useUsers()

  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState<UserFilters>(noFilters)
  const [sort, setSort] = useState<Sort>(null)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  const filterOptions = useMemo<UserFilters>(
    () => ({
      agency: uniqueSorted(allUsers, 'agency'),
      department: uniqueSorted(allUsers, 'department'),
      location: uniqueSorted(allUsers, 'location'),
    }),
    [allUsers],
  )

  const visibleUsers = useMemo(() => {
    const query = search.trim().toLowerCase()
    const matches = allUsers.filter(
      (user) =>
        (!query || user.full_name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query)) &&
        (filters.agency.length === 0 || filters.agency.includes(user.agency)) &&
        (filters.department.length === 0 || filters.department.includes(user.department)) &&
        (filters.location.length === 0 || filters.location.includes(user.location)),
    )
    if (!sort) return matches
    const factor = sort.direction === 'asc' ? 1 : -1
    return [...matches].sort((a, b) => {
      const left = a[sort.key]
      const right = b[sort.key]
      const result =
        typeof left === 'boolean' ? Number(left) - Number(right) : String(left).localeCompare(String(right))
      return result * factor
    })
  }, [allUsers, search, filters, sort])

  const pageCount = Math.max(1, Math.ceil(visibleUsers.length / pageSize))
  const currentPage = Math.min(page, pageCount)
  const pageUsers = visibleUsers.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  return (
    <>
      <SettingsBar />
      <div className="px-[38px] pt-6 pb-10">
        <UsersToolbar
          search={search}
          onSearchChange={(value) => {
            setSearch(value)
            setPage(1)
          }}
          filters={filters}
          filterOptions={filterOptions}
          onFiltersChange={(next) => {
            setFilters(next)
            setPage(1)
          }}
        />
        <section className="mt-4 rounded-lg bg-white px-4 pt-3 pb-4 shadow-card">
          <UsersTable
            status={status}
            errorMessage={error?.message}
            users={pageUsers}
            sort={sort}
            onSortChange={setSort}
            selectedIds={selectedIds}
            onSelectionChange={setSelectedIds}
          />
          <div className="mt-3">
            <TablePagination
              page={currentPage}
              pageSize={pageSize}
              total={visibleUsers.length}
              onPageChange={setPage}
              onPageSizeChange={(size) => {
                setPageSize(size)
                setPage(1)
              }}
            />
          </div>
        </section>
      </div>
    </>
  )
}
