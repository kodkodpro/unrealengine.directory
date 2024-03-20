import AssetCard from "@/components/assets/AssetCard"
import { AssetFull } from "@/types/AssetFull"

export type AssetsListProps = {
  assets: AssetFull[]
}

export default function AssetsList({ assets }: AssetsListProps) {
  if (assets.length === 0) {
    return <p>No assets found</p>
  }
  return (
    <div className="grid grid-cols-4 p-2">
      {assets.map((asset) => (
        <AssetCard
          key={asset.id}
          asset={asset}
        />
      ))}
    </div>
  )
}
