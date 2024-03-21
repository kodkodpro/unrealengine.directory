"use client"

import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"
import { Toaster } from "react-hot-toast"
import DataProvider from "@/components/DataProvider"
import ModalRenderer from "@/components/modal/ModalRenderer"

export type ProvidersProps = {
  children: ReactNode
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <DataProvider>
        <Toaster />
        <ModalRenderer />
        
        {children}
      </DataProvider>
    </SessionProvider>
  )
}
