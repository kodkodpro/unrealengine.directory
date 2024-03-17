import { Prisma } from "@prisma/client"
import { HomeProps } from "@/app/page"
import { OrderBy } from "@/components/assets/AssetsListSort"
import { toBoolean } from "@/utils/helpers/string"

export function getFilters(searchParams: HomeProps["searchParams"]) {
  const where: Prisma.AssetWhereInput = {}
  const ratingScore: Prisma.AssetWhereInput["ratingScore"] = {}
  const ratingCount: Prisma.AssetWhereInput["ratingCount"] = {}
  const price: Prisma.AssetWhereInput["price"] = {}
  const freeOnly = toBoolean(searchParams.freeOnly)

  if (searchParams.q) {
    where["name"] = {
      contains: searchParams.q,
      mode: "insensitive",
    }
  }

  if (searchParams.ratingFrom) {
    ratingScore["gte"] = +searchParams.ratingFrom
  }

  if (searchParams.ratingTo) {
    ratingScore["lte"] = +searchParams.ratingTo
  }

  if (Object.keys(ratingScore).length) {
    where["ratingScore"] = ratingScore
  }

  if (searchParams.ratingCountFrom) {
    ratingCount["gte"] = +searchParams.ratingCountFrom
  }

  if (searchParams.ratingCountTo) {
    ratingCount["lte"] = +searchParams.ratingCountTo
  }

  if (Object.keys(ratingCount).length) {
    where["ratingCount"] = ratingCount
  }

  if (searchParams.priceFrom && !freeOnly) {
    price["gte"] = +searchParams.priceFrom
  }

  if (searchParams.priceTo && !freeOnly) {
    price["lte"] = +searchParams.priceTo
  }

  if (freeOnly) {
    where["price"] = {
      equals: 0,
    }
  } else if (Object.keys(price).length) {
    where["price"] = price
  }

  if (searchParams.releasePeriod) {
    const now = new Date()
    const last7Days = new Date(now.setDate(now.getDate() - 7))
    const last30Days = new Date(now.setDate(now.getDate() - 23))
    const last90Days = new Date(now.setDate(now.getDate() - 60))
    const lastYear = new Date(now.setDate(now.getDate() - 365))

    const date = {
      "last-7-days": last7Days,
      "last-30-days": last30Days,
      "last-90-days": last90Days,
      "last-year": lastYear,
    }

    if (date[searchParams.releasePeriod]) {
      where["releasedAt"] = {
        gte: date[searchParams.releasePeriod],
      }
    }
  }

  if (searchParams.categoriesIds) {
    where["category"] = {
      id: {
        in: searchParams.categoriesIds.split(",").map((id) => parseInt(id)),
      },
    }
  }

  if (searchParams.tagsIds) {
    where["tags"] = {
      some: {
        id: {
          in: searchParams.tagsIds.split(",").map((id) => parseInt(id)),
        },
      },
    }
  }

  if (searchParams.engineVersionsIds) {
    where["engineVersions"] = {
      some: {
        id: {
          in: searchParams.engineVersionsIds.split(",").map((id) => parseInt(id)),
        },
      },
    }
  }

  if (searchParams.authorsIds) {
    where["author"] = {
      id: {
        in: searchParams.authorsIds.split(",").map((id) => parseInt(id)),
      },
    }
  }

  return where
}

export function getAssetsOrderBy(searchParams: HomeProps["searchParams"]) {
  const map: Record<OrderBy, Prisma.AssetOrderByWithRelationInput> = {
    "newest": {
      releasedAt: "desc",
    },
    "oldest": {
      releasedAt: "asc",
    },
    "most-popular": {
      ratingScore: "desc",
    },
    "least-popular": {
      ratingScore: "asc",
    },
    "most-expensive": {
      price: "desc",
    },
    "least-expensive": {
      price: "asc",
    },
    "most-voters": {
      ratingCount: "desc",
    },
    "least-voters": {
      ratingCount: "asc",
    },
    "a-to-z": {
      name: "asc",
    },
    "z-to-a": {
      name: "desc",
    },
  }

  return map[searchParams.orderBy || "newest"]
}
