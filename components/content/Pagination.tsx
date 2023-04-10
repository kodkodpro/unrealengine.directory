"use client"

import clsx from "clsx"
import { useRouter, useSearchParams } from "next/navigation"
import Button from "@/components/form/Button"

export type PaginationProps = {
  paginationKey?: string
  totalRecords: number
} & React.HTMLAttributes<HTMLDivElement>

export default function Pagination({ paginationKey = "page", totalRecords, className, ...props } : PaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentPage = parseInt(searchParams.get(paginationKey) || "") || 1
  const perPage = parseInt(searchParams.get("perPage") || "") || 21
  const totalPages = Math.ceil(totalRecords / perPage)

  if (totalPages <= 1) return null

  const handlePageChange = (page: number) => {
    const url = new URL(window.location.href)

    const searchParams = new URLSearchParams(url.search)
    searchParams.set(paginationKey, page.toString())

    const newUrl = new URL(url.origin + url.pathname + "?" + searchParams.toString())
    router.push(newUrl.toString())
  }

  const paginationItems: number[] = []

  // Generate pagination items with gaps
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
      paginationItems.push(i)
    } else if (i === currentPage - 3 || i === currentPage + 3) {
      paginationItems.push(0)
    }
  }

  return (
    <div
      className={clsx(
        "mb-2 flex justify-center gap-2",
        className,
      )}
      {...props}
    >
      {paginationItems.map((item, index) => (
        <Button
          key={index}
          variant={item === currentPage ? "primary" : "default"}
          disabled={!item}
          onClick={() => item && handlePageChange(item)}
        >
          {item || "..."}
        </Button>
      ))}
    </div>
  )
}
