import clsx from "clsx"
import uiConfig, { Sizes, Variants } from "@/ui.config"

export type LabelProps = {
  text: string
  required?: boolean
  optional?: boolean
  hint?: string
  as?: string
  margin?: boolean
  size?: Sizes
  variant?: Variants
} & React.LabelHTMLAttributes<HTMLLabelElement>

export default function Label({
  text,
  required,
  optional,
  hint,
  as = "label",
  size: s = "md",
  variant: v = "default",
  margin = true,
  className,
  ...props
} : LabelProps) {
  const size = uiConfig.sizes[s]
  const variant = uiConfig.variants[v]

  const Tag = as

  return (
    <div className={clsx(
      "flex items-center justify-between",
      variant.text,
      size.text,
      margin && size.marginSmallest.bottom,
      className,
    )}>
      <Tag {...props}>
        {text}
      </Tag>

      <span className={clsx(
        size.textSmaller,
        variant.textLessContrast,
      )}>
        {required && "Required"}
        {optional && "Optional"}
        {hint}
      </span>
    </div>
  )
}
