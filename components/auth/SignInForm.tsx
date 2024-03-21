"use client"

import { ComponentProps, useState } from "react"
import { signIn } from "@/actions/auth"
import { Button } from "@/components/catalyst/button"
import cn from "@/lib/utils/cn"

export type AuthFormProps = ComponentProps<"div">

export default function SignInForm({ className, ...props }: AuthFormProps) {
  const [loading, setLoading] = useState(false)

  const handleSignInClick = async (provider: string) => {
    if (loading) return
    setLoading(true)

    await signIn(provider)
  }

  return (
    <div
      className={cn("space-y-2", className)}
      {...props}
    >
      <Button
        color="dark"
        disabled={loading}
        className="w-full sm:py-3"
        onClick={() => handleSignInClick("github")}
      >
        Sign In with GitHub
      </Button>

      <Button
        color="red"
        disabled={loading}
        className="w-full sm:py-3"
        onClick={() => handleSignInClick("google")}
      >
        Sign In with Google
      </Button>

      {/*<Button*/}
      {/*  color="sky"*/}
      {/*  disabled={loading}*/}
      {/*  className="w-full sm:py-3"*/}
      {/*  onClick={() => handleSignInClick("email")}*/}
      {/*>*/}
      {/*  Sign In with Facebook*/}
      {/*</Button>*/}
    </div>
  )
}
