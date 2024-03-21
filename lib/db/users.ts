import { Prisma } from "@prisma/client"
import prisma from "@/lib/prisma"

export async function getUser(id: string) {
  return prisma.user.findFirst({
    where: {
      id,
    },
  })
}

export async function updateUser(id: string, data: Prisma.UserUpdateArgs["data"]) {
  return prisma.user.update({
    where: {
      id,
    },
    data,
  })
}
