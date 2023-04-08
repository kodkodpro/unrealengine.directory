"use client"

import InputWrapper, { InputWrapperProps } from "@/components/form/InputWrapper"
import clsx from "clsx"
import { LabelProps } from "@/components/form/Label"
import { FunctionComponent, ReactNode, useState } from "react"
import uiConfig, { Sizes, Variants } from "@/ui.config"
import { Combobox, Listbox } from "@headlessui/react"
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/solid"

type WrapperProps = Omit<
  InputWrapperProps,
  "children" | "size" | "variant" | "rightIcon" | "rightIconOnClick" | "onChange"
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
  emptyValue?: T
  options?: readonly Option<T>[]
  onChange?: (value: T) => void

  size?: InputWrapperProps["size"]
  variant?: InputWrapperProps["variant"]
} & WrapperProps & HTMLInputProps

export default function Select<T extends string>({
  // SelectProps
  placeholder,
  value,
  emptyValue,
  options,
  onChange,

  // InputWrapperProps
  label,
  labelProps,
  leftIcon,
  leftIconOnClick,
  clearable,
  size: s = "md",
  variant: v = "default",

  // HTMLInputProps
  className,
  ...props
} : SelectProps<T>) {
  const selectedOption = options?.find((option) => option.value === value)
  const noOptions = !options || options.length === 0

  const size = uiConfig.sizes[s]
  const variant = uiConfig.variants[v]

  return (
    <InputWrapper
      label={label}
      labelProps={labelProps}
      leftIcon={leftIcon}
      leftIconOnClick={leftIconOnClick}
      clearable={clearable && !!value}
      className={clsx("relative", className)}
      size={s}
      variant={v}
      resizable
      onClear={() => emptyValue && onChange?.(emptyValue)}
      {...props}
    >
      <Listbox value={value} onChange={onChange}>
        <Listbox.Button className={clsx(
          "h-full flex-1 bg-transparent text-left focus:outline-none focus:ring-0 w-full",
          size.textSmaller,
          !selectedOption ? variant.textLessContrast : variant.text,
        )}>
          {!selectedOption ? placeholder : selectedOption.label}
        </Listbox.Button>

        <Listbox.Options className={clsx(
          "absolute inset-x-0 -bottom-2 z-50 min-w-[250px] translate-y-full focus:outline-none focus:ring-0",
          "max-h-[66vh] overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-500 scrollbar-track-transparent",
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
