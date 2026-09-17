import infoIcon from '@/assets/figma/info.svg'
import { DataTable, type Column } from '@/components/master-data/DataTable'
import { Switch } from '@/components/ui/switch'
import type { Sort } from '@/lib/table'
import type { User } from '@/types/user'

export type UserSort = Sort<keyof User & string>

// Figma column order. Only fields that exist in Supabase.
const columns: Column<User>[] = [
  { key: 'full_name', label: 'User', width: 200, strong: true },
  { key: 'email', label: 'Email address', width: 250, strong: true },
  { key: 'agency', label: 'User Agency', width: 160, strong: true },
  { key: 'business_unit', label: 'Business Unit', width: 200 },
  { key: 'department', label: 'Department', width: 200 },
  { key: 'location', label: 'Location', width: 200 },
  { key: 'job_title', label: 'Job Title', width: 200 },
  {
    key: 'time_lock',
    label: 'Time Lock',
    width: 150,
    headerExtra: <img src={infoIcon} alt="" className="size-5" />,
    // Read-only for now: editing requires a signed-in user
    render: (user) => (
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
    ),
  },
]

type UsersTableProps = {
  status: 'pending' | 'error' | 'success'
  errorMessage?: string
  users: User[]
  hasAnyUsers: boolean
  sort: UserSort
  onSortChange: (sort: UserSort) => void
  selectedIds: Set<string>
  onSelectionChange: (ids: Set<string>) => void
}

export function UsersTable({ errorMessage, users, hasAnyUsers, ...props }: UsersTableProps) {
  return (
    <DataTable
      {...props}
      rows={users}
      columns={columns}
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
