import clsx from "clsx"
import { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  return (
    <html lang="en">
      <body className={clsx(
        "bg-neutral-800 font-sans text-neutral-100 antialiased",
        "flex min-h-screen flex-col",
        inter.variable,
      )}>
        <Header />

        <div className="flex flex-1 flex-col bg-neutral-900 px-4 py-8 md:px-12">
          {children}
        </div>

        <Footer />
        <ScrollToTop />
      </body>

      {GA_MEASUREMENT_ID && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="lazyOnload" />
          <Script id="google-analytics" strategy="lazyOnload">
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
