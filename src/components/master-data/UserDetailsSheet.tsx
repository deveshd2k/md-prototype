import { useState } from 'react'
import infoIcon from '@/assets/figma/info.svg'
import { UserRolesTab } from '@/components/master-data/UserRolesTab'
import { SideModal } from '@/components/ui/side-modal'
import { Tooltip } from '@/components/ui/tooltip'
import { Tabs } from '@/components/ui/tabs'
import type { User } from '@/types/user'

type TabId = 'profile' | 'roles' | 'permissions'

const tabs: { id: TabId; label: string }[] = [
  { id: 'profile', label: 'Profile' },
  { id: 'roles', label: 'Permission roles' },
  { id: 'permissions', label: 'Direct permissions' },
]

// Fields shown in "Profile details", in Figma order
const profileFields: { label: string; key: keyof User }[] = [
  { label: 'Job title', key: 'job_title' },
  { label: 'User agency', key: 'agency' },
  { label: 'Location', key: 'location' },
  { label: 'Business unit', key: 'business_unit' },
  { label: 'Department', key: 'department' },
]

type UserDetailsSheetProps = {
  user: User | null
  onOpenChange: (open: boolean) => void
}

// Side modal opened by clicking a row in the Users table
export function UserDetailsSheet({ user, onOpenChange }: UserDetailsSheetProps) {
  return (
    <SideModal open={user !== null} onOpenChange={onOpenChange} title="User details">
      {/* Keyed on the user so opening someone else starts on the Profile tab again */}
      {user && <UserDetails key={user.id} user={user} />}
    </SideModal>
  )
}

function UserDetails({ user }: { user: User }) {
  const [tab, setTab] = useState<TabId>('profile')
  return (
    <>
      <div className="flex flex-col">
        <p className="truncate text-lg leading-7 font-semibold text-grey-1000">{user.full_name}</p>
        <p className="truncate text-sm leading-[22px] font-semibold text-grey-700">{user.email}</p>
      </div>
      <div className="mt-5">
        <Tabs tabs={tabs} active={tab} onChange={setTab} label="User details" />
      </div>
      <div className="mt-5">
        {tab === 'profile' && <ProfileDetails user={user} />}
        {tab === 'roles' && <UserRolesTab user={user} />}
        {tab === 'permissions' && (
          <p className="py-6 text-sm leading-[22px] text-grey-700">Direct permissions: design coming next.</p>
        )}
      </div>
    </>
  )
}

// Figma "Card / Regular" with the read-only profile fields
function ProfileDetails({ user }: { user: User }) {
  return (
    <section className="rounded-lg bg-grey-100 px-4 pt-3 pb-4">
      <h3 className="flex items-center gap-1 text-base leading-6 font-semibold text-grey-1000">
        Profile details <span className="text-sm leading-[22px] font-normal text-grey-900">(view only)</span>
        <Tooltip content="Profile details come from HR/People data. If something looks wrong, contact your HR/People team.">
          <button type="button" aria-label="About profile details" className="flex rounded-full outline-none focus-visible:ring-2 focus-visible:ring-primary-500/40">
            <img src={infoIcon} alt="" className="size-5" />
          </button>
        </Tooltip>
      </h3>
      <dl className="mt-4 flex flex-col">
        {profileFields.map((field) => (
          <div key={field.key} className="flex h-8 items-center gap-2">
            <dt className="w-[120px] shrink-0 text-sm leading-[22px] font-medium text-grey-800">{field.label}</dt>
            <dd className="truncate text-sm leading-[22px] font-semibold text-grey-1000">{String(user[field.key])}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
