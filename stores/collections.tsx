import { Collection } from "@prisma/client"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import * as serverActions from "@/actions/collections"
import { ServerAction, ServerActionFn } from "@/actions/serverAction"
import SignInModal from "@/components/auth/SignInModal"
import { getBaseErrorMessage } from "@/lib/utils/error"
import { toastError } from "@/lib/utils/toast"
import { currentUser } from "@/stores/currentUser"
import { openModal } from "./modal"

type Action = "add" | "remove"
type Collections = Record<number, number[]>

const ActionToServerAction: Record<Action, ServerActionFn> = {
  add: serverActions.addToCollection,
  remove: serverActions.removeFromCollection,
}

const OppositeAction: Record<Action, Action> = {
  add: "remove",
  remove: "add",
}

type CollectionsStore = {
  collections: Collection[]
  collectionMap: Collections
  loaded: boolean

  fetch: () => void
  reset: () => void

  add: (collectionId: number, assetId: number) => void
  remove: (collectionId: number, assetId: number) => void
  inCollections: (assetId: number) => number[]
  perform: (action: Action, collectionId: number, assetId: number) => Promise<void>
}

const store = create<CollectionsStore>()(
  persist(
    (set, get) => ({
      collections: [],
      collectionMap: {},
      loaded: false,

      fetch: async () => {
        try {
          const [collections, collectionMap] = await Promise.all([
            fetch("/api/collections").then((res) => res.json()),
            fetch("/api/collections/map").then((res) => res.json()),
          ])

          set({
            collections: collections as Collection[],
            collectionMap: collectionMap as Collections,
            loaded: true,
          })
        } catch (error) {
          // captureException(error)
        }
      },

      reset: () => set({ collectionMap: {}, loaded: false }),

      add: (collectionId, assetId) => {
        const collectionMap = get().collectionMap
        collectionMap[collectionId] ||= []
        collectionMap[collectionId].push(assetId)

        set({ collectionMap })
      },

      remove: (collectionId, assetId) => {
        const collectionMap = get().collectionMap
        if (!collectionMap[collectionId]) return

        collectionMap[collectionId] = collectionMap[collectionId].filter((id) => id !== assetId)

        set({ collectionMap })
      },

      inCollections: (assetId) => {
        const collectionMap = get().collectionMap

        return Object.entries(collectionMap)
          .filter(([_, collection]) => collection.includes(assetId))
          .map(([collectionId]) => Number(collectionId))
      },

      perform: async (action, collectionId, assetId) => {
        if (!currentUser()) {
          openModal(<SignInModal text="You need to sign in to add assets to collections" />)
          return
        }

        get()[action](collectionId, assetId)
        const rollback = () => get()[OppositeAction[action]](collectionId, assetId)

        try {
          const actionFn = ActionToServerAction[action]
          const [status, _, errors] = await actionFn(collectionId, assetId)

          if (status === ServerAction.Failure) {
            rollback()
            toastError(getBaseErrorMessage(errors) || "Something went wrong")
          }
        } catch (error) {
          rollback()
          toastError("Something went wrong")
        }
      },
    }),
    {
      name: "collections",
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export const useIsCollectionsLoaded = () => store((state) => state.loaded)
export const useCollections = () => store((state) => state.collections)
export const useInCollections = (assetId: number) => store((state) => state.inCollections(assetId))

export const fetchCollections = async () => store.getState().fetch()
export const resetCollections = () => store.getState().reset()
export const addToCollection = (collectionId: number, assetId: number) => store.getState().perform("add", collectionId, assetId)
export const removeFromCollection = (collectionId: number, assetId: number) => store.getState().perform("remove", collectionId, assetId)
