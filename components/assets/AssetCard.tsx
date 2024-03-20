"use client"

import { HashtagIcon, FolderIcon, StarIcon } from "@heroicons/react/24/outline"
import { XMarkIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import AssetCardFull from "@/components/assets/AssetCardFull"
import AssetPriceBadge from "@/components/assets/AssetPriceBadge"
import { Button } from "@/components/catalyst/button"
import { Dialog, DialogBody, DialogDescription, DialogTitle } from "@/components/catalyst/dialog"
import Tag from "@/components/content/Tag"
import { closeModal, openModal } from "@/lib/stores/modal"
import { pluralize } from "@/lib/utils/string"
import { shrinkVersions, Version } from "@/lib/utils/versions"
import { AssetFull } from "@/types/AssetFull"

export type AssetCardProps = {
  asset: AssetFull
}

export default function AssetCard({ asset }: AssetCardProps) {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey) {
      return
    }

    event.preventDefault()

    openModal(
      <Dialog
        open
        size="screen-2xl"
        onClose={closeModal}
      >
        <DialogTitle className="sm:text-2xl">
          {asset.name}
          
          <Button
            plain
            className="float-right [&>[data-slot=icon]]:sm:size-6"
            onClick={closeModal}
          >
            <XMarkIcon />
          </Button>
        </DialogTitle>
        <DialogDescription>
          {asset.shortDescription}
        </DialogDescription>
        <DialogBody>
          <AssetCardFull
            asset={asset}
            showTitle={false}
          />
        </DialogBody>
      </Dialog>
    )
  }

  return (
    <Link
      href={`/${asset.epicId}`}  
      className="block rounded-lg p-6 pb-5 transition-all hover:bg-black/[3%] dark:hover:bg-white/[3%]"
      onClick={handleClick}
    >
      <img
        src={asset.images[0]}
        alt={asset.name}
        className="mb-1.5 aspect-video rounded"
      />

      <h2 className="line-clamp-1 text-lg font-semibold dark:text-white">{asset.name}</h2>
      <p className="mb-2 line-clamp-2 h-10 text-sm text-zinc-600 dark:text-zinc-400">{asset.shortDescription}</p>

      <div className="flex flex-row items-center gap-2">
        <Tag icon={FolderIcon}>
          {asset.category.name}
        </Tag>

        <Tag icon={HashtagIcon}>
          {shrinkVersions(asset.engineVersions.map((engineVersion) => engineVersion.name as Version))}
        </Tag>

        <Tag
          icon={StarIcon}
          title={`${asset.ratingScore} stars (${asset.ratingCount} ${pluralize(asset.ratingCount, "voter", "voters")})`}
        >
          {asset.ratingScore} ({asset.ratingCount})
        </Tag>

        <AssetPriceBadge
          asset={asset}
          className="ml-auto text-lg"
        />
      </div>
    </Link>
  )
}
