"use client"

import { CheckIcon, PlusIcon } from "@heroicons/react/16/solid"
import { FolderIcon } from "@heroicons/react/24/outline"
import { XMarkIcon } from "@heroicons/react/24/solid"
import SignInModal from "@/components/auth/SignInModal"
import { Dropdown, DropdownButton, DropdownItem, DropdownLabel, DropdownMenu, DropdownSeparator } from "@/components/catalyst/dropdown"
import CollectionModal from "@/components/collections/CollectionModal"
import LoadingDots from "@/components/content/LoadingDots"
import { AssetFull } from "@/lib/types/AssetFull"
import cn from "@/lib/utils/cn"
import { pluralize } from "@/lib/utils/string"
import { addToCollection, removeFromCollection, useCollections, useInCollections, useIsCollectionsLoaded } from "@/stores/collections"
import { useCurrentUser } from "@/stores/currentUser"
import { openModal } from "@/stores/modal"

export type AssetWatchButtonProps = {
  asset: AssetFull
  className?: string
}

export default function AssetCollectionButton({ asset, className }: AssetWatchButtonProps) {
  const currentUser = useCurrentUser()
  const collections = useCollections()
  const inCollections = useInCollections(asset.id)
  const isCollectionsLoaded = useIsCollectionsLoaded()

  const handleNewCollection = () => {
    openModal(<CollectionModal autoAddAsset={asset} />)
  }
  
  return (
    <>
      <Dropdown>
        <DropdownButton
          color="amber"
          className={className}
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
            if (!currentUser) {
              event.preventDefault()
              openModal(<SignInModal text="Sign in to add this asset to a collection" />)
            }
          }}
        >
          <FolderIcon />

          {isCollectionsLoaded ? (
            inCollections.length > 0 ? (
              `In ${inCollections.length} ${pluralize(inCollections.length, "Collection", "Collections")}`
            ) : (
              "Add to Collection"
            )
          ) : (
            "Add to Collection"
          )}
        </DropdownButton>
        <DropdownMenu>
          {!isCollectionsLoaded && (
            <DropdownItem disabled>
              <DropdownLabel>
                Loading<LoadingDots />
              </DropdownLabel>
            </DropdownItem>
          )}
          
          {collections.map((collection) => (
            <DropdownItem
              key={collection.id}
              className={cn(
                "group",
                inCollections.includes(collection.id) && "[&>[data-slot=icon]]:text-lime-500 [&>[data-slot=icon]]:dark:text-lime-500 hover:bg-red-500",
              )}
              onClick={(event) => {
                event.preventDefault()
                inCollections.includes(collection.id) ? removeFromCollection(collection.id, asset.id) : addToCollection(collection.id, asset.id)
              }}
            >
              {inCollections.includes(collection.id) ? (
                <>
                  <CheckIcon className="group-hover:hidden" />
                  <XMarkIcon className="hidden group-hover:inline" />

                  <DropdownLabel>
                    {collection.name}
                  </DropdownLabel>
                </>
              ) : (
                <>
                  <PlusIcon />
                  <DropdownLabel>
                    {collection.name}
                  </DropdownLabel>
                </>
              )}
            </DropdownItem>
          ))}

          {(!isCollectionsLoaded || collections.length > 0) && (
            <DropdownSeparator />
          )}

          <DropdownItem onClick={handleNewCollection}>
            <PlusIcon />
            <DropdownLabel className="font-medium">
              New Collection
            </DropdownLabel>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  )
}
