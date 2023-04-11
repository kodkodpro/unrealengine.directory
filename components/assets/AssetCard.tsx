import { StarIcon } from "@heroicons/react/24/solid"
import clsx from "clsx"
import Image from "next/image"
import AssetInfoTags from "@/components/assets/AssetInfoTags"
import AssetPrice from "@/components/assets/AssetPrice"
import { AssetFull } from "@/types/AssetFull"

export type AssetCardProps = {
  asset: AssetFull,
  onClick?: () => void,
}

export default function AssetCard({ asset, onClick }: AssetCardProps) {
  return (
    <div
      className={clsx(
        "group",
        onClick && "cursor-pointer",
      )}
      onClick={onClick}
    >
      <div className={clsx(
        "relative aspect-video overflow-hidden rounded-lg bg-neutral-800",
        "transition-all group-hover:brightness-110",
      )}>
        <Image
          src={asset.images[0].replace("w=1920", "w=768")}
          alt={`Image of ${asset.name}`}
          fill
        />

        {asset.ratingScore !== 0 && (
          <div className={clsx(
            "absolute bottom-4 left-4 flex items-center gap-1 rounded",
            "bg-neutral-900/75 px-1.5 py-1 text-sm font-semibold",
          )}>
            <StarIcon className="inline-block h-4 w-4 text-amber-500" />
            {asset.ratingScore}

            <span className="text-neutral-100">
              ({asset.ratingCount})
            </span>
          </div>
        )}
      </div>

      <div className="p-4 pb-0">
        <h3 className="mb-1 line-clamp-1 text-lg font-semibold">
          {asset.name}
        </h3>
        <p className="mb-1 line-clamp-2 text-sm text-neutral-400">
          {asset.shortDescription}
        </p>

        <div className="flex items-center justify-between">
          <AssetInfoTags
            asset={asset}
            show={["category", "engineVersions"]}
            className="text-sm"
          />

          <div className="translate-y-[-2px] text-lg font-semibold">
            <AssetPrice asset={asset} />
          </div>
        </div>
      </div>
    </div>
  )
}
