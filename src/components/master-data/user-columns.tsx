import infoIcon from '@/assets/figma/info.svg'
import type { Column } from '@/components/master-data/DataTable'
import { Highlight } from '@/components/ui/highlight'
import { Switch } from '@/components/ui/switch'
import type { User } from '@/types/user'

// Figma column order. Only fields that exist in Supabase.
export const userColumns: Column<User>[] = [
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
    render: (user, searchQuery) => (
      <div className="flex items-center gap-2">
        <Switch
          checked={user.time_lock}
          aria-label={`Time Lock for ${user.full_name}`}
          aria-readonly
          tabIndex={-1}
          className="pointer-events-none h-5 w-[34px] p-px data-unchecked:bg-grey-500"
        />
        <span className="text-sm leading-[22px] text-grey-1000">
          <Highlight text={user.time_lock ? 'On' : 'Off'} query={searchQuery} />
        </span>
      </div>
    ),
  },
]

// The search looks at every column shown in the table
export const userSearchKeys = userColumns.map((column) => column.key)
