import { ComponentProps } from "react"
import cn from "@/lib/utils/cn"

export type PageTitleProps = ComponentProps<"h1">

export default function PageTitle({ className, children, ...props }: PageTitleProps) {
  return (
    <h1 className={cn("text-3xl font-bold tracking-tighter", className)}>{children}</h1>
  )
}
