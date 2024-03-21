import parseCollectionPage from "@/lib/parsers/parseCollectionPage"
import { Parser } from "@/lib/parsers/parser"
import { ParserResponse } from "@/lib/types/ParserResponse"
import { getMarketplaceAbsoluteUrl } from "@/lib/utils/marketplace"
import { isValidUrl } from "@/lib/utils/string"

export const MaxAssetsToParse = 1000000
export const AssetsPerPage = 100

export type Data = {
  collectionUrl: string
  skip?: number
  take?: number
  sortDirection?: "ASC" | "DESC"
  batchSize?: number
}

export default async function parseCollection({
  collectionUrl,
  skip = 0,
  take = MaxAssetsToParse,
  sortDirection = "DESC",
  batchSize = 1,
}: Data): Promise<ParserResponse> {
  if (!isValidUrl(collectionUrl)) {
    return { status: "error", message: "Invalid URL" }
  }

  Parser.log(`Parsing collection ${collectionUrl}`)

  // Set pagination params
  const url = new URL(collectionUrl)
  url.searchParams.set("start", "0")
  url.searchParams.set("count", AssetsPerPage.toString())
  url.searchParams.set("sortBy", "effectiveDate")
  url.searchParams.set("sortDir", sortDirection)

  const parser = new Parser()
  await parser.getPage(url)

  // Get content from "li.rc-pagination-total-text"
  // Example: Showing 1 - 20 of 1140 results
  const totalText = parser.getText("li.rc-pagination-total-text")
  const totalResults = parseInt(totalText.match(/\d+/g)?.pop() || AssetsPerPage.toString())

  Parser.log(`Total results found: ${totalResults}`)

  const pageUrls = []
  let start = skip

  // Generate pages urls
  //
  while (start < totalResults && (start - skip) < take) {
    url.searchParams.set("start", start.toString())

    const pageUrl = getMarketplaceAbsoluteUrl(url.toString())
    const pageNumber = start / AssetsPerPage + 1
    pageUrls.push({ pageNumber, pageUrl })

    start += AssetsPerPage
  }
  
  // Create batches
  //
  const batches = []
  
  for (let i = 0; i < pageUrls.length; i += batchSize) {
    const batch = pageUrls.slice(i, i + batchSize)
    batches.push(batch)
  }

  // Parse in batches
  //
  const responses: Record<string, ParserResponse> = {}

  for (const batch of batches) {
    const promises = batch.map(async ({ pageNumber, pageUrl }) => {
      Parser.log(`Parsing page #${pageNumber} (${pageUrl})`)

      const response = await parseCollectionPage({ pageUrl })
      responses[`page-${pageNumber}`] = response

      Parser.logResponse(response, `📃 Page #${pageNumber} successfully parsed`)
    })
        
    await Promise.all(promises)
  }

  return { status: "success", data: responses }
}
