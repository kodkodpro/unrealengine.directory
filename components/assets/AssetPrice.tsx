import { Asset } from "@prisma/client"
import clsx from "clsx"
import { TextColor } from "@/types/Tailwind"
import { formatMoney } from "@/utils/helpers/string"

type Colors = {
  free: TextColor,
  price: TextColor,
  discount: TextColor,
}

export type AssetPriceProps = {
  asset: Pick<Asset, "discount" | "price">,
  showDiscountPercentage?: boolean,
  colors?: Partial<Colors>,
}

export default function AssetPrice({
  asset,
  showDiscountPercentage = false,
  colors = {},
} : AssetPriceProps) {
  return (
    <>
      {!showDiscountPercentage && asset.discount > 0 && (
        <span
          className={clsx(
            "line-through font-medium text-base mr-1",
            colors.discount ?? "text-neutral-400",
          )}
        >
          {formatMoney((asset.price || 0) + asset.discount)}
        </span>
      )}

      {asset.price ? (
        <span className={colors.price}>
          {formatMoney(asset.price)}
        </span>
      ) : (
        <span className={clsx("font-semibold", colors.free ?? "text-green-500")}>
          FREE
        </span>
      )}

      {showDiscountPercentage && asset.discount > 0 && (
        <span
          className="ml-1 text-sm inline-block px-1 py-0.5 bg-red-500 rounded-md translate-y-[-3px] text-neutral-100"
        >
          -{Math.round(asset.discount / (asset.discount + asset.price) * 100)}%
        </span>
      )}
    </>
  )
}
