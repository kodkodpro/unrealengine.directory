import AssetsFiltersAndOrder from "@/components/assets/AssetsFiltersAndOrder"
import AssetsList from "@/components/assets/AssetsList"
import { Paginator } from "@/components/content/Paginator"
import { getAssets, getAssetsCount, getCategories, getEngineVersions } from "@/lib/db/assets"
import { AssetsFilters, AssetsOrderBy } from "@/lib/db/assets.filters"

const DefaultOrderBy: AssetsOrderBy = "newest"

type HomePageProps = {
  searchParams: AssetsFilters & {
    orderBy?: AssetsOrderBy
    page?: string
    perPage?: string
  }
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const {
    orderBy = DefaultOrderBy, 
    page = 1, 
    perPage = 32,
    ...filters
  } = searchParams
  
  const [
    assets,
    assetsCount,
    categories,
    engineVersions,
  ] = await Promise.all([
    getAssets(filters, orderBy, Number(page), Number(perPage)),
    getAssetsCount(filters),
    getCategories(),
    getEngineVersions(),
  ])

  return (
    <div>
      <AssetsFiltersAndOrder
        assetsCount={assetsCount}
        categories={categories}  
        engineVersions={engineVersions}
      />

      <AssetsList 
        assets={assets}
        showCategory={!filters.categoryId}
        showEngineVersions={!filters.engineVersionId}
      />

      <div className="mx-auto max-w-2xl px-8">
        <Paginator
          page={Number(page)}
          perPage={Number(perPage)}
          totalRecords={assetsCount}
        />
      </div>
    </div>
  )
}
