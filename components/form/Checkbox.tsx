import uiConfig, { Sizes, Variants } from "@/ui.config"
import clsx from "clsx"
import Label from "@/components/form/Label"

export type CheckboxProps = {
  label?: string
  value?: boolean
  onToggle?: (value: boolean) => void
  size?: Sizes
  variant?: Variants
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "size">

export default function Checkbox({ label, value, onChange, onToggle, size: s = "md", variant: v = "default", className, ...props }: CheckboxProps) {
  const size = uiConfig.sizes[s]
  const variant = uiConfig.variants[v]

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event)
    onToggle?.(event.target.checked)
  }

  return (
    <div className={clsx(
      "flex cursor-pointer items-center",
      size.text,
      size.gapSmaller.x,
      variant.text,
      variant.accent,
      className,
    )}>
      <input
        type="checkbox"
        checked={value}
        className={clsx(
          size.widthSmaller,
          size.heightSmaller,
        )}
        onChange={handleChange}
        {...props}
      />

      {label && <Label text={label} htmlFor={props.id} size={s} variant={v} margin={false} />}
    </div>
  )
}
