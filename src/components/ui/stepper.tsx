import tickIcon from '@/assets/figma/tick-20.svg'

export type StepStatus = {
  label: string
  completed: boolean
  reachable: boolean // visited (and still valid); unreached steps are shown inactive
}

type StepperProps = {
  steps: StepStatus[]
  current: number // zero-based
}

// Design system "Stepper / Horizontal" — display only; steps aren't clickable (use Back / Continue).
// Step indicator: Selected (tinted, number) · Completed (filled, tick) · Not completed (outlined, number) · Inactive (grey)
// Connectors: the line into a step is blue unless the step is inactive; the line out of it is blue once it's completed.
export function Stepper({ steps, current }: StepperProps) {
  return (
    <ol className="flex items-start justify-center">
      {steps.map((step, index) => {
        const selected = index === current
        const inactive = !selected && !step.reachable
        return (
          <li
            key={step.label}
            aria-current={selected ? 'step' : undefined}
            className="flex h-14 min-w-0 flex-1 flex-col items-center justify-center gap-2"
          >
            <span className="flex w-full items-center justify-center">
              <Connector hidden={index === 0} active={!inactive} />
              <Indicator number={index + 1} selected={selected} completed={step.completed} inactive={inactive} />
              <Connector hidden={index === steps.length - 1} active={step.completed && !inactive} />
            </span>
            <span
              className={[
                'flex h-6 items-center rounded-md px-3 text-sm leading-[22px] whitespace-nowrap',
                selected ? 'bg-primary-100 font-medium text-primary-500' : inactive ? 'text-grey-500' : 'text-grey-1000',
              ].join(' ')}
            >
              {step.label}
            </span>
          </li>
        )
      })}
    </ol>
  )
}

function Indicator({ number, selected, completed, inactive }: { number: number; selected: boolean; completed: boolean; inactive: boolean }) {
  if (completed && !inactive) {
    return (
      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary-500 p-0.5">
        <img src={tickIcon} alt="Completed" className="size-5" />
      </span>
    )
  }
  return (
    <span
      className={[
        'flex size-6 shrink-0 items-center justify-center rounded-full border-2 text-xs leading-5 font-semibold',
        inactive ? 'border-grey-400 text-grey-500' : 'border-primary-500 text-primary-500',
        selected ? 'bg-primary-100' : 'bg-white',
      ].join(' ')}
    >
      {number}
    </span>
  )
}

function Connector({ hidden, active }: { hidden: boolean; active: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`h-0.5 min-w-px flex-1 ${hidden ? 'invisible' : active ? 'bg-primary-500' : 'bg-grey-400'}`}
    />
  )
}
