import { redirect } from "next/navigation"
import { ComponentProps } from "react"
import { Button } from "@/components/catalyst/button"
import { auth, signIn } from "@/lib/auth"
import { cn } from "@/lib/utils/cn"

export type AuthFormProps = ComponentProps<"div">

export default async function AuthForm({ className, ...props }: AuthFormProps) {
  const session = await auth()
  if (session) redirect("/")

  return (
    <div
      className={cn("space-y-2 w-full max-w-xs", className)}
      {...props}
    >
      <form
        action={async () => {
          "use server"
          await signIn("github")
        }}
      >
        <Button
          type="submit"
          className="w-full justify-start sm:px-3 sm:py-2"
        >
          Sign In with GitHub
        </Button>
      </form>

      <form
        action={async () => {
          "use server"
          await signIn("google")
        }}
      >
        <Button
          type="submit"
          className="w-full justify-start sm:px-3 sm:py-2"
        >
          Sign In with Google
        </Button>
      </form>

      <form
        action={async () => {
          "use server"
          await signIn("facebook")
        }}
      >
        <Button
          type="submit"
          className="w-full justify-start sm:px-3 sm:py-2"
        >
          Sign In with Facebook
        </Button>
      </form>
    </div>
  )
}
