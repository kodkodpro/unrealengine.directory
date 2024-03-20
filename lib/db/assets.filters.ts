import { Prisma } from "@prisma/client"

export type AssetsFilters = {
  q?: string
  categoryId?: string
  engineVersionId?: string
  price?: AssetsPrice
  discount?: AssetsDiscount
  rating?: AssetsRating
  ratingVoters?: AssetsRatingVoters
  releasePeriod?: AssetsReleasePeriod
}

export type AssetsPrice =
  | "free"
  | "0-25"
  | "25-50"
  | "50-100"
  | "100+"

export type AssetsDiscount =
  | "1+"
  | "10+"
  | "25+"
  | "50+"
  | "100+"

export type AssetsRating =
  | "1+"
  | "2+"
  | "3+"
  | "4+"
  | "5"

export type AssetsRatingVoters =
  | "5+"
  | "10+"
  | "25+"
  | "50+"
  | "100+"

export type AssetsReleasePeriod =
  | "last-week"
  | "last-month"
  | "last-3-months"
  | "last-6-months"
  | "last-year"

export type AssetsOrderBy =
  | "newest"
  | "oldest"
  | "least-expensive"
  | "most-expensive"
  | "least-popular"
  | "most-popular"
  | "least-voters"
  | "most-voters"
  | "a-to-z"
  | "z-to-a"

export function getAssetsWhere(filters: AssetsFilters) {
  const where: Prisma.AssetWhereInput = {}
  
  if (filters.q) {
    where["name"] = {
      contains: filters.q,
      mode: "insensitive",
    }

    // TODO: Add search by author and tags
  }
  
  if (filters.categoryId) {
    where["category"] = {
      id: parseInt(filters.categoryId),
    }
  }
  
  if (filters.engineVersionId) {
    where["engineVersions"] = {
      some: {
        id: parseInt(filters.engineVersionId),
      },
    }
  }
  
  if (filters.price === "free") {
    where["price"] = {
      equals: 0,
    }
  } else if (filters.price) {
    const [from, to] = {
      "0-25": [0, 25],
      "25-50": [25, 50],
      "50-100": [50, 100],
      "100+": [100, undefined],
    }[filters.price]
    
    where["price"] = {
      gte: from,
      lte: to,
    }
  }

  if (filters.discount) {
    const gte = {
      "1+": 1,
      "10+": 10,
      "25+": 25,
      "50+": 50,
      "100+": 100,
    }[filters.discount]

    if (gte) where["discount"] = { gte }
  }
  
  if (filters.rating) {
    const gte = {
      "1+": 1,
      "2+": 2,
      "3+": 3,
      "4+": 4,
      "5": 5,
    }[filters.rating]
            
    if (gte) where["ratingScore"] = { gte }
  }
  
  if (filters.ratingVoters) {
    const gte = {
      "5+": 5,
      "10+": 10,
      "25+": 25,
      "50+": 50,
      "100+": 100,
    }[filters.ratingVoters]

    if (gte) where["ratingCount"] = { gte }
  }
  
  if (filters.releasePeriod) {
    const now = new Date()
    const lastWeek = new Date(now.setDate(now.getDate() - 7))
    const lastMonths = new Date(now.setMonth(now.getMonth() - 1))
    const last3Months = new Date(now.setMonth(now.getMonth() - 3))
    const last6Months = new Date(now.setMonth(now.getMonth() - 6))
    const lastYear = new Date(now.setFullYear(now.getFullYear() - 1))
        
    const gte = {
      "last-week": lastWeek,
      "last-month": lastMonths,
      "last-3-months": last3Months,
      "last-6-months": last6Months,
      "last-year": lastYear,
    }[filters.releasePeriod]
        
    if (gte) where["releasedAt"] = { gte }
  }

  return where
}

export function getAssetsOrderBy(orderBy: AssetsOrderBy) {
  const map: Record<AssetsOrderBy, Prisma.AssetOrderByWithRelationInput> = {
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

  return map[orderBy]
}
