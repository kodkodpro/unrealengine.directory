import { NextResponse } from "next/server"
import getCurrentUserId from "@/hooks/getCurrentUserId"
import prisma from "@/lib/prisma"

export async function GET() {
  const currentUserId = await getCurrentUserId()
  if (!currentUserId) return NextResponse.json({})

  const collectionsWithAssets = await prisma.collection.findMany({
    where: {
      userId: currentUserId,
    },
    select: {
      id: true,
      collectionAssets: {
        select: {
          assetId: true,
        },
      },
    },
  })

  const collectionMap = collectionsWithAssets.reduce((collections, collection) => {
    collections[collection.id] = collection.collectionAssets.map((collectionAsset) => collectionAsset.assetId)
    return collections
  }, {} as Record<string, number[]>)

  return NextResponse.json(collectionMap)
}
