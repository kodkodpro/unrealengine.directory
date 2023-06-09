"use client"

import clsx from "clsx"
import utextfig, { Sizes, Variants } from "@/ui.config"

export type InputWrapperTextProps = {
  text: string,
  size: Sizes
  variant: Variants
}

export default function InputWrapperText({ text, size: s, variant: v  } : InputWrapperTextProps) {
  const size = utextfig.sizes[s]
  const variant = utextfig.variants[v]

  return (
    <div className={clsx(
      "flex items-center justify-center backdrop-brightness-90",
      size.textSmaller,
      size.height,
      size.padding.x,
      variant.textLessContrast,
    )}>
      <span>{text}</span>
    </div>
  )
}
