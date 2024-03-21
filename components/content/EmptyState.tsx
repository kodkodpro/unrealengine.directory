import { FolderOpenIcon } from "@heroicons/react/24/outline"
import { ReactNode } from "react"

export type EmptyStateProps = {
  title: string
  description: string
  actions?: ReactNode
}

export default function EmptyState({ title, description, actions }: EmptyStateProps) {
  return (
    <div className="py-12 text-center lg:py-24 xl:py-36">
      <FolderOpenIcon className="mx-auto size-12 text-zinc-400 dark:text-zinc-600" />
      
      <h3 className="mt-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">{title}</h3>
      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{description}</p>
      
      {actions && (
        <div className="mt-6">
          {actions}
        </div>
      )}
    </div>
  )
}
