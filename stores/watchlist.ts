// import toast from "react-hot-toast"
import { create } from "zustand"
import { ServerAction, ServerActionFn } from "@/actions/serverAction"
import { unwatch, watch } from "@/actions/watchlist"
import { currentUser } from "@/stores/currentUser"

type Action = "add" | "remove"

const ActionToServerAction: Record<Action, ServerActionFn> = {
  add: watch,
  remove: unwatch,
}

const OppositeAction: Record<Action, Action> = {
  add: "remove",
  remove: "add",
}

type WatchlistStore = {
  watchlist: Set<number>
  loaded: boolean

  fetch: () => void
  reset: () => void

  add: (assetId: number) => void
  remove: (assetId: number) => void
  isWatching: (assetId: number) => boolean
  perform: (action: Action, assetId: number) => void
}

const store = create<WatchlistStore>((set, get) => ({
  watchlist: new Set(),
  loaded: false,

  fetch: async () => {
    try {
      const response = await fetch("/api/watchlist")
      const watchlist = await response.json() as Set<number>

      set({ watchlist, loaded: true })
    } catch (error) {
      // captureException(error)
    }
  },

  reset: () => set({ watchlist: new Set(), loaded: false }),

  add: (assetId) => {
    const watchlist = new Set(get().watchlist)
    watchlist.add(assetId)

    set({ watchlist })
  },

  remove: (assetId) => {
    const watchlist = new Set(get().watchlist)
    watchlist.delete(assetId)

    set({ watchlist })
  },

  isWatching: (assetId) => new Set(get().watchlist).has(assetId),

  perform: async (action, assetId) => {
    if (!currentUser()) {
      // openModal(<SignInModal text="You need to sign in to watchlist photos" />)
      return
    }

    get()[action](assetId)
    const rollback = () => get()[OppositeAction[action]](assetId)

    try {
      const actionFn = ActionToServerAction[action]
      const [status, _, errors] = await actionFn(assetId)

      if (status === ServerAction.Failure) {
        rollback()
        // toast.error(getBaseErrorMessage(errors) || "Something went wrong")
      }
    } catch (error) {
      rollback()
      // toast.error("Something went wrong")
    }
  },
}))

export const useIsWatchlistLoaded = () => store((state) => state.loaded)
export const useIsWatching = (assetId: number) => store((state) => state.isWatching(assetId))

export const fetchWatchlist = async () => store.getState().fetch()
export const resetWatchlist = () => store.getState().reset()
export const addToWatchlist = (assetId: number) => store.getState().perform("add", assetId)
export const removeFromWatchlist = (assetId: number) => store.getState().perform("remove", assetId)
