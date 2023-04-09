"use client"

import clsx from "clsx"
import InputWrapper, { InputWrapperProps } from "@/components/form/InputWrapper"
import uiConfig from "@/ui.config"

type WrapperProps = Omit<InputWrapperProps, "children" | "size" | "variant" | "clearable">
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
  size: s = "md",
  variant: v = "default",
  onClear,

  // HTMLInputProps
  className,
  ...props
} : InputProps) {
  const size = uiConfig.sizes[s]
  const variant = uiConfig.variants[v]

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
      disabled={props.disabled}
      clearable={onClear && !!value}
      size={s}
      variant={v}
      onClear={onClear}
    >
      <input
        value={value}
        onChange={handleChange}
        className={clsx(
          "h-full w-full bg-transparent outline-none focus:ring-0",
          size.text,
          props.disabled ? variant.textLessContrast : variant.text,
          className,
        )}
        {...props}
      />
    </InputWrapper>
  )
}
