import { JSDOM } from "jsdom"
import { isValidUrl, makeMarketplaceURL } from "@/utils/helpers/string"
import parseAsset from "@/utils/parsers/parseAsset"

export type Data = {
  pageUrl: string
}

export default async function parseCollectionPage({ pageUrl }: Data) {
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

    await parseAsset({ assetUrl: makeMarketplaceURL(assetUrl) })
  }

  return { success: true }
}
