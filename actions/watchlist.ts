"use server"

import { revalidatePath } from "next/cache"
import getCurrentUserId from "@/hooks/getCurrentUserId"
import prisma from "@/lib/prisma"

export async function watch(assetId: number) {
  const userId = await getCurrentUserId()
  if (!userId) throw new Error("You must be signed in to watchlist an asset")

  const isAlreadyWatching = await prisma.assetWatch.findFirst({
    where: {
      assetId,
      userId,
    },
  })

  if (isAlreadyWatching) return
  
  await prisma.assetWatch.create({
    data: {
      assetId,
      userId,
    },
  })

  return revalidatePath("/")
}

export async function unwatch(assetId: number) {
  const userId = await getCurrentUserId()
  if (!userId) throw new Error("You must be signed in to unwatch an asset")

  await prisma.assetWatch.deleteMany({
    where: {
      assetId,
      userId,
    },
  })

  return revalidatePath("/")
}
