import { redirect } from "next/navigation"
import AssetsList from "@/components/assets/AssetsList"
import { Text } from "@/components/catalyst/text"
import getCurrentUserId from "@/hooks/getCurrentUserId"
import { getWatchlistWithAssets } from "@/lib/db/watchlist"
import { AssetFull } from "@/lib/types/AssetFull"

export default async function WatchlistPage() {
  const currentUserId = await getCurrentUserId()
  if (!currentUserId) return redirect("/sign-in")
  
  const watchlistWithAssets = await getWatchlistWithAssets(currentUserId)
  const assets = watchlistWithAssets.map((watch) => watch.asset) as AssetFull[]
  
  return (
    <div>
      <div className="px-8 pt-8">
        <h1 className="mb-1 text-3xl font-bold tracking-tighter">Your Watchlist</h1>
        <Text>We&apos;ll keep you updated on the latest versions or discounts of the assets you&apos;re watching</Text>
      </div>

      <AssetsList assets={assets} />
    </div>
  )
}
