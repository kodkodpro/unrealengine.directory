import clsx from "clsx"
import uiConfig, { Sizes, Variants } from "@/ui.config"

export type ButtonProps = {
  resizable?: boolean
  children?: React.ReactNode
  size?: Sizes
  variant?: Variants
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({
  resizable = false,
  size: s = "md",
  variant: v = "primary",
  children,
  className,
  ...props
}: ButtonProps) {
  const size = uiConfig.sizes[s]
  const variant = uiConfig.variants[v]

  return (
    <button
      className={clsx(
        "flex items-center justify-center",
        size.text,
        size.padding.x,
        size.rounding,
        variant.text,
        resizable ? size.padding.y : size.height,
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
