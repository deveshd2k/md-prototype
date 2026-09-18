import { useState } from 'react'
import chevronDown from '@/assets/figma/chevron-down.svg'
import searchIcon from '@/assets/figma/search.svg'
import { ActionButton } from '@/components/ui/action-button'
import { Checkbox } from '@/components/ui/checkbox'
import { Highlight } from '@/components/ui/highlight'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

type FilterSelectProps = {
  label: string
  options: string[]
  selected: string[]
  onChange: (selected: string[]) => void
  size?: 's' | 'm' // S: 32px filter (160px wide, 256px menu) · M: 40px form field (full width, menu matches)
  formatValue?: (selected: string[]) => string // trigger text; defaults to the label / "{n} Selected"
}

// Show a search field and scroll the list once there are more than this many options
const SEARCH_THRESHOLD = 10

// Multi-select dropdown, per the design system "Select / Multiple" (size S) and "Select / Dropdown".
// Choices are staged in a draft and only applied when the user clicks Apply;
// closing the dropdown any other way discards them.
// Up to 10 options: the whole list shows. More: a search field on top and a scrolling list (412px menu).
export function FilterSelect({ label, options, selected, onChange, size = 's', formatValue }: FilterSelectProps) {
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState<string[]>([])
  // Items applied when the dropdown opened are listed first, so rows don't jump while ticking
  const [pinned, setPinned] = useState<string[]>([])
  const [query, setQuery] = useState('')

  const searchable = options.length > SEARCH_THRESHOLD
  const matches = (option: string) => option.toLowerCase().includes(query.trim().toLowerCase())

  const handleOpenChange = (next: boolean) => {
    if (next) {
      setQuery('')
      setDraft(selected)
      setPinned(options.filter((option) => selected.includes(option)))
    }
    setOpen(next)
  }

  const toggle = (option: string, checked: boolean) =>
    setDraft((current) => (checked ? [...current, option] : current.filter((value) => value !== option)))

  // "Select all" works on the options currently shown (all of them, or the search results)
  const shown = options.filter(matches)
  const shownChecked = shown.filter((option) => draft.includes(option)).length
  const allChecked = shown.length > 0 && shownChecked === shown.length
  const selectAllState = allChecked ? true : shownChecked > 0 ? 'indeterminate' : false
  const toggleAll = () =>
    setDraft((current) =>
      allChecked ? current.filter((value) => !shown.includes(value)) : [...new Set([...current, ...shown])],
    )
  const pinnedShown = pinned.filter(matches)
  const rest = shown.filter((option) => !pinned.includes(option))

  const apply = () => {
    onChange(options.filter((option) => draft.includes(option)))
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger
        className={[
          'flex items-center gap-1.5 border px-2.5 text-left outline-none',
          size === 's' ? 'h-8 w-40 rounded-md' : 'h-10 w-full rounded-lg',
          'border-grey-500 bg-white hover:border-grey-700 hover:bg-grey-200',
          'active:border-grey-800 active:bg-grey-300 focus-visible:border-grey-800',
          'data-[state=open]:border-grey-800 data-[state=open]:bg-white',
        ].join(' ')}
      >
        <span className="min-w-0 flex-1 truncate px-0.5 text-sm leading-[22px] text-grey-1000">
          {formatValue ? formatValue(selected) : selected.length > 0 ? `${selected.length} Selected` : label}
        </span>
        <img src={chevronDown} alt="" className={`size-5 shrink-0 ${open ? 'rotate-180' : ''}`} />
      </PopoverTrigger>
      <PopoverContent
        align="start"
        aria-label={`${label} options`}
        className={`flex ${size === 's' ? 'w-64' : 'w-(--radix-popover-trigger-width)'} flex-col gap-0 overflow-hidden rounded-md p-0 shadow-pinned ring-0 ${
          searchable ? 'h-[min(412px,var(--radix-popover-content-available-height))]' : 'max-h-(--radix-popover-content-available-height)'
        }`}
      >
        {searchable && (
          <div className="shrink-0 border-b border-grey-300 px-2 pt-1 pb-[3px]">
            <label className="flex h-8 items-center gap-2 px-2">
              <img src={searchIcon} alt="" className="size-5 shrink-0" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search"
                aria-label={`Search ${label.toLowerCase()}`}
                className="h-[22px] min-w-0 flex-1 bg-transparent text-sm leading-[22px] text-grey-1000 outline-none placeholder:text-grey-700 [&::-webkit-search-cancel-button]:appearance-none"
              />
            </label>
          </div>
        )}
        <div className="scrollbar-thin flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto overscroll-contain p-2 pb-1">
          {shown.length === 0 ? (
            <p className="px-2 py-[5px] text-sm leading-[22px] text-grey-700">No results found</p>
          ) : (
            <>
              <div className="flex flex-col gap-2">
                <OptionRow
                  label={`Select all (${shown.length})`}
                  checked={selectAllState}
                  onCheckedChange={toggleAll}
                />
                <Divider />
              </div>
              {pinnedShown.map((option) => (
                <OptionRow
                  key={option}
                  label={option}
                  checked={draft.includes(option)}
                  onCheckedChange={(checked) => toggle(option, checked)}
                  query={query}
                  highlight
                />
              ))}
              {pinnedShown.length > 0 && rest.length > 0 && <Divider />}
              {rest.map((option) => (
                <OptionRow
                  key={option}
                  label={option}
                  checked={draft.includes(option)}
                  onCheckedChange={(checked) => toggle(option, checked)}
                  query={query}
                  highlight
                />
              ))}
            </>
          )}
        </div>
        <div className="flex shrink-0 items-center justify-between gap-1 border-t border-grey-300 bg-white p-2">
          {draft.length > 0 ? (
            <ActionButton variant="secondary" onClick={() => setDraft([])}>
              Clear
            </ActionButton>
          ) : (
            <span />
          )}
          <ActionButton onClick={apply}>
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
  query?: string // search text to paint in the label
  highlight?: boolean
}

// "Parts / Dropdown / Menu Item / Multi": checked rows get the primary tint
function OptionRow({ label, checked, onCheckedChange, query = '', highlight }: OptionRowProps) {
  const active = highlight && checked === true
  return (
    <label
      className={`flex h-8 shrink-0 cursor-pointer items-center gap-2 rounded-md px-2 ${
        active ? 'bg-primary-100' : 'hover:bg-grey-200'
      }`}
    >
      <Checkbox checked={checked} onCheckedChange={(value) => onCheckedChange(value === true)} />
      <span
        className={`min-w-0 flex-1 truncate text-sm leading-[22px] ${
          active ? 'font-medium text-primary-500' : 'text-grey-1000'
        }`}
      >
        <Highlight text={label} query={query} />
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
