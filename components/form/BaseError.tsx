import { ErrorMessage } from "@/components/catalyst/fieldset"
import { Errors } from "@/lib/types"

export type BaseErrorProps = {
  errors: Errors
}

export default function BaseError({ errors }: BaseErrorProps) {
  const { base } = errors
  if (!base) return null

  return (
    <ErrorMessage>{base}</ErrorMessage>
  )
}
