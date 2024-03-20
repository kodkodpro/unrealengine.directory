import { redirect } from "next/navigation"
import { signOut } from "@/lib/auth"

export default async function SignOutPage() {
  await signOut()
  return redirect("/")
}
