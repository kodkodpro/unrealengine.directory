import { Textarea } from "@/components/catalyst/textarea"
import { Collection } from "@prisma/client"
import { useEffect, useState } from "react"
import { Description, ErrorMessage, Field, FieldGroup, Fieldset, Label } from "@/components/catalyst/fieldset"
import { Input } from "@/components/catalyst/input"
import { Switch, SwitchField } from "@/components/catalyst/switch"
import { Errors } from "@/lib/types"

export type CollectionFormProps = {
  initialData: Partial<Collection>
  errors: Errors
  onChange: (data: Partial<Collection>) => void
}

export default function CollectionForm({ initialData, errors, onChange }: CollectionFormProps) {
  const [name, setName] = useState(initialData.name || "")
  const [isPublic, setIsPublic] = useState(initialData.isPublic || false)
  const [description, setDescription] = useState(initialData.description || "")

  useEffect(() => {
    onChange({ name, isPublic, description })
  }, [name, isPublic, description])

  return (
    <Fieldset>
      <FieldGroup>
        <Field>
          <Label>Name</Label>
          <Input
            value={name}
            invalid={Boolean(errors.name)}
            onChange={(e) => setName(e.target.value)}
          />

          {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
        </Field>

        <Field>
          <Label>Description</Label>
          <Description>
            A brief description of your collection. This will be visible to anyone who can view your collection. You can use Markdown.
          </Description>
          <Textarea
            rows={6}
            value={description}
            invalid={Boolean(errors.description)}
            onChange={(e) => setDescription(e.target.value)}
          />

          {errors.description && <ErrorMessage>{errors.description}</ErrorMessage>}
        </Field>

        <SwitchField>
          <Label>Public</Label>
          <Description>Public collections can be viewed by anyone. Private collections are only visible to you.</Description>
          <Switch
            color="amber"
            checked={isPublic}
            onChange={(checked) => setIsPublic(checked)}
          />

          {errors.isPublic && <ErrorMessage>{errors.isPublic}</ErrorMessage>}
        </SwitchField>
      </FieldGroup>
    </Fieldset>
  )
}
