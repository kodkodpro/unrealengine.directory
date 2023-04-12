import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { ParserResponse } from "@/types/ParserResponse"
import { apiWrapper } from "@/utils/api"
import parseAsset from "@/utils/parsers/parseAsset"

export const runtime = "experimental-edge"

const dataSchema = z.object({
  assetUrl: z.string().url(),
  force: z.boolean().optional(),
})

type ResponseData = ParserResponse

export async function POST(request: NextRequest) {
  return await apiWrapper(request, async () => {
    const data = dataSchema.parse(await request.json())
    const result: ResponseData = await parseAsset(data)

    return NextResponse.json(result)
  })
}
