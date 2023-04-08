import { NextRequest, NextResponse } from "next/server"
import parseCollection from "@/utils/parsers/parseCollection"

export async function POST(request: NextRequest) {
  const { collectionUrl } = await request.json()
  const categories = await parseCollection({ collectionUrl })

  return NextResponse.json(categories)
}
