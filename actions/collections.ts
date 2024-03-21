"use server"

import { Collection } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { serverAction, ServerActionError } from "@/actions/serverAction"
import getCurrentUserId from "@/hooks/getCurrentUserId"
import * as dbCollections from "@/lib/db/collections"

const createCollectionSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(2048).optional(),
  isPublic: z.boolean(),
})

export const createCollection = serverAction(async (rawData: Partial<Collection>) => {
  const userId = await getCurrentUserId()
  if (!userId) throw new ServerActionError("You must be signed in to create a collection")

  const data = createCollectionSchema.parse(rawData)
  if (!await dbCollections.isNameUnique(userId, data.name)) throw new ServerActionError("You already have a collection with that name", "name")

  const slug = await dbCollections.generateUniqueSlug()
  const collection = await dbCollections.createCollection({ ...data, slug, userId })

  revalidatePath("/")
  return collection
})

export const updateCollection = serverAction(async (id: number, rawData: Partial<Collection>) => {
  const userId = await getCurrentUserId()
  if (!userId) throw new ServerActionError("You must be signed in to create a collection")

  const collection = await dbCollections.getCollection(id)
  if (!collection || collection.userId !== userId) throw new ServerActionError("Collection not found")

  const data = createCollectionSchema.parse(rawData)
  if (!await dbCollections.isNameUnique(userId, data.name, [collection.id])) throw new ServerActionError("You already have a collection with that name", "name")

  const updatedCollection = await dbCollections.updateCollection(id, data)

  revalidatePath("/")
  return updatedCollection
})

export const addToCollection = serverAction(async (collectionId: number, assetId: number) => {
  const userId = await getCurrentUserId()
  if (!userId) throw new ServerActionError("You must be signed in to collections an asset")

  const collection = await dbCollections.getCollection(collectionId)
  if (!collection || collection.userId !== userId) throw new ServerActionError("Collection not found")

  if (await dbCollections.isInCollection(collectionId, assetId)) return true
  await dbCollections.addToCollection(collectionId, assetId)

  revalidatePath("/")
  return true
})

export const removeFromCollection = serverAction(async (collectionId: number, assetId: number) => {
  const userId = await getCurrentUserId()
  if (!userId) throw new ServerActionError("You must be signed in to unwatch an asset")

  await dbCollections.removeFromCollection(collectionId, assetId)

  revalidatePath("/")
  return true
})
