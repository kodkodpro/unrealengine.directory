import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

// TODO: Nice function to try TypeScript 5 decorators
export const apiWrapper = async (
  request: NextRequest,
  fn: () => Promise<NextResponse>,
) => {
  try {
    const authToken = request.headers.get("X-Universe-Auth-Token")

    if (!authToken) {
      return NextResponse.json({ errors: ["Missing X-Universe-Auth-Token header"] }, { status: 401 })
    }

    if (authToken !== process.env.UNIVERSE_AUTH_TOKEN) {
      return NextResponse.json({ errors: ["Invalid X-Universe-Auth-Token header"] }, { status: 401 })
    }

    return await fn()
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ errors: err.issues }, { status: 400 })
    }

    throw err
  }
}
