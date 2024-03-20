import AssetsFiltersAndOrder from "@/components/assets/AssetsFiltersAndOrder"
import AssetsList from "@/components/assets/AssetsList"
import { getAssets, getCategories, getEngineVersions } from "@/lib/db/assets"
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
    perPage = 25,
    ...filters
  } = searchParams
  
  const [assets, categories, engineVersions] = await Promise.all([
    getAssets(filters, orderBy, Number(page), Number(perPage)),
    getCategories(),
    getEngineVersions(),
  ])

  return (
    <div>
      <AssetsFiltersAndOrder
        categories={categories}  
        engineVersions={engineVersions} 
      />

      <AssetsList assets={assets} />
    </div>
  )
}
