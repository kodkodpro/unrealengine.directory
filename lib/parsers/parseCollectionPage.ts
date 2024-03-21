import parseAsset from "@/lib/parsers/parseAsset"
import { Parser } from "@/lib/parsers/parser"
import { ParserResponse } from "@/lib/types/ParserResponse"
import { isValidUrl } from "@/lib/utils/string"

// This is a helper function to extract the epic id from the asset url
// /marketplace/en-US/product/faster-splinemesh -> faster-splinemesh
const ExtractEpicIdRegex = /\/marketplace\/en-US\/product\/(.*)/

export type Data = {
  pageUrl: string
}

export default async function parseCollectionPage({ pageUrl }: Data): Promise<ParserResponse> {
  if (!isValidUrl(pageUrl)) {
    return { status: "error", message: "Invalid URL" }
  }

  let epicIds = await getEpicIds(pageUrl)

  // If no assets found, wait a bit and try again
  //
  if (epicIds.length === 0) {
    await new Promise((resolve) => setTimeout(resolve, 500))
    epicIds = await getEpicIds(pageUrl)
  }

  if (epicIds.length === 0) {
    return { status: "error", message: "No assets found" }
  }

  // Parse each asset
  //
  const responses: Record<string, ParserResponse> = {}

  for (const epicId of epicIds) {
    const response = await parseAsset({ epicId: epicId })
    responses[`asset-${epicId}`] = response

    Parser.logResponse(response, `Asset "${epicId}" parsed`)

    // Don't sleep if the asset was skipped
    if (response.status !== "skipped") await new Promise((resolve) => setTimeout(resolve, 150))
  }

  return { status: "success", data: responses }
}

async function getEpicIds(pageUrl: string) {
  const parser = new Parser()
  await parser.getPage(pageUrl)

  // Get all links from "article.asset .info h3 a"
  //
  return Array
    .from(parser.getElements("article.asset .info h3 a"))
    .map((url) => url.getAttribute("href"))
    .map((url) => url?.match(ExtractEpicIdRegex)?.pop())
    .filter(Boolean)
}
