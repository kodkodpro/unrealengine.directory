export const getMarketplaceAbsoluteUrl = (url: string) => {
  if (!url) return url

  if (url.startsWith("/")) {
    return "https://www.unrealengine.com" + url
  }

  return url
}

export const getAssetMarketplaceUrl = (epicIdOrUrl: string) => {
  if (!epicIdOrUrl) return epicIdOrUrl

  if (epicIdOrUrl.startsWith("http")) {
    return epicIdOrUrl
  }

  return `https://www.unrealengine.com/marketplace/en-US/product/${epicIdOrUrl}`
}
