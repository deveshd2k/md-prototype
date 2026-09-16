import { NavLink } from 'react-router'

const tabs = [
  { label: 'Agency settings' },
  { label: 'Users', to: '/settings/users' },
  { label: 'Permission roles' },
  { label: 'Direct permissions' },
  { label: 'Delegations' },
]

const tabClass = 'rounded-md px-2 py-[5px] text-sm leading-[22px] font-semibold text-white hover:bg-white/10'

// Dark Settings sub-navigation (Figma: "Frame 1321316816")
export function SettingsBar() {
  return (
    <div className="flex h-14 items-center bg-grey-1000 px-[38px] py-3">
      <div className="flex items-center gap-12">
        <p className="text-lg leading-7 font-semibold text-white">Settings</p>
        <nav className="flex items-center gap-4">
          {tabs.map((tab) =>
            tab.to ? (
              <NavLink key={tab.label} to={tab.to} className={tabClass}>
                {tab.label}
              </NavLink>
            ) : (
              <button key={tab.label} type="button" className={tabClass}>
                {tab.label}
              </button>
            ),
          )}
        </nav>
      </div>
    </div>
  )
}
