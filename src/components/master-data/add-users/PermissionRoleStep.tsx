import { AddingSummary } from '@/components/master-data/add-users/AddingSummary'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ListItem } from '@/components/ui/list-item'
import { useRoles } from '@/data/roles'
import type { OrgUser } from '@/types/org-user'

type PermissionRoleStepProps = {
  people: OrgUser[] // the users picked in step 1
  roleId: string | null
  onRoleChange: (roleId: string) => void
}

// Add users · step 2: choose one permission role for everyone being added
export function PermissionRoleStep({ people, roleId, onRoleChange }: PermissionRoleStepProps) {
  const { data: roles = [], status, error } = useRoles()

  return (
    <div className="flex min-h-0 flex-1 flex-col pt-6">
      <AddingSummary people={people} />
      <div className="mt-5 h-px shrink-0 bg-grey-300" />
      <p className="mt-5 text-sm leading-[22px] text-grey-1000">
        Select a permission role. You’ll define where it applies in the next step.
      </p>
      <div className="scrollbar-thin mt-5 min-h-0 flex-1 overflow-y-auto">
        {status === 'pending' && <p className="px-2 text-sm text-grey-700">Loading roles…</p>}
        {status === 'error' && <p className="px-2 text-sm text-grey-700">Couldn’t load roles. {error.message}</p>}
        {status === 'success' && (
          <RadioGroup
            value={roleId ?? ''}
            onValueChange={onRoleChange}
            aria-label="Permission role"
            className="flex flex-col gap-1"
          >
            {roles.map((role) => (
              <ListItem
                key={role.id}
                leading={<RadioGroupItem value={role.id} />}
                title={role.name}
                subtitle={role.description}
                selected={role.id === roleId}
              />
            ))}
          </RadioGroup>
        )}
      </div>
    </div>
  )
}

