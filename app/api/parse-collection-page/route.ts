import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { apiWrapper } from "@/utils/api"
import parseCollectionPage from "@/utils/parsers/parseCollectionPage"

const dataSchema = z.object({
  pageUrl: z.string().url(),
})

export async function POST(request: NextRequest) {
  return await apiWrapper(request, async () => {
    const { pageUrl } = dataSchema.parse(await request.json())
    const result = await parseCollectionPage({ pageUrl })

    return NextResponse.json(result)
  })
}
