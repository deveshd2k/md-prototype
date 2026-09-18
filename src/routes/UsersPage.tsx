import { useMemo, useState } from 'react'
import { AddUsersDialog } from '@/components/master-data/add-users/AddUsersDialog'
import { TablePagination } from '@/components/master-data/TablePagination'
import { UserDetailsSheet } from '@/components/master-data/UserDetailsSheet'
import { UsersTable, type UserSort } from '@/components/master-data/UsersTable'
import { UsersToolbar, type UserFilters } from '@/components/master-data/UsersToolbar'
import { SettingsBar } from '@/components/layout/SettingsBar'
import { useUsers } from '@/data/users'
import { matchesSearchAndFilters, sortRows, uniqueSorted } from '@/lib/table'
import type { User } from '@/types/user'

const noFilters: UserFilters = { agency: [], department: [], location: [] }

// Settings → Users (Figma: "Settings - users - user details")
export function UsersPage() {
  const { data: allUsers = [], status, error } = useUsers()

  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState<UserFilters>(noFilters)
  const [sort, setSort] = useState<UserSort>(null)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [addOpen, setAddOpen] = useState(false)
  const [openUser, setOpenUser] = useState<User | null>(null)

  const filterOptions = useMemo<UserFilters>(
    () => ({
      agency: uniqueSorted(allUsers, 'agency'),
      department: uniqueSorted(allUsers, 'department'),
      location: uniqueSorted(allUsers, 'location'),
    }),
    [allUsers],
  )

  const visibleUsers = useMemo(
    () => sortRows(allUsers.filter((user) => matchesSearchAndFilters(user, search, filters)), sort),
    [allUsers, search, filters, sort],
  )

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
          onAddUser={() => setAddOpen(true)}
        />
        <section className="mt-4 rounded-lg bg-white px-4 pt-3 pb-4 shadow-card">
          <UsersTable
            status={status}
            errorMessage={error?.message}
            users={pageUsers}
            hasAnyUsers={allUsers.length > 0}
            sort={sort}
            onSortChange={setSort}
            selectedIds={selectedIds}
            onSelectionChange={setSelectedIds}
            onRowClick={setOpenUser}
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
      <AddUsersDialog open={addOpen} onOpenChange={setAddOpen} />
      <UserDetailsSheet user={openUser} onOpenChange={(open) => !open && setOpenUser(null)} />
    </>
  )
}
