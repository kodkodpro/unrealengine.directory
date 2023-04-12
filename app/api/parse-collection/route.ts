import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { ParserResponse } from "@/types/ParserResponse"
import { apiWrapper } from "@/utils/api"
import parseCollection, { MaxResults } from "@/utils/parsers/parseCollection"

const dataSchema = z.object({
  collectionUrl: z.string().url(),
  skip: z.number().min(0).default(0),
  take: z.number().min(1).max(1000000).default(MaxResults),
})

export type ParseCollection = z.infer<typeof dataSchema>
export type ParseCollectionResponse = ParserResponse

export async function POST(request: NextRequest) {
  return await apiWrapper(request, async () => {
    const data = dataSchema.parse(await request.json())
    const result: ParseCollectionResponse = await parseCollection(data)

    return NextResponse.json(result)
  })
}
