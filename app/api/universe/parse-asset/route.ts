import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import parseAsset from "@/lib/parsers/parseAsset"
import { ParserResponse } from "@/lib/types/ParserResponse"
import { apiWrapper } from "@/lib/utils/api"

const dataSchema = z.object({
  epicId: z.string(),
  force: z.boolean().optional(),
})

export type ParseAssetData = z.infer<typeof dataSchema>
export type ParseAssetResponse = ParserResponse

export async function POST(request: NextRequest) {
  return await apiWrapper(request, async () => {
    const data = dataSchema.parse(await request.json())
    const result: ParseAssetResponse = await parseAsset(data)

    return NextResponse.json(result)
  })
}
