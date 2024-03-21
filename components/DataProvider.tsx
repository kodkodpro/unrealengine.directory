import { useSession } from "next-auth/react"
import { ReactNode, useEffect } from "react"
import { fetchCollections, resetCollections } from "@/stores/collections"
import { fetchCurrentUser, resetCurrentUser } from "@/stores/currentUser"

export type DataProviderProps = {
  children: ReactNode
}

export default function DataProvider({ children }: DataProviderProps) {
  const session = useSession()

  useEffect(() => {
    if (session.status === "authenticated") {
      fetchCurrentUser()
      fetchCollections()
    } else if (session.status === "unauthenticated") {
      resetCurrentUser()
      resetCollections()
    }
  }, [session.status])
  
  return children
}
