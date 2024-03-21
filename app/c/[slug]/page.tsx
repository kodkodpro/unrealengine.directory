import { notFound } from "next/navigation"
import React from "react"
import ReactMarkdown from "react-markdown"
import AssetsList from "@/components/assets/AssetsList"
import { Strong, Text } from "@/components/catalyst/text"
import EmptyState from "@/components/content/EmptyState"
import PageTitle from "@/components/content/PageTitle"
import { getCollectionAssets, getCollectionBySlug } from "@/lib/db/collections"
import { getUser } from "@/lib/db/users"

type CollectionPublicPageProps = {
  params: {
    slug: string
  }
}

export default async function CollectionPublicPage({ params: { slug } }: CollectionPublicPageProps) {
  const collection = await getCollectionBySlug(slug)
  if  (!collection || !collection.isPublic) return notFound()
  
  const user = await getUser(collection.userId)
  const assets = await getCollectionAssets(collection.id)

  return (
    <div>
      <div className="px-8 pt-8">
        <div className="flex items-baseline gap-2">
          <PageTitle className="mb-1">
            {collection.name}
          </PageTitle>

          {user && (
            <Text>
              by{" "}
              {user.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.image}
                  alt={`${user.name}'s profile picture`}
                  className="mr-1.5 inline-block size-6 rounded-full"
                />
              )}
              <Strong>{user.name || "Nameless User"}</Strong>
            </Text>
          )}
        </div>

        {collection.description && (
          <div className="prose prose-sm prose-zinc mt-4 dark:prose-invert">
            <ReactMarkdown>
              {collection.description}
            </ReactMarkdown>
          </div>
        )}

        {user && (
          <>
            {user.bio && (
              <div className="prose prose-sm prose-zinc mt-4 dark:prose-invert">
                <h3>About Author</h3>
                <ReactMarkdown>
                  {user.bio}
                </ReactMarkdown>
              </div>
            )}
          </>
        )}
      </div>

      <AssetsList
        assets={assets}
        emptyState={(
          <EmptyState
            title="No assets"
            description="Author has not added any assets to this collection yet"
          />
        )}
      />
    </div>
  )
}
