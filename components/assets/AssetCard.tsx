import Image from "next/image"
import { FolderIcon, StarIcon, UserIcon } from "@heroicons/react/24/solid"
import { formatMoney, makeMarketplaceURL } from "@/utils/helpers/string"
import { Asset, Author, Category } from "@prisma/client"

export const AssetSelect = {
  id: true,
  url: true,
  name: true,
  shortDescription: true,
  price: true,
  discount: true,
  ratingScore: true,
  ratingCount: true,
  images: true,
}

export const AuthorSelect = {
  id: true,
  name: true,
}

export const CategorySelect = {
  id: true,
  name: true,
}

export type AssetCardProps = {
  asset: Pick<Asset, keyof typeof AssetSelect> & {
    author: Pick<Author, keyof typeof AuthorSelect>,
    category: Pick<Category, keyof typeof CategorySelect>,
  }
}

export default function AssetCard({ asset }: AssetCardProps) {
  return (
    <div className="group">
      <div className="relative aspect-video overflow-hidden rounded-lg bg-neutral-800 group-hover:brightness-110">
        <Image
          src={asset.images[0]}
          alt={`Image of ${asset.name}`}
          unoptimized
          fill
        />

        {asset.ratingScore !== 0 && (
          <div className="absolute bottom-4 left-4 flex items-center gap-1 rounded bg-neutral-900/75 px-1.5 py-1 text-sm font-semibold">
            <StarIcon className="inline-block h-4 w-4 text-amber-500" />
            {asset.ratingScore}

            <span className="text-neutral-100">
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
