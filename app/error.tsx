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
    <div className="flex flex-1 flex-col items-center justify-center gap-2">
      <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl xl:text-4xl">Error</h1>
      <div className="prose">
        <p className="font-medium text-neutral-300">{error.message}</p>
      </div>
      <Button onClick={reset}>Retry</Button>
    </div>
  )
}
