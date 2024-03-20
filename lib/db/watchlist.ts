import prisma from "@/lib/prisma"

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
