"use server"

import { Prisma } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { serverAction, ServerActionError } from "@/actions/serverAction"
import getCurrentUserId from "@/hooks/getCurrentUserId"
import * as dbUsers from "@/lib/db/users"

const updateUserSchema = z.object({
  name: z.string().max(64).optional(),
  bio: z.string().max(2048).optional(),
})

export const updateUser = serverAction(async (userId: string, rawData: Prisma.UserUpdateArgs["data"]) => {
  const currentUserId = await getCurrentUserId()
  if (userId !== currentUserId) throw new ServerActionError("You can only update your own profile")

  const data = updateUserSchema.parse(rawData)
  const user = await dbUsers.updateUser(userId, data)

  revalidatePath("/")
  return user
})
