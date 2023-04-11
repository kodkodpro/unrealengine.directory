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
            "mr-1 text-base font-medium line-through",
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
          className="ml-1 inline-block translate-y-[-3px] rounded-md bg-red-500 px-1 py-0.5 text-sm text-neutral-100"
        >
          -{Math.round(asset.discount / (asset.discount + asset.price) * 100)}%
        </span>
      )}
    </>
  )
}
