import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { ParserResponse } from "@/types/ParserResponse"
import { apiWrapper } from "@/utils/api"
import parseCollectionPage from "@/utils/parsers/parseCollectionPage"

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
