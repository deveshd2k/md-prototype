import type { ReactNode } from 'react'
import { DropdownMenu as Menu } from 'radix-ui'
import { usePortalContainer } from '@/components/ui/portal-container'

type MenuItem = {
  label: string
  icon?: ReactNode
  onSelect: () => void
}

// Design system "Menu Context": small menu of actions, opened from a trigger such as a "…" button
export function ContextMenu({ trigger, items, label }: { trigger: ReactNode; items: MenuItem[]; label: string }) {
  const container = usePortalContainer()
  return (
    <Menu.Root>
      <Menu.Trigger asChild>{trigger}</Menu.Trigger>
      <Menu.Portal container={container}>
        <Menu.Content
          align="end"
          sideOffset={4}
          aria-label={label}
          className="z-[60] flex min-w-[200px] flex-col gap-1 rounded-md bg-white p-2 shadow-pinned data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0"
        >
          {items.map((item) => (
            <Menu.Item
              key={item.label}
              onSelect={item.onSelect}
              className="flex h-8 cursor-pointer items-center gap-2 rounded-md px-2 text-sm leading-[22px] text-grey-1000 outline-none select-none data-highlighted:bg-grey-200 active:bg-grey-300"
            >
              {item.icon}
              {item.label}
            </Menu.Item>
          ))}
        </Menu.Content>
      </Menu.Portal>
    </Menu.Root>
  )
}
