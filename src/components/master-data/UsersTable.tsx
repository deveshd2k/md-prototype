import { DataTable } from '@/components/master-data/DataTable'
import { userColumns } from '@/components/master-data/user-columns'
import type { Sort } from '@/lib/table'
import type { User } from '@/types/user'

export type UserSort = Sort<keyof User & string>

type UsersTableProps = {
  status: 'pending' | 'error' | 'success'
  errorMessage?: string
  users: User[]
  hasAnyUsers: boolean
  sort: UserSort
  onSortChange: (sort: UserSort) => void
  selectedIds: Set<string>
  onSelectionChange: (ids: Set<string>) => void
  onRowClick: (user: User) => void
  search: string
}

export function UsersTable({ errorMessage, users, hasAnyUsers, search, ...props }: UsersTableProps) {
  return (
    <DataTable
      {...props}
      rows={users}
      columns={userColumns}
      searchQuery={search}
      errorMessage={`Couldn’t load users. ${errorMessage ?? ''}`}
      loadingMessage="Loading users…"
      emptyMessage={
        hasAnyUsers
          ? 'No users match your search or filters.'
          : 'No users yet. Use Add user to add people from your organisation.'
      }
      rowLabel={(user) => user.full_name}
      selectAllLabel="Select all users on this page"
    />
  )
}
