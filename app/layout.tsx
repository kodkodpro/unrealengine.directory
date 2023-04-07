import { ReactNode } from "react"
import "./globals.css"

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
      <body>{children}</body>
    </html>
  )
}
