"use client"

import { ArrowUpIcon } from "@heroicons/react/24/solid"
import clsx from "clsx"
import { useEffect, useState } from "react"

export type ScrollToTopProps = {
  showAfter?: number
}

export default function ScrollToTop({ showAfter = 200 } : ScrollToTopProps) {
  const [showButton, setShowButton] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  useEffect(() => {
    const handleScroll = () => {
      const { scrollY } = window

      if (scrollY > showAfter) {
        setShowButton(true)
      } else {
        setShowButton(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  })

  if (!showButton) return null

  return (
    <button
      className={clsx(
        "fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50",
        "p-4 rounded-md bg-neutral-800 text-neutral-100 opacity-80 hover:opacity-100",
        "transition-opacity duration-200 ease-in-out",
      )}
      onClick={scrollToTop}
    >
      <ArrowUpIcon className="w-6 h-6" />
    </button>
  )
}
