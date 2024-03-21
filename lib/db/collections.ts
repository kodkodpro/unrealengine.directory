import { Prisma } from "@prisma/client"
import cryptoRandomString from "crypto-random-string"
import prisma from "@/lib/prisma"
import { AssetFullSelectWithRelations } from "@/lib/types/AssetFull"

export async function getCollection(id: number) {
  return prisma.collection.findUnique({
    where: {
      id,
    },
  })
}

export async function getCollectionAssets(collectionId: number) {
  return prisma.asset.findMany({
    select: AssetFullSelectWithRelations,
    where: {
      collectionAssets: {
        some: {
          collectionId,
        },
      },
    },
  })
}

export async function getCollectionsByUserId(userId: string) {
  return prisma.collection.findMany({
    where: {
      userId,
    },
  })
}

export async function getCollectionBySlug(slug: string) {
  return prisma.collection.findFirst({
    where: {
      slug,
    },
  })
}

export async function getOrCreateWatchlistCollection(userId: string) {
  const existingWishlist = await prisma.collection.findFirst({
    where: {
      userId,
      systemName: "watchlist",
    },
  })

  if (existingWishlist) return existingWishlist

  return prisma.collection.create({
    data: {
      userId,
      name: "Watchlist",
      systemName: "watchlist",
    },
  })
}

export async function isNameUnique(userId: string, name: string, excludeIds: number[] = []) {
  const collection = await prisma.collection.findFirst({
    where: {
      id: {
        notIn: excludeIds,
      },

      userId,
      name,
    },
  })

  return collection === null
}

export async function createCollection(data: Prisma.CollectionCreateArgs["data"]) {
  return prisma.collection.create({ data })
}

export async function updateCollection(id: number, data: Prisma.CollectionUpdateArgs["data"]) {
  return prisma.collection.update({
    where: {
      id,
    },
    data,
  })
}

export async function isInCollection(collectionId: number, assetId: number) {
  const collectionAsset = await prisma.collectionAsset.findFirst({
    where: {
      collectionId,
      assetId,
    },
  })

  return collectionAsset !== null
}

export async function addToCollection(collectionId: number, assetId: number) {
  return prisma.collectionAsset.create({
    data: {
      collectionId,
      assetId,
    },
  })
}

export async function removeFromCollection(collectionId: number, assetId: number) {
  return prisma.collectionAsset.deleteMany({
    where: {
      collectionId,
      assetId,
    },
  })
}

export async function generateUniqueSlug() {
  let slug
  
  while (!slug) {
    const potentialSlug = cryptoRandomString({ length: 6, type: "url-safe" })
    const collection = await prisma.collection.findFirst({
      where: {
        slug: potentialSlug,
      },
    })
    
    if (!collection) slug = potentialSlug
  }

  return slug
}
