import prisma from "@/lib/prisma"
import { AssetFullSelectWithRelations } from "@/lib/types/AssetFull"

export async function getWatchlistWithAssets(userId: string) {
  return prisma.assetWatch.findMany({
    where: {
      userId,
    },
    include: {
      asset: {
        select: {
          ...AssetFullSelectWithRelations,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })
}

export async function isInWatchlist(assetId: number, userId: string | null) {
  if (!userId) return false

  const isAlreadyWatching = await prisma.assetWatch.findFirst({
    where: {
      assetId,
      userId,
    },
  })

  return !!isAlreadyWatching
}

export async function addToWatchlist(assetId: number, userId: string) {
  return prisma.assetWatch.create({
    data: {
      assetId,
      userId,
    },
  })
}

export async function removeFromWatchlist(assetId: number, userId: string) {
  return prisma.assetWatch.deleteMany({
    where: {
      assetId,
      userId,
    },
  })
}
