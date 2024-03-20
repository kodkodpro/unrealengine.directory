"use client"

import { EyeIcon } from "@heroicons/react/16/solid"
import { unwatch, watch } from "@/actions/watchlist"
import { Button } from "@/components/catalyst/button"

export type AssetWatchButtonProps = {
  assetId: number
  isWatching: boolean
}

export default function AssetWatchButton({ assetId, isWatching }: AssetWatchButtonProps) {
  return (
    <>
      {isWatching ? (
        <Button
          color="zinc"
          className="group mb-6 w-full sm:py-6 sm:text-xl [&>[data-slot=icon]]:sm:size-6"
          onClick={() => unwatch(assetId)}
        >
          <EyeIcon />
          <span className="inline group-hover:hidden">Watching</span>
          <span className="hidden group-hover:inline">Unwatch</span>
        </Button>
      ) : (
        <Button
          color="sky"
          className="group mb-6 w-full sm:py-6 sm:text-xl [&>[data-slot=icon]]:sm:size-6"
          onClick={() => watch(assetId)}
        >
          <EyeIcon />
          Watch
        </Button>
      )}
    </>
  )
}
