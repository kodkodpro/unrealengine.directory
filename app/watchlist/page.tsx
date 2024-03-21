import { redirect } from "next/navigation"
import AssetsList from "@/components/assets/AssetsList"
import { Text } from "@/components/catalyst/text"
import EmptyState from "@/components/content/EmptyState"
import PageTitle from "@/components/content/PageTitle"
import getCurrentUserId from "@/hooks/getCurrentUserId"
import { getCollectionAssets, getOrCreateWatchlistCollection } from "@/lib/db/collections"

export default async function WatchlistPage() {
  const currentUserId = await getCurrentUserId()
  if (!currentUserId) return redirect("/sign-in")

  const watchlistCollection = await getOrCreateWatchlistCollection(currentUserId)
  const assets = await getCollectionAssets(watchlistCollection.id)

  return (
    <div>
      <div className="px-8 pt-8">
        <PageTitle className="mb-1">Your Watchlist</PageTitle>
        <Text>We&apos;ll keep you updated on the latest versions or discounts of the assets you&apos;re watching</Text>
      </div>

      <AssetsList
        assets={assets}
        emptyState={(
          <EmptyState
            title="No assets in your watchlist"
            description="Add assets to your watchlist to keep track of them"
          />
        )}
      />
    </div>
  )
}
