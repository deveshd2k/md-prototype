import { useState } from 'react'
import roleIcon from '@/assets/figma/role.svg'
import userIcon from '@/assets/figma/user.svg'
import { ActionButton } from '@/components/ui/action-button'
import { Pill } from '@/components/ui/pill'
import type { OrgUser } from '@/types/org-user'

// Show this many people before collapsing the rest behind "+N more"
const COLLAPSED_COUNT = 3

type AddingSummaryProps = {
  people: OrgUser[]
  roleName?: string // shown as "with permission role [role]" when given
}

// "You're adding: [people] (with permission role [role])"
// Up to 3 people show as pills; the rest sit behind "+N more" / "Show less".
export function AddingSummary({ people, roleName }: AddingSummaryProps) {
  const [expanded, setExpanded] = useState(false)
  const collapsible = people.length > COLLAPSED_COUNT
  const shown = collapsible && !expanded ? people.slice(0, COLLAPSED_COUNT) : people

  return (
    <div className="flex shrink-0 items-start gap-2">
      <span className="shrink-0 py-1 text-sm leading-[22px] text-grey-800">You’re adding:</span>
      {/* Very long lists scroll within this area so the rest of the step stays visible */}
      <div className="scrollbar-thin flex max-h-44 min-w-0 flex-1 flex-wrap items-center gap-2 overflow-y-auto">
        {shown.map((person) => (
          <Pill key={person.id} icon={<img src={userIcon} alt="" className="size-5 shrink-0" />}>
            {person.full_name}
          </Pill>
        ))}
        {collapsible && (
          <ActionButton variant="secondary" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>
            {expanded ? 'Show less' : `+${people.length - COLLAPSED_COUNT} more`}
          </ActionButton>
        )}
        {roleName && (
          <>
            <span className="py-1 text-sm leading-[22px] whitespace-nowrap text-grey-800">with permission role</span>
            <Pill icon={<img src={roleIcon} alt="" className="size-5 shrink-0" />}>{roleName}</Pill>
          </>
        )}
      </div>
    </div>
  )
}
