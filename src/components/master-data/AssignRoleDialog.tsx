import { useState } from 'react'
import roleIcon from '@/assets/figma/role.svg'
import userIcon from '@/assets/figma/user.svg'
import { ScopeCards, ScopeSummaryGroups } from '@/components/master-data/ScopeFields'
import { ActionButton, ChevronLeftIcon } from '@/components/ui/action-button'
import { ConfirmModal } from '@/components/ui/confirm-modal'
import { InlineMessage } from '@/components/ui/inline-message'
import { ListItem } from '@/components/ui/list-item'
import { Pill } from '@/components/ui/pill'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { RegularButton } from '@/components/ui/regular-button'
import { SideModal } from '@/components/ui/side-modal'
import { Stepper, type StepStatus } from '@/components/ui/stepper'
import { useToast } from '@/components/ui/toast-context'
import { useAssignRole } from '@/data/assign-role'
import { useRoles } from '@/data/roles'
import { useScopeOptions, useScopeTypes } from '@/data/scopes'
import { hasAnyScope, scopesPayload } from '@/lib/scopes'
import type { RoleScopes } from '@/types/roles'
import type { User } from '@/types/user'

const stepLabels = ['Permission roles', 'Access scope', 'Summary']
const lastStep = stepLabels.length - 1

type AssignRoleDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: User
  assignedRoleIds: string[] // roles this user already has
}

// "Assign permission roles": a second side modal over User details
export function AssignRoleDialog({ open, onOpenChange, user, assignedRoleIds }: AssignRoleDialogProps) {
  return open ? (
    <AssignRoleFlow user={user} assignedRoleIds={assignedRoleIds} onClose={() => onOpenChange(false)} />
  ) : null
}

function AssignRoleFlow({
  user,
  assignedRoleIds,
  onClose,
}: {
  user: User
  assignedRoleIds: string[]
  onClose: () => void
}) {
  const [step, setStep] = useState(0)
  const [furthest, setFurthest] = useState(0)
  const [roleId, setRoleId] = useState<string | null>(null)
  const [scopes, setScopes] = useState<RoleScopes>({})
  const { data: roles = [] } = useRoles()
  const { data: scopeTypes = [] } = useScopeTypes()
  const { data: scopeOptions = [] } = useScopeOptions()
  const assignRole = useAssignRole()
  const { showSuccess } = useToast()
  const [confirmClose, setConfirmClose] = useState(false)

  const available = roles.filter((role) => !assignedRoleIds.includes(role.id))
  const alreadyAssigned = roles.filter((role) => assignedRoleIds.includes(role.id))
  const role = roles.find((candidate) => candidate.id === roleId)

  const valid = [roleId !== null, hasAnyScope(scopes), hasAnyScope(scopes)]
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
    assignRole.mutate(
      { userId: user.id, roleId, scopes: scopesPayload(scopeTypes, scopeOptions, scopes) },
      {
        onSuccess: () => {
          showSuccess(
            <>
              <strong className="font-semibold">{role?.name}</strong> role assigned
            </>,
          )
          onClose()
        },
      },
    )
  }

  // Cancel, the ✕ and Esc all ask before throwing away what has been filled in
  const requestClose = () => {
    if (assignRole.isPending) return
    setConfirmClose(true)
  }

  const userPill = <Pill icon={<img src={userIcon} alt="" className="size-5 shrink-0" />}>{user.full_name}</Pill>

  return (
    <SideModal
      open
      onOpenChange={(next) => !next && requestClose()}
      title="Assign permission roles"
      leftActions={
        <>
          {step > 0 && (
            <ActionButton icon={<ChevronLeftIcon />} disabled={assignRole.isPending} onClick={() => setStep(step - 1)}>
              Back
            </ActionButton>
          )}
          {assignRole.isError && (
            <p role="alert" className="text-sm leading-[22px] text-danger-500">
              Couldn’t assign the role. {assignRole.error.message}
            </p>
          )}
        </>
      }
      actions={
        <>
          <RegularButton variant="secondary" disabled={assignRole.isPending} onClick={requestClose}>
            Cancel
          </RegularButton>
          <RegularButton
            disabled={!valid[step] || assignRole.isPending}
            onClick={step === lastStep ? save : () => goTo(step + 1)}
          >
            {assignRole.isPending ? 'Assigning…' : step === lastStep ? 'Assign permission role' : 'Continue'}
          </RegularButton>
        </>
      }
    >
      <Stepper steps={steps} current={step} />

      {step === 0 && (
        <div className="mt-5 flex flex-col gap-5">
          <div className="flex flex-wrap gap-2">{userPill}</div>
          <p className="text-sm leading-[22px] text-grey-1000">
            Select a permission role. You’ll define where it applies in the next step.
          </p>
          <div className="flex flex-col gap-2">
            <p className="text-sm leading-[22px] font-semibold text-grey-1000">Available</p>
            {available.length === 0 ? (
              <p className="text-sm leading-[22px] text-grey-700">This user already has every permission role.</p>
            ) : (
              <RadioGroup
                value={roleId ?? ''}
                onValueChange={setRoleId}
                aria-label="Permission role"
                className="flex flex-col gap-1"
              >
                {available.map((item) => (
                  <ListItem
                    key={item.id}
                    leading={<RadioGroupItem value={item.id} />}
                    title={item.name}
                    subtitle={item.description}
                    selected={item.id === roleId}
                  />
                ))}
              </RadioGroup>
            )}
          </div>
          {alreadyAssigned.length > 0 && (
            <div className="flex flex-col gap-2">
              <p className="text-sm leading-[22px] font-semibold text-grey-1000">Already assigned</p>
              <div className="flex flex-col gap-1">
                {alreadyAssigned.map((item) => (
                  <ListItem key={item.id} title={item.name} subtitle={item.description} disabled />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {step === 1 && (
        <div className="mt-5 flex flex-col gap-5">
          <div className="flex flex-wrap gap-2">
            {userPill}
            {role && <Pill icon={<img src={roleIcon} alt="" className="size-5 shrink-0" />}>{role.name}</Pill>}
          </div>
          <div className="h-px bg-grey-300" />
          <p className="text-sm leading-[22px] text-grey-1000">
            Build the access scope by selecting one or more categories. You can start with any category.
          </p>
          <InlineMessage title="How this works" dismissible>
            Select at least one category. You can choose categories in any order. Categories left as Not selected are
            ignored. All includes current and future values in that category.
          </InlineMessage>
          <ScopeCards
            types={scopeTypes}
            options={scopeOptions}
            scopes={scopes}
            onScopesChange={setScopes}
            titles={{ organisation: 'Organisation filters', client_brand: 'Client and brand filters' }}
            fieldWidth="w-[400px]"
          />
        </div>
      )}

      {step === 2 && (
        <div className="mt-5 flex flex-col gap-5">
          <h3 className="text-base leading-6 font-semibold text-grey-1000">Review permission assignment</h3>
          <div className="flex flex-col gap-2">
            <p className="text-sm leading-[22px] font-semibold text-grey-800">User</p>
            <div className="flex flex-wrap gap-2">{userPill}</div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm leading-[22px] font-semibold text-grey-800">Permission role</p>
            <div className="flex flex-wrap gap-2">
              {role && <Pill icon={<img src={roleIcon} alt="" className="size-5 shrink-0" />}>{role.name}</Pill>}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col">
              <h4 className="text-base leading-6 font-semibold text-grey-1000">Access scope</h4>
              <p className="text-xs leading-5 text-grey-800">Access will apply where these selected categories match.</p>
            </div>
            <ScopeSummaryGroups types={scopeTypes} options={scopeOptions} scopes={scopes} />
          </div>
        </div>
      )}
      <ConfirmModal
        open={confirmClose}
        onOpenChange={setConfirmClose}
        title="Close without saving?"
        description="All changes will be lost. Do you really want to close without saving it?"
        confirmLabel="Close without saving"
        onConfirm={onClose}
      />
    </SideModal>
  )
}
