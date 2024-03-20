import { ReactNode, useEffect } from "react"
import useCurrentUser from "@/hooks/useCurrentUser"
import { setCurrentUser } from "@/stores/currentUser"
import { fetchWatchlist, resetWatchlist } from "@/stores/watchlist"

export type DataProviderProps = {
  children: ReactNode
}

export default function DataProvider({ children }: DataProviderProps) {
  const currentUser = useCurrentUser()

  useEffect(() => {
    if (currentUser) {
      setCurrentUser(currentUser)
      fetchWatchlist()
    } else {
      setCurrentUser(null)
      resetWatchlist()
    }
  }, [currentUser?.email])
  
  return children
}
