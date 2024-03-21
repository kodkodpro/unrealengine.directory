"use client"

import { HashtagIcon, FolderIcon, StarIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import AssetCardFullModal from "@/components/assets/AssetCardFullModal"
import AssetPriceBadge from "@/components/assets/AssetPriceBadge"
import Tag from "@/components/content/Tag"
import { AssetFull } from "@/lib/types/AssetFull"
import { pluralize } from "@/lib/utils/string"
import { shrinkVersions, Version } from "@/lib/utils/versions"
import { openModal } from "@/stores/modal"

export type AssetCardProps = {
  asset: AssetFull
  showCategory?: boolean
  showEngineVersions?: boolean
}

export default function AssetCard({ asset, showCategory = true, showEngineVersions = true }: AssetCardProps) {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey) {
      return
    }

    event.preventDefault()
    openModal(<AssetCardFullModal asset={asset} />)
  }

  return (
    <Link
      href={`/${asset.epicId}`}  
      className="relative block rounded-lg p-3 pb-2 transition-all hover:bg-black/[3%] xl:p-4 xl:pb-3 2xl:p-5 2xl:pb-4 dark:hover:bg-white/[3%]"
      onClick={handleClick}
    >
      <div className="mb-2 aspect-video overflow-hidden rounded bg-zinc-100 dark:bg-white/[2.5%]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset.images[0]}
          alt={asset.name}
          className="aspect-video"
        />
      </div>

      <h2 className="line-clamp-1 text-lg font-semibold dark:text-white">{asset.name}</h2>
      <p className="mb-2 line-clamp-2 h-10 text-sm text-zinc-600 dark:text-zinc-400">{asset.shortDescription}</p>

      <div className="flex flex-row items-center gap-2">
        {showCategory && (
          <Tag
            icon={FolderIcon}
            className="whitespace-nowrap"
          >
            {asset.category.name}
          </Tag>
        )}

        {showEngineVersions && (
          <Tag
            icon={HashtagIcon}
            className="whitespace-nowrap"
          >
            {shrinkVersions(asset.engineVersions.map((engineVersion) => engineVersion.name as Version))}
          </Tag>
        )}

        <Tag
          icon={StarIcon}
          title={`${asset.ratingScore} stars (${asset.ratingCount} ${pluralize(asset.ratingCount, "voter", "voters")})`}
          classNameIcon="-mt-0.5 whitespace-nowrap"
        >
          {asset.ratingCount > 0 ? `${asset.ratingScore} (${asset.ratingCount})` : "0"}
        </Tag>

        <AssetPriceBadge
          asset={asset}
          className="ml-auto text-lg"
        />
      </div>
    </Link>
  )
}
