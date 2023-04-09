import { Asset } from "@prisma/client"
import { formatMoney } from "@/utils/helpers/string"

export type AssetPriceProps = {
  asset: Pick<Asset, "discount" | "price">,
}

export default function AssetPrice({ asset } : AssetPriceProps) {
  return (
    <>
      {asset.discount > 0 && (
        <span className="text-neutral-400 line-through font-medium text-base mr-1">
          {formatMoney((asset.price || 0) + asset.discount)}
        </span>
      )}

      {asset.price ? (
        <span>
          {formatMoney(asset.price)}
        </span>
      ) : (
        <span className="text-green-500">
          FREE
        </span>
      )}
    </>
  )
}
