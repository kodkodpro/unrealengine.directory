import AssetsFiltersAndOrder from "@/components/assets/AssetsFiltersAndOrder"
import { Text } from "@/components/catalyst/text"
import LoadingDots from "@/components/content/LoadingDots"

export default async function HomeLoading() {
  return (
    <>
      <AssetsFiltersAndOrder
        assetsCount={0}
        categories={[]}
        engineVersions={[]}
      />

      <div className="flex flex-1 items-center justify-center">
        <Text className="sm:text-xl sm:font-medium">
          Loading<LoadingDots />
        </Text>
      </div>
    </>
  )
}
