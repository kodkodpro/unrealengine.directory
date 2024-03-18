import { getAssetsOrderBy, getFilters } from "@/app/filters"
import { HomeProps } from "@/app/page"
import {
  AssetFullAuthorSelect,
  AssetFullCategorySelect,
  AssetFullEngineVersionsSelect,
  AssetFullSelect,
  AssetFullTagsSelect,
} from "@/types/AssetFull"
import prisma from "@/utils/prisma"

export function getAssets(searchParams: HomeProps["searchParams"]) {
  const page = searchParams.page ? +searchParams.page : 1
  const perPage = searchParams.perPage ? Math.min(+searchParams.perPage, 100) : 21

  const where = getFilters(searchParams)
  const orderBy = getAssetsOrderBy(searchParams)

  return prisma.asset.findMany({
    select: {
      ...AssetFullSelect,
      author: {
        select: AssetFullAuthorSelect,
      },
      category: {
        select: AssetFullCategorySelect,
      },
      tags: {
        select: AssetFullTagsSelect,
      },
      engineVersions: {
        select: AssetFullEngineVersionsSelect,
      },
    },
    where,
    orderBy,
    take: perPage,
    skip: (page - 1) * perPage,
  })
}

export function getAssetsCount(searchParams: HomeProps["searchParams"]) {
  return prisma.asset.count({
    where: getFilters(searchParams),
  })
}

export async function getAssetsMaxPrice() {
  const maxPrice = await prisma.asset.aggregate({
    _max: {
      price: true,
    },
  })

  return maxPrice._max.price
}

export function getCategories() {
  return prisma.category.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      name: "asc",
    },
  })
}

export function getTags() {
  return prisma.tag.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      name: "asc",
    },
  })
}

export function getEngineVersions() {
  return prisma.engineVersion.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      name: "desc",
    },
  })
}

export function getAuthors() {
  return prisma.author.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      name: "asc",
    },
  })
}
