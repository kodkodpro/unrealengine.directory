"use client"

import { AnimatePresence } from "framer-motion"
import { useState } from "react"
import { useHotkeys } from "react-hotkeys-hook"
import AssetCard, { AssetCardProps } from "@/components/assets/AssetCard"
import AssetCardFull from "@/components/assets/AssetCardFull"
import Label from "@/components/form/Label"
import Modal from "@/components/Modal"

type Asset = AssetCardProps["asset"]

export type AssetsListProps = {
  assets: Asset[]
}

export default function AssetsList({ assets }: AssetsListProps) {
  const [selectedAssetIndex, setSelectedAssetIndex] = useState<number | null>(null)

  useHotkeys("alt+right", () => {
    setSelectedAssetIndex((index) => {
      if (index === null) return null
      return (index + 1) % assets.length
    })
  })

  useHotkeys("alt+left", () => {
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
          <Modal
            title={assets[selectedAssetIndex].name}
            onClose={() => setSelectedAssetIndex(null)}
            wide
          >
            <AssetCardFull
              key={assets[selectedAssetIndex].id}
              asset={assets[selectedAssetIndex]}
              sidebarText={(
                <div className="mt-8 text-xs text-neutral-300 space-y-2">
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
              )}
            />
          </Modal>
        )}
      </AnimatePresence>
    </>
  )
}
