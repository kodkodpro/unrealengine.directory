import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import parseCollectionPage from "@/lib/parsers/parseCollectionPage"
import { ParserResponse } from "@/lib/types/ParserResponse"
import { apiWrapper } from "@/lib/utils/api"

const dataSchema = z.object({
  pageUrl: z.string().url(),
})

export type ParseCollectionPageData = z.infer<typeof dataSchema>
export type ParseCollectionPageResponse = ParserResponse

export async function POST(request: NextRequest) {
  return await apiWrapper(request, async () => {
    const data = dataSchema.parse(await request.json())
    const result: ParseCollectionPageResponse = await parseCollectionPage(data)

    return NextResponse.json(result)
  })
}
