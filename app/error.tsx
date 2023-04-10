"use client"

import * as Sentry from "@sentry/nextjs"
import { useEffect } from "react"
import Button from "@/components/form/Button"

interface ErrorBoundaryProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-2">
      <h1 className="text-2xl font-semibold tracking-tight text-white">Error</h1>
      <p className="font-medium text-neutral-300">{error.message}</p>
      <Button onClick={reset}>Retry</Button>
    </div>
  )
}
