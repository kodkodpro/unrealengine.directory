import { ReactNode } from "react"
import "./globals.css"
import Header from "@/components/layout/Header"

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
      <body className="bg-neutral-900 text-neutral-100 antialiased">
        <div className="mx-4 md:mx-12">
          <Header />
          {children}
        </div>
      </body>
    </html>
  )
}
