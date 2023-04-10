import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

// TODO: Nice function to try TypeScript 5 decorators
export const apiWrapper = async (
  request: NextRequest,
  fn: Function,
) => {
  try {
    const apiKey = request.headers.get("X-Api-Key")

    if (!apiKey) {
      return NextResponse.json({ errors: ["Missing X-Api-Key header"] }, { status: 401 })
    }

    if (apiKey !== process.env.API_KEY) {
      return NextResponse.json({ errors: ["Invalid X-Api-Key header"] }, { status: 401 })
    }

    return await fn()
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ errors: err.issues }, { status: 400 })
    }

    throw err
  }
}
