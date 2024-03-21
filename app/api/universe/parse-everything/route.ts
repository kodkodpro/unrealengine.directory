import { NextRequest, NextResponse } from "next/server"
import parseCollection from "@/lib/parsers/parseCollection"

export async function GET(request: NextRequest) {
  const searchParams = new URL(request.url).searchParams
  const authToken = searchParams.get("authToken")

  if (authToken !== process.env.UNIVERSE_AUTH_TOKEN) {
    return NextResponse.json({ error: "Invalid authToken" }, { status: 401 })
  }

  const result = await parseCollection({
    collectionUrl: "https://www.unrealengine.com/marketplace/en-US/assets",
    sortDirection: "ASC",
    take: 150,
  })

  return NextResponse.json(result)
}
