import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid"
import { FolderIcon, HashtagIcon, TagIcon, UserIcon } from "@heroicons/react/24/outline"
import ReactMarkdown from "react-markdown"
import AssetImagesCarousel from "@/components/assets/AssetImagesCarousel"
import AssetPrice from "@/components/assets/AssetPrice"
import { Button } from "@/components/catalyst/button"
import { Text } from "@/components/catalyst/text"
import Rating from "@/components/content/Rating"
import Tag from "@/components/content/Tag"
import { getAssetMarketplaceUrl } from "@/lib/utils/marketplace"
import { AssetFull } from "@/types/AssetFull"

export type AssetCardFullProps = {
  asset: AssetFull
  showTitle?: boolean
}

export default function AssetCardFull({ asset, showTitle = true }: AssetCardFullProps) {
  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-2">
        <AssetImagesCarousel asset={asset} />

        <div className="prose mx-auto leading-normal dark:prose-invert">
          <ReactMarkdown>
            {asset.description}
          </ReactMarkdown>

          <div className="prose-p:my-0.5">
            <ReactMarkdown>
              {asset.technicalDetails}
            </ReactMarkdown>
          </div>
        </div>
      </div>
      <div>
        {showTitle && (
          <>
            <h1 className="mb-1 text-3xl font-bold tracking-tight">{asset.name}</h1>
            <Text className="mb-6">{asset.shortDescription}</Text>
          </>
        )}

        <Button
          href={getAssetMarketplaceUrl(asset.epicId)}
          color="amber"
          className="mb-3 w-full sm:py-6 sm:text-xl"
          target="_blank"
        >
          <span className="text-center leading-6">
            Get for <AssetPrice asset={asset} /><br />
            <span className="text-base opacity-80">Unreal Engine Marketplace</span>
          </span>
        </Button>

        <Rating
          score={asset.ratingScore}
          count={asset.ratingCount}
          className="mb-6"
        />

        <ul className="mb-6 space-y-1">
          <li>
            <Tag
              icon={UserIcon}
              className="text-base"
              classNameIcon="size-5 mr-1.5"
            >
              {asset.author.name}
            </Tag>
          </li>
          <li>
            <Tag
              icon={FolderIcon}
              className="text-base"
              classNameIcon="size-5 mr-1.5"
            >
              {asset.category.name}
            </Tag>
          </li>
          <li>
            <Tag
              icon={HashtagIcon}
              className="text-base"
              classNameIcon="size-5 mr-1.5"
            >
              {asset.engineVersions.map((version) => version.name).join(", ")}
            </Tag>
          </li>
          <li>
            <Tag
              icon={TagIcon}
              className="text-base"
              classNameIcon="size-5 mr-1.5"
            >
              {asset.tags.map((tag) => tag.name).join(", ")}
            </Tag>
          </li>
        </ul>

        <Text>
          Use <ArrowLeftIcon className="inline size-5 text-zinc-950 dark:text-zinc-200" /> and <ArrowRightIcon className="inline size-5 text-zinc-950 dark:text-zinc-200" /> keys to navigate between images
        </Text>
      </div>
    </div>
  )
}
