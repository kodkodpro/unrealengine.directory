import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { apiWrapper } from "@/utils/api"
import parseCollectionPage from "@/utils/parsers/parseCollectionPage"

export const runtime = "experimental-edge"

const dataSchema = z.object({
  pageUrl: z.string().url(),
})

export async function POST(request: NextRequest) {
  return await apiWrapper(request, async () => {
    const data = dataSchema.parse(await request.json())
    const result = await parseCollectionPage(data)

    return NextResponse.json(result)
  })
}
