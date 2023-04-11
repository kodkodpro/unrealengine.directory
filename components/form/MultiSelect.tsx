"use client"

import { Listbox } from "@headlessui/react"
import { FunnelIcon } from "@heroicons/react/24/outline"
import { CheckIcon } from "@heroicons/react/24/solid"
import clsx from "clsx"
import { useState } from "react"
import { FixedSizeList } from "react-window"
import Input from "@/components/form/Input"
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

type Option<T = string> = {
  label: string
  value: T
}

export type MultiSelectProps<T = string> = {
  placeholder?: string
  value?: T[]
  options?: readonly Option<T>[]
  renderSelectedOptions?: (options: Option<T>[]) => React.ReactNode
  virtualized?: boolean
  virtualizedHeight?: number
  virtualizedItemHeight?: number
  onChange?: (value: T[]) => void

  size?: InputWrapperProps["size"]
  variant?: InputWrapperProps["variant"]
} & WrapperProps & HTMLInputProps

export default function MultiSelect<T extends string | number>({
  // MultiSelectProps
  placeholder,
  value,
  options,
  renderSelectedOptions,
  virtualized,
  virtualizedHeight = 250,
  virtualizedItemHeight = 44,
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
} : MultiSelectProps<T>) {
  const [query, setQuery] = useState("")

  const selectedOptions = options?.filter((option) => value?.includes(option.value)) ?? []
  const filteredOptions = options?.filter((option) => option.label.toLowerCase().includes(query.toLowerCase())) ?? []

  const noOptions = !options || options.length === 0
  const noSelectedOptions = selectedOptions.length === 0
  const noFilteredOptions = filteredOptions.length === 0

  const size = uiConfig.sizes[s]
  const variant = uiConfig.variants[v]

  const renderVirtualListItem = ({ index, style }: { index: number, style: React.CSSProperties }) => (
    <div key={filteredOptions[index].value} style={style}>
      <Listbox.Option
        value={filteredOptions[index].value}
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
          {value?.includes(filteredOptions[index].value) && (
            <CheckIcon className="w-full h-full" />
          )}
        </span>

        <span className="flex-1">
          {filteredOptions[index].label}
        </span>
      </Listbox.Option>
    </div>
  )

  return (
    <InputWrapper
      label={label}
      labelProps={labelProps}
      leftIcon={leftIcon}
      leftIconOnClick={leftIconOnClick}
      clearable={onClear && !!value?.length}
      className={clsx("relative", className)}
      size={s}
      variant={v}
      resizable
      onClear={onClear}
      {...props}
    >
      <Listbox value={value} onChange={onChange} multiple>
        <Listbox.Button className={clsx(
          "h-full flex-1 bg-transparent text-left focus:outline-none focus:ring-0 w-full",
          size.textSmaller,
          noSelectedOptions ? variant.textLessContrast : variant.text,
        )}>
          {noSelectedOptions
            ? placeholder
            : renderSelectedOptions?.(selectedOptions) ?? selectedOptions.map((option) => option.label).join(", ")
          }
        </Listbox.Button>

        <Listbox.Options className={clsx(
          "absolute inset-x-0 -bottom-2 z-50 min-w-[250px] translate-y-full focus:outline-none focus:ring-0",
          "max-h-[50vh] overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-500 scrollbar-track-transparent",
          size.text,
          size.rounding,
          size.paddingSmaller.all,
          size.spacingSmallest.y,
          variant.text,
          variant.bg,
          variant.border,
        )}>
          {!noOptions && (
            <>
              <li className={clsx(size.marginSmallest.bottom)}>
                <Input
                  leftIcon={FunnelIcon}
                  placeholder="Filter options"
                  size="sm"
                  variant="dark"
                  value={query}
                  onChangeText={setQuery}
                />
              </li>

              {virtualized ? (
                <FixedSizeList
                  height={virtualizedHeight}
                  itemSize={virtualizedItemHeight}
                  itemCount={filteredOptions.length}
                  width="100%"
                  className="scrollbar-thin scrollbar-thumb-neutral-500 scrollbar-track-transparent"
                >
                  {renderVirtualListItem}
                </FixedSizeList>
              ) : (
                Array.from({ length: filteredOptions.length }, (_, index) => (
                  renderVirtualListItem({ index, style: {} })
                ))
              )}
            </>
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
        </Listbox.Options>
      </Listbox>
    </InputWrapper>
  )
}
