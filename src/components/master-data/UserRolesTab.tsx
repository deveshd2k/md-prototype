import { useMemo, useState } from 'react'
import addPrimaryIcon from '@/assets/figma/add-primary.svg'
import editIcon from '@/assets/figma/edit.svg'
import moreIcon from '@/assets/figma/more.svg'
import removeIcon from '@/assets/figma/remove-circle.svg'
import subItemsIcon from '@/assets/figma/sub-items.svg'
import { AssignRoleDialog } from '@/components/master-data/AssignRoleDialog'
import { EditRoleScopeDialog } from '@/components/master-data/EditRoleScopeDialog'
import { SearchInput } from '@/components/master-data/SearchInput'
import { ConfirmModal } from '@/components/ui/confirm-modal'
import { Highlight } from '@/components/ui/highlight'
import { ContextMenu } from '@/components/ui/menu'
import { RegularButton } from '@/components/ui/regular-button'
import { useToast } from '@/components/ui/toast-context'
import { useRemoveRole } from '@/data/remove-role'
import { useScopeOptions, useScopeTypes } from '@/data/scopes'
import { useUserRoles, type AssignedRole } from '@/data/user-roles'
import { ALL_VALUES, scopeLevels } from '@/lib/scopes'
import type { ScopeType } from '@/types/roles'
import type { User } from '@/types/user'

// User details · Permission roles tab: one card per role, with the scope it applies to
export function UserRolesTab({ user }: { user: User }) {
  const { data: assigned = [], status, error } = useUserRoles(user.id)
  const [assignOpen, setAssignOpen] = useState(false)
  const [editing, setEditing] = useState<AssignedRole | null>(null)
  const [removing, setRemoving] = useState<AssignedRole | null>(null)
  const removeRole = useRemoveRole()
  const { showSuccess } = useToast()

  const confirmRemove = () => {
    if (!removing) return
    const name = removing.role.name
    removeRole.mutate(
      { userId: user.id, roleId: removing.role_id },
      {
        onSuccess: () => {
          showSuccess(`${name} unassigned from user`)
          setRemoving(null)
        },
      },
    )
  }
  const { data: scopeTypes = [] } = useScopeTypes()
  const { data: scopeOptions = [] } = useScopeOptions()
  const [search, setSearch] = useState('')

  // How many values each option list has, for showing "All (n)"
  const optionCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const option of scopeOptions) counts[option.list] = (counts[option.list] ?? 0) + 1
    return counts
  }, [scopeOptions])

  const cards = useMemo(
    () => assigned.map((item) => ({ item, groups: describeScopes(item, scopeTypes, optionCounts) })),
    [assigned, scopeTypes, optionCounts],
  )

  const query = search.trim().toLowerCase()
  const visible = query
    ? cards.filter(({ item, groups }) =>
        [item.role.name, ...groups.flatMap((group) => group.lines.map((line) => `${line.label} ${line.values}`))]
          .join(' ')
          .toLowerCase()
          .includes(query),
      )
    : cards

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm leading-[22px] text-grey-800">
          {assigned.length === 0
            ? 'Assign predefined permission roles and choose where they apply.'
            : 'View and manage this user’s permission roles.'}
        </p>
        <RegularButton
          size="s"
          variant="secondary"
          onClick={() => setAssignOpen(true)}
          icon={<img src={addPrimaryIcon} alt="" className="size-5" />}
        >
          Assign permission role
        </RegularButton>
      </div>

      {status === 'pending' && <p className="text-sm leading-[22px] text-grey-700">Loading permission roles…</p>}
      {status === 'error' && (
        <p className="text-sm leading-[22px] text-grey-700">Couldn’t load permission roles. {error.message}</p>
      )}

      {status === 'success' && assigned.length === 0 && (
        <div className="flex flex-col items-center gap-2 rounded-lg bg-grey-100 px-4 py-12 text-center">
          <p className="text-base leading-6 font-semibold text-grey-1000">No permission roles yet</p>
          <p className="text-sm leading-[22px] text-grey-900">Assign a role to define what this user can access.</p>
        </div>
      )}

      {status === 'success' && assigned.length > 0 && (
        <>
          <SearchInput value={search} onChange={setSearch} placeholder="Search roles and access scopes" fullWidth />
          {visible.length === 0 ? (
            <p className="text-sm leading-[22px] text-grey-700">No roles match your search.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {visible.map(({ item, groups }) => (
                <RoleCard
                  key={item.id}
                  name={item.role.name}
                  groups={groups}
                  query={search}
                  onEdit={() => setEditing(item)}
                  onRemove={() => setRemoving(item)}
                />
              ))}
            </div>
          )}
        </>
      )}
      <EditRoleScopeDialog user={user} assigned={editing} onClose={() => setEditing(null)} />
      <ConfirmModal
        open={removing !== null}
        onOpenChange={(open) => {
          if (!open) {
            setRemoving(null)
            removeRole.reset()
          }
        }}
        title="Remove permission role?"
        description="Are you sure you want to remove the permission role? User will lose all permissions associated with this role. This will be done immediately."
        confirmLabel={removeRole.isPending ? 'Removing…' : 'Remove'}
        busy={removeRole.isPending}
        error={removeRole.isError ? `Couldn’t remove the role. ${removeRole.error.message}` : undefined}
        onConfirm={confirmRemove}
      />
      <AssignRoleDialog
        open={assignOpen}
        onOpenChange={setAssignOpen}
        user={user}
        assignedRoleIds={assigned.map((item) => item.role_id)}
      />
    </div>
  )
}

type ScopeGroup = { title: string; lines: { label: string; values: string }[] }

// Figma "[MD] - Role card"
function RoleCard({
  name,
  groups,
  query,
  onEdit,
  onRemove,
}: {
  name: string
  groups: ScopeGroup[]
  query: string
  onEdit: () => void
  onRemove: () => void
}) {
  return (
    <article className="relative flex flex-col gap-2 rounded-lg bg-grey-100 p-3">
      <div className="flex items-start gap-3">
        <h4 className="min-w-0 flex-1 truncate text-base leading-6 font-semibold text-grey-1000">
          <Highlight text={name} query={query} />
        </h4>
        <ContextMenu
          label={`Actions for ${name}`}
          items={[
            { label: 'Edit role access scope', icon: <img src={editIcon} alt="" className="size-5" />, onSelect: onEdit },
            { label: 'Remove role', icon: <img src={removeIcon} alt="" className="size-5" />, onSelect: onRemove },
          ]}
          trigger={
            <button
              type="button"
              aria-label={`Actions for ${name}`}
              className="-mt-1 -mr-1 flex shrink-0 rounded-md p-1.5 outline-none hover:bg-grey-700/12 focus-visible:ring-2 focus-visible:ring-primary-500/40 active:bg-grey-800/18"
            >
              <img src={moreIcon} alt="" className="size-5" />
            </button>
          }
        />
      </div>
      {groups.length > 0 && (
        <div className="flex items-start gap-2 pr-1">
          <span className="flex shrink-0 items-center py-0.5">
            <img src={subItemsIcon} alt="" className="size-4" />
          </span>
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            {groups.map((group) => (
              <div key={group.title} className="flex flex-col">
                <p className="text-[10px] leading-5 font-bold tracking-[0.5px] text-grey-800 uppercase">{group.title}</p>
                <p className="text-sm leading-[22px] text-grey-800">
                  {group.lines.map((line, index) => (
                    <span key={line.label}>
                      {index > 0 && ' • '}
                      <Highlight text={line.label} query={query} />:{' '}
                      <span className="font-semibold">
                        <Highlight text={line.values} query={query} />
                      </span>
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  )
}

// Turn saved scope rows into one line per scope type, grouped by level
function describeScopes(
  assigned: AssignedRole,
  scopeTypes: ScopeType[],
  optionCounts: Record<string, number>,
): ScopeGroup[] {
  return scopeLevels
    .map(({ level, title }) => ({
      title,
      lines: scopeTypes
        .filter((type) => type.level === level)
        .map((type) => {
          const values = assigned.scopes.filter((scope) => scope.scope_type === type.key).map((scope) => scope.value)
          if (values.length === 0) return null
          const label = type.label
          if (values.includes(ALL_VALUES)) return { label, values: `All (${optionCounts[type.option_list] ?? 0})` }
          return { label, values: values.join(', ') }
        })
        .filter((line): line is { label: string; values: string } => line !== null),
    }))
    .filter((group) => group.lines.length > 0)
}
