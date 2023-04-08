import AssetCard, { AssetCardProps } from "@/components/assets/AssetCard"

export type AssetsListProps = {
  assets: AssetCardProps["asset"][]
}

export default function AssetsList({ assets }: AssetsListProps) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 2xl:grid-cols-3">
      {assets.map((asset) => (
        <AssetCard key={asset.id} asset={asset} />
      ))}
    </div>
  )
}
