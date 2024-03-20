"use client"

import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"
import DataProvider from "@/components/DataProvider"

export type ProvidersProps = {
  children: ReactNode
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <DataProvider>
        {children}
      </DataProvider>
    </SessionProvider>
  )
}
