"use client"

import InputWrapper, { InputWrapperProps } from "@/components/form/InputWrapper"
import clsx from "clsx"
import { LabelProps } from "@/components/form/Label"
import { FunctionComponent, ReactNode, useState } from "react"
import uiConfig, { Sizes, Variants } from "@/ui.config"
import { Combobox, Listbox } from "@headlessui/react"
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/solid"

type WrapperProps = Omit<InputWrapperProps, "children" | "size" | "variant" | "rightIcon" | "rightIconOnClick">
type HTMLInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "value" | "onChange">

type Option<T = string> = {
  label: string
  value: T
}

export type MultiSelectProps<T = string> = {
  placeholder?: string
  value?: T[]
  options?: Option<T>[]
  onChange?: (value: T[]) => void

  size?: InputWrapperProps["size"]
  variant?: InputWrapperProps["variant"]
} & WrapperProps & HTMLInputProps

export default function MultiSelect<T extends string | number>({
  // MultiSelectProps
  placeholder,
  value,
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
} : MultiSelectProps<T>) {
  const [query, setQuery] = useState("")

  const selectedOptions = options?.filter((option) => value?.includes(option.value)) ?? []
  const filteredOptions = options?.filter((option) => option.label.toLowerCase().includes(query.toLowerCase())) ?? []

  const noOptions = !options || options.length === 0
  const noSelectedOptions = selectedOptions.length === 0
  const noFilteredOptions = filteredOptions.length === 0

  const size = uiConfig.sizes[s]
  const variant = uiConfig.variants[v]

  return (
    <InputWrapper
      label={label}
      labelProps={labelProps}
      leftIcon={leftIcon}
      leftIconOnClick={leftIconOnClick}
      clearable={clearable && !!value?.length}
      className="relative"
      size={s}
      variant={v}
      resizable
      onClear={() => onChange?.([])}
    >
      <Listbox value={value} onChange={onChange} multiple>
        <Listbox.Button className={clsx(
          "h-full flex-1 bg-transparent text-left focus:outline-none focus:ring-0 w-full",
          size.textSmaller,
          noSelectedOptions ? variant.textLessContrast : variant.text,
        )}>
          {noSelectedOptions ? placeholder : selectedOptions.map((option) => option.label).join(", ")}
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
          {!noOptions && (
            <li className={clsx(size.marginSmallest.bottom)}>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className={clsx(
                  "w-full",
                  size.textSmaller,
                  size.heightSmall,
                  size.rounding,
                  size.paddingSmaller.x,
                  variant.bgMoreContrast,
                  variant.focus,
                )}
              />
            </li>
          )}

          {noFilteredOptions && (
            <li className={clsx(
              "text-center",
              size.textSmaller,
              size.padding.all,
              variant.textLessContrast,
            )}>
              No options found
            </li>
          )}

          {filteredOptions.map((option) => (
            <Listbox.Option
              key={option.value}
              value={option.value}
              className={({ active, selected }) => clsx(
                "flex cursor-pointer items-center",
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
              <span className={clsx(
                size.heightSmallest,
                size.widthSmallest,
              )}>
                {value?.includes(option.value) && (
                  <CheckIcon className="w-full h-full" />
                )}
              </span>

              <span className="flex-1">
                {option.label}
              </span>
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </InputWrapper>
  )
}
