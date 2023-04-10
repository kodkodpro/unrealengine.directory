import clsx from "clsx"
import { Metadata } from "next"
import { Inter } from "next/font/google"
import { ReactNode } from "react"
import Footer from "@/components/layout/Footer"
import Header from "@/components/layout/Header"
import ScrollToTop from "@/components/layout/ScrollToTop"
import "@total-typescript/ts-reset"
import "./globals.css"
import { getBaseURL } from "@/utils/helpers/string"

const inter = Inter({
  preload: true,
  weight: "variable",
  display: "swap",
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Unreal Engine Directory",
  description: "🚀 A directory of Unreal Engine plugins and assets. Like Unreal Marketplace, but better.",
  manifest: "/manifest.json",
  themeColor: "#ffffff",
  applicationName: "Unreal Engine Directory",
  icons: {
    apple: "/apple-touch-icon.png",
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png", media: "(prefers-color-scheme: light)" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png", media: "(prefers-color-scheme: light)" },
      { url: "/favicon-dark-32x32.png", sizes: "32x32", type: "image/png", media: "(prefers-color-scheme: dark)" },
      { url: "/favicon-dark-16x16.png", sizes: "16x16", type: "image/png", media: "(prefers-color-scheme: dark)" },
    ],
  },
  openGraph: {
    url: getBaseURL(),
    type: "website",
    locale: "en_US",
  },
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body className={clsx(
        "bg-neutral-800 text-neutral-100 font-sans antialiased",
        "flex flex-col min-h-screen",
        inter.variable,
      )}>
        <Header />

        <div className="py-8 px-4 md:px-12 bg-neutral-900 flex-1 flex flex-col">
          {children}
        </div>

        <Footer />
        <ScrollToTop />
      </body>
    </html>
  )
}
