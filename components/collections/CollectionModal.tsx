"use client"

import { Collection } from "@prisma/client"
import { useState } from "react"
import { createCollection, updateCollection } from "@/actions/collections"
import { ServerAction } from "@/actions/serverAction"
import { Button } from "@/components/catalyst/button"
import { Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle } from "@/components/catalyst/dialog"
import { Strong, Text } from "@/components/catalyst/text"
import CollectionForm from "@/components/collections/CollectionForm"
import CollectionShareableUrl from "@/components/collections/CollectionShareableUrl"
import { Errors } from "@/lib/types"
import { AssetFull } from "@/lib/types/AssetFull"
import { addToCollection, fetchCollections } from "@/stores/collections"
import { closeModal } from "@/stores/modal"

export type CollectionModalProps = {
  collection?: Collection
  autoAddAsset?: AssetFull
}

export default function CollectionModal({ collection, autoAddAsset }: CollectionModalProps) {
  const createMode = !collection

  const [data, setData] = useState<Partial<Collection>>({ ...collection })
  const [errors, setErrors] = useState<Errors>({})
  const [loading, setLoading] = useState(false)
  const [newCollection, setNewCollection] = useState<Collection | null>(null)
  
  const handleSubmit = async () => {
    if (loading) return

    setLoading(true)
    setErrors({})
    
    try {
      const [status, newCollection, errors] = createMode
        ? await createCollection(data)
        : await updateCollection(collection.id, data)

      if (status === ServerAction.Failure) {
        setErrors(errors)
        return
      }

      setNewCollection(newCollection)
      await fetchCollections()

      if (autoAddAsset) {
        await addToCollection(newCollection.id, autoAddAsset.id)
      }
    } finally {
      setLoading(false)
    }
  }
  
  if (newCollection) {
    return (
      <Dialog
        open
        onClose={closeModal}
      >
        <DialogTitle>
          {createMode ? "Collection Created" : "Collection Updated"}
        </DialogTitle>
        <DialogDescription>
          {createMode ? "Your collection has been created" : "Your collection has been updated"}
        </DialogDescription>
        {(newCollection.isPublic || autoAddAsset) && (
          <DialogBody>
            {autoAddAsset && (
              <Text>
                The asset{" "}
                <Strong>{autoAddAsset.name}</Strong>{" "}
                has been automatically added to the collection.
              </Text>
            )}

            {newCollection.isPublic && (
              <CollectionShareableUrl collection={newCollection} />
            )}
          </DialogBody>
        )}
        <DialogActions>
          <Button onClick={closeModal}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  return (
    <Dialog
      open
      onClose={closeModal}
    >
      <DialogTitle>
        {createMode ? "New Collection" : "Edit Collection"}
      </DialogTitle>
      {createMode && (
        <DialogDescription>
          You can add assets to collections to organize them. Share collections with friends or keep them private.
        </DialogDescription>
      )}
      <DialogBody>
        <CollectionForm
          initialData={data}
          errors={errors}
          onChange={setData}
        />
      </DialogBody>
      <DialogActions>
        <Button
          plain
          disabled={loading}
          onClick={closeModal}
        >
          Cancel
        </Button>

        <Button
          disabled={loading}
          onClick={handleSubmit}
        >
          {createMode ? "Create" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
