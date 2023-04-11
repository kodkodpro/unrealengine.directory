"use client"

import { Listbox } from "@headlessui/react"
import clsx from "clsx"
import InputWrapper, { InputWrapperProps } from "@/components/form/InputWrapper"
import uiConfig from "@/ui.config"

type WrapperProps = Omit<
  InputWrapperProps,
  "children" | "size" | "variant" | "rightIcon" | "rightIconOnClick" | "onChange" | "clearable"
>

type HTMLInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "value" | "onChange"
>

type Option<T> = {
  label: string
  value: T
}

export type SelectProps<T = string> = {
  placeholder?: string
  value?: T
  options?: readonly Option<T>[]
  openDirection?: `${"top" | "bottom"}-${"left" | "right"}`
  onChange?: (value: T) => void

  size?: InputWrapperProps["size"]
  variant?: InputWrapperProps["variant"]
} & WrapperProps & HTMLInputProps

export default function Select<T extends string>({
  // SelectProps
  placeholder,
  value,
  options,
  openDirection = "bottom-right",
  onChange,

  // InputWrapperProps
  label,
  labelProps,
  leftIcon,
  leftIconOnClick,
  size: s = "md",
  variant: v = "default",
  onClear,

  // HTMLInputProps
  className,
  ...props
} : SelectProps<T>) {
  const selectedOption = options?.find((option) => option.value === value)
  const noOptions = !options || options.length === 0

  const directionClasses = {
    "top-left": "-top-2 right-0",
    "top-right": "-top-2 left-0",
    "bottom-left": "-bottom-2 right-0",
    "bottom-right": "-bottom-2 left-0",
  }

  const size = uiConfig.sizes[s]
  const variant = uiConfig.variants[v]

  return (
    <InputWrapper
      label={label}
      labelProps={labelProps}
      leftIcon={leftIcon}
      leftIconOnClick={leftIconOnClick}
      clearable={onClear && !!value}
      className={clsx("relative", className)}
      size={s}
      variant={v}
      onClear={onClear}
      {...props}
    >
      <Listbox value={value} onChange={onChange}>
        <Listbox.Button className={clsx(
          "h-full w-full flex-1 bg-transparent text-left focus:outline-none focus:ring-0",
          size.textSmaller,
          !selectedOption ? variant.textLessContrast : variant.text,
        )}>
          {!selectedOption ? placeholder : selectedOption.label}
        </Listbox.Button>

        <Listbox.Options className={clsx(
          "absolute z-50 min-w-[250px] translate-y-full focus:outline-none focus:ring-0",
          "max-h-[66vh] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral-500",
          directionClasses[openDirection],
          size.text,
          size.rounding,
          size.paddingSmaller.all,
          size.spacingSmallest.y,
          variant.text,
          variant.bg,
          variant.border,
        )}>
          {noOptions && (
            <li className={clsx(
              "text-center",
              size.textSmaller,
              size.padding.all,
              variant.textLessContrast,
            )}>
              No options available
            </li>
          )}

          {(options || []).map((option) => (
            <Listbox.Option
              key={option.value}
              value={option.value}
              className={({ active, selected }) => clsx(
                "cursor-pointer",
                size.textSmaller,
                size.rounding,
                size.paddingSmaller.all,
                size.gapSmaller.x,
                active
                  ? variant.bgLessContrast
                  : selected ? variant.bgMoreContrast : variant.bg,
                active
                  ? variant.textMoreContrast
                  : variant.text,
              )}
            >
              {option.label}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </InputWrapper>
  )
}
