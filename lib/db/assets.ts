import { AssetsFilters, AssetsOrderBy, getAssetsOrderBy, getAssetsWhere } from "@/lib/db/assets.filters"
import prisma from "@/lib/prisma"
import { AssetFull, AssetFullAuthorSelect, AssetFullCategorySelect, AssetFullEngineVersionsSelect, AssetFullSelect, AssetFullTagsSelect } from "@/types/AssetFull"

export function getAssets(filters: AssetsFilters, orderBy: AssetsOrderBy, page: number, perPage: number): Promise<AssetFull[]> {
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
    where: getAssetsWhere(filters),
    orderBy: getAssetsOrderBy(orderBy),
    take: perPage,
    skip: (page - 1) * perPage,
  })
}

export function getAssetsCount(filters: AssetsFilters) {
  return prisma.asset.count({
    where: getAssetsWhere(filters),
  })
}

export function getAsset(epicId: string): Promise<AssetFull | null> {
  return prisma.asset.findUnique({
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
    where: {
      epicId,
    },
  })
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
