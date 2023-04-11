"use client"

import Button, { ButtonProps } from "@/components/form/Button"
import GitHubLogo from "@/components/GitHubLogo"

export type OpenSourceButtonProps = ButtonProps

export default function OpenSourceButton(props: OpenSourceButtonProps) {
  return (
    <Button
      variant="dark"
      size="sm"
      onClick={() => window.open("https://github.com/kodkodpro/unrealengine.directory", "_blank")}
      {...props}
    >
      <GitHubLogo className="mr-1 inline-block h-6 w-6" />
      View on GitHub
    </Button>
  )
}
