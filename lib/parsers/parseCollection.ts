import { Parser } from "@/lib/parsers/parser"
import { getMarketplaceAbsoluteUrl } from "@/lib/utils/marketplace"
import { isValidUrl } from "@/lib/utils/string"
import { ParserResponse } from "@/types/ParserResponse"
import { ParseCollectionPageData } from "@/app/api/parse-collection-page/route"

export const MaxResults = 1000000
export const MaxResultsPerPage = 100

export type Data = {
  collectionUrl: string
  skip: number
  take: number
}

export default async function parseCollection({
  collectionUrl,
  skip = 0,
  take = MaxResults,
}: Data): Promise<ParserResponse> {
  Parser.log(`Parsing collection ${collectionUrl}`)

  if (!isValidUrl(collectionUrl)) {
    return { status: "error", message: "Invalid URL" }
  }

  // Set pagination params
  const url = new URL(collectionUrl)
  url.searchParams.set("start", "0")
  url.searchParams.set("count", MaxResultsPerPage.toString())
  url.searchParams.set("sortBy", "effectiveDate")
  url.searchParams.set("sortDir", "DESC")

  const parser = new Parser()
  await parser.parse(url)

  // Get content from "li.rc-pagination-total-text"
  // Example: Showing 1 - 20 of 1140 results
  const totalText = parser.getText("li.rc-pagination-total-text")
  const totalResults = parseInt(totalText.match(/\d+/g)?.pop() || MaxResultsPerPage.toString())

  let start = skip

  // Get all pages urls
  while (start < totalResults && (start - skip) < take) {
    url.searchParams.set("start", start.toString())
    const pageUrl = getMarketplaceAbsoluteUrl(url.toString())

    const data: ParseCollectionPageData = { pageUrl }
    const response = await Parser.triggerViaAPI("/api/parse-collection-page", data)

    Parser.logResponse(response, `📃 Page #${start / MaxResultsPerPage + 1} successfully parsed`)

    start += MaxResultsPerPage

    // Sleep a bit, rest doesn't hurt anyone
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  return { status: "success" }
}
