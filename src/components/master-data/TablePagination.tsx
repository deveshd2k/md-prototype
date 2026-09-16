import chevronDown from '@/assets/figma/chevron-down.svg'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const PAGE_SIZES = [10, 25, 50, 100]

type TablePaginationProps = {
  page: number
  pageSize: number
  total: number
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: number) => void
}

// Figma "Pagination"
export function TablePagination({ page, pageSize, total, onPageChange, onPageSizeChange }: TablePaginationProps) {
  const pageCount = Math.max(1, Math.ceil(total / pageSize))
  const first = total === 0 ? 0 : (page - 1) * pageSize + 1
  const last = Math.min(page * pageSize, total)

  return (
    <div className="flex h-8 items-start justify-between">
      <div className="flex items-center gap-4 pt-1">
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            <span className="text-sm leading-[22px] text-grey-800">Items per page:</span>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center justify-center gap-1 rounded-md py-px pr-1.5 pl-2 text-sm leading-[22px] text-grey-1000 outline-none hover:bg-grey-200 focus-visible:bg-grey-200">
                {pageSize}
                <img src={chevronDown} alt="" className="size-5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-24">
                <DropdownMenuRadioGroup value={String(pageSize)} onValueChange={(value) => onPageSizeChange(Number(value))}>
                  {PAGE_SIZES.map((size) => (
                    <DropdownMenuRadioItem key={size} value={String(size)}>
                      {size}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="h-3 w-px rounded-[2px] bg-grey-300" />
        </div>
        <span className="text-sm leading-[22px] text-grey-800">
          {total === 0 ? '0 items' : `${first}–${last} of ${total} items`}
        </span>
      </div>
      <nav aria-label="Pagination" className="flex items-center gap-1">
        <ArrowButton direction="previous" disabled={page <= 1} onClick={() => onPageChange(page - 1)} />
        <div className="flex items-start gap-0.5">
          {pageItems(page, pageCount).map((item, index) =>
            item === 'gap' ? (
              <span key={`gap-${index}`} className="w-8 py-[5px] text-center text-sm leading-[22px] text-grey-800">
                …
              </span>
            ) : (
              <button
                key={item}
                type="button"
                onClick={() => onPageChange(item)}
                aria-current={item === page ? 'page' : undefined}
                className={
                  item === page
                    ? 'w-8 rounded bg-primary-100 py-[5px] text-center text-sm leading-[22px] font-medium text-primary-500'
                    : 'w-8 rounded py-[5px] text-center text-sm leading-[22px] text-grey-800 hover:bg-grey-200'
                }
              >
                {item}
              </button>
            ),
          )}
        </div>
        <ArrowButton direction="next" disabled={page >= pageCount} onClick={() => onPageChange(page + 1)} />
      </nav>
    </div>
  )
}

// Shows every page when there are few; otherwise first, last and neighbours of the current page
function pageItems(page: number, pageCount: number): (number | 'gap')[] {
  if (pageCount <= 7) return Array.from({ length: pageCount }, (_, i) => i + 1)
  const start = Math.max(2, Math.min(page - 1, pageCount - 4))
  const end = Math.min(pageCount - 1, Math.max(page + 1, 5))
  const middle = Array.from({ length: end - start + 1 }, (_, i) => start + i)
  return [1, ...(start > 2 ? ['gap' as const] : []), ...middle, ...(end < pageCount - 1 ? ['gap' as const] : []), pageCount]
}

// Figma "Arrows / Chevron": grey-600 when enabled, grey-400 when disabled
function ArrowButton({ direction, disabled, onClick }: { direction: 'previous' | 'next'; disabled: boolean; onClick: () => void }) {
  const path =
    direction === 'previous'
      ? 'M12.7071 3.29289C13.0976 3.68342 13.0976 4.31658 12.7071 4.70711L7.41421 10L12.7071 15.2929C13.0976 15.6834 13.0976 16.3166 12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L5.29289 10.7071C4.90237 10.3166 4.90237 9.68342 5.29289 9.29289L11.2929 3.29289C11.6834 2.90237 12.3166 2.90237 12.7071 3.29289Z'
      : 'M7.29289 16.7071C6.90237 16.3166 6.90237 15.6834 7.29289 15.2929L12.5858 10L7.29289 4.70711C6.90237 4.31658 6.90237 3.68342 7.29289 3.29289C7.68342 2.90237 8.31658 2.90237 8.70711 3.29289L14.7071 9.29289C15.0976 9.68342 15.0976 10.3166 14.7071 10.7071L8.70711 16.7071C8.31658 17.0976 7.68342 17.0976 7.29289 16.7071Z'
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === 'previous' ? 'Previous page' : 'Next page'}
      className="rounded text-grey-600 enabled:hover:bg-grey-200 disabled:text-grey-400"
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path fillRule="evenodd" clipRule="evenodd" d={path} fill="currentColor" />
      </svg>
    </button>
  )
}
