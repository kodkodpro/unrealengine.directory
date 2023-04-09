"use client"

import { AnimatePresence } from "framer-motion"
import { useState } from "react"
import { useHotkeys } from "react-hotkeys-hook"
import AssetCard, { AssetCardProps } from "@/components/assets/AssetCard"
import AssetCardFull from "@/components/assets/AssetCardFull"
import Modal from "@/components/Modal"

type Asset = AssetCardProps["asset"]

export type AssetsListProps = {
  assets: Asset[]
}

export default function AssetsList({ assets }: AssetsListProps) {
  const [selectedAssetIndex, setSelectedAssetIndex] = useState<number | null>(null)

  useHotkeys("right", () => {
    setSelectedAssetIndex((index) => {
      if (index === null) return null
      return (index + 1) % assets.length
    })
  })

  useHotkeys("left", () => {
    setSelectedAssetIndex((index) => {
      if (index === null) return null
      return (index - 1 + assets.length) % assets.length
    })
  })

  return (
    <>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 2xl:grid-cols-3">
        {assets.map((asset, index) => (
          <AssetCard
            key={asset.id}
            asset={asset}
            onClick={() => setSelectedAssetIndex(index)}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {selectedAssetIndex !== null && (
          <Modal onClose={() => setSelectedAssetIndex(null)}>
            <AssetCardFull
              asset={assets[selectedAssetIndex]}
            />

            <div className="text-center mt-4 text-xs text-neutral-300">
              <p className="mb-1">
                Use the <span className="font-semibold text-neutral-100">left</span>{" "}
                and <span className="font-semibold text-neutral-100">right</span>{" "}
                arrow keys to navigate between assets
              </p>

              <p>Press <span className="font-semibold text-neutral-100">Esc</span> to close this modal</p>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  )
}
