"use client"

import { Collection } from "@prisma/client"
import { Button } from "@/components/catalyst/button"
import CollectionModal from "@/components/collections/CollectionModal"
import { openModal } from "@/stores/modal"

export type ManageCollectionButtonProps = {
  collection: Collection
}

export default function ManageCollectionButton({ collection }: ManageCollectionButtonProps) {
  const handleClick = () => {
    openModal(<CollectionModal collection={collection} />)
  }

  return (
    <Button
      outline
      onClick={handleClick}
    >
      Manage Collection
    </Button>
  )
}
