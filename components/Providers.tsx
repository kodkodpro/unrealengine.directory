"use client"

import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"

export type ProvidersProps = {
  children: ReactNode
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}
