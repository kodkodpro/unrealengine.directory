import Image from "next/image"
import {
  getAssets,
  getAssetsCount,
  getAssetsMaxPrice,
  getAuthors,
  getCategories,
  getEngineVersions,
  getTags,
} from "@/app/data"
import AssetsFiltersForm, { FiltersQuery } from "@/components/assets/AssetsFiltersForm"
import AssetsList from "@/components/assets/AssetsList"
import AssetsListSort from "@/components/assets/AssetsListSort"
import Pagination from "@/components/content/Pagination"
import Sticky from "@/components/layout/Sticky"

export type HomeProps = {
  searchParams: FiltersQuery & {
    page?: string,
    perPage?: string,
  }
}

export default async function Home({ searchParams }: HomeProps) {
  const [assets, assetsCount, assetsMaxPrice, categories, tags, engineVersions, authors] = await Promise.all([
    getAssets(searchParams),
    getAssetsCount(searchParams),
    getAssetsMaxPrice(),
    getCategories(),
    getTags(),
    getEngineVersions(),
    getAuthors(),
  ])

  return (
    <div className="flex-row gap-8 pb-24 xl:flex">
      <div className="mb-16 xl:mb-0 xl:basis-96">
        <Sticky offsetTop={32} offsetBottom={32}>
          <AssetsFiltersForm
            assetsMaxPrice={Math.ceil(assetsMaxPrice || 0)}
            categories={categories}
            tags={tags}
            engineVersions={engineVersions}
            authors={authors}
            className="mb-4"
          />
        </Sticky>
      </div>


      {assetsCount > 0 ? (
        <div className="flex-1 pb-8">
          <AssetsListSort assetsCount={assetsCount} className="mb-2" />
          <AssetsList assets={assets} />

          <Pagination
            totalRecords={assetsCount}
            className="mt-8"
          />
        </div>
      ) : (
        <div className="py-8 xl:py-24 flex-1">
          <Image
            src={`https://placekitten.com/640/360?image=${Math.round(Math.random() * 15 + 1)}`}
            width={640}
            height={360}
            className="mx-auto mb-4 rounded"
            alt="Picture of a cat"
            unoptimized
          />
          <p className="text-center text-2xl md:text-3xl xl:text-4xl font-semibold mb-1">
            <span className="text-neutral-600">&ldquo;</span>
            No results found
            <span className="text-neutral-600">&rdquo;</span>
          </p>
          <p className="text-center font-medium text-neutral-300 md:text-lg">
            &mdash; Kitten
          </p>
        </div>
      )}
    </div>
  )
}
