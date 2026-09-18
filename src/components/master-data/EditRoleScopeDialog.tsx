import { useState } from 'react'
import roleIcon from '@/assets/figma/role.svg'
import userIcon from '@/assets/figma/user.svg'
import { ScopeCards } from '@/components/master-data/ScopeFields'
import { ConfirmModal } from '@/components/ui/confirm-modal'
import { RegularButton } from '@/components/ui/regular-button'
import { SideModal } from '@/components/ui/side-modal'
import { useToast } from '@/components/ui/toast-context'
import { useAssignRole } from '@/data/assign-role'
import { useScopeOptions, useScopeTypes } from '@/data/scopes'
import type { AssignedRole } from '@/data/user-roles'
import { expandScopes, hasAnyScope, scopesPayload } from '@/lib/scopes'
import type { RoleScopes } from '@/types/roles'
import type { User } from '@/types/user'

type EditRoleScopeDialogProps = {
  user: User
  assigned: AssignedRole | null // the role being edited
  onClose: () => void
}

// "Edit role access scope": side modal with the role's current scope pre-selected
export function EditRoleScopeDialog({ user, assigned, onClose }: EditRoleScopeDialogProps) {
  const { data: scopeTypes = [] } = useScopeTypes()
  const { data: scopeOptions = [] } = useScopeOptions()
  const ready = scopeTypes.length > 0 && scopeOptions.length > 0
  // Wait for the lists before filling the form, so "All" can be expanded into its values
  if (!assigned || !ready) return null
  return (
    <EditRoleScopeForm
      key={assigned.id}
      user={user}
      assigned={assigned}
      scopeTypes={scopeTypes}
      scopeOptions={scopeOptions}
      onClose={onClose}
    />
  )
}

function EditRoleScopeForm({
  user,
  assigned,
  scopeTypes,
  scopeOptions,
  onClose,
}: {
  user: User
  assigned: AssignedRole
  scopeTypes: ReturnType<typeof useScopeTypes>['data'] & object
  scopeOptions: ReturnType<typeof useScopeOptions>['data'] & object
  onClose: () => void
}) {
  const [scopes, setScopes] = useState<RoleScopes>(() => expandScopes(scopeTypes, scopeOptions, assigned.scopes))
  const [confirmClose, setConfirmClose] = useState(false)
  const saveScope = useAssignRole()
  const { showSuccess } = useToast()

  const save = () =>
    saveScope.mutate(
      { userId: user.id, roleId: assigned.role_id, scopes: scopesPayload(scopeTypes, scopeOptions, scopes) },
      {
        onSuccess: () => {
          showSuccess(`Access scope updated for ${assigned.role.name}`)
          onClose()
        },
      },
    )

  const requestClose = () => {
    if (!saveScope.isPending) setConfirmClose(true)
  }

  return (
    <SideModal
      open
      onOpenChange={(next) => !next && requestClose()}
      title="Edit role access scope"
      leftActions={
        saveScope.isError && (
          <p role="alert" className="text-sm leading-[22px] text-danger-500">
            Couldn’t save the access scope. {saveScope.error.message}
          </p>
        )
      }
      actions={
        <>
          <RegularButton variant="secondary" disabled={saveScope.isPending} onClick={requestClose}>
            Cancel
          </RegularButton>
          <RegularButton disabled={!hasAnyScope(scopes) || saveScope.isPending} onClick={save}>
            {saveScope.isPending ? 'Saving…' : 'Save'}
          </RegularButton>
        </>
      }
    >
      <dl className="flex flex-col gap-2">
        <div className="flex items-start gap-2">
          <dt className="flex w-[120px] shrink-0 items-center gap-2 text-sm leading-[22px] text-grey-800">
            <img src={userIcon} alt="" className="size-5" />
            User
          </dt>
          <dd className="text-sm leading-[22px] font-semibold text-grey-1000">{user.full_name}</dd>
        </div>
        <div className="flex items-start gap-2">
          <dt className="flex w-[120px] shrink-0 items-center gap-2 text-sm leading-[22px] text-grey-800">
            <img src={roleIcon} alt="" className="size-5" />
            Role
          </dt>
          <dd className="flex flex-col">
            <span className="text-sm leading-[22px] font-semibold text-grey-1000">{assigned.role.name}</span>
            <span className="text-sm leading-[22px] text-grey-800">{assigned.role.description}</span>
          </dd>
        </div>
      </dl>
      <div className="mt-5 h-px bg-grey-300" />
      <p className="mt-5 text-sm leading-[22px] text-grey-1000">
        Edit where this role applies. Choose specific values to limit access, or select All to include every value in
        that category.
      </p>
      <div className="mt-5 flex flex-col gap-5">
        <ScopeCards
          types={scopeTypes}
          options={scopeOptions}
          scopes={scopes}
          onScopesChange={setScopes}
          titles={{ client_brand: 'Client' }}
          describe={(type) => `Choose specific ${type.label}`}
          fieldWidth="w-[400px]"
        />
      </div>
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
