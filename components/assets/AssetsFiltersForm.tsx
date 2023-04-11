"use client"

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"
import { Category, Tag, EngineVersion, Author } from "@prisma/client"
import clsx from "clsx"
import { useRouter, useSearchParams } from "next/navigation"
import { startTransition, useState } from "react"
import { OrderBy } from "@/components/assets/AssetsListSort"
import Button from "@/components/form/Button"
import Checkbox from "@/components/form/Checkbox"
import Input from "@/components/form/Input"
import Label from "@/components/form/Label"
import MultiSelect from "@/components/form/MultiSelect"
import Range from "@/components/form/Range"
import Select from "@/components/form/Select"
import { getIdsFromQuery } from "@/utils/helpers/searchParams"
import { formatMoney, titleize, toBoolean } from "@/utils/helpers/string"
import { shrinkVersions, Version } from "@/utils/versions"

const ReleasePeriodOptions = [
  { label: "Last 7 days", value: "last-7-days" },
  { label: "Last 30 days", value: "last-30-days" },
  { label: "Last 90 days", value: "last-90-days" },
  { label: "Last year", value: "last-year" },
] as const

export type ReleasePeriod = typeof ReleasePeriodOptions[number]["value"]

export type FiltersQuery = {
  q?: string,
  ratingFrom?: string,
  ratingTo?: string,
  priceFrom?: string,
  priceTo?: string,
  freeOnly?: string,
  orderBy?: OrderBy,
  releasePeriod?: ReleasePeriod,
  categoriesIds?: string,
  tagsIds?: string,
  engineVersionsIds?: string,
  authorsIds?: string,
}

export type AssetsFiltersFormProps = {
  assetsMaxPrice: number,
  categories: Pick<Category, "id" | "name">[]
  tags: Pick<Tag, "id" | "name">[],
  engineVersions: Pick<EngineVersion, "id" | "name">[]
  authors: Pick<Author, "id" | "name">[]
} & React.HTMLAttributes<HTMLFormElement>

export default function AssetsFiltersForm({
  assetsMaxPrice,
  categories,
  tags,
  engineVersions,
  authors,
  className,
  ...props
}: AssetsFiltersFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [q, setQ] = useState(searchParams.get("q") || "")
  const [ratingFrom, setRatingFrom] = useState(parseFloat(searchParams.get("ratingFrom") || "0"))
  const [ratingTo, setRatingTo] = useState(parseFloat(searchParams.get("ratingTo") || "5"))
  const [priceFrom, setPriceFrom] = useState(parseInt(searchParams.get("priceFrom") || "0"))
  const [priceTo, setPriceTo] = useState(parseInt(searchParams.get("priceTo") || "") || assetsMaxPrice)
  const [freeOnly, setFreeOnly] = useState(toBoolean(searchParams.get("freeOnly")))
  const [releasePeriod, setReleasePeriod] = useState(searchParams.get("releasePeriod") || "")

  const [categoriesIds, setCategoriesIds] = useState(getIdsFromQuery(searchParams, "categoriesIds"))
  const [tagsIds, setTagsIds] = useState(getIdsFromQuery(searchParams, "tagsIds"))
  const [engineVersionsIds, setEngineVersionsIds] = useState(getIdsFromQuery(searchParams, "engineVersionsIds"))
  const [authorsIds, setAuthorsIds] = useState(getIdsFromQuery(searchParams, "authorsIds"))

  const engineVersionsSorted = engineVersions.sort((a, b) => b.name.localeCompare(a.name, undefined, { numeric: true }))

  const handleSubmit = (event: React.FormEvent<HTMLFormElement> | null = null) => {
    event?.preventDefault()

    const url = new URL(window.location.href)
    const searchParams = new URLSearchParams(url.search)

    const filters: FiltersQuery = {
      q,
      ratingFrom: ratingFrom.toString(),
      ratingTo: ratingTo.toString(),
      priceFrom: priceFrom.toString(),
      priceTo: priceTo.toString(),
      releasePeriod: releasePeriod as ReleasePeriod,
      categoriesIds: categoriesIds.join(","),
      tagsIds: tagsIds.join(","),
      engineVersionsIds: engineVersionsIds.join(","),
      authorsIds: authorsIds.join(","),
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
        onClear={() => setQ("")}
      />

      <MultiSelect
        label="Categories"
        placeholder="All"
        options={categories.map((category) => ({
          value: category.id,
          label: category.name,
        }))}
        value={categoriesIds}
        onChange={setCategoriesIds}
        onClear={() => setCategoriesIds([])}
      />

      <MultiSelect
        virtualized
        label="Tags"
        placeholder="All"
        options={tags.map((tag) => ({
          value: tag.id,
          label: titleize(tag.name),
        }))}
        value={tagsIds}
        onChange={setTagsIds}
        onClear={() => setTagsIds([])}
      />

      <MultiSelect
        label="Engine Versions"
        placeholder="All"
        options={engineVersionsSorted.map((engineVersion) => ({
          value: engineVersion.id,
          label: engineVersion.name,
        }))}
        renderSelectedOptions={(selectedOptions) => {
          return shrinkVersions(selectedOptions.map((option) => option.label) as Version[])
        }}
        value={engineVersionsIds}
        onChange={setEngineVersionsIds}
        onClear={() => setEngineVersionsIds([])}
      />

      <MultiSelect
        virtualized
        label="Authors"
        placeholder="All"
        options={authors.map((author) => ({
          value: author.id,
          label: author.name,
        }))}
        value={authorsIds}
        onChange={setAuthorsIds}
        onClear={() => setAuthorsIds([])}
      />

      <Select
        label="Release date"
        placeholder="Any"
        options={ReleasePeriodOptions}
        value={releasePeriod}
        onChange={setReleasePeriod}
        onClear={() => setReleasePeriod("")}
      />

      <div>
        <div className="mb-1 flex items-center justify-between">
          <Label text="Price ($)" margin={false} />

          <Checkbox
            label="Free only"
            id="free-only"
            value={freeOnly}
            onToggle={setFreeOnly}
          />
        </div>

        <div className="mb-2 flex items-center gap-2">
          <Input
            value={priceFrom.toString()}
            onChangeText={(value) => setPriceFrom(parseInt(value) || 0)}
            type="number"
            min="0"
            className="w-full text-center"
            disabled={freeOnly}
          />

          <span className="text-neutral-500">&ndash;</span>

          <Input
            value={priceTo.toString()}
            onChangeText={(value) => setPriceTo(parseInt(value) || assetsMaxPrice)}
            type="number"
            className="w-full text-center"
            disabled={freeOnly}
          />
        </div>

        <Range
          min={0}
          max={assetsMaxPrice}
          step={1}
          formatValue={(value) => formatMoney(value, { maximumFractionDigits: 0 })}
          disabled={freeOnly}
          value={[priceFrom, priceTo]}
          onChange={(values) => {
            setPriceFrom(values[0])
            setPriceTo(values[1])
          }}
        />
      </div>

      <div>
        <Label text="Rating" />

        <div className="mb-2 flex items-center gap-2">
          <Input
            value={ratingFrom.toString()}
            onChangeText={(value) => setRatingFrom(parseInt(value) || 0)}
            type="number"
            min="0"
            step="0.1"
            className="w-full text-center"
          />

          <span className="text-neutral-500">&ndash;</span>

          <Input
            value={ratingTo.toString()}
            onChangeText={(value) => setRatingTo(parseInt(value) || assetsMaxPrice)}
            type="number"
            step="0.1"
            max="5"
            className="w-full text-center"
          />
        </div>

        <Range
          min={0}
          max={5}
          step={0.1}
          value={[ratingFrom, ratingTo]}
          onChange={(values) => {
            setRatingFrom(values[0])
            setRatingTo(values[1])
          }}
        />
      </div>

      <hr className="border-neutral-800" />

      <Button type="submit" className="w-full">
        Apply
      </Button>

      <Button
        type="button"
        variant="default"
        className="w-full"
        onClick={handleClear}
      >
        Clear filters
      </Button>
    </form>
  )
}
