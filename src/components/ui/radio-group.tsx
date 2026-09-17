import type { ComponentProps } from 'react'
import { RadioGroup as RadioGroupPrimitive } from 'radix-ui'

export const RadioGroup = RadioGroupPrimitive.Root

// Design system "Radio" (20px).
// Off:  Grey 500 border · hover Grey 200 fill + Grey 700 border · pressed Grey 300 fill + Grey 800 border · disabled Grey 400 border
// On:   Primary 500 fill with a white 8px dot (no hover / pressed change) · disabled Primary 300 fill
// Hover/pressed also apply while the pointer is over an enclosing <label>.
export function RadioGroupItem({ className = '', ...props }: ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      className={[
        'relative flex size-5 shrink-0 items-center justify-center rounded-full border outline-none transition-colors',
        'focus-visible:ring-2 focus-visible:ring-primary-500/40 disabled:cursor-not-allowed',
        'data-[state=unchecked]:border-grey-500 data-[state=unchecked]:bg-white',
        'data-[state=unchecked]:hover:border-grey-700 data-[state=unchecked]:hover:bg-grey-200',
        'data-[state=unchecked]:in-[label:hover]:border-grey-700 data-[state=unchecked]:in-[label:hover]:bg-grey-200',
        'data-[state=unchecked]:active:border-grey-800 data-[state=unchecked]:active:bg-grey-300',
        'data-[state=unchecked]:in-[label:active]:border-grey-800 data-[state=unchecked]:in-[label:active]:bg-grey-300',
        'data-[state=unchecked]:disabled:border-grey-400 data-[state=unchecked]:disabled:bg-white',
        'data-[state=checked]:border-transparent data-[state=checked]:bg-primary-500 data-[state=checked]:disabled:bg-primary-300',
        className,
      ].join(' ')}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="size-2 rounded-full bg-white" />
    </RadioGroupPrimitive.Item>
  )
}
