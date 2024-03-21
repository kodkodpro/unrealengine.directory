import { GlobeAmericasIcon, LockClosedIcon } from "@heroicons/react/24/outline"
import { redirect } from "next/navigation"
import AssetsList from "@/components/assets/AssetsList"
import { Button } from "@/components/catalyst/button"
import { Strong, Text } from "@/components/catalyst/text"
import CollectionNav from "@/components/collections/CollectionNav"
import CollectionShareableUrl from "@/components/collections/CollectionShareableUrl"
import ManageCollectionButton from "@/components/collections/ManageCollectionButton"
import EmptyState from "@/components/content/EmptyState"
import PageTitle from "@/components/content/PageTitle"
import getCurrentUserId from "@/hooks/getCurrentUserId"
import { getCollectionAssets, getCollectionsByUserId } from "@/lib/db/collections"

type CollectionsPageProps = {
  params: {
    id: string[]
  }
}

export default async function CollectionsPage({ params: { id = [] } }: CollectionsPageProps) {
  const currentUserId = await getCurrentUserId()
  if (!currentUserId) return redirect("/sign-in")

  const collectionsWithSystem = await getCollectionsByUserId(currentUserId)
  const collections = collectionsWithSystem.filter((collection) => !collection.systemName)
  const currentCollection = collections.find((collection) => collection.id === id[0]) ?? collections[0]

  if (!currentCollection) {
    return (
      <EmptyState
        title="No collections"
        description="Create a collection to organize your assets"
        actions={(
          <Button
            href="/"
            color="amber"
          >
            See all assets
          </Button>
        )}
      />
    )
  }

  const assets = await getCollectionAssets(currentCollection.id)

  return (
    <div>
      <div className="px-8 pt-8">
        <PageTitle className="mb-1">Your Collections</PageTitle>
        <Text className="mb-4">You can add assets to collections to organize them. Share collections with friends or keep them private.</Text>

        <div className="flex items-center gap-4">
          <CollectionNav
            collections={collections}
            currentCollectionId={currentCollection.id}
          />

          <ManageCollectionButton collection={currentCollection} />

          <Text>
            This collection is{" "}
            <Strong>
              {currentCollection.isPublic ? <GlobeAmericasIcon className="-mt-px inline-block size-4" /> : <LockClosedIcon className="-mt-px inline-block size-4" />}{" "}
              {currentCollection.isPublic ? "Public" : "Private"}
            </Strong>
          </Text>

          {currentCollection.isPublic && (
            <CollectionShareableUrl
              collection={currentCollection}
              className="border-l border-zinc-200 pl-4 dark:border-white/10"
            />
          )}
        </div>
      </div>

      <AssetsList
        assets={assets}
        emptyState={(
          <EmptyState
            title="No assets in this collection"
            description="Add assets to this collection to organize them."
            actions={(
              <Button
                href="/"
                color="amber"
              >
                See all assets
              </Button>
            )}
          />
        )}
      />
    </div>
  )
}
