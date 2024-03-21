import { ChevronDownIcon } from "@heroicons/react/16/solid"
import { Collection } from "@prisma/client"
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from "@/components/catalyst/dropdown"

export type CollectionNavProps = {
  collections: Collection[]
  currentCollectionId: string
}

export default function CollectionNav({ collections, currentCollectionId }: CollectionNavProps) {
  const currentCollection = collections.find((collection) => collection.id === currentCollectionId)!
  
  return (
    <Dropdown>
      <DropdownButton outline>
        {currentCollection.name}
        <ChevronDownIcon />
      </DropdownButton>
      <DropdownMenu>
        {collections.map((collection) => (
          <DropdownItem
            key={collection.id}
            href={`/collections/${collection.id}`}
          >
            {collection.name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}
