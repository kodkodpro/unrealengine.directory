import { Prisma } from "@prisma/client"
import { isValidUrl } from "@/utils/helpers/string"
import { Parser } from "@/utils/parsers/parser"
import prisma from "@/utils/prisma"

const RemoveFromTextRegex = /https:\/\/redirect.epicgames.com\/\?redirectTo=/g

export type Data = {
  assetUrl: string
}

export default async function parseAsset({ assetUrl }: Data) {
  if (!isValidUrl(assetUrl)) {
    throw new Error("The function must be called with a valid URL")
  }

  const parser = new Parser()

  const url = new URL(assetUrl)
  await parser.parse(url)

  // // Get page source using fetch
  // const response = await fetch(assetUrl)
  // const html = await response.text()
  //
  // // Parse page source using JSDOM
  // const { window } = new JSDOM(html)
  // const { querySelector, querySelectorAll } = window.document

  // Get name from "h1.post-title"
  const name = parser.getText("h1.post-title")

  // Get short description from "p.asset-detail-text"
  const shortDescription = parser.getText("p.asset-detail-text")

  // Get description from "div.read-more__text" as Markdown
  const description = parser.getMarkdown("div.read-more__text").replaceAll(RemoveFromTextRegex, "")

  // Get technical details from "div.technical-details" as Markdown
  const technicalDetails = parser.getMarkdown("div.technical-details").replaceAll(RemoveFromTextRegex, "")

  // Get release date from "div.asset-desc-nvs span:nth-child(3)"
  // Parse it to a Date object
  // Example: Mar 12, 2023
  const releasedAtText = parser.getText("div.asset-desc-nvs span:nth-child(3)")
  const releasedAt = new Date(releasedAtText)

  // Get author from "span.author-name a"
  const authorName = parser.getText("span.seller-name a")

  // Get category from "a.item-cat"
  const categoryName = parser.getText("a.item-cat")

  // Get list of tags from "section.tags a"
  const tags = parser.getElements("section.tags a")
    .map((tag) => tag.textContent)
    .filter(Boolean)

  // Get supported engine versions from "span.ue-version" and generate single versions from this text
  // Example: "4.27, 5.0 - 5.2"
  const engineVersionsText = parser.getText("span.ue-version")
  const engineVersions = engineVersionsText
    .split(",")
    .map((version) => version.trim())
    .map((version) => {
      if (version.includes("-")) {
        const [start, end] = version.split("-").map((version) => version.trim())

        return Array
          .from({ length: parseFloat(end) - parseFloat(start) + 0.1 })
          .map((_, index) => parseFloat(start) + index)
          .map((version) => version.toString())
      }

      return [version]
    })
    .flat()

  // Get rating and number of reviews from "div.rating-board__pop__title"
  // Example #1: <span>5 out of 5 stars</span><span>(2 ratings)</span>
  // Example #2: <span>4.43 out of 5 stars</span><span>(124 ratings)</span>
  let ratingScore = 0
  let ratingCount = 0

  const ratingText = parser.getText("div.rating-board__pop__title")

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

  // Save or update asset and related records in Prisma
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
    url: assetUrl,
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

    tags: {
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
      connectOrCreate: engineVersions.map((version) => ({
        where: {
          name: version,
        },
        create: {
          name: version,
        },
      })),
    },
  }

  return await prisma.asset.upsert({
    where: {
      url: assetUrl,
    },
    update: data,
    create: data,
  })
}
