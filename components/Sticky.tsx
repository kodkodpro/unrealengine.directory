"use client"

import StickyBox, { StickyBoxCompProps } from "react-sticky-box"

export type StickyProps = {
  children: React.ReactNode
} & StickyBoxCompProps

export default function Sticky({ children, ...props } : StickyProps) {
  return (
    <StickyBox {...props}>
      {children}
    </StickyBox>
  )
}
