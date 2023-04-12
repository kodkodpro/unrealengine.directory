import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { ParserResponse } from "@/types/ParserResponse"
import { apiWrapper } from "@/utils/api"
import parseAsset from "@/utils/parsers/parseAsset"

const dataSchema = z.object({
  assetUrlOrEpicId: z.string(),
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
