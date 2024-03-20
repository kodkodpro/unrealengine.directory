import { XMarkIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"
import { ComponentProps, ReactNode } from "react"
import { BadgeButton } from "@/components/catalyst/badge"
import { Label } from "@/components/catalyst/fieldset"
import { cn } from "@/lib/utils/cn"

export type LabelWithClearButtonProps = {
  showClearButton: boolean
  clearButtonClassName?: string
  onClear: () => void
  children: ReactNode
} & Omit<ComponentProps<typeof Label>, "children">

export default function LabelWithClearButton({ showClearButton, clearButtonClassName, onClear, className, children, ...props }: LabelWithClearButtonProps) {
  return (
    <Label
      className={clsx("block", className)}
      {...props}
    >
      {children}

      {showClearButton && (
        <BadgeButton
          className={cn("float-right mt-1", clearButtonClassName)}
          onClick={onClear}
        >
          <XMarkIcon className="-mr-1 inline-block size-4 text-red-500" />
          <span>Clear</span>
        </BadgeButton>
      )}
    </Label>
  )
}
