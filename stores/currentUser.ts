import { User } from "next-auth"
import { create } from "zustand"

type CurrentUserStore = {
  user: User | null
  setUser: (user: User | null) => void
}

const store = create<CurrentUserStore>((set) => ({
  user: null,
  setUser: (user: User | null) => set({ user }),
}))

export const currentUser = () => store.getState().user
export const useCurrentUser = () => store((state) => state.user)
export const setCurrentUser = (user: User | null) => store.getState().setUser(user)
