"use client"

import Image from "next/image"
import ReactMarkdown from "react-markdown"
import { Carousel } from "react-responsive-carousel"
import AssetInfoTags from "@/components/assets/AssetInfoTags"
import { AssetFull } from "@/types/AssetFull"
import { makeMarketplaceURL } from "@/utils/helpers/string"

export type AssetCardFullProps = {
  asset: AssetFull
}

export default function AssetCardFull({ asset } : AssetCardFullProps) {
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tighter mb-4">{asset.name}</h1>

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

      <div className="prose prose-invert">
        <ReactMarkdown>
          {asset.description}
        </ReactMarkdown>

        <ReactMarkdown>
          {asset.technicalDetails}
        </ReactMarkdown>
      </div>

      <a href={makeMarketplaceURL(asset.url)}>
        Original
      </a>
    </div>
  )
}
