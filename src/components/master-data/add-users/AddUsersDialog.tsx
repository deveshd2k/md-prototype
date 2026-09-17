import { useState } from 'react'
import { AccessScopeStep } from '@/components/master-data/add-users/AccessScopeStep'
import { PermissionRoleStep } from '@/components/master-data/add-users/PermissionRoleStep'
import { SelectUsersStep } from '@/components/master-data/add-users/SelectUsersStep'
import { ActionButton, ChevronLeftIcon } from '@/components/ui/action-button'
import { FullScreenModal } from '@/components/ui/full-screen-modal'
import { RegularButton } from '@/components/ui/regular-button'
import { Stepper, type StepStatus } from '@/components/ui/stepper'
import { useToast } from '@/components/ui/toast-context'
import { useAddUsers } from '@/data/add-users'
import { useRoles } from '@/data/roles'
import { useScopeOptions, useScopeTypes } from '@/data/scopes'
import { useAvailableOrgUsers } from '@/data/users'
import { hasAnyScope, scopesPayload } from '@/lib/scopes'
import type { RoleScopes } from '@/types/roles'

const stepLabels = ['Users', 'Permission roles', 'Access scope']
const lastStep = stepLabels.length - 1

type AddUsersDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

// "Add users" flow: pick people → assign a permission role → set access scope → save.
// The flow is only mounted while open, so every visit starts fresh.
export function AddUsersDialog({ open, onOpenChange }: AddUsersDialogProps) {
  return open ? <AddUsersFlow onClose={() => onOpenChange(false)} /> : null
}

function AddUsersFlow({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0)
  const [furthest, setFurthest] = useState(0) // furthest step opened so far
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [roleId, setRoleId] = useState<string | null>(null)
  const [scopes, setScopes] = useState<RoleScopes>({})
  const { data: directory = [] } = useAvailableOrgUsers()
  const { data: roles = [] } = useRoles()
  const { data: scopeTypes = [] } = useScopeTypes()
  const { data: scopeOptions = [] } = useScopeOptions()
  const addUsers = useAddUsers()
  const { showSuccess } = useToast()

  const people = directory.filter((person) => selectedIds.has(person.id))
  const role = roles.find((candidate) => candidate.id === roleId)

  // Whether each step's input is complete
  const valid = [selectedIds.size > 0, roleId !== null, hasAnyScope(scopes)]
  const steps: StepStatus[] = stepLabels.map((label, index) => ({
    label,
    completed: valid[index] && index < furthest,
    reachable: index <= furthest && valid.slice(0, index).every(Boolean),
  }))

  const goTo = (index: number) => {
    setStep(index)
    setFurthest((current) => Math.max(current, index))
  }

  const save = () => {
    if (!roleId) return
    addUsers.mutate(
      { orgUserIds: [...selectedIds], roleId, scopes: scopesPayload(scopeTypes, scopeOptions, scopes) },
      {
        onSuccess: () => {
          showSuccess(
            <>
              <strong className="font-semibold">
                {people.length === 1 ? people[0].full_name : `${people.length} users`}
              </strong>{' '}
              added with permission role
            </>,
          )
          onClose()
        },
      },
    )
  }

  const count = selectedIds.size
  const primaryLabel = step === lastStep ? `Add ${count} ${count === 1 ? 'user' : 'users'}` : 'Continue'

  return (
    <FullScreenModal
      open
      onOpenChange={(open) => !open && !addUsers.isPending && onClose()}
      title="Add users"
      leftActions={
        <>
          {step > 0 && (
            <ActionButton icon={<ChevronLeftIcon />} disabled={addUsers.isPending} onClick={() => setStep(step - 1)}>
              Back
            </ActionButton>
          )}
          {addUsers.isError && (
            <p role="alert" className="text-sm leading-[22px] text-danger-500">
              Couldn’t add users. {addUsers.error.message}
            </p>
          )}
        </>
      }
      actions={
        <>
          <RegularButton variant="secondary" disabled={addUsers.isPending} onClick={onClose}>
            Cancel
          </RegularButton>
          <RegularButton
            disabled={!valid[step] || addUsers.isPending}
            onClick={step === lastStep ? save : () => goTo(step + 1)}
          >
            {addUsers.isPending ? 'Adding…' : primaryLabel}
          </RegularButton>
        </>
      }
    >
      <Stepper steps={steps} current={step} />
      {step === 0 && <SelectUsersStep selectedIds={selectedIds} onSelectionChange={setSelectedIds} />}
      {step === 1 && <PermissionRoleStep people={people} roleId={roleId} onRoleChange={setRoleId} />}
      {step === 2 && (
        <AccessScopeStep people={people} roleName={role?.name ?? ''} scopes={scopes} onScopesChange={setScopes} />
      )}
    </FullScreenModal>
  )
}
