import { useSession } from "next-auth/react"

export default function useCurrentUser() {
  return useSession().data?.user ?? null
}
