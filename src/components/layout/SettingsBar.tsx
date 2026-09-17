import { InvertedActionButton, InvertedActionLink } from '@/components/ui/action-button'

const tabs = [
  { label: 'Agency settings' },
  { label: 'Users', to: '/settings/users' },
  { label: 'Permission roles' },
  { label: 'Direct permissions' },
  { label: 'Delegations' },
]

// Dark Settings sub-navigation (Figma: "Frame 1321316816")
export function SettingsBar() {
  return (
    <div className="flex h-14 items-center bg-grey-1000 px-[38px] py-3">
      <div className="flex items-center gap-12">
        <p className="text-lg leading-7 font-semibold text-white">Settings</p>
        <nav className="flex items-center gap-4">
          {tabs.map((tab) =>
            tab.to ? (
              <InvertedActionLink key={tab.label} to={tab.to}>
                {tab.label}
              </InvertedActionLink>
            ) : (
              <InvertedActionButton key={tab.label}>{tab.label}</InvertedActionButton>
            ),
          )}
        </nav>
      </div>
    </div>
  )
}
