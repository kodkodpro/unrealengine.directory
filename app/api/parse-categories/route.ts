import { NextResponse } from "next/server"
import parseCategories from "@/utils/parsers/parseCategories"

export async function POST() {
  const categories = await parseCategories()

  return NextResponse.json(categories)
}
