import { ComponentProps, ComponentType, ReactNode, SVGProps } from "react"
import cn from "@/lib/utils/cn"

export type TagProps = ComponentProps<"span"> & {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  className?: string
  classNameIcon?: string
  children: ReactNode
}

export default function Tag({ icon: Icon, className, classNameIcon, children, ...props }: TagProps) {
  return (
    <span
      className={cn("text-sm font-medium text-amber-500", className)}
      {...props}
    >
      <Icon className={cn("-mt-px mr-1 inline-block size-4 text-zinc-400 dark:text-zinc-500", classNameIcon)} />
      <span>
        {children}
      </span>
    </span>
  )
}
