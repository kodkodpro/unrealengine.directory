import { ZodError } from "zod"
import { Errors } from "@/lib/types"

type ErrorWithMessage = {
  message: string
}

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as Record<string, unknown>).message === "string"
  )
}

function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  if (isErrorWithMessage(maybeError)) return maybeError

  try {
    return new Error(JSON.stringify(maybeError))
  } catch {
    return new Error(String(maybeError))
  }
}

export function getErrorMessage(error: unknown) {
  return toErrorWithMessage(error).message
}

export function zodErrorToErrors(error: ZodError): Errors {
  return error.errors.reduce<Errors>((acc, curr) => {
    if (curr.path) acc[curr.path[0] || "base"] = curr.message
    return acc
  }, {})
}

export function getBaseErrorMessage(errors: Errors) {
  return Array.isArray(errors.base) ? errors.base[0] : errors.base
}

export function throwDev(e: unknown) {
  if (process.env.NODE_ENV === "development") throw e
}
