import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { apiWrapper } from "@/utils/api"
import parseAsset from "@/utils/parsers/parseAsset"

const dataSchema = z.object({
  assetUrl: z.string().url(),
})

export async function POST(request: NextRequest) {
  return await apiWrapper(request, async () => {
    const { assetUrl } = dataSchema.parse(await request.json())
    const result = await parseAsset({ assetUrl })

    return NextResponse.json(result)
  })
}
