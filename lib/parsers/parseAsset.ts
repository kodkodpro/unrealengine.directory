import { Prisma } from "@prisma/client"
import { ParserResponse } from "@/types/ParserResponse"
import { isValidUrl } from "@/lib/utils/string"
import { generateRange, Version } from "@/lib/utils/versions"
import { Parser } from "@/lib/parsers/parser"
import prisma from "@/lib/prisma"

const RemoveFromTextRegex = /https:\/\/redirect.epicgames.com\/\?redirectTo=/g
const ExtractEpicIdRegex = /^https:\/\/www\.unrealengine\.com\/marketplace\/en-US\/product\/([a-z0-9-]+)$/i

type AssetPlainData = {
  description?: string
  technicalDetails?: string
  releasedAt?: string
  engineVersions?: string
  ratingText?: string
  price?: string
  basePrice?: string
}

export type Data = {
  assetUrlOrEpicId: string
  force?: boolean
}

export default async function parseAsset({ assetUrlOrEpicId, force }: Data): Promise<ParserResponse> {
  let epicId: string
  let assetUrl: string

  if (isValidUrl(assetUrlOrEpicId)) {
    epicId = assetUrlOrEpicId.match(ExtractEpicIdRegex)?.pop() || ""
    assetUrl = assetUrlOrEpicId
  } else {
    epicId = assetUrlOrEpicId
    assetUrl = `https://www.unrealengine.com/marketplace/en-US/product/${epicId}`
  }

  if (!epicId) {
    return { status: "error", message: "assetUrlOrEpicId must be a valid Epic ID or Marketplace URL" }
  }

  const asset = await prisma.asset.findUnique({
    select: {
      updatedAt: true,
    },
    where: {
      epicId,
    },
  })

  if (asset && !force) {
    const now = new Date()
    const diff = now.getTime() - asset.updatedAt.getTime()
    const diffInHours = Math.floor(diff / 1000 / 60 / 60)

    if (diffInHours) {
      return { status: "skipped", message: `Asset "${epicId}" was parsed less than 24 hours ago, skipping...` }
    }
  }

  try {
    const url = new URL(assetUrl)
    const parser = new Parser()
    await parser.parse(url)

    const plainData: AssetPlainData = {}

    // Get name from "h1.post-title"
    const name = parser.getText("h1.post-title")

    if (!name) {
      return { status: "error", message: `Asset ${epicId} can't be parsed` }
    }

    // Get short description from "p.asset-detail-text"
    const shortDescription = parser.getText("p.asset-detail-text")

    // Get description from "div.read-more__text" as Markdown
    const description = parser.getMarkdown("div.read-more__text").replaceAll(RemoveFromTextRegex, "")
    plainData.description = parser.getHtml("div.read-more__text")

    // Get technical details from "div.technical-details" as Markdown
    const technicalDetails = parser.getMarkdown("div.technical-details").replaceAll(RemoveFromTextRegex, "")
    plainData.technicalDetails = parser.getHtml("div.technical-details")

    // Get release date from "div.asset-desc-nvs span:nth-child(3)"
    // Parse it to a Date object
    // Example: Mar 12, 2023
    const releasedAtText = parser.getText("div.asset-desc-nvs span:nth-child(3)")
    const releasedAt = new Date(releasedAtText)
    plainData.releasedAt = releasedAtText

    // Get author from "span.author-name a"
    const authorName = parser.getText("span.seller-name a") || "Unknown Author"

    // Get category from "a.item-cat"
    const categoryName = parser.getText("a.item-cat")

    // Get list of tags from "section.tags a"
    const tags = parser.getElements("section.tags a")
      .map((tag) => tag.textContent)
      .filter(Boolean)

    // Get supported engine versions from "span.ue-version" and generate single versions from this text
    // Example #1: "4.27, 5.0 - 5.2" returns ["4.27", "5.0", "5.1", "5.2"]
    // Example #2: "4.27, 5.0 - 5.2, 5.3 - 5.4" returns ["4.27", "5.0", "5.1", "5.2", "5.3", "5.4"]
    // Example #3: "4.19 - 4.27" returns ["4.19", "4.20", "4.21", "4.22", "4.23", "4.24", "4.25", "4.26", "4.27"]
    const engineVersionsText = parser.getText("span.ue-version") || "Unknown"
    plainData.engineVersions = engineVersionsText

    const engineVersions = engineVersionsText
      .split(",")
      .map((version) => version.trim())
      .map((version) => {
        const [start, end] = version.split("-").map((version) => version.trim())

        if (start && end) {
          return generateRange(start as Version, end as Version)
        }

        return version
      })
      .flat()

    // Get rating and number of reviews from "div.rating-board__pop__title"
    // Example #1: <span>5 out of 5 stars</span><span>(2 ratings)</span>
    // Example #2: <span>4.43 out of 5 stars</span><span>(124 ratings)</span>
    let ratingScore = 0
    let ratingCount = 0

    const ratingText = parser.getText("div.rating-board__pop__title")
    plainData.ratingText = ratingText

    if (ratingText) {
      const [ratingScoreText, ratingCountText] = ratingText.split("(")

      ratingScore = parseFloat(ratingScoreText.split(" ")[0]) || 0
      ratingCount = parseInt(ratingCountText.split(" ")[0]) || 0
    }

    // Get slider images from "div.image-gallery-image img"
    const images = parser.getElements("div.image-gallery-image img")
      .map((image) => image.getAttribute("src"))
      .filter(Boolean)

    // Get price from "span.save-discount.discounted" and "span.base-price"
    let price
    let discount

    // If "span.save-discount.discounted" exists, then get discounted price and calculate discount amount
    if (parser.elementExists("span.save-discount.discounted")) {
      // Get discounted price from "span.save-discount.discounted"
      price = parser.getMoney("span.save-discount.discounted")

      // Get base price from "span.base-price"
      const basePrice = parser.getMoney("span.base-price") || 0

      // Calculate discount amount
      discount = basePrice - price
    } else {
      // Get price from "span.save-discount"
      price = parser.getMoney("span.save-discount") || 0
      discount = 0
    }

    plainData.price = parser.getText("span.save-discount")
    plainData.basePrice = parser.getText("span.base-price")

    // Save or update asset and related records in Prisma
    // Remove all existing tags and add new ones
    const author = await prisma.author.upsert({
      where: {
        name: authorName,
      },
      update: {},
      create: {
        name: authorName,
      },
    })

    const category = await prisma.category.upsert({
      where: {
        name: categoryName,
      },
      update: {},
      create: {
        name: categoryName,
      },
    })

    const data: Prisma.AssetCreateInput = {
      epicId,
      name,
      shortDescription,
      description,
      technicalDetails,
      price,
      discount,
      images,
      ratingScore,
      ratingCount,
      releasedAt,
      plainData,

      author: {
        connect: {
          id: author.id,
        },
      },

      category: {
        connect: {
          id: category.id,
        },
      },
    }

    const asset = await prisma.asset.upsert({
      include: {
        tags: true,
        engineVersions: true,
      },
      where: {
        epicId,
      },
      update: data,
      create: data,
    })

    // Disconnect all existing tags and connect new ones
    await prisma.asset.update({
      where: {
        id: asset.id,
      },
      data: {
        tags: {
          disconnect: asset.tags.map((tag) => ({ id: tag.id })),
          connectOrCreate: tags.map((tag) => ({
            where: {
              name: tag,
            },
            create: {
              name: tag,
            },
          })),
        },
        engineVersions: {
          disconnect: asset.engineVersions.map((engineVersion) => ({ id: engineVersion.id })),
          connectOrCreate: engineVersions.map((engineVersion) => ({
            where: {
              name: engineVersion,
            },
            create: {
              name: engineVersion,
            },
          })),
        },
      },
    })

    Parser.log(`Asset "${epicId}" successfully parsed (released at ${releasedAt.toDateString()})`, "success")

    return { status: "success" }
  } catch (error) {
    if (error instanceof Error) {
      return {
        status: "error",
        error,
        message: `Failed to scrape asset: ${epicId || assetUrlOrEpicId}. Error: ${error.message}`,
      }
    } else {
      const stringifiedError = JSON.stringify(error)
      const message = `Failed to scrape asset: ${epicId || assetUrlOrEpicId}. Error: ${stringifiedError}`

      return { status: "error", message }
    }
  }
}
