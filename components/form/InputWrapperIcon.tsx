"use client"

import clsx from "clsx"
import { createElement, FunctionComponent } from "react"
import uiConfig, { Sizes, Variants } from "@/ui.config"

export type InputWrapperIconProps = {
  icon: FunctionComponent,
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  size: Sizes
  variant: Variants
}

export default function InputWrapperIcon({ icon, onClick, size: s, variant: v  } : InputWrapperIconProps) {
  const size = uiConfig.sizes[s]
  const variant = uiConfig.variants[v]

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    onClick?.(event)
  }

  return (
    <button
      className={clsx(
        "flex items-center justify-center",
        size.width,
        onClick ? "cursor-pointer hover:brightness-110 hover:backdrop-brightness-110" : "cursor-default",
      )}
      onClick={handleClick}
    >
      {createElement<Partial<SVGElement>>(icon, {
        className: clsx(variant.textLessContrast, size.heightSmaller, size.widthSmaller),
      })}
    </button>
  )
}
