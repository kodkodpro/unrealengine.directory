import clsx from "clsx"
import ReactSlider, { ReactSliderProps } from "react-slider"
import Label from "@/components/form/Label"
import uiConfig, { Sizes, Variants } from "@/ui.config"

export type RangeProps = {
  label?: string
  className?: string
  size?: Sizes,
  variant?: Variants
} & ReactSliderProps<number[]>

export default function Range({
  label,
  size: s = "md",
  variant: v = "default",
  className,
  ...props
} : RangeProps) {
  const { disabled } = props

  const size = uiConfig.sizes[s]
  const variant = uiConfig.variants[v]

  const renderTrack: ReactSliderProps<number[]>["renderTrack"] = ({ key, ...props }, { index }) => (
    <div
      {...props}
      key={key}
      className={clsx(
        "rounded-full",
        size.heightSmallest,
        index === 1
          ? disabled ? variant.bgAccentLessContrast : variant.bgAccent
          : disabled ? variant.bgLessContrast : variant.bg,
      )}
    />
  )

  const renderThumb: ReactSliderProps<number[]>["renderThumb"] = ({ key, ...props }) => (
    <div
      {...props}
      key={key}
      className={clsx(
        "-mt-1 box-border rounded-full",
        size.widthSmaller,
        size.heightSmaller,
        !disabled && variant.focus,
        disabled ? "bg-neutral-300" : "bg-neutral-100",
      )}
    />
  )

  return (
    <div className={className}>
      {label && <Label text={label} />}

      <div className={clsx("py-1", className)}>
        <ReactSlider
          renderTrack={renderTrack}
          renderThumb={renderThumb}
          className="h-4"
          {...props}
        />
      </div>
    </div>
  )
}
