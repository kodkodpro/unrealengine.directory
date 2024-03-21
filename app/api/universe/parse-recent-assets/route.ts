import { NextRequest, NextResponse } from "next/server"
import parseCollection from "@/lib/parsers/parseCollection"
import prisma from "@/lib/prisma"

export async function GET(request: NextRequest) {
  const searchParams = new URL(request.url).searchParams
  const authToken = searchParams.get("authToken")

  if (authToken !== process.env.UNIVERSE_AUTH_TOKEN) {
    return NextResponse.json({ error: "Invalid authToken" }, { status: 401 })
  }
  
  const assetsCount = await prisma.asset.count()
  const skip = Math.floor(assetsCount / 100) * 100

  const result = await parseCollection({
    collectionUrl: "https://www.unrealengine.com/marketplace/en-US/assets",
    skip,
  })

  return NextResponse.json(result)
}
