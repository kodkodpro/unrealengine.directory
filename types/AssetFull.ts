import { Asset, Author, Category } from "@prisma/client"

export type AssetFull = Pick<Asset, keyof typeof AssetFullSelect> & {
  author: Pick<Author, keyof typeof AssetFullAuthorSelect>,
  category: Pick<Category, keyof typeof AssetFullCategorySelect>,
  tags: Array<Pick<Category, keyof typeof AssetFullTagsSelect>>,
  engineVersions: Array<Pick<Category, keyof typeof AssetFullEngineVersionsSelect>>,
}

export const AssetFullSelect = {
  id: true,
  url: true,
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
