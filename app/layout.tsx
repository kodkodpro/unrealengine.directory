import Header from "@/components/layout/Header"
import ModalRenderer from "@/components/modal/ModalRenderer"
import Providers from "@/components/Providers"
import clsx from "clsx"
import { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import "@total-typescript/ts-reset"
import "./global.css"
import { ReactNode } from "react"
import { getBaseURL } from "@/lib/utils/string"

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

export const viewport: Viewport = {
  themeColor: "#ffffff",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  return (
    <html
      lang="en"
      className="h-full"
    >
      <body
        className={clsx(
          "flex h-full flex-col bg-white font-sans text-zinc-900 antialiased dark:bg-zinc-900 dark:text-white",
          inter.variable,
        )}
      >
        <Providers>
          <Header />
          {children}
          <ModalRenderer />
        </Providers>
      </body>

      {GA_MEASUREMENT_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="lazyOnload"
          />
          <Script
            id="google-analytics"
            strategy="lazyOnload"
          >
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
  
              gtag('config', '${GA_MEASUREMENT_ID}');
            `}
          </Script>
        </>
      )}
    </html>
  )
}
