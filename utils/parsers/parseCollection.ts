import { JSDOM } from "jsdom"
import { getBaseURL, isValidUrl, makeMarketplaceURL } from "@/utils/helpers/string"

export type Data = {
  collectionUrl: string
}

export default async function parseCollection({ collectionUrl }: Data) {
  if (!isValidUrl(collectionUrl)) {
    throw new Error("The function must be called with a valid URL")
  }

  // If url contains count param, replace it with 100
  // If not, add it with value 100
  const url = new URL(collectionUrl)
  url.searchParams.set("count", "100")

  // Get page source using fetch
  const response = await fetch(url.toString())
  const html = await response.text()

  // Parse page source using JSDOM
  const { window } = new JSDOM(html)

  // Get content from "li.rc-pagination-total-text" (element may not exist)
  const totalText = window.document.querySelector("li.rc-pagination-total-text")?.textContent || ""
  const totalResults = parseInt((totalText.match(/of\s(\d+)/) || []).pop() || "") || 100

  const pagesUrls = []
  let start = 0

  // Get all pages urls
  while (start < totalResults) {
    url.searchParams.set("start", start.toString())
    pagesUrls.push(url.toString())
    start += 100
  }

  for (const pageUrl of pagesUrls) {
    // await parseCollectionPage({ pageUrl: makeMarketplaceURL(pageUrl) })

    fetch(`${getBaseURL()}/api/parse-collection-page`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": process.env.API_KEY!,
      },
      body: JSON.stringify({ pageUrl: makeMarketplaceURL(pageUrl) }),
    })

    await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  return { success: true }
}
