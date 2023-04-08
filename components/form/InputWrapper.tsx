"use client"

import Label, { LabelProps } from "@/components/form/Label"
import { FC, FunctionComponent, ReactNode } from "react"
import clsx from "clsx"
import uiConfig, { Sizes, Variants } from "@/ui.config"
import InputWrapperIcon from "@/components/form/InputWrapperIcon"
import { XMarkIcon } from "@heroicons/react/24/solid"
import InputWrapperText from "@/components/form/InputWrapperText"
import { text } from "stream/consumers"

export type InputWrapperProps = {
  label?: string
  labelProps?: LabelProps
  leftIcon?: FunctionComponent
  leftIconOnClick?: () => void
  leftText?: string
  rightIcon?: FunctionComponent
  rightIconOnClick?: () => void
  rightText?: string
  clearable?: boolean
  resizable?: boolean
  size: Sizes
  variant: Variants
  onClear?: () => void
  children: ReactNode
} & React.HTMLAttributes<HTMLDivElement>

export default function InputWrapper({
  label,
  labelProps,
  leftIcon,
  leftIconOnClick,
  leftText,
  rightIcon,
  rightIconOnClick,
  rightText,
  clearable,
  resizable,
  onClear,
  children,
  size: s,
  variant: v,
  ...props
} : InputWrapperProps) {
  const size = uiConfig.sizes[s]
  const variant = uiConfig.variants[v]

  return (
    <div {...props}>
      {label && <Label text={label} {...labelProps} />}

      <div className={clsx(
        "flex flex-row items-stretch",
        size.rounding,
        variant.bg,
        variant.border,
      )}>
        {leftIcon && (
          <InputWrapperIcon
            icon={leftIcon}
            onClick={leftIconOnClick}
            size={s}
            variant={v}
          />
        )}

        {leftText && <InputWrapperText text={leftText} size={s} variant={v} />}

        <div className={clsx(
          "flex-1",
          size.paddingSmaller.y,
          resizable ? size.minHeight : size.height,
          !leftIcon && size.padding.left,
          !rightIcon && size.padding.right,
        )}>
          {children}
        </div>

        {rightText && <InputWrapperText text={rightText} size={s} variant={v} />}

        {(rightIcon || clearable) && (
          <InputWrapperIcon
            icon={clearable ? XMarkIcon : rightIcon!}
            onClick={clearable ? onClear : rightIconOnClick}
            size={s}
            variant={v}
          />
        )}
      </div>
    </div>
  )
}
