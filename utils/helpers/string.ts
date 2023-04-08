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

export const formatMoney = (money: number): string => {
  return (money || 0).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
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

const titleizeExceptions = [
  "2D",
  "3D",
  "4K",
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

    return word[0].toUpperCase() + word.slice(1).toLowerCase()
  })

  return titleizedWords.join(" ")
}
