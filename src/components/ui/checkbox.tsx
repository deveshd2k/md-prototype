import type { ComponentProps } from "react"
import { cn } from "cn"
import { Checkbox as CheckboxPrimitive } from "radix-ui"
import tickIcon from "@/assets/figma/tick-20.svg"

// Design system "Checkbox" (20px), selected = Off / On / Mixed.
//            Idle                 Hover                Pressed              Disabled
// Off:   Grey 500 border     Grey 200 fill,       Grey 300 fill,       Grey 400 border
//                            Grey 700 border      Grey 800 border
// On:    Primary 500 fill    Primary 400 fill     Primary 600 fill     Primary 300 fill      (white tick)
// Mixed: Primary 100 fill,   Primary 400 border   Primary 200 fill,    Primary 300 border    (dash in border colour)
//        Primary 500 border                       Primary 600 border
// Hover/pressed also apply while the pointer is over an enclosing <label>.
const stateClasses = [
  // Off
  "border-grey-500 bg-white",
  "hover:border-grey-700 hover:bg-grey-200 in-[label:hover]:border-grey-700 in-[label:hover]:bg-grey-200",
  "active:border-grey-800 active:bg-grey-300 in-[label:active]:border-grey-800 in-[label:active]:bg-grey-300",
  "disabled:border-grey-400 disabled:bg-white",
  // On
  "data-[state=checked]:border-transparent data-[state=checked]:bg-primary-500",
  "data-[state=checked]:hover:bg-primary-400 data-[state=checked]:in-[label:hover]:bg-primary-400",
  "data-[state=checked]:active:bg-primary-600 data-[state=checked]:in-[label:active]:bg-primary-600",
  "data-[state=checked]:disabled:bg-primary-300",
  // Mixed
  "data-[state=indeterminate]:border-primary-500 data-[state=indeterminate]:bg-primary-100 data-[state=indeterminate]:text-primary-500",
  "data-[state=indeterminate]:hover:border-primary-400 data-[state=indeterminate]:hover:bg-primary-100 data-[state=indeterminate]:hover:text-primary-400",
  "data-[state=indeterminate]:in-[label:hover]:border-primary-400 data-[state=indeterminate]:in-[label:hover]:bg-primary-100 data-[state=indeterminate]:in-[label:hover]:text-primary-400",
  "data-[state=indeterminate]:active:border-primary-600 data-[state=indeterminate]:active:bg-primary-200 data-[state=indeterminate]:active:text-primary-600",
  "data-[state=indeterminate]:in-[label:active]:border-primary-600 data-[state=indeterminate]:in-[label:active]:bg-primary-200 data-[state=indeterminate]:in-[label:active]:text-primary-600",
  "data-[state=indeterminate]:disabled:border-primary-300 data-[state=indeterminate]:disabled:bg-primary-100 data-[state=indeterminate]:disabled:text-primary-300",
].join(" ")

function Checkbox({ className, ...props }: ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer relative flex size-5 shrink-0 cursor-pointer items-center justify-center rounded border outline-none transition-colors",
        "focus-visible:ring-2 focus-visible:ring-primary-500/40 disabled:cursor-not-allowed",
        stateClasses,
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator data-slot="checkbox-indicator" className="flex items-center justify-center">
        {props.checked === "indeterminate" ? (
          // Figma "Dash" (20px); takes the border colour of the current state
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="size-5 shrink-0">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6 10C6 9.44772 6.44772 9 7 9H13C13.5523 9 14 9.44772 14 10C14 10.5523 13.5523 11 13 11H7C6.44772 11 6 10.5523 6 10Z"
              fill="currentColor"
            />
          </svg>
        ) : (
          <img src={tickIcon} alt="" className="size-5 max-w-none shrink-0" />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
