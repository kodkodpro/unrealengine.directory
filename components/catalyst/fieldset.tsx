import { Description as HeadlessDescription, Field as HeadlessField, Fieldset as HeadlessFieldset, Label as HeadlessLabel, Legend as HeadlessLegend, type DescriptionProps as HeadlessDescriptionProps, type FieldProps as HeadlessFieldProps, type FieldsetProps as HeadlessFieldsetProps, type LabelProps as HeadlessLabelProps, type LegendProps as HeadlessLegendProps } from "@headlessui/react"
import clsx from "clsx"
import type React from "react"

export function Fieldset({ className, ...props }: { disabled?: boolean } & HeadlessFieldsetProps) {
  return (
    <HeadlessFieldset
      {...props}
      className={clsx(className, "[&>*+[db-slot=control]]:mt-6 [&>[db-slot=text]]:mt-1")}
    />
  )
}

export function Legend({ ...props }: HeadlessLegendProps) {
  return (
    <HeadlessLegend
      {...props}
      data-slot="legend"
      className={clsx(
        props.className,
        "text-base/6 font-semibold text-zinc-950 db-[disabled]:opacity-50 sm:text-sm/6 dark:text-white"
      )}
    />
  )
}

export function FieldGroup({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      {...props}
      data-slot="control"
      className={clsx(className, "space-y-8")}
    />
  )
}

export function Field({ className, ...props }: HeadlessFieldProps) {
  return (
    <HeadlessField
      className={clsx(
        className,
        "[&>[db-slot=label]+[db-slot=control]]:mt-3",
        "[&>[db-slot=label]+[db-slot=description]]:mt-1",
        "[&>[db-slot=description]+[db-slot=control]]:mt-3",
        "[&>[db-slot=control]+[db-slot=description]]:mt-3",
        "[&>[db-slot=control]+[db-slot=error]]:mt-3",
        "[&>[db-slot=label]]:font-medium"
      )}
      {...props}
    />
  )
}

export function Label({ className, ...props }: { className?: string } & HeadlessLabelProps) {
  return (
    <HeadlessLabel
      {...props}
      data-slot="label"
      className={clsx(
        className,
        "select-none text-base/6 text-zinc-950 db-[disabled]:opacity-50 sm:text-sm/6 dark:text-white"
      )}
    />
  )
}

export function Description({
  className,
  disabled,
  ...props
}: { className?: string; disabled?: boolean } & HeadlessDescriptionProps) {
  return (
    <HeadlessDescription
      {...props}
      data-slot="description"
      className={clsx(
        className,
        "text-base/6 text-zinc-500 db-[disabled]:opacity-50 sm:text-sm/6 dark:text-zinc-400"
      )}
    />
  )
}

export function ErrorMessage({
  className,
  disabled,
  ...props
}: { className?: string; disabled?: boolean } & HeadlessDescriptionProps) {
  return (
    <HeadlessDescription
      {...props}
      data-slot="error"
      className={clsx(className, "text-base/6 text-red-600 db-[disabled]:opacity-50 sm:text-sm/6 dark:text-red-500")}
    />
  )
}
