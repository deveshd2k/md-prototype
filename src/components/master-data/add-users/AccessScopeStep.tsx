import { AddingSummary } from '@/components/master-data/add-users/AddingSummary'
import { ScopeCards, ScopeSummaryGroups } from '@/components/master-data/ScopeFields'
import { InlineMessage } from '@/components/ui/inline-message'
import { useScopeOptions, useScopeTypes } from '@/data/scopes'
import type { OrgUser } from '@/types/org-user'
import type { RoleScopes } from '@/types/roles'

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
              <ScopeCards types={types} options={options} scopes={scopes} onScopesChange={onScopesChange} />
            </div>
            <aside className="sticky top-5 flex flex-col gap-3">
              <div className="flex flex-col">
                <h3 className="text-base leading-6 font-semibold text-grey-1000">Selected access scope</h3>
                <p className="text-xs leading-5 text-grey-800">Access will apply where these selected categories match.</p>
              </div>
              <ScopeSummaryGroups types={types} options={options} scopes={scopes} />
            </aside>
          </div>
        )}
      </div>
    </div>
  )
}
