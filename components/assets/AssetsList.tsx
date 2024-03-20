import AssetCard from "@/components/assets/AssetCard"
import { AssetFull } from "@/lib/types/AssetFull"

export type AssetsListProps = {
  assets: AssetFull[]
  showCategory?: boolean
  showEngineVersions?: boolean
}

export default function AssetsList({ assets, showCategory = true, showEngineVersions = true }: AssetsListProps) {
  if (assets.length === 0) {
    return <p>No assets found</p>
  }
  
  return (
    <div className="grid p-2 2xl:grid-cols-4">
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
