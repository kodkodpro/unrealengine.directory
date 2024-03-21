import { ReactNode } from "react"
import AssetCard from "@/components/assets/AssetCard"
import { AssetFull } from "@/lib/types/AssetFull"

export type AssetsListProps = {
  assets: AssetFull[]
  showCategory?: boolean
  showEngineVersions?: boolean
  emptyState?: ReactNode
}

export default function AssetsList({ assets, showCategory = true, showEngineVersions = true, emptyState = null }: AssetsListProps) {
  if (assets.length === 0) return emptyState

  return (
    <div className="grid p-2 md:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4">
      {assets.map((asset) => (
        <AssetCard
          key={asset.id}
          asset={asset}
          showCategory={showCategory}
          showEngineVersions={showEngineVersions}
        />
      ))}
    </div>
  )
}
