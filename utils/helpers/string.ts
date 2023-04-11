export const makeSureAbsoluteURL = (url: string, baseUrl: string) => {
  if (url.startsWith("/")) {
    return baseUrl + url
  }

  return url
}

export const makeMarketplaceURL = (url: string) => {
  return makeSureAbsoluteURL(url, "https://www.unrealengine.com")
}

export const parseMoney = (money: string) => {
  return parseFloat(money.replace(/[^0-9.]/g, ""))
}

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch (error) {
    return false
  }
}

export const formatMoney = (money: number, options: Intl.NumberFormatOptions = {}) => {
  return (money || 0).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    ...options,
  })
}

export const toBoolean = (value: unknown): boolean => {
  if (typeof value === "boolean") {
    return value
  }

  if (typeof value === "string") {
    return ["true", "1", "yes", "on"].includes(value.toLowerCase())
  }

  return false
}

export const pluralize = (count: number, singular: string, plural: string) => {
  return count === 1 ? singular : plural
}

const titleizeExceptions = [
  "UE",
  "UE4",
  "UE5",
  "2D",
  "3D",
  "2K",
  "4K",
  "8K",
  "UI",
  "SFX",
  "VFX",
  "VR",
  "AR",
  "UX",
  "AI",
  "API",
  "BX",
  "GUI",
  "HQ",
  "HUD",
  "PBR",
  "NHL",
  "RPG",
  "FPS",
  "RTX",
  "RTS",
  "TV",
  "UMG",
  "NoAI",
  "BP",
]

const titleizeReplacements: Record<string, string> = {
  "SCI-FI": "Sci-Fi",
  "T-REX": "T-Rex",
}

export const titleize = (string: string): string => {
  const titleizedWords = string.split(" ").map((word) => {
    if (titleizeExceptions.includes(word)) {
      return word
    }

    if (titleizeReplacements[word]) {
      return titleizeReplacements[word]
    }

    try {
      return word[0].toUpperCase() + word.slice(1).toLowerCase()
    } catch (error) {
      return word
    }
  })

  return titleizedWords.join(" ")
}

export const getBaseURL = () => {
  if (typeof window !== "undefined") {
    return window.location.origin
  }

  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  throw new Error("Base URL is not defined")
}
