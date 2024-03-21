"use client"

import { useState } from "react"
import { useHotkeys } from "react-hotkeys-hook"
import { AssetFull } from "@/lib/types/AssetFull"
import cn from "@/lib/utils/cn"

export type AssetImagesCarouselProps = {
  asset: AssetFull
  className?: string
}

export default function AssetImagesCarousel({ asset, className }: AssetImagesCarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const prevImage = () => setCurrentImageIndex((prevIndex) => (prevIndex - 1 + asset.images.length) % asset.images.length)
  const nextImage = () => setCurrentImageIndex((prevIndex) => (prevIndex + 1) % asset.images.length)

  useHotkeys("left", prevImage)
  useHotkeys("right", nextImage)
  
  return (
    <div className={cn("", className)}>
      <div className="relative mb-4 aspect-video overflow-hidden rounded-lg">
        <button
          tabIndex={-1}
          className="absolute inset-y-0 left-0 w-1/2 focus:outline-none"
          onClick={prevImage}
        />
        
        <button
          tabIndex={-1}
          className="absolute inset-y-0 right-0 w-1/2 focus:outline-none"
          onClick={nextImage}
        />
        
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset.images[currentImageIndex]}
          alt={`Image of ${asset.name}`}
        />
      </div>
      
      <div className="flex flex-wrap justify-center gap-2">
        {asset.images.map((image, index) => (
          <button
            key={image}
            onClick={() => setCurrentImageIndex(index)}
            className={cn(
              "h-12 aspect-video rounded overflow-hidden outline",
              index === currentImageIndex ? "outline-amber-600 dark:outline-amber-500" : "outline-zinc-300 dark:outline-zinc-800"
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={`Image of ${asset.name}`}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
