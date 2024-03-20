"use client"

import { EyeIcon } from "@heroicons/react/24/solid"
import { Button } from "@/components/catalyst/button"
import cn from "@/lib/utils/cn"
import { addToWatchlist, removeFromWatchlist, useIsWatching, useIsWatchlistLoaded } from "@/stores/watchlist"

export type AssetWatchButtonProps = {
  assetId: number
  className?: string
}

export default function AssetWatchButton({ assetId, className }: AssetWatchButtonProps) {
  const isWatchlistLoaded = useIsWatchlistLoaded()
  const isWatching = useIsWatching(assetId)

  const buttonColor = isWatchlistLoaded
    ? (isWatching ? "green" : "amber")
    : "zinc"
  
  const buttonAction = isWatchlistLoaded
    ? (isWatching ? removeFromWatchlist : addToWatchlist)
    : undefined
  
  const buttonText = isWatchlistLoaded
    ? (isWatching ? "Watching" : "Add to Watchlist")
    : "Loading..."

  const buttonHoverText = isWatchlistLoaded
    ? (isWatching ? "Remove from Watchlist" : null)
    : null

  return (
    <Button
      color={buttonColor}
      className={cn("group w-full sm:py-6 sm:text-xl [&>[data-slot=icon]]:sm:size-6", className)}
      onClick={() => buttonAction && buttonAction(assetId)}
    >
      <EyeIcon />
      {buttonHoverText ? (
        <>
          <span className="inline group-hover:hidden">{buttonText}</span>
          <span className="hidden group-hover:inline">{buttonHoverText}</span>
        </>
      ) : buttonText}
    </Button>
  )
}
