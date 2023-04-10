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

      <div className="flex-1 pb-8">
        <AssetsListSort assetsCount={assetsCount} className="mb-2" />
        <AssetsList assets={assets} />

        <Pagination
          totalRecords={assetsCount}
          className="mt-8"
        />
      </div>
    </div>
  )
}
