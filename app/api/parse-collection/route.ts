import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { apiWrapper } from "@/utils/api"
import parseCollection, { MaxResults } from "@/utils/parsers/parseCollection"

export const runtime = "experimental-edge"

const dataSchema = z.object({
  collectionUrl: z.string().url(),
  skip: z.number().min(0).default(0),
  take: z.number().min(1).max(1000000).default(MaxResults),
})

export async function POST(request: NextRequest) {
  return await apiWrapper(request, async () => {
    const data = dataSchema.parse(await request.json())
    const result = await parseCollection(data)

    return NextResponse.json(result)
  })
}
