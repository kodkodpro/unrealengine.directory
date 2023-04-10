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

export async function getAssets(searchParams: HomeProps["searchParams"]) {
  const page = searchParams.page ? +searchParams.page : 1
  const perPage = searchParams.perPage ? Math.min(+searchParams.perPage, 100) : 21

  const where = getFilters(searchParams)
  const orderBy = getAssetsOrderBy(searchParams)

  return await prisma.asset.findMany({
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

export async function getAssetsCount(searchParams: HomeProps["searchParams"]) {
  return await prisma.asset.count({
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

export async function getCategories() {
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

export async function getTags() {
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

export async function getEngineVersions() {
  return await prisma.engineVersion.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      name: "desc",
    },
  })
}

export async function getAuthors() {
  return await prisma.author.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      name: "asc",
    },
  })
}
