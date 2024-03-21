import { NextResponse } from "next/server"
import getCurrentUserId from "@/hooks/getCurrentUserId"
import { getOrCreateWatchlistCollection } from "@/lib/db/collections"
import prisma from "@/lib/prisma"

export async function GET() {
  const currentUserId = await getCurrentUserId()
  if (!currentUserId) return NextResponse.json([])

  // TODO: Find a more appropriate place for this
  await getOrCreateWatchlistCollection(currentUserId)

  const collections = await prisma.collection.findMany({
    where: {
      userId: currentUserId,
    },
    select: {
      id: true,
      name: true,
      isPublic: true,
    },
  })

  return NextResponse.json(collections)
}
