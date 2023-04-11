import { CodeBracketIcon, FolderIcon, UserIcon } from "@heroicons/react/24/solid"
import clsx from "clsx"
import { createElement } from "react"
import Label from "@/components/form/Label"
import { AssetFull } from "@/types/AssetFull"
import { shrinkVersions, Version } from "@/utils/versions"

type ItemKeys = "category" | "author" | "engineVersions" | "tags"
type Item = {
  key: ItemKeys
  icon: React.FunctionComponent
  href?: string
  label: string
  text: string
}

export type AssetInfoTagsProps = {
  asset: AssetFull,
  show?: ItemKeys[],
  showAll?: boolean,
  showLabel?: boolean,
  asList?: boolean,
} & React.HTMLAttributes<HTMLDivElement>

export default function AssetInfoTags({
  asset,
  show = [],
  showAll,
  showLabel,
  asList = false,
  className,
  ...props
} : AssetInfoTagsProps) {
  const items: Item[] = [
    {
      key: "category",
      icon: FolderIcon,
      href: `/?categoriesIds=${asset.category.id}`,
      label: "Category",
      text: asset.category.name,
    },
    {
      key: "author",
      icon: UserIcon,
      href: `/?authorsIds=${asset.category.id}`,
      label: "Author",
      text: asset.author.name,
    },
    {
      key: "engineVersions",
      icon: CodeBracketIcon,
      href: `/?engineVersionsIds=${asset.engineVersions.map((version) => version.id).join(",")}`,
      label: "Engine Versions",
      text: shrinkVersions(asset.engineVersions.map((version) => version.name as Version)),
    },
  ]

  const filteredItems = items.filter((item) => showAll || show.includes(item.key))

  if (filteredItems.length === 0) return null

  const handleTagClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.stopPropagation()
    window.open(event.currentTarget.href, "_self")
  }

  return (
    <div className={clsx(
      "flex",
      asList ? "flex-col gap-4" : "flex-row flex-wrap items-center gap-x-2 gap-y-0.5",
      className,
    )} {...props}>
      {filteredItems.map(({ key, icon, href, label, text }) => (
        <div key={key}>
          {showLabel && <Label text={label} />}

          <div className="flex items-center gap-1">
            {createElement<Partial<SVGElement>>(icon, {
              className: "inline-block h-4 w-4 text-neutral-600 shrink-0",
            })}

            <a
              href={href}
              className="font-medium text-amber-500 hover:text-amber-600"
              onClick={handleTagClick}
            >
              {text}
            </a>
          </div>
        </div>
      ))}
    </div>
  )
}
