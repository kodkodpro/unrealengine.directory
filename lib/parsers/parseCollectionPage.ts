import { Parser } from "@/lib/parsers/parser"
import { isValidUrl } from "@/lib/utils/string"
import { ParserResponse } from "@/lib/types/ParserResponse"
import { ParseAssetData } from "@/app/api/parse-asset/route"

// This is a helper function to extract the epic id from the asset url
// /marketplace/en-US/product/faster-splinemesh -> faster-splinemesh
const ExtractEpicIdRegex = /\/marketplace\/en-US\/product\/(.*)/

export type Data = {
  pageUrl: string
}

export default async function parseCollectionPage({ pageUrl }: Data): Promise<ParserResponse> {
  if (!isValidUrl(pageUrl)) {
    throw new Error("The function must be called with a valid URL")
  }

  const url = new URL(pageUrl)
  const parser = new Parser()
  await parser.parse(url)

  // Get all links from "article.asset .info h3 a"
  const elements = parser.getElements("article.asset .info h3 a")
  const epicIds = Array
    .from(elements)
    .map((url) => url.getAttribute("href"))
    .map((url) => url?.match(ExtractEpicIdRegex)?.pop())
    .filter(Boolean)

  // Trigger parse asset API endpoint for each asset
  for (const epicId of epicIds) {
    const data: ParseAssetData = { assetUrlOrEpicId: epicId }
    const response = await Parser.triggerViaAPI("/api/parse-asset", data)

    // Don't sleep if the asset was skipped
    if (response.status !== "skipped") await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  return { status: "success" }
}
