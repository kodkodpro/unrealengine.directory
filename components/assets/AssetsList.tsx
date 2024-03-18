"use client"

import { ArrowLongRightIcon, ArrowLongLeftIcon } from "@heroicons/react/20/solid"
import { AnimatePresence } from "framer-motion"
import { useState } from "react"
import { useHotkeys } from "react-hotkeys-hook"
import AssetCard, { AssetCardProps } from "@/components/assets/AssetCard"
import AssetCardFull from "@/components/assets/AssetCardFull"
import Modal from "@/components/content/Modal"
import Button from "@/components/form/Button"
import Label from "@/components/form/Label"

type Asset = AssetCardProps["asset"]

export type AssetsListProps = {
  assets: Asset[]
}

export default function AssetsList({ assets }: AssetsListProps) {
  const [selectedAssetIndex, setSelectedAssetIndex] = useState<number | null>(null)

  const selectedAsset = selectedAssetIndex ? assets[selectedAssetIndex] : null

  const prevAsset = () => {
    setSelectedAssetIndex((index) => {
      if (index === null) return null
      return (index - 1 + assets.length) % assets.length
    })
  }

  const nextAsset = () => {
    setSelectedAssetIndex((index) => {
      if (index === null) return null
      return (index + 1) % assets.length
    })
  }

  const handleAssetClick = (index: number) => {
    setSelectedAssetIndex(index)

    // Update URL with the selected asset
    window.history.pushState(null, "", `/${assets[index].epicId}`)
  }

  const handleAssetModalClose = () => {
    setSelectedAssetIndex(null)

    // Restore the original URL
    window.history.back()
  }

  // TODO: Scroll modal window to top when navigating between assets
  useHotkeys("alt+left", prevAsset)
  useHotkeys("alt+right", nextAsset)

  return (
    <>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 2xl:grid-cols-3">
        {assets.map((asset, index) => (
          <AssetCard
            key={asset.id}
            asset={asset}
            onMouseLeftClick={() => handleAssetClick(index)}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {selectedAsset !== null && (
          <Modal
            title={selectedAsset.name}
            onClose={handleAssetModalClose}
            wide
          >
            <AssetCardFull
              key={selectedAsset.id}
              asset={selectedAsset}
              sidebarText={(
                <>
                  <hr className="block border-neutral-800 md:hidden" />

                  <div className="flex gap-2 md:hidden">
                    <Button
                      variant="dark"
                      className="w-full"
                      onClick={prevAsset}
                    >
                      <ArrowLongLeftIcon className="mr-1 inline-block size-5" />
                      <span>Previous</span>
                    </Button>
                    <Button
                      variant="dark"
                      className="w-full"
                      onClick={nextAsset}
                    >
                      <span>Next</span>
                      <ArrowLongRightIcon className="ml-1 inline-block size-5" />
                    </Button>
                  </div>

                  <div className="mt-8 hidden space-y-2 text-xs text-neutral-300 md:block">
                    <Label text="Hotkeys" />

                    <p>
                      Use the <span className="font-semibold text-neutral-100">&larr;</span>{" "}
                      and <span className="font-semibold text-neutral-100">&rarr;</span>{" "}
                      keys to scroll through images
                    </p>

                    <p>
                      Use the <span className="font-semibold text-neutral-100">Alt + &larr;</span>{" "}
                      and <span className="font-semibold text-neutral-100">Alt + &rarr;</span>{" "}
                      keys to navigate between assets
                    </p>

                    <p>Press <span className="font-semibold text-neutral-100">Esc</span> to close this asset</p>
                  </div>
                </>
              )}
            />
          </Modal>
        )}
      </AnimatePresence>
    </>
  )
}
