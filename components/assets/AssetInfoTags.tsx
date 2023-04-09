import { CodeBracketIcon, FolderIcon, UserIcon } from "@heroicons/react/24/solid"
import clsx from "clsx"
import { createElement } from "react"
import { AssetFull } from "@/types/AssetFull"

type ItemKeys = "category" | "author" | "engineVersions"
type Item = {
  key: ItemKeys
  icon: React.FunctionComponent
  href: string
  text: string
}

export type AssetInfoTagsProps = {
  asset: AssetFull,
  show?: ItemKeys[],
} & React.HTMLAttributes<HTMLDivElement>

export default function AssetInfoTags({ asset, show = [], className, ...props } : AssetInfoTagsProps) {
  const items: Item[] = [
    {
      key: "category",
      icon: FolderIcon,
      href: "#",
      text: asset.category.name,
    },
    {
      key: "author",
      icon: UserIcon,
      href: "#",
      text: asset.author.name,
    },
    {
      key: "engineVersions",
      icon: CodeBracketIcon,
      href: "#",
      text: asset.engineVersions.map((version) => version.name).join(", "),
    },
  ]

  const filteredItems = items.filter((item) => show.includes(item.key))

  if (filteredItems.length === 0) return null

  return (
    <div className={clsx("flex items-center gap-2", className)} {...props}>
      {filteredItems.map(({ key, icon, href, text }, index) => (
        <div key={key} className="flex items-center gap-1">
          {createElement<Partial<SVGElement>>(icon, {
            className: "inline-block h-4 w-4 text-neutral-600",
          })}

          <a href={href} className="font-medium text-amber-500 hover:text-amber-600 whitespace-nowrap">
            {text}
          </a>
        </div>
      ))}
    </div>
  )
}
