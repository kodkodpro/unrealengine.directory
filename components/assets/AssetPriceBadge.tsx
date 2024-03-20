import AssetPrice, { AssetPriceProps } from "@/components/assets/AssetPrice"
import { Badge } from "@/components/catalyst/badge"
import cn from "@/lib/utils/cn"

export type AssetPriceBadgeProps = AssetPriceProps & {
  className?: string
}

export default function AssetPriceBadge({
  asset,
  className,
  ...props
}: AssetPriceBadgeProps) {
  return (
    <Badge
      color={asset.price === 0 ? "lime" : asset.discount !== 0 ? "amber" : "zinc"}
      className={cn(
        "font-semibold sm:text-sm px-2 py-1",
        asset.price !== 0 && asset.discount === 0 && "dark:text-white",
        className,
      )}
    >
      <AssetPrice
        asset={asset}
        {...props}
      />
    </Badge>
  )
}
