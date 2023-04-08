import parseCategories from "@/utils/parsers/parseCategories"
import { NextResponse } from "next/server"

export async function POST() {
  const categories = await parseCategories()

  return NextResponse.json(categories)
}
