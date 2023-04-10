import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { apiWrapper } from "@/utils/api"
import parseCollection from "@/utils/parsers/parseCollection"

const dataSchema = z.object({
  collectionUrl: z.string().url(),
  skip: z.number().min(0).default(0),
  take: z.number().min(1).max(1000000).default(1000000),
})

export async function POST(request: NextRequest) {
  return await apiWrapper(request, async () => {
    const data = dataSchema.parse(await request.json())
    const result = await parseCollection(data)

    return NextResponse.json(result)
  })
}
