import { NextResponse } from "next/server"
import getCurrentUserId from "@/hooks/getCurrentUserId"
import { getUser } from "@/lib/db/users"

export async function GET() {
  const currentUserId = await getCurrentUserId()
  if (!currentUserId) return NextResponse.json({ error: "Not authorized" }, { status: 401 })

  const user = await getUser(currentUserId)
  return NextResponse.json(user)
}
