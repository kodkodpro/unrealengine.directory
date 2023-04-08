// import TurndownService from "turndown"
import { isValidUrl, parseMoney } from "@/utils/helpers/string"
import { JSDOM } from "jsdom"
import prisma from "@/utils/prisma"

// const turndownService = new TurndownService()

export type Data = {
  assetUrl: string
}

export default async function parseAsset({ assetUrl }: Data) {
  if (!isValidUrl(assetUrl)) {
    throw new Error("The function must be called with a valid URL")
  }

  // Get page source using fetch
  const response = await fetch(assetUrl)
  const html = await response.text()

  // Parse page source using JSDOM
  const { window } = new JSDOM(html)

  // Get name from "h1.post-title"
  const name = window.document.querySelector("h1.post-title")?.textContent || ""

  // Get short description from "p.asset-detail-text"
  const shortDescription = window.document.querySelector("p.asset-detail-text")?.textContent || ""

  // Get description from "div.read-more__text" as HTML, then convert it to Markdown
  // const description = turndownService.turndown(window.document.querySelector("div.read-more__text")?.textContent || "")
  const description = window.document.querySelector("div.read-more__text")?.textContent || ""

  // Get technical details from "div.technical-details"
  // const technicalDetails = turndownService.turndown(window.document.querySelector("div.technical-details")?.textContent || "")
  const technicalDetails = window.document.querySelector("div.technical-details")?.textContent || ""

  // Get author from "span.author-name a"
  const authorName = window.document.querySelector("span.seller-name a")?.textContent || ""

  // Get category from "a.item-cat"
  const categoryName = window.document.querySelector("a.item-cat")?.textContent || ""

  // Get list of tags from "section.tags a"
  const tags = Array
    .from(window.document.querySelectorAll("section.tags a"))
    .map((tag) => tag.textContent || "")

  // Get rating and number of reviews from "div.rating-board__pop__title"
  // Example: <span>4.43 out of 5 stars</span><span>(124 ratings)</span>
  let ratingScore = 0
  let ratingCount = 0

  try {
    const ratingText = window.document.querySelector("div.rating-board__pop__title")?.textContent || ""

    ratingScore = parseFloat((ratingText.match(/(\d+\.\d+)/) || []).pop() || "") || 0
    ratingCount = parseInt((ratingText.match(/\((\d+)\s/) || []).pop() || "") || 0
  } catch (error) {}

  // Get slider images from "div.image-gallery-image img"
  const images = Array
    .from(window.document.querySelectorAll("div.image-gallery-image img"))
    .map((image) => image.getAttribute("src") || "")

  // Get price from "span.save-discount.discounted" and "span.base-price"
  let price = 0
  let discount = 0

  // If "span.save-discount.discounted" exists, then get discounted price and calculate discount amount
  const discountedPriceElement = window.document.querySelector("span.save-discount.discounted")

  if (discountedPriceElement) {
    // Get discounted price from "span.save-discount.discounted"
    price = parseMoney(discountedPriceElement.textContent || "") || 0

    // Get base price from "span.base-price"
    const basePrice = parseMoney(window.document.querySelector("span.base-price")?.textContent || "") || 0

    // Calculate discount amount
    discount = basePrice - price
  } else {
    // Get price from "span.save-discount"
    price = parseMoney(window.document.querySelector("span.save-discount")?.textContent || "") || 0
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

  const data = {
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
  }

  return await prisma.asset.upsert({
    where: {
      url: assetUrl,
    },
    update: data,
    create: data,
  })
}
