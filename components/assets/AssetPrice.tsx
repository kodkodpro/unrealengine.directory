import { Asset } from "@prisma/client"
import { cn } from "@/lib/utils/cn"
import { formatMoney } from "@/lib/utils/string"

export type AssetPriceProps = {
  asset: Pick<Asset, "discount" | "price">
  freeClassName?: string
  discountClassName?: string
}

export default function AssetPrice({
  asset,
  freeClassName,
  discountClassName,
}: AssetPriceProps) {
  return (
    <>
      {asset.price === 0 ? (
        <span className={cn("uppercase", freeClassName)}>Free</span>
      ) : (
        <span>{formatMoney(asset.price)}</span>
      )}
      
      {asset.discount > 0 && (
        <span className={cn("ml-0.5 font-normal line-through opacity-50", discountClassName)}>
          {formatMoney(asset.price + asset.discount)}
        </span>
      )}
    </>
  )
}
