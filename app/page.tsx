import prisma from "@/utils/prisma"
import { Prisma } from "@prisma/client"
import AssetsList from "@/components/assets/AssetsList"
import AssetsFiltersForm, { FiltersQuery, OrderBy } from "@/components/assets/AssetsFiltersForm"
import Pagination from "@/components/Pagination"
import { AssetSelect, AuthorSelect, CategorySelect } from "@/components/assets/AssetCard"
import AssetsListSort from "@/components/assets/AssetsListSort"

function getFilters(searchParams: HomeProps["searchParams"]) {
  const where: Prisma.AssetWhereInput = {}

  if (searchParams.q) {
    where["name"] = {
      contains: searchParams.q,
      mode: "insensitive",
    }
  }

  if (searchParams.ratingFrom) {
    where["ratingScore"] = {
      gte: +searchParams.ratingFrom,
    }
  }

  if (searchParams.ratingTo) {
    where["ratingScore"] = {
      lte: +searchParams.ratingTo,
    }
  }

  if (searchParams.priceFrom) {
    where["price"] = {
      gte: +searchParams.priceFrom,
    }
  }

  if (searchParams.priceTo) {
    where["price"] = {
      lte: +searchParams.priceTo,
    }
  }

  if (searchParams.freeOnly) {
    where["price"] = {
      equals: 0,
    }
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

  return where
}

function getAssetsOrderBy(searchParams: HomeProps["searchParams"]) {
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
  }

  return map[searchParams.orderBy || "newest"]
}

async function getAssets(searchParams: HomeProps["searchParams"]) {
  const page = searchParams.page ? +searchParams.page : 1
  const perPage = searchParams.perPage ? Math.min(+searchParams.perPage, 100) : 21

  const where = getFilters(searchParams)
  const orderBy = getAssetsOrderBy(searchParams)

  return await prisma.asset.findMany({
    select: {
      ...AssetSelect,
      author: {
        select: AuthorSelect,
      },
      category: {
        select: CategorySelect,
      },
    },
    where,
    orderBy,
    take: perPage,
    skip: (page - 1) * perPage,
  })
}

async function getAssetsCount(searchParams: HomeProps["searchParams"]) {
  return await prisma.asset.count({
    where: getFilters(searchParams),
  })
}

async function getCategories() {
  return await prisma.category.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      name: "asc",
    },
  })
}

async function getTags() {
  return await prisma.tag.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      name: "asc",
    },
  })
}

type HomeProps = {
  searchParams: FiltersQuery & {
    page?: string,
    perPage?: string,
  }
}

export default async function Home({ searchParams }: HomeProps) {
  const assetsPromise = getAssets(searchParams)
  const assetsCountPromise = getAssetsCount(searchParams)
  const categoriesPromise = getCategories()
  const tagsPromise = getTags()

  const [assets, assetsCount, categories, tags] = await Promise.all([assetsPromise, assetsCountPromise, categoriesPromise, tagsPromise])

  return (
    <div className="flex-row gap-8 pb-24 xl:flex">
      <div className="mb-16 xl:mb-0 xl:basis-96">
        <AssetsFiltersForm
          categories={categories}
          tags={tags}
          className="xl:sticky xl:top-8"
        />
      </div>

      <div className="flex-1 pb-8">
        <AssetsListSort assetsCount={assetsCount} className="mb-2" />
        <AssetsList assets={assets} />

        <Pagination
          totalRecords={assetsCount}
          className="mt-8"
        />
      </div>
    </div>
  )
}
