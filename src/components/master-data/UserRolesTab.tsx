import { useMemo, useState } from 'react'
import addPrimaryIcon from '@/assets/figma/add-primary.svg'
import moreIcon from '@/assets/figma/more.svg'
import subItemsIcon from '@/assets/figma/sub-items.svg'
import { AssignRoleDialog } from '@/components/master-data/AssignRoleDialog'
import { SearchInput } from '@/components/master-data/SearchInput'
import { RegularButton } from '@/components/ui/regular-button'
import { useScopeOptions, useScopeTypes } from '@/data/scopes'
import { useUserRoles, type AssignedRole } from '@/data/user-roles'
import { ALL_VALUES, scopeLevels } from '@/lib/scopes'
import type { ScopeType } from '@/types/roles'
import type { User } from '@/types/user'

// User details · Permission roles tab: one card per role, with the scope it applies to
export function UserRolesTab({ user }: { user: User }) {
  const { data: assigned = [], status, error } = useUserRoles(user.id)
  const [assignOpen, setAssignOpen] = useState(false)
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
                <RoleCard key={item.id} name={item.role.name} groups={groups} />
              ))}
            </div>
          )}
        </>
      )}
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
function RoleCard({ name, groups }: { name: string; groups: ScopeGroup[] }) {
  return (
    <article className="relative flex flex-col gap-2 rounded-lg bg-grey-100 p-3">
      <div className="flex items-start gap-3">
        <h4 className="min-w-0 flex-1 truncate text-base leading-6 font-semibold text-grey-1000">{name}</h4>
        <button
          type="button"
          aria-label={`Actions for ${name}`}
          className="-mt-1 -mr-1 flex shrink-0 rounded-md p-1.5 outline-none hover:bg-grey-700/12 focus-visible:ring-2 focus-visible:ring-primary-500/40 active:bg-grey-800/18"
        >
          <img src={moreIcon} alt="" className="size-5" />
        </button>
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
                      {line.label}: <span className="font-semibold">{line.values}</span>
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
