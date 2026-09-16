import chevronDown from '@/assets/figma/chevron-down.svg'
import logoOpen from '@/assets/figma/logo-open.svg'
import logoWpp from '@/assets/figma/logo-wpp.svg'
import menuIcon from '@/assets/figma/menu.svg'
import notificationIcon from '@/assets/figma/notification.svg'

const utilityApps = ['Projects', 'Files', 'News', 'Marketplace', 'DevHub', 'Network']

const itemClass =
  'flex items-center rounded-md px-3 py-[5px] text-sm leading-[22px] font-medium text-grey-800 hover:bg-grey-200'

// Global WPP Open header (Figma: "OS Bar")
export function OsBar() {
  return (
    <header className="flex h-16 flex-col gap-[15px] bg-white pt-4">
      <div className="flex items-start justify-between px-[38px]">
        <div className="flex items-center gap-5">
          <button type="button" aria-label="Open navigation" className="flex size-8 items-center justify-center rounded-md hover:bg-grey-200">
            <span className="flex size-5 items-center justify-center">
              <img src={menuIcon} alt="" className="h-[12.75px] w-[16.92px]" />
            </span>
          </button>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <div className="relative h-6 w-[113px] overflow-clip" role="img" aria-label="WPP Open">
                <img src={logoWpp} alt="" className="absolute top-[1.97px] left-0 h-[16.11px] w-[53.51px]" />
                <img src={logoOpen} alt="" className="absolute top-[1.98px] left-[59.4px] h-[20.05px] w-[53.6px]" />
              </div>
              <button type="button" aria-label="Switch app" className="flex items-center rounded-md p-1.5 hover:bg-grey-200">
                <img src={chevronDown} alt="" className="size-5" />
              </button>
            </div>
            <button type="button" className={`${itemClass} gap-1 pr-2.5`}>
              Current Hub Name
              <img src={chevronDown} alt="" className="size-5" />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <nav className="flex items-start gap-2">
            {utilityApps.map((app) => (
              <button key={app} type="button" className={itemClass}>
                {app}
              </button>
            ))}
            <button type="button" className={`${itemClass} gap-1 pr-2.5`}>
              Help
              <img src={chevronDown} alt="" className="size-5" />
            </button>
            <button type="button" aria-label="Notifications" className="flex items-center justify-center rounded-md p-1.5 hover:bg-grey-200">
              <img src={notificationIcon} alt="" className="size-5" />
            </button>
          </nav>
          <div className="flex size-8 items-center justify-center rounded-full bg-avatar text-[10px] leading-5 font-bold tracking-[0.5px] text-white uppercase">
            A
          </div>
        </div>
      </div>
      <div className="h-px bg-grey-300" />
    </header>
  )
}
