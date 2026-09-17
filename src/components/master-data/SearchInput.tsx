import { useRef } from 'react'
import clearIcon from '@/assets/figma/clear.svg'
import searchIcon from '@/assets/figma/search.svg'

type SearchInputProps = {
  value: string
  onChange: (value: string) => void
  autoFocus?: boolean
  placeholder?: string
}

// Design system "Input / Search", size S.
// Hint: grey border · Hover: light fill, darker border · Active (typing): darkest border ·
// a clear (✕) button shows while there is text and the field is hovered or focused.
export function SearchInput({ value, onChange, autoFocus, placeholder = 'Search by name or email' }: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <div
      className={[
        'group/search flex h-8 w-60 shrink-0 items-center gap-2 rounded-md border bg-white pr-2.5 pl-2',
        'border-grey-500 hover:border-grey-700 hover:bg-grey-100',
        'focus-within:border-grey-800 focus-within:bg-white focus-within:hover:border-grey-800',
      ].join(' ')}
    >
      <img src={searchIcon} alt="" className="size-5 shrink-0" />
      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        data-autofocus={autoFocus || undefined}
        className="h-[22px] min-w-0 flex-1 truncate bg-transparent text-sm leading-[22px] text-grey-1000 outline-none placeholder:text-grey-700 [&::-webkit-search-cancel-button]:appearance-none"
      />
      {value && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => {
            onChange('')
            inputRef.current?.focus()
          }}
          className="hidden shrink-0 rounded outline-none group-focus-within/search:block group-hover/search:block focus-visible:ring-2 focus-visible:ring-primary-500/40"
        >
          <img src={clearIcon} alt="" className="size-5" />
        </button>
      )}
    </div>
  )
}
