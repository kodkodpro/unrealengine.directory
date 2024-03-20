"use server"

import { auth } from "@/lib/auth"

export default async function getCurrentUserId() {
  const session = await auth()
  return session?.user?.id ?? null
}
