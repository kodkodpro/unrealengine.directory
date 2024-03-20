import { NextResponse } from "next/server"
import getCurrentUserId from "@/hooks/getCurrentUserId"
import prisma from "@/lib/prisma"

export async function GET() {
  const currentUserId = await getCurrentUserId()
  if (!currentUserId) return NextResponse.json([])

  const assetWatch = await prisma.assetWatch.findMany({
    where: {
      userId: currentUserId,
    },
    select: {
      assetId: true,
    },
  })

  const assetsIds = assetWatch.map((watch) => watch.assetId)
  return NextResponse.json(assetsIds)
}
