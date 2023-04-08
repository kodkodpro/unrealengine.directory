import prisma from "@/utils/prisma"
import { JSDOM } from "jsdom"

const url = "https://www.unrealengine.com/marketplace/en-US/store"

export default async function parseCategories() {
  // Get page source using fetch
  const response = await fetch(url)
  const html = await response.text()

  // Parse page source using JSDOM
  const { window } = new JSDOM(html)

  // Get all categories from "li.store-top-categories ul a:not([class])"
  const elements = window.document.querySelectorAll("li.store-top-categories ul a:not([class])")
  const categoriesNames = Array.from(elements).map((category) => category.textContent)

  const categories = []

  // Create or update categories in database
  for (const name of categoriesNames) {
    if (!name) continue

    const category = await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    })

    categories.push(category)
  }

  return categories
}
