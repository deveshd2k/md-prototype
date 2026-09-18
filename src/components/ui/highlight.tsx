import type { ReactNode } from 'react'

// Escape anything the person types so it is matched literally, not as a pattern
const escape = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

type HighlightProps = {
  text: string
  query: string
}

// Paints every exact (case-insensitive) occurrence of the search text in
// System/Highlight/400, so people can see why a result matched.
export function Highlight({ text, query }: HighlightProps): ReactNode {
  const needle = query.trim()
  if (!needle) return text

  // Splitting on a capturing group gives: text, match, text, match, … — odd items are the matches
  const parts = text.split(new RegExp(`(${escape(needle)})`, 'gi'))
  if (parts.length === 1) return text

  return parts.map((part, index) =>
    index % 2 === 1 ? (
      <mark key={index} className="rounded-[2px] bg-highlight-400 text-inherit">
        {part}
      </mark>
    ) : (
      part
    ),
  )
}
