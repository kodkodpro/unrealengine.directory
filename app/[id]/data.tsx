import prisma from "@/utils/prisma"

export function getAsset(epicId: string) {
  return prisma.asset.findUnique({
    where: {
      epicId,
    },
  })
}
