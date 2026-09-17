import chevronDown from '@/assets/figma/chevron-down-nav.svg'

const menuItems = [
  { label: 'My tasks' },
  { label: 'Pricing' },
  { label: 'Project management' },
  { label: 'Resource management' },
  { label: 'Timesheets', hasMenu: true },
  { label: 'Reports', hasMenu: true },
]

const itemClass =
  'flex items-center rounded-md px-3 py-[5px] text-sm leading-[22px] font-medium text-grey-800 hover:bg-grey-200'

// Work management app navigation (Figma: "[WM] App Top Bar")
export function AppTopBar() {
  return (
    <div className="bg-white">
      <div className="flex items-center gap-8 px-[38px] py-3">
        <p className="text-base leading-6 font-semibold whitespace-nowrap text-grey-1000">Work management</p>
        <nav className="flex min-w-0 flex-1 items-start gap-2">
          {menuItems.map((item) => (
            <button key={item.label} type="button" className={`${itemClass} ${item.hasMenu ? 'gap-1 pr-2.5' : ''}`}>
              {item.label}
              {item.hasMenu && <img src={chevronDown} alt="" className="size-5" />}
            </button>
          ))}
        </nav>
        <button type="button" aria-current="page" className={`${itemClass} bg-grey-200 text-grey-1000 hover:bg-grey-200`}>
          Settings
        </button>
      </div>
      <div className="h-px bg-grey-300" />
    </div>
  )
}
