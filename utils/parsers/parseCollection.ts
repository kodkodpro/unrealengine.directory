import { getBaseURL, isValidUrl, makeMarketplaceURL } from "@/utils/helpers/string"
import { Parser } from "@/utils/parsers/parser"

export type Data = {
  collectionUrl: string
}

export default async function parseCollection({ collectionUrl }: Data) {
  if (!isValidUrl(collectionUrl)) {
    throw new Error("The function must be called with a valid URL")
  }

  // Set pagination params
  const url = new URL(collectionUrl)
  url.searchParams.set("start", "0")
  url.searchParams.set("count", "100")
  url.searchParams.set("sortBy", "effectiveDate")
  url.searchParams.set("sortDir", "DESC")

  const parser = new Parser()
  await parser.parse(url)

  // Get content from "li.rc-pagination-total-text"
  const totalText = parser.getText("li.rc-pagination-total-text")
  const totalResults = parseInt((totalText.match(/of\s(\d+)/) || []).pop() || "") || 100

  let start = 0

  // Get all pages urls
  while (start < totalResults) {
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
  }

  return { success: true }
}
