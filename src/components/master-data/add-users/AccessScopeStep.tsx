import { AddingSummary } from '@/components/master-data/add-users/AddingSummary'
import { FilterSelect } from '@/components/master-data/FilterSelect'
import { InlineMessage } from '@/components/ui/inline-message'
import { Pill } from '@/components/ui/pill'
import { useScopeOptions, useScopeTypes } from '@/data/scopes'
import { formatScopeValue, isAllPicked, optionsFor, pruneScopes } from '@/lib/scopes'
import type { OrgUser } from '@/types/org-user'
import type { RoleScopes, ScopeLevel, ScopeOption, ScopeType } from '@/types/roles'

const levels: { level: ScopeLevel; title: string }[] = [
  { level: 'organisation', title: 'Organisation' },
  { level: 'client_brand', title: 'Clients & Brands' },
]

type AccessScopeStepProps = {
  people: OrgUser[]
  roleName: string
  scopes: RoleScopes
  onScopesChange: (scopes: RoleScopes) => void
}

// Add users · step 3: limit where the chosen role applies, per scope type
export function AccessScopeStep({ people, roleName, scopes, onScopesChange }: AccessScopeStepProps) {
  const typesQuery = useScopeTypes()
  const optionsQuery = useScopeOptions()
  const types = typesQuery.data ?? []
  const options = optionsQuery.data ?? []
  const error = typesQuery.error ?? optionsQuery.error

  const change = (type: ScopeType, picks: string[]) =>
    onScopesChange(pruneScopes(types, options, { ...scopes, [type.key]: picks }))

  return (
    <div className="flex min-h-0 flex-1 flex-col pt-6">
      <AddingSummary people={people} roleName={roleName} />
      <div className="mt-5 h-px shrink-0 bg-grey-300" />
      <div className="scrollbar-thin -mr-8 min-h-0 flex-1 overflow-y-auto pr-8 pb-6">
        <p className="mt-5 text-sm leading-[22px] text-grey-1000">
          Define where this role applies. Choose specific values to limit access, or select All to include every value
          in that category.
        </p>
        {error && <p className="mt-5 text-sm text-grey-700">Couldn’t load access scopes. {error.message}</p>}
        {!error && (typesQuery.isPending || optionsQuery.isPending) && (
          <p className="mt-5 text-sm text-grey-700">Loading access scopes…</p>
        )}
        {typesQuery.isSuccess && optionsQuery.isSuccess && (
          <div className="mt-5 grid grid-cols-[minmax(0,1fr)_500px] items-start gap-6">
            <div className="flex flex-col gap-4">
              <InlineMessage title="How this works" dismissible>
                Select at least one category. You can choose categories in any order. Categories left as Not selected
                are ignored. All includes current and future values in that category.
              </InlineMessage>
              {levels.map(({ level, title }) => (
                <section key={level} className="flex flex-col gap-3 rounded-lg bg-grey-100 px-4 pt-3 pb-4">
                  <h3 className="text-base leading-6 font-semibold text-grey-1000">{title}</h3>
                  {types
                    .filter((type) => type.level === level)
                    .map((type) => (
                      <ScopeRow key={type.key} type={type} options={options} scopes={scopes} onChange={change} />
                    ))}
                </section>
              ))}
            </div>
            <ScopeSummary types={types} options={options} scopes={scopes} />
          </div>
        )}
      </div>
    </div>
  )
}

type ScopeRowProps = {
  type: ScopeType
  options: ScopeOption[]
  scopes: RoleScopes
  onChange: (type: ScopeType, picks: string[]) => void
}

function ScopeRow({ type, options, scopes, onChange }: ScopeRowProps) {
  const offered = optionsFor(type, options, scopes)
  const picks = scopes[type.key] ?? []
  return (
    <div className="flex items-center justify-between gap-6">
      <div className="flex min-w-0 flex-col text-grey-800">
        <span className="text-sm leading-[22px] font-semibold">{type.label}</span>
        <span className="text-xs leading-5">{type.description}</span>
      </div>
      <div className="w-[500px] shrink-0">
        <FilterSelect
          size="m"
          label={type.label}
          options={offered}
          selected={picks}
          onChange={(next) => onChange(type, next)}
          formatValue={(selected) => formatScopeValue(type, options, { ...scopes, [type.key]: selected })}
        />
      </div>
    </div>
  )
}

// Right-hand summary: the picks per scope type, grouped by level
function ScopeSummary({ types, options, scopes }: { types: ScopeType[]; options: ScopeOption[]; scopes: RoleScopes }) {
  const groups = levels
    .map(({ level, title }) => ({
      title,
      rows: types.filter((type) => type.level === level && (scopes[type.key]?.length ?? 0) > 0),
    }))
    .filter((group) => group.rows.length > 0)

  return (
    <aside className="sticky top-5 flex flex-col gap-3">
      <div className="flex flex-col">
        <h3 className="text-base leading-6 font-semibold text-grey-1000">Selected access scope</h3>
        <p className="text-xs leading-5 text-grey-800">Access will apply where these selected categories match.</p>
      </div>
      {groups.length === 0 ? (
        <p className="text-sm leading-[22px] text-grey-700">No categories selected yet.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {groups.map((group) => (
            <div key={group.title} className="flex flex-col gap-1">
              <p className="text-[10px] leading-5 font-bold tracking-[0.5px] text-grey-800 uppercase">{group.title}</p>
              <div className="flex flex-col gap-2.5">
                {group.rows.map((type) => {
                  const picks = scopes[type.key] ?? []
                  const pills = isAllPicked(type, options, scopes) ? [formatScopeValue(type, options, scopes)] : picks
                  return (
                    <div key={type.key} className="flex flex-col">
                      <p className="flex h-[30px] items-start text-sm leading-[22px] font-semibold text-grey-800">{type.label}</p>
                      <div className="flex flex-wrap gap-2">
                        {pills.map((value) => (
                          <Pill key={value}>{value}</Pill>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </aside>
  )
}
