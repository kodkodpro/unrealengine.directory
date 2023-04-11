import { JSDOM } from "jsdom"
import { ParserResponse } from "@/types/ParserResponse"
import { getBaseURL, isValidUrl, makeMarketplaceURL } from "@/utils/helpers/string"

export type Data = {
  pageUrl: string
}

export default async function parseCollectionPage({ pageUrl }: Data): Promise<ParserResponse> {
  if (!isValidUrl(pageUrl)) {
    throw new Error("The function must be called with a valid URL")
  }

  // Get page source using fetch
  const response = await fetch(pageUrl)
  const html = await response.text()

  // Parse page source using JSDOM
  const { window } = new JSDOM(html)

  // Get all links from "article.asset .info h3 a"
  const elements = window.document.querySelectorAll("article.asset .info h3 a")
  const assetUrls = Array.from(elements).map((url) => url.getAttribute("href"))

  // Run parseAsset background job for each link
  for (const assetUrl of assetUrls) {
    if (!assetUrl) continue

    const response = await fetch(`${getBaseURL()}/api/parse-asset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": process.env.API_KEY!,
      },
      body: JSON.stringify({ assetUrl: makeMarketplaceURL(assetUrl) }),
    })

    // Don't sleep if the asset was skipped
    if (response.ok) {
      const parserResponse = await response.json() as ParserResponse
      if (parserResponse.status === "skipped") continue
    }

    await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  return { status: "success" }
}
