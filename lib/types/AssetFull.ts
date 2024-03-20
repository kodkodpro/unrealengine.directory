import { Asset, Author, Category, Prisma } from "@prisma/client"

export type AssetFull = Pick<Asset, keyof typeof AssetFullSelect> & {
  author: Pick<Author, keyof typeof AssetFullAuthorSelect>
  category: Pick<Category, keyof typeof AssetFullCategorySelect>
  tags: Pick<Category, keyof typeof AssetFullTagsSelect>[]
  engineVersions: Pick<Category, keyof typeof AssetFullEngineVersionsSelect>[]
}

export const AssetFullSelect = {
  id: true,
  epicId: true,
  name: true,
  shortDescription: true,
  description: true,
  technicalDetails: true,
  price: true,
  discount: true,
  ratingScore: true,
  ratingCount: true,
  images: true,
}

export const AssetFullAuthorSelect = {
  id: true,
  name: true,
}

export const AssetFullCategorySelect = {
  id: true,
  name: true,
}

export const AssetFullTagsSelect = {
  id: true,
  name: true,
}

export const AssetFullEngineVersionsSelect = {
  id: true,
  name: true,
}

export const AssetFullSelectWithRelations: Prisma.AssetSelect = {
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
}
