import { User } from "@prisma/client"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

type CurrentUserStore = {
  user: User | null
  setUser: (user: User | null) => void
  
  fetch: () => Promise<void>
  reset: () => void
}

const store = create<CurrentUserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: User | null) => set({ user }),

      fetch: async () => {
        const response = await fetch("/api/users/current")
        const user = await response.json() as User
        set({ user })
      },

      reset: () => set({ user: null }),
    }),
    {
      name: "currentUser",
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export const useCurrentUser = () => store((state) => state.user)
export const setCurrentUser = (user: User | null) => store.getState().setUser(user)

export const currentUser = () => store.getState().user
export const fetchCurrentUser = () => store.getState().fetch()
export const resetCurrentUser = () => store.getState().reset()
