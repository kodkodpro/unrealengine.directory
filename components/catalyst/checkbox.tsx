import { Checkbox as HeadlessCheckbox, Field as HeadlessField, type CheckboxProps as HeadlessCheckboxProps, type FieldProps as HeadlessFieldProps } from "@headlessui/react"
import { clsx } from "clsx"
import type React from "react"

export function CheckboxGroup({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      data-slot="control"
      {...props}
      className={clsx(
        className,

        // Basic groups
        "space-y-3",

        // With descriptions
        "has-[[db-slot=description]]:space-y-6 [&_[db-slot=label]]:has-[[db-slot=description]]:font-medium"
      )}
    />
  )
}

export function CheckboxField({ className, ...props }: HeadlessFieldProps) {
  return (
    <HeadlessField
      data-slot="field"
      {...props}
      className={clsx(
        className,

        // Base layout
        "grid grid-cols-[1.125rem_1fr] items-center gap-x-4 gap-y-1 sm:grid-cols-[1rem_1fr]",

        // Control layout
        "[&>[db-slot=control]]:col-start-1 [&>[db-slot=control]]:row-start-1 [&>[db-slot=control]]:justify-self-center",

        // Label layout
        "[&>[db-slot=label]]:col-start-2 [&>[db-slot=label]]:row-start-1 [&>[db-slot=label]]:justify-self-start",

        // Description layout
        "[&>[db-slot=description]]:col-start-2 [&>[db-slot=description]]:row-start-2",

        // With description
        "[&_[db-slot=label]]:has-[[db-slot=description]]:font-medium"
      )}
    />
  )
}

const base = [
  // Basic layout
  "relative isolate flex size-[1.125rem] items-center justify-center rounded-[0.3125rem] sm:size-4",

  // Background color + shadow applied to inset pseudo element, so shadow blends with border in light mode
  "before:absolute before:inset-0 before:-z-10 before:rounded-[calc(0.3125rem-1px)] before:bg-white before:shadow",

  // Background color when checked
  "before:group-db-[checked]:bg-[--checkbox-checked-bg]",

  // Background color is moved to control and shadow is removed in dark mode so hide `before` pseudo
  "dark:before:hidden",

  // Background color applied to control in dark mode
  "dark:bg-white/5 dark:group-db-[checked]:bg-[--checkbox-checked-bg]",

  // Border
  "border border-zinc-950/15 group-db-[checked]:border-transparent group-db-[checked]:group-db-[hover]:border-transparent group-db-[hover]:border-zinc-950/30 group-db-[checked]:bg-[--checkbox-checked-border]",
  "dark:border-white/15 dark:group-db-[checked]:border-white/5 dark:group-db-[checked]:group-db-[hover]:border-white/5 dark:group-db-[hover]:border-white/30",

  // Inner highlight shadow
  "after:absolute after:inset-0 after:rounded-[calc(0.3125rem-1px)] after:shadow-[inset_0_1px_theme(colors.white/15%)]",
  "dark:after:-inset-px dark:after:hidden dark:after:rounded-[0.3125rem] dark:group-db-[checked]:after:block",

  // Focus ring
  "group-db-[focus]:outline group-db-[focus]:outline-2 group-db-[focus]:outline-offset-2 group-db-[focus]:outline-blue-500",

  // Disabled state
  "group-db-[disabled]:opacity-50",
  "group-db-[disabled]:border-zinc-950/25 group-db-[disabled]:bg-zinc-950/5 group-db-[disabled]:[--checkbox-check:theme(colors.zinc.950/50%)] group-db-[disabled]:before:bg-transparent",
  "dark:group-db-[disabled]:border-white/20 dark:group-db-[disabled]:bg-white/[2.5%] dark:group-db-[disabled]:[--checkbox-check:theme(colors.white/50%)] dark:group-db-[disabled]:group-db-[checked]:after:hidden",

  // Forced colors mode
  "forced-colors:[--checkbox-check:HighlightText] forced-colors:[--checkbox-checked-bg:Highlight] forced-colors:group-db-[disabled]:[--checkbox-check:Highlight]",
  "dark:forced-colors:[--checkbox-check:HighlightText] dark:forced-colors:[--checkbox-checked-bg:Highlight] dark:forced-colors:group-db-[disabled]:[--checkbox-check:Highlight]",
]

const colors = {
  "dark/zinc": [
    "[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.zinc.900)] [--checkbox-checked-border:theme(colors.zinc.950/90%)]",
    "dark:[--checkbox-checked-bg:theme(colors.zinc.600)]",
  ],
  "dark/white": [
    "[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.zinc.900)] [--checkbox-checked-border:theme(colors.zinc.950/90%)]",
    "dark:[--checkbox-check:theme(colors.zinc.900)] dark:[--checkbox-checked-bg:theme(colors.white)] dark:[--checkbox-checked-border:theme(colors.zinc.950/15%)]",
  ],
  white:
    "[--checkbox-check:theme(colors.zinc.900)] [--checkbox-checked-bg:theme(colors.white)] [--checkbox-checked-border:theme(colors.zinc.950/15%)]",
  dark: "[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.zinc.900)] [--checkbox-checked-border:theme(colors.zinc.950/90%)]",
  zinc: "[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.zinc.600)] [--checkbox-checked-border:theme(colors.zinc.700/90%)]",
  red: "[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.red.600)] [--checkbox-checked-border:theme(colors.red.700/90%)]",
  orange:
    "[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.orange.500)] [--checkbox-checked-border:theme(colors.orange.600/90%)]",
  amber:
    "[--checkbox-check:theme(colors.amber.950)] [--checkbox-checked-bg:theme(colors.amber.400)] [--checkbox-checked-border:theme(colors.amber.500/80%)]",
  yellow:
    "[--checkbox-check:theme(colors.yellow.950)] [--checkbox-checked-bg:theme(colors.yellow.300)] [--checkbox-checked-border:theme(colors.yellow.400/80%)]",
  lime: "[--checkbox-check:theme(colors.lime.950)] [--checkbox-checked-bg:theme(colors.lime.300)] [--checkbox-checked-border:theme(colors.lime.400/80%)]",
  green:
    "[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.green.600)] [--checkbox-checked-border:theme(colors.green.700/90%)]",
  emerald:
    "[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.emerald.600)] [--checkbox-checked-border:theme(colors.emerald.700/90%)]",
  teal: "[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.teal.600)] [--checkbox-checked-border:theme(colors.teal.700/90%)]",
  cyan: "[--checkbox-check:theme(colors.cyan.950)] [--checkbox-checked-bg:theme(colors.cyan.300)] [--checkbox-checked-border:theme(colors.cyan.400/80%)]",
  sky: "[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.sky.500)] [--checkbox-checked-border:theme(colors.sky.600/80%)]",
  blue: "[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.blue.600)] [--checkbox-checked-border:theme(colors.blue.700/90%)]",
  indigo:
    "[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.indigo.500)] [--checkbox-checked-border:theme(colors.indigo.600/90%)]",
  violet:
    "[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.violet.500)] [--checkbox-checked-border:theme(colors.violet.600/90%)]",
  purple:
    "[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.purple.500)] [--checkbox-checked-border:theme(colors.purple.600/90%)]",
  fuchsia:
    "[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.fuchsia.500)] [--checkbox-checked-border:theme(colors.fuchsia.600/90%)]",
  pink: "[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.pink.500)] [--checkbox-checked-border:theme(colors.pink.600/90%)]",
  rose: "[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.rose.500)] [--checkbox-checked-border:theme(colors.rose.600/90%)]",
}

type Color = keyof typeof colors

export function Checkbox({
  color = "dark/zinc",
  className,
  ...props
}: {
  color?: Color
  className?: string
} & HeadlessCheckboxProps) {
  return (
    <HeadlessCheckbox
      data-slot="control"
      className={clsx(className, "group inline-flex focus:outline-none")}
      {...props}
    >
      <span className={clsx([base, colors[color]])}>
        <svg
          className="size-4 stroke-[--checkbox-check] opacity-0 group-data-[checked]:opacity-100 sm:size-3.5"
          viewBox="0 0 14 14"
          fill="none"
        >
          {/* Checkmark icon */}
          <path
            className="opacity-100 group-data-[indeterminate]:opacity-0"
            d="M3 8L6 11L11 3.5"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Indeterminate icon */}
          <path
            className="opacity-0 group-data-[indeterminate]:opacity-100"
            d="M3 7H11"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </HeadlessCheckbox>
  )
}
