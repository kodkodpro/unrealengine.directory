import { ReactNode } from "react"
import "./globals.css"
import Header from "@/components/layout/Header"
import { Inter } from "next/font/google"
import clsx from "clsx"
import "@total-typescript/ts-reset"

const inter = Inter({
  preload: true,
  weight: "variable",
  display: "swap",
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata = {
  title: "UEDirectory",
  description: "A convenient directory of Unreal Engine plugins and assets",
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body className={clsx(
        "bg-neutral-900 text-neutral-100 font-sans antialiased",
        inter.variable,
      )}>
        <div className="mx-4 md:mx-12">
          <Header />
          {children}
        </div>
      </body>
    </html>
  )
}
