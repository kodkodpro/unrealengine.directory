import { redirect } from "next/navigation"
import SignInForm from "@/components/auth/SignInForm"
import { Text } from "@/components/catalyst/text"
import { auth } from "@/lib/auth"

export default async function SignInPage() {
  const session = await auth()
  if (session) redirect("/")
  
  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center">
      <div className="max-w-xs">
        <h1 className="mb-2 text-center text-3xl font-bold tracking-tighter">Sign In</h1>
        <Text className="mb-4 text-balance text-center sm:leading-5">
          If you don&apos;t have an account, we&apos;ll create one for you automatically
        </Text>
        <SignInForm />
      </div>
    </div>
  )
}
