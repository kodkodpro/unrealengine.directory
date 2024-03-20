import AuthForm from "@/components/auth/AuthForm"
import { Text } from "@/components/catalyst/text"

export default async function SignInPage() {
  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center">
      <div className="max-w-xs">
        <h1 className="mb-1 text-center text-3xl font-bold">Sign In</h1>
        <Text className="mb-4 text-balance text-center sm:leading-5">
          If you don&apos;t have an account, we&apos;ll create one for you automatically
        </Text>
        <AuthForm />
      </div>
    </div>
  )
}
