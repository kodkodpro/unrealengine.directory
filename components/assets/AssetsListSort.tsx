"use client"

import clsx from "clsx"
import { useRouter, useSearchParams } from "next/navigation"
import { startTransition, useEffect, useState } from "react"
import Select from "@/components/form/Select"
import { pluralize } from "@/utils/helpers/string"

const OrderByOptions = [
  { label: "Newest First", value: "newest" },
  { label: "Oldest First", value: "oldest" },
  { label: "Price: Low to High", value: "least-expensive" },
  { label: "Price: High to Low", value: "most-expensive" },
  { label: "Rating: Low to High", value: "least-popular" },
  { label: "Rating: High to Low", value: "most-popular" },
] as const

const AllowedOrderByValues = OrderByOptions.map((option) => option.value)
const DefaultOrderByValue = AllowedOrderByValues[0]

export type OrderBy = typeof AllowedOrderByValues[number]

export type AssetsListSortProps = {
  assetsCount: number
} & React.HTMLAttributes<HTMLDivElement>

export default function AssetsListSort({ assetsCount, className, ...props } : AssetsListSortProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const searchParamsOrderBy = searchParams.get("orderBy") || ""

  let initialOrderBy: OrderBy = DefaultOrderByValue

  if (AllowedOrderByValues.includes(searchParamsOrderBy)) {
    initialOrderBy = searchParamsOrderBy as OrderBy
  }

  const [orderBy, setOrderBy] = useState<OrderBy>(initialOrderBy)

  useEffect(() => {
    const url = new URL(window.location.href)
    const searchParams = new URLSearchParams(url.search)

    if (orderBy === DefaultOrderByValue) {
      if (!searchParams.has("orderBy")) return
      searchParams.delete("orderBy")
    } else {
      if (searchParams.get("orderBy") === orderBy) return
      searchParams.set("orderBy", orderBy)
    }

    startTransition(() => {
      router.push(`/?${searchParams.toString()}`)
    })
  }, [router, orderBy])

  return (
    <div
      className={clsx(
        "flex flex-row justify-between items-center gap-2 mb-2",
        className,
      )}
      {...props}
    >
      <p className="font-medium">
        {assetsCount} {pluralize(assetsCount, "result", "results")} found
      </p>
      <Select
        size="sm"
        openDirection="bottom-left"
        options={OrderByOptions}
        value={orderBy}
        onChange={setOrderBy}
      />
    </div>
  )
}
