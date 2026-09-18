import { FilterSelect } from '@/components/master-data/FilterSelect'
import { Pill } from '@/components/ui/pill'
import { formatScopeValue, isAllPicked, optionsFor, pruneScopes, scopeLevels } from '@/lib/scopes'
import type { RoleScopes, ScopeLevel, ScopeOption, ScopeType } from '@/types/roles'

type ScopeCardsProps = {
  types: ScopeType[]
  options: ScopeOption[]
  scopes: RoleScopes
  onScopesChange: (scopes: RoleScopes) => void
  titles?: Partial<Record<ScopeLevel, string>> // override the card headings
  fieldWidth?: string // width of the select column
  describe?: (type: ScopeType) => string // override the text under each label
}

// One card per scope level, with a multi-select per scope type
export function ScopeCards({ types, options, scopes, onScopesChange, titles, fieldWidth = 'w-[500px]', describe }: ScopeCardsProps) {
  // Changing one scope type can invalidate picks in another (e.g. brands of an unselected client)
  const change = (type: ScopeType, picks: string[]) =>
    onScopesChange(pruneScopes(types, options, { ...scopes, [type.key]: picks }))

  return (
    <>
      {scopeLevels.map(({ level, title }) => (
        <section key={level} className="flex flex-col gap-3 rounded-lg bg-grey-100 px-4 pt-3 pb-4">
          <h3 className="text-base leading-6 font-semibold text-grey-1000">{titles?.[level] ?? title}</h3>
          {types
            .filter((type) => type.level === level)
            .map((type) => {
              const offered = optionsFor(type, options, scopes)
              return (
                <div key={type.key} className="flex items-center justify-between gap-6">
                  <div className="flex min-w-0 flex-col text-grey-800">
                    <span className="text-sm leading-[22px] font-semibold">{type.label}</span>
                    <span className="text-xs leading-5">{describe ? describe(type) : type.description}</span>
                  </div>
                  <div className={`${fieldWidth} shrink-0`}>
                    <FilterSelect
                      size="m"
                      label={type.label}
                      options={offered}
                      selected={scopes[type.key] ?? []}
                      onChange={(next) => change(type, next)}
                      formatValue={(selected) => formatScopeValue(type, options, { ...scopes, [type.key]: selected })}
                    />
                  </div>
                </div>
              )
            })}
        </section>
      ))}
    </>
  )
}

// The picks per scope type as pills, grouped by level ("All" shows as one pill)
export function ScopeSummaryGroups({
  types,
  options,
  scopes,
  emptyText = 'No categories selected yet.',
}: {
  types: ScopeType[]
  options: ScopeOption[]
  scopes: RoleScopes
  emptyText?: string
}) {
  const groups = scopeLevels
    .map(({ level, title }) => ({
      title,
      rows: types.filter((type) => type.level === level && (scopes[type.key]?.length ?? 0) > 0),
    }))
    .filter((group) => group.rows.length > 0)

  if (groups.length === 0) return <p className="text-sm leading-[22px] text-grey-700">{emptyText}</p>

  return (
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
                  <p className="flex h-[30px] items-start text-sm leading-[22px] font-semibold text-grey-800">
                    {type.label}
                  </p>
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
  )
}
