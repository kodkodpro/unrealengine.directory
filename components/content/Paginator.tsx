"use client"

import { useRouter } from "next/navigation"
import { Pagination, PaginationGap, PaginationList, PaginationNext, PaginationPage, PaginationPrevious } from "@/components/catalyst/pagination"

export type PaginatorProps = {
  page: number
  perPage: number
  totalRecords: number
}

export function Paginator({ page, perPage, totalRecords }: PaginatorProps) {
  const router = useRouter()
  
  if (totalRecords === 0) return null

  const totalPages = Math.ceil(totalRecords / perPage)
  const range = generatePaginationRange(page, totalPages)

  const handlePageChange = (event: React.MouseEvent<HTMLAnchorElement>, newPage: string | number) => {
    event.preventDefault()
    if (newPage === page) return

    const url = new URL(window.location.href)
    url.searchParams.set("page", newPage.toString())
    
    router.push(url.toString())
  }
  
  return (
    <Pagination className="py-8">
      <PaginationPrevious href={page === 1 ? null : `?page=${page - 1}`} />

      <PaginationList>
        {range.map((p) => (
          p === PaginationGapSymbol ? (
            <PaginationGap key={p} />
          ) : (
            <PaginationPage
              key={p}
              href={`?page=${p}`}
              current={p === page}
              onClick={(event) => handlePageChange(event, p)}
            >
              {p.toString()}
            </PaginationPage>
          )
        ))}
      </PaginationList>

      <PaginationNext href={page === totalPages ? null : `?page=${page + 1}`} />
    </Pagination>
  )
}

const PaginationGapSymbol = "..."
const PaginationDelta = 3

function generatePaginationRange(current: number, last: number) {
  const left = current - PaginationDelta
  const right = current + PaginationDelta + 1
  const range = []
  const rangeWithDots = []
  let l

  for (let i = 1; i <= last; i++) {
    if (i == 1 || i == last || i >= left && i < right) {
      range.push(i)
    }
  }

  for (const i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1)
      } else if (i - l !== 1) {
        rangeWithDots.push(PaginationGapSymbol)
      }
    }

    rangeWithDots.push(i)
    l = i
  }

  return rangeWithDots
}
