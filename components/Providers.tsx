"use client"

import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"
import { Toaster } from "react-hot-toast"
import DataProvider from "@/components/DataProvider"

export type ProvidersProps = {
  children: ReactNode
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <DataProvider>
        <Toaster />
        {children}
      </DataProvider>
    </SessionProvider>
  )
}
