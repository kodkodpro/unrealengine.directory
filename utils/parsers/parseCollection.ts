import { ParserResponse } from "@/types/ParserResponse"
import { getBaseURL, isValidUrl, makeMarketplaceURL } from "@/utils/helpers/string"
import { Parser } from "@/utils/parsers/parser"

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
  if (!isValidUrl(collectionUrl)) {
    throw new Error("The function must be called with a valid URL")
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
    const pageUrl = url.toString()

    await fetch(`${getBaseURL()}/api/parse-collection-page`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": process.env.API_KEY!,
      },
      body: JSON.stringify({ pageUrl: makeMarketplaceURL(pageUrl) }),
    })

    start += 100
    console.log(`[${new Date().toISOString()}] Parsed page ${start / 100}`)

    // Sleep a bit, rest doesn't hurt anyone
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  return { status: "success" }
}
