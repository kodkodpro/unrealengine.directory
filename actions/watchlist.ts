"use server"

import { revalidatePath } from "next/cache"
import { serverAction, ServerActionError } from "@/actions/serverAction"
import getCurrentUserId from "@/hooks/getCurrentUserId"
import { addToWatchlist, isInWatchlist, removeFromWatchlist } from "@/lib/db/watchlist"

export const watch = serverAction(async (assetId: number) => {
  const userId = await getCurrentUserId()
  if (!userId) throw new ServerActionError("You must be signed in to watchlist an asset")

  if (await isInWatchlist(assetId, userId)) return true
  await addToWatchlist(assetId, userId)

  revalidatePath("/")
  return true
})

export const unwatch = serverAction(async (assetId: number) => {
  const userId = await getCurrentUserId()
  if (!userId) throw new ServerActionError("You must be signed in to unwatch an asset")

  await removeFromWatchlist(assetId, userId)

  revalidatePath("/")
  return true
})
