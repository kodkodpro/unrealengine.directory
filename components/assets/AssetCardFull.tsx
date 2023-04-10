"use client"

import Image from "next/image"
import ReactMarkdown from "react-markdown"
import { Carousel } from "react-responsive-carousel"
import AssetInfoTags from "@/components/assets/AssetInfoTags"
import AssetPrice from "@/components/assets/AssetPrice"
import Button from "@/components/form/Button"
import Label from "@/components/form/Label"
import Rating from "@/components/Rating"
import { AssetFull } from "@/types/AssetFull"
import { makeMarketplaceURL, titleize } from "@/utils/helpers/string"

export type AssetCardFullProps = {
  asset: AssetFull
}

export default function AssetCardFull({ asset } : AssetCardFullProps) {
  return (
    <div className="xl:grid xl:grid-cols-3 xl:gap-8">
      <div className="xl:col-span-2 mb-8 xl:mb-0">
        <Carousel showStatus={false} className="h-fit">
          {asset.images.map((image) => (
            <div
              key={image}
              className="aspect-video rounded-lg overflow-hidden"
            >
              <Image
                src={image}
                alt={`Image of ${asset.name}`}
                className="rounded-lg"
                unoptimized
                fill
              />
            </div>
          ))}
        </Carousel>

        <AssetInfoTags
          asset={asset}
          className="mb-4"
        />

        <div className="prose prose-invert leading-normal prose-p:my-2">
          <ReactMarkdown>
            {asset.description}
          </ReactMarkdown>

          <ReactMarkdown>
            {asset.technicalDetails}
          </ReactMarkdown>
        </div>
      </div>

      <div className="space-y-4">
        <Button
          className="w-full"
          onClick={() => window.open(makeMarketplaceURL(asset.url), "_blank")}
          resizable
        >
          <span>
            <span className="font-semibold text-xl">
              <AssetPrice
                asset={asset}
                colors={{
                  free: "text-white",
                }}
                showDiscountPercentage
              />
            </span>
            <br />
            <span className="text-white">
              Unreal Marketplace
            </span>
          </span>
        </Button>

        <Rating
          score={asset.ratingScore}
          count={asset.ratingCount}
        />

        <AssetInfoTags
          asset={asset}
          showAll
          showLabel
          asList
        />

        <div>
          <Label text="Tags" />

          <div className="flex flex-wrap gap-x-3 gap-y-2">
            {asset.tags.map((tag) => (
              <a
                key={tag.name}
                href={`/?tagsIds=${tag.id}`}
                className="text-amber-500 hover:text-amber-600 text-sm font-medium px-2 py-1 rounded-md bg-neutral-800"
              >
                {titleize(tag.name)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
