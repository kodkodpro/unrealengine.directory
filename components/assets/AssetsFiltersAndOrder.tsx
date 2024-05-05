"use client"

import { Disclosure } from "@headlessui/react"
import { ChevronDownIcon, FunnelIcon } from "@heroicons/react/20/solid"
import { ClockIcon, CurrencyDollarIcon, HashtagIcon, StarIcon, UserGroupIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { FolderIcon } from "@heroicons/react/24/solid"
import { Category, EngineVersion } from "@prisma/client"
import { useRouter, useSearchParams } from "next/navigation"
import React, { createElement, startTransition, useEffect, useState } from "react"
import { useDebounceValue } from "usehooks-ts"
import { Badge, BadgeButton } from "@/components/catalyst/badge"
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from "@/components/catalyst/dropdown"
import { Field, Fieldset, Label } from "@/components/catalyst/fieldset"
import { Input } from "@/components/catalyst/input"
import { Listbox, ListboxLabel, ListboxOption } from "@/components/catalyst/listbox"
import { Radio, RadioField, RadioGroup } from "@/components/catalyst/radio"
import LabelWithClearButton from "@/components/form/LabelWithClearButton"
import { formatNumber } from "@/lib/utils/string"

const FiltersConfig = {
  price: {
    label: "Price",
    icon: CurrencyDollarIcon,
    options: [
      { value: "free", label: "Free" },
      { value: "0-25", label: "$0 – $25" },
      { value: "25-50", label: "$25 – $50" },
      { value: "50-100", label: "$50 – $100" },
      { value: "100+", label: "$100+" },
    ],
  },
  discount: {
    label: "Discount",
    icon: XMarkIcon,
    options: [
      { value: "1+", label: "1%+" },
      { value: "10+", label: "10%+" },
      { value: "25+", label: "25%+" },
      { value: "50+", label: "50%+" },
      { value: "75+", label: "75%+" },
    ],
  },
  rating: {
    label: "Rating",
    icon: StarIcon,
    options: [
      { value: "1+", label: "1+ star" },
      { value: "2+", label: "2+ stars" },
      { value: "3+", label: "3+ stars" },
      { value: "4+", label: "4+ stars" },
      { value: "5", label: "5 stars" },
    ],
  },
  ratingVoters: {
    label: "Rating Voters",
    icon: UserGroupIcon,
    options: [
      { value: "5+", label: "5+ voters" },
      { value: "10+", label: "10+ voters" },
      { value: "25+", label: "25+ voters" },
      { value: "50+", label: "50+ voters" },
      { value: "100+", label: "100+ voters" },
    ],
  },
  releasePeriod: {
    label: "Release Period",
    icon: ClockIcon,
    options: [
      { value: "last-week", label: "Last week" },
      { value: "last-month", label: "Last month" },
      { value: "last-3-months", label: "Last 3 months" },
      { value: "last-6-months", label: "Last 6 months" },
      { value: "last-year", label: "Last year" },
    ],
  },
} as const

type FilterKey = keyof typeof FiltersConfig
const FiltersKeys = Object.keys(FiltersConfig) as FilterKey[]

const SortOptions = [
  { label: "Newest First", value: "newest" },
  { label: "Oldest First", value: "oldest" },
  { label: "Price: Low to High", value: "least-expensive" },
  { label: "Price: High to Low", value: "most-expensive" },
  { label: "Rating: Low to High", value: "least-popular" },
  { label: "Rating: High to Low", value: "most-popular" },
  { label: "Rating Voters: Low to High", value: "least-voters" },
  { label: "Rating Voters: High to Low", value: "most-voters" },
  { label: "Discount ($): High to Low", value: "discount-highest" },
  { label: "Discount ($): Low to High", value: "discount-lowest" },
  { label: "Discount (%): High to Low", value: "discount-percent-highest" },
  { label: "Discount (%): Low to High", value: "discount-percent-lowest" },
  { label: "Name: A to Z", value: "a-to-z" },
  { label: "Name: Z to A", value: "z-to-a" },
] as const

type FiltersState = {
  price: string
  discount: string
  rating: string
  ratingVoters: string
  releasePeriod: string
}

export type AssetsFiltersAndOrderProps = {
  assetsCount: number
  categories: Pick<Category, "id" | "name">[]
  engineVersions: Pick<EngineVersion, "id" | "name">[]
}

export default function AssetsFiltersAndOrder({ assetsCount, categories, engineVersions }: AssetsFiltersAndOrderProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [q, setQ] = useState(searchParams.get("q") ?? "")
  const [qDebounced, setQDebounced] = useDebounceValue(q, 300)

  const price = searchParams.get("price") ?? ""
  const discount = searchParams.get("discount") ?? ""
  const rating = searchParams.get("rating") ?? ""
  const ratingVoters = searchParams.get("ratingVoters") ?? ""
  const releasePeriod = searchParams.get("releasePeriod") ?? ""
  const categoryId = searchParams.get("categoryId") ?? ""
  const engineVersionId = searchParams.get("engineVersionId") ?? ""
  const orderBy = searchParams.get("orderBy") ?? "newest"
  const page = parseInt(searchParams.get("page") ?? "1")

  const [filters, setFilters] = useState<FiltersState>({ price, discount, rating, ratingVoters, releasePeriod })

  const nonEmptyFilters = Object.entries(filters).filter(([, value]) => !!value)
  const nonEmptyFiltersCount = nonEmptyFilters.length + (categoryId ? 1 : 0) + (engineVersionId ? 1 : 0)
  const selectedCategory = categoryId ? categories.find((category) => String(category.id) === categoryId) : null
  const selectedEngineVersion = engineVersionId ? engineVersions.find((engineVersion) => String(engineVersion.id) === engineVersionId) : null

  const updateFilter = (key: FilterKey, value: string | null) => {
    setFilters((prevFilters) => {
      return {
        ...prevFilters,
        [key]: value ?? "",
      }
    })

    setSearchParam(key, value)
  }

  const setSearchParam = (key: string, value: string | null) => {
    const searchParams = new URLSearchParams(window.location.search)
    
    if (!value) {
      searchParams.delete(key)
    } else {
      searchParams.set(key, value)
    }
    
    startTransition(() => {
      router.push(`/?${searchParams.toString()}`)
    })
  }

  const removeSearchParam = (key: string) => {
    const searchParams = new URLSearchParams(window.location.search)
    searchParams.delete(key)

    startTransition(() => {
      router.push(`/?${searchParams.toString()}`)
    })
  }

  const handleFiltersReset = () => {
    startTransition(() => {
      router.push("/")
    })
  }

  useEffect(() => { setSearchParam("q", qDebounced) }, [qDebounced])
  
  return (
    <Disclosure
      as="section"
      aria-labelledby="filter-heading"
      className="grid items-center border-b border-zinc-200 dark:border-white/10"
    >
      <h2
        id="filter-heading"
        className="sr-only"
      >
        Filters
      </h2>
      <div className="relative col-start-1 row-start-1 py-4">
        <div className="mx-auto flex space-x-6 divide-x divide-zinc-200 px-4 text-sm sm:px-6 lg:px-8 dark:divide-white/10">
          <div className="flex gap-2">
            <Disclosure.Button className="group flex items-center gap-2 font-medium text-zinc-700 dark:text-zinc-200">
              <FunnelIcon
                className="size-5 flex-none text-zinc-400 group-hover:text-zinc-500 dark:text-zinc-500 dark:group-hover:text-zinc-400"
                aria-hidden="true"
              />

              {nonEmptyFiltersCount > 0 ? (
                <>
                  <span className="font-semibold">{nonEmptyFiltersCount} Filters</span>

                  {selectedCategory && (
                    <Badge color="zinc">
                      <FolderIcon className="-mr-1 inline-block size-4" />
                      {selectedCategory.name}
                    </Badge>
                  )}

                  {selectedEngineVersion && (
                    <Badge color="zinc">
                      <HashtagIcon className="-mr-1 inline-block size-4" />
                      {selectedEngineVersion.name}
                    </Badge>
                  )}

                  {nonEmptyFilters.map(([filterKey, value]) => (
                    <Badge
                      key={filterKey}
                      color="zinc"
                    >
                      {createElement(FiltersConfig[filterKey as FilterKey].icon, {
                        className: "size-4 inline-block -mr-1",
                      })}

                      {getFilterOptionByValue(filterKey as FilterKey, value).label}
                    </Badge>
                  ))}
                </>
              ) : (
                <span className="font-semibold">Filters</span>
              )}
            </Disclosure.Button>

            {nonEmptyFiltersCount > 0 && (
              <BadgeButton
                onClick={handleFiltersReset}
              >
                <XMarkIcon className="-mr-1 inline-block size-4 text-red-500" />
                <span>Clear all filters</span>
              </BadgeButton>
            )}
          </div>

          {assetsCount > 0 && (
            <div className="pl-6 text-zinc-500 dark:text-zinc-400">
              Found {formatNumber(assetsCount)} assets
            </div>
          )}

          {page > 1 && (
            <div className="pl-6 text-zinc-500 dark:text-zinc-400">
              Page {page}
            </div>
          )}
        </div>
      </div>
      <Disclosure.Panel className="border-t border-zinc-200 py-10 dark:border-white/10">
        <div className="mx-auto grid gap-4 px-4 text-sm sm:px-6 md:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:px-8 xl:grid-cols-6">
          <Fieldset className="space-y-4 lg:pr-6 xl:pr-8 2xl:pr-10">
            <Field>
              <LabelWithClearButton
                showClearButton={!!q}
                onClear={() => {
                  setQ("")
                  setQDebounced("")
                }}
              >
                Search
              </LabelWithClearButton>
              <Input
                value={q}
                onChange={(event) => {
                  setQ(event.target.value)
                  setQDebounced(event.target.value)
                }}
              />
            </Field>
            <Field>
              <LabelWithClearButton
                showClearButton={!!categoryId}
                onClear={() => removeSearchParam("categoryId")}
              >
                Category
              </LabelWithClearButton>
              <Listbox
                value={categoryId}
                onChange={(value) => setSearchParam("categoryId", value)}
              >
                {categories.map((category) => (
                  <ListboxOption
                    key={category.id}
                    value={String(category.id)}
                  >
                    <ListboxLabel>{category.name}</ListboxLabel>
                  </ListboxOption>
                ))}
              </Listbox>
            </Field>

            <Field>
              <LabelWithClearButton
                showClearButton={!!engineVersionId}
                onClear={() => removeSearchParam("engineVersionId")}
              >
                Engine Version
              </LabelWithClearButton>
              <Listbox
                value={engineVersionId}
                onChange={(value) => setSearchParam("engineVersionId", value)}
              >
                {engineVersions.map((engineVersion) => (
                  <ListboxOption
                    key={engineVersion.id}
                    value={String(engineVersion.id)}
                  >
                    <ListboxLabel>{engineVersion.name}</ListboxLabel>
                  </ListboxOption>
                ))}
              </Listbox>
            </Field>
          </Fieldset>

          {FiltersKeys.map((filterKey) => (
            <Fieldset
              key={filterKey}
              className="space-y-2"
            >
              <LabelWithClearButton
                showClearButton={!!filters[filterKey]}
                clearButtonClassName="float-none ml-2 -mt-2 translate-y-1"
                className="font-medium"
                onClear={() => updateFilter(filterKey, null)}
              >
                {FiltersConfig[filterKey].label}
              </LabelWithClearButton>

              <RadioGroup
                value={filters[filterKey]}
                onChange={(value) => updateFilter(filterKey, value)}
              >
                {FiltersConfig[filterKey].options.map((option) => (
                  <RadioField key={option.value}>
                    <Radio value={option.value} />
                    <Label className="font-medium">
                      {option.label}
                    </Label>
                  </RadioField>
                ))}
              </RadioGroup>
            </Fieldset>
          ))}
        </div>
      </Disclosure.Panel>
      <div className="col-start-1 row-start-1 py-4">
        <div className="mx-auto flex justify-end px-4 sm:px-6 lg:px-8">
          <Dropdown>
            <DropdownButton plain>
              {getSortOptionByValue(orderBy).label}
              <ChevronDownIcon />
            </DropdownButton>

            <DropdownMenu>
              {SortOptions.map((option) => (
                <DropdownItem
                  key={option.value}
                  onClick={() => setSearchParam("orderBy", option.value)}
                >
                  {option.label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </Disclosure>
  )
}

const getFilterOptionByValue = (filterKey: FilterKey, value: string) => {
  return FiltersConfig[filterKey].options.find((option) => option.value === value)!
}

const getSortOptionByValue = (value: string) => {
  return SortOptions.find((option) => option.value === value)!
}
