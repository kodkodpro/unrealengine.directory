import AssetsFiltersAndOrder from "@/components/assets/AssetsFiltersAndOrder"
import AssetsList from "@/components/assets/AssetsList"
import { Button } from "@/components/catalyst/button"
import EmptyState from "@/components/content/EmptyState"
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
    <>
      <AssetsFiltersAndOrder
        assetsCount={assetsCount}
        categories={categories}
        engineVersions={engineVersions}
      />

      <AssetsList 
        assets={assets}
        showCategory={!filters.categoryId}
        showEngineVersions={!filters.engineVersionId}
        emptyState={(
          <EmptyState
            title="No assets found"
            description="Try adjusting your filters"
            actions={(
              <Button
                href="/"
                color="amber"
              >
                Clear filters
              </Button>
            )}
          />
        )}
      />

      <div className="mx-auto max-w-2xl px-8">
        <Paginator
          page={Number(page)}
          perPage={Number(perPage)}
          totalRecords={assetsCount}
        />
      </div>
    </>
  )
}
