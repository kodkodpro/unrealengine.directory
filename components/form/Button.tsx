import clsx from "clsx"
import uiConfig, { Sizes, Variants } from "@/ui.config"

export type ButtonProps = {
  children?: React.ReactNode
  size?: Sizes
  variant?: Variants
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({ size: s = "md", variant: v = "primary", className, children, ...props }: ButtonProps) {
  const size = uiConfig.sizes[s]
  const variant = uiConfig.variants[v]

  return (
    <button
      className={clsx(
        "flex items-center justify-center",
        size.text,
        size.height,
        size.padding.x,
        size.rounding,
        variant.text,
        props.disabled ? variant.bgLessContrast : variant.bg,
        props.disabled && "cursor-not-allowed",
        !props.disabled && variant.bgHover,
        !props.disabled && variant.bgActive,
        className,
      )}
      {...props}
    >
      <span className="text-center">
        {children}
      </span>
    </button>
  )
}
