"use client"

import InputWrapper, { InputWrapperProps } from "@/components/form/InputWrapper"
import clsx from "clsx"
import { LabelProps } from "@/components/form/Label"
import { FunctionComponent, ReactNode } from "react"
import { Sizes, Variants } from "@/ui.config"

type WrapperProps = Omit<InputWrapperProps, "children" | "size" | "variant">
type HTMLInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "value" | "onChange">

export type InputProps = {
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onChangeText?: (text: string) => void

  size?: InputWrapperProps["size"]
  variant?: InputWrapperProps["variant"]
} & WrapperProps & HTMLInputProps

export default function Input({
  // InputProps
  value,
  onChange,
  onChangeText,

  // InputWrapperProps
  label,
  labelProps,
  leftIcon,
  leftIconOnClick,
  leftText,
  rightIcon,
  rightIconOnClick,
  rightText,
  clearable,
  size: s = "md",
  variant: v = "default",

  // HTMLInputProps
  className,
  ...props
} : InputProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event)
    onChangeText?.(event.target.value)
  }

  return (
    <InputWrapper
      label={label}
      labelProps={labelProps}
      leftIcon={leftIcon}
      leftIconOnClick={leftIconOnClick}
      leftText={leftText}
      rightIcon={rightIcon}
      rightIconOnClick={rightIconOnClick}
      rightText={rightText}
      clearable={clearable && !!value}
      size={s}
      variant={v}
      onClear={() => handleChange({ target: { value: "" } } as any)}
    >
      <input
        value={value}
        onChange={handleChange}
        className={clsx(
          "h-full w-full bg-transparent outline-none focus:ring-0",
          className,
        )}
        {...props}
      />
    </InputWrapper>
  )
}
