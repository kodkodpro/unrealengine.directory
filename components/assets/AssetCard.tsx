import Image from "next/image"
import { FolderIcon, StarIcon, UserIcon } from "@heroicons/react/24/solid"
import { formatMoney } from "@/utils/helpers/string"
import { Asset, Author, Category } from "@prisma/client"

export type AssetCardProps = {
  asset: Asset & { author: Author, category: Category }
}

export default function AssetCard({ asset }: AssetCardProps) {
  return (
    <div className="group cursor-pointer">
      <div className="relative aspect-video overflow-hidden rounded-lg bg-neutral-800 group-hover:brightness-110">
        <Image
          src={asset.images[0]}
          width={1920}
          height={1080}
          alt={`Image of ${asset.name}`}
          unoptimized
        />

        {asset.ratingScore !== 0 && (
          <div className="absolute bottom-4 left-4 flex items-center gap-1 rounded bg-neutral-900/50 px-1.5 py-1 text-sm font-semibold">
            <StarIcon className="inline-block h-5 w-5 text-amber-500" />
            {asset.ratingScore}

            <span className="text-neutral-300">
            ({asset.ratingCount})
            </span>
          </div>
        )}

      </div>
      <div className="flex items-center gap-4 p-4">
        <div className="flex-1">
          <h3 className="mb-1 line-clamp-1 text-lg font-semibold">
            {asset.name}
          </h3>
          <p className="mb-0.5 line-clamp-2 text-sm text-neutral-400">
            {asset.shortDescription}
          </p>
          <p>
            <span>
              <FolderIcon className="mr-1 inline-block h-4 w-4 translate-y-[-1px] text-neutral-600"/>
            </span>

            <a
              href="#"
              className="mr-2.5 text-sm font-medium text-amber-500"
            >
              {asset.category.name}
            </a>

            <span>
              <UserIcon className="mr-1 inline-block h-4 w-4 translate-y-[-1px] text-neutral-600"/>
            </span>

            <a
              href="#"
              className="text-sm font-medium text-amber-500"
            >
              {asset.author.name}
            </a>
          </p>
        </div>
        <div className="text-lg font-semibold">
          {asset.discount > 0 && (
            <span className="text-neutral-400 line-through font-medium text-base mr-1">
              {formatMoney((asset.price || 0) + asset.discount)}
            </span>
          )}

          {asset.price ? (
            <span>
              {formatMoney(asset.price)}
            </span>
          ) : (
            <span className="text-green-500">
              FREE
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
