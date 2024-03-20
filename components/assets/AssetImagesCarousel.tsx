"use client"

import Image from "next/image"
import { useRef } from "react"
import { useHotkeys } from "react-hotkeys-hook"
import { Carousel } from "react-responsive-carousel"
import cn from "@/lib/utils/cn"
import { AssetFull } from "@/types/AssetFull"

export type AssetImagesCarouselProps = {
  asset: AssetFull
  className?: string
}

export default function AssetImagesCarousel({ asset, className }: AssetImagesCarouselProps) {
  const carouselRef = useRef<Carousel>(null)

  useHotkeys("left", () => carouselRef.current?.decrement())
  useHotkeys("right", () => carouselRef.current?.increment())
  
  return (
    <Carousel
      autoPlay
      ref={carouselRef}
      showStatus={false}
      className={cn("h-fit", className)}
    >
      {asset.images.map((image) => (
        <div
          key={image}
          className="aspect-video overflow-hidden rounded-lg"
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
  )
}
