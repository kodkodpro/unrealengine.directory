import clsx from "clsx"
import Toggle from "react-toggle"
import Label from "@/components/form/Label"
import uiConfig, { Sizes, Variants } from "@/ui.config"

export type CheckboxProps = {
  label?: string
  value?: boolean
  toggle?: boolean
  onToggle?: (value: boolean) => void
  size?: Sizes
  variant?: Variants
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "size">

export default function Checkbox({
  label,
  value,
  toggle = false,
  onChange,
  onToggle,
  size: s = "md",
  variant: v = "default",
  className,
  ...props
}: CheckboxProps) {
  const size = uiConfig.sizes[s]
  const variant = uiConfig.variants[v]

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event)
    onToggle?.(event.target.checked)
  }

  return (
    <label className={clsx(
      "flex cursor-pointer items-center",
      size.text,
      size.gapSmaller.x,
      variant.text,
      variant.accent,
      className,
    )}>
      {toggle ? (
        <Toggle
          icons={false}
          defaultChecked={value}
          onChange={handleChange}
        />
      ) : (
        <input
          type="checkbox"
          checked={value}
          onChange={handleChange}
          {...props}
        />
      )}

      {label && <Label text={label} as="span" size={s} variant={v} margin={false} />}
    </label>
  )
}
