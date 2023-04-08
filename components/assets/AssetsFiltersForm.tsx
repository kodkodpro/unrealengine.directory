"use client"

import Input from "@/components/form/Input"
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"
import { startTransition, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Label from "@/components/form/Label"
import clsx from "clsx"
import MultiSelect from "@/components/form/MultiSelect"
import Button from "@/components/form/Button"
import { Category, Tag } from "@prisma/client"
import prisma from "@/utils/prisma"
import { titleize, toBoolean } from "@/utils/helpers/string"
import Checkbox from "@/components/form/Checkbox"

export type FiltersQuery = {
  q?: string,
  ratingFrom?: string,
  ratingTo?: string,
  priceFrom?: string,
  priceTo?: string,
  freeOnly?: string,
  categoriesIds?: string,
  tagsIds?: string,
}

export type AssetsFiltersFormProps = {
  categories: Category[],
  tags: Tag[],
} & React.HTMLAttributes<HTMLFormElement>

export default function AssetsFiltersForm({ categories, tags, className, ...props }: AssetsFiltersFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [q, setQ] = useState(searchParams.get("q") || "")
  const [ratingFrom, setRatingFrom] = useState(searchParams.get("ratingFrom") || "")
  const [ratingTo, setRatingTo] = useState(searchParams.get("ratingTo") || "")
  const [priceFrom, setPriceFrom] = useState(searchParams.get("priceFrom") || "")
  const [priceTo, setPriceTo] = useState(searchParams.get("priceTo") || "")
  const [freeOnly, setFreeOnly] = useState(toBoolean(searchParams.get("freeOnly")))

  const initialCategoriesIds = searchParams.get("categoriesIds")?.split(",").map((id) => parseInt(id)) || []
  const initialTagsIds = searchParams.get("tagsIds")?.split(",").map((id) => parseInt(id)) || []

  const [categoriesIds, setCategoriesIds] = useState<number[]>(initialCategoriesIds)
  const [tagsIds, setTagsIds] = useState<number[]>(initialTagsIds)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const url = new URL(window.location.href)
    const searchParams = new URLSearchParams(url.search)

    const filters: FiltersQuery = {
      q,
      ratingFrom,
      ratingTo,
      priceFrom,
      priceTo,
      categoriesIds: categoriesIds.join(","),
      tagsIds: tagsIds.join(","),
      freeOnly: freeOnly ? "1" : "",
    }

    Object.entries(filters).forEach(([key, value]) => {
      if (value.length > 0) {
        searchParams.set(key, value)
      } else {
        searchParams.delete(key)
      }
    })

    startTransition(() => {
      router.push(`/?${searchParams.toString()}`)
    })
  }

  const handleClear = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    startTransition(() => {
      router.push("/")
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx("space-y-4", className)}
      {...props}
    >
      <Input
        label="Search"
        leftIcon={MagnifyingGlassIcon}
        value={q}
        onChangeText={setQ}
        clearable
      />

      <MultiSelect
        label="Categories"
        placeholder="All"
        options={(categories || []).map((category) => ({
          value: category.id,
          label: category.name,
        }))}
        value={categoriesIds}
        onChange={setCategoriesIds}
        clearable
      />

      <MultiSelect
        label="Tags"
        placeholder="All"
        options={(tags || []).map((tag) => ({
          value: tag.id,
          label: titleize(tag.name),
        }))}
        value={tagsIds}
        onChange={setTagsIds}
        clearable
      />

      <div>
        <Label text="Rating" />
        <div className="flex items-center gap-2">
          <Input
            leftText="From"
            value={ratingFrom}
            onChangeText={setRatingFrom}
            type="number"
            min="0"
            step="0.1"
            className="w-full text-center"
          />

          <span className="text-neutral-500">&ndash;</span>

          <Input
            leftText="To"
            value={ratingTo}
            onChangeText={setRatingTo}
            type="number"
            min="0"
            step="0.1"
            className="w-full text-center"
          />
        </div>
      </div>

      <div>
        <Label text="Price" />

        <div className="flex items-center gap-2 mb-3">
          <Input
            leftText="From"
            value={priceFrom}
            onChangeText={setPriceFrom}
            type="number"
            min="0"
            className="w-full text-center"
          />

          <span className="text-neutral-500">&ndash;</span>

          <Input
            leftText="To"
            value={priceTo}
            onChangeText={setPriceTo}
            type="number"
            className="w-full text-center"
          />
        </div>

        <Checkbox
          label="Free only"
          id="free-only"
          checked={freeOnly}
          onToggle={setFreeOnly}
        />
      </div>

      <Button type="submit" className="w-full">
        Apply
      </Button>

      <Button
        type="button"
        variant="default"
        className="w-full"
        onClick={handleClear}
      >
        Clear
      </Button>
    </form>
  )
}
