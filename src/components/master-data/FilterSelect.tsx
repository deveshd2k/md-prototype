import { useState, type ComponentProps } from 'react'
import { Checkbox as CheckboxPrimitive } from 'radix-ui'
import chevronDown from '@/assets/figma/chevron-down.svg'
import tickIcon from '@/assets/figma/tick.svg'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

type FilterSelectProps = {
  label: string
  options: string[]
  selected: string[]
  onChange: (selected: string[]) => void
}

// Multi-select dropdown, per the design system "Select / Multiple" (size S).
// Choices are staged in a draft and only applied when the user clicks Apply;
// closing the dropdown any other way discards them.
export function FilterSelect({ label, options, selected, onChange }: FilterSelectProps) {
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState<string[]>([])
  // Items applied when the dropdown opened are listed first, so rows don't jump while ticking
  const [pinned, setPinned] = useState<string[]>([])

  const handleOpenChange = (next: boolean) => {
    if (next) {
      setDraft(selected)
      setPinned(options.filter((option) => selected.includes(option)))
    }
    setOpen(next)
  }

  const toggle = (option: string, checked: boolean) =>
    setDraft((current) => (checked ? [...current, option] : current.filter((value) => value !== option)))

  const allChecked = options.length > 0 && draft.length === options.length
  const selectAllState = allChecked ? true : draft.length > 0 ? 'indeterminate' : false
  const rest = options.filter((option) => !pinned.includes(option))

  const apply = () => {
    onChange(options.filter((option) => draft.includes(option)))
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger
        className={[
          'flex h-8 w-40 items-center gap-1.5 rounded-md border px-2.5 text-left outline-none',
          'border-grey-500 bg-white hover:border-grey-700 hover:bg-grey-200',
          'active:border-grey-800 active:bg-grey-300 focus-visible:border-primary-500',
          'data-[state=open]:border-grey-800 data-[state=open]:bg-white',
        ].join(' ')}
      >
        <span className="min-w-0 flex-1 truncate px-0.5 text-sm leading-[22px] text-grey-1000">
          {selected.length > 0 ? `${selected.length} Selected` : label}
        </span>
        <img src={chevronDown} alt="" className={`size-5 shrink-0 ${open ? 'rotate-180' : ''}`} />
      </PopoverTrigger>
      <PopoverContent
        align="start"
        aria-label={`${label} options`}
        className="w-64 gap-0 overflow-hidden rounded-md p-0 shadow-pinned ring-0"
      >
        <div className="flex max-h-[min(360px,calc(var(--radix-popover-content-available-height)-48px))] flex-col gap-1 overflow-y-auto p-2 pb-1">
          <div className="flex flex-col gap-2">
            <OptionRow
              label={`Select all (${options.length})`}
              checked={selectAllState}
              onCheckedChange={() => setDraft(allChecked ? [] : options)}
            />
            <Divider />
          </div>
          {pinned.map((option) => (
            <OptionRow
              key={option}
              label={option}
              checked={draft.includes(option)}
              onCheckedChange={(checked) => toggle(option, checked)}
              highlight
            />
          ))}
          {pinned.length > 0 && rest.length > 0 && <Divider />}
          {rest.map((option) => (
            <OptionRow
              key={option}
              label={option}
              checked={draft.includes(option)}
              onCheckedChange={(checked) => toggle(option, checked)}
              highlight
            />
          ))}
        </div>
        <div className="flex items-center justify-between gap-1 border-t border-grey-300 bg-white p-2">
          {draft.length > 0 ? (
            <ActionButton onClick={() => setDraft([])} className="text-grey-1000">
              Clear
            </ActionButton>
          ) : (
            <span />
          )}
          <ActionButton onClick={apply} className="text-primary-500">
            Apply
          </ActionButton>
        </div>
      </PopoverContent>
    </Popover>
  )
}

type OptionRowProps = {
  label: string
  checked: boolean | 'indeterminate'
  onCheckedChange: (checked: boolean) => void
  highlight?: boolean
}

// "Parts / Dropdown / Menu Item / Multi": checked rows get the primary tint
function OptionRow({ label, checked, onCheckedChange, highlight }: OptionRowProps) {
  const active = highlight && checked === true
  return (
    <label
      className={`flex h-8 shrink-0 cursor-pointer items-center gap-2 rounded-md px-2 ${
        active ? 'bg-primary-100' : 'hover:bg-grey-200'
      }`}
    >
      <CheckboxPrimitive.Root
        checked={checked}
        onCheckedChange={(value) => onCheckedChange(value === true)}
        className={[
          'relative flex size-5 shrink-0 items-center justify-center rounded border outline-none',
          'border-grey-500 bg-white focus-visible:ring-2 focus-visible:ring-primary-500/40',
          'data-[state=checked]:border-primary-500 data-[state=checked]:bg-primary-500',
          'data-[state=indeterminate]:border-primary-500 data-[state=indeterminate]:bg-primary-100',
        ].join(' ')}
      >
        <CheckboxPrimitive.Indicator className="flex items-center justify-center">
          {checked === 'indeterminate' ? (
            // Figma "Dash", recoloured to the primary token
            <svg width="8" height="2" viewBox="0 0 8 2" aria-hidden="true" className="text-primary-500">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 1C0 0.447715 0.447715 0 1 0H7C7.55228 0 8 0.447715 8 1C8 1.55228 7.55228 2 7 2H1C0.447715 2 0 1.55228 0 1Z"
                fill="currentColor"
              />
            </svg>
          ) : (
            <img src={tickIcon} alt="" className="h-[6.81px] w-2.5" />
          )}
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      <span
        className={`min-w-0 flex-1 truncate text-sm leading-[22px] ${
          active ? 'font-medium text-primary-500' : 'text-grey-1000'
        }`}
      >
        {label}
      </span>
    </label>
  )
}

function Divider() {
  return (
    <div className="pb-1">
      <div className="h-px bg-grey-300" />
    </div>
  )
}

function ActionButton({ className, ...props }: ComponentProps<'button'>) {
  return (
    <button
      type="button"
      className={`flex h-8 items-center rounded-md px-2 text-sm leading-[22px] font-semibold hover:bg-grey-200 active:bg-grey-300 ${className}`}
      {...props}
    />
  )
}
