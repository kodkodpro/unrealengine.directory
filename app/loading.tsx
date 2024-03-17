import AssetsFiltersForm from "@/components/assets/AssetsFiltersForm"
import LoadingDots from "@/components/content/LoadingDots"
import Sticky from "@/components/layout/Sticky"

export default function Loading() {
  return (
    <div className="flex-row gap-8 pb-24 xl:flex">
      <div className="mb-16 xl:mb-0 xl:basis-80">
        <Sticky offsetTop={32} offsetBottom={32}>
          <AssetsFiltersForm
            assetsMaxPrice={1500}
            categories={[]}
            engineVersions={[]}
          />
        </Sticky>
      </div>

      <div className="flex-1 p-8 xl:flex xl:items-center xl:justify-center">
        <p className="text-center text-lg font-medium">
          Loading your awesome experience<LoadingDots />
        </p>
      </div>
    </div>
  )
}
