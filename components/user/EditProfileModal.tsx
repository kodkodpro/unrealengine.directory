import { User } from "@prisma/client"
import { useState } from "react"
import { ServerAction } from "@/actions/serverAction"
import { updateUser } from "@/actions/users"
import { Button } from "@/components/catalyst/button"
import { Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle } from "@/components/catalyst/dialog"
import { Description, ErrorMessage, Field, FieldGroup, Fieldset, Label } from "@/components/catalyst/fieldset"
import { Input } from "@/components/catalyst/input"
import { Textarea } from "@/components/catalyst/textarea"
import BaseError from "@/components/form/BaseError"
import { Errors } from "@/lib/types"
import { setCurrentUser } from "@/stores/currentUser"
import { closeModal } from "@/stores/modal"

export type EditProfileModalProps = {
  user: User
}

export default function EditProfileModal({ user }: EditProfileModalProps) {
  const [name, setName] = useState(user.name ?? "")
  const [bio, setBio] = useState(user.bio ?? "")

  const [errors, setErrors] = useState<Errors>({})
  const [loading, setLoading] = useState(false)
  const [updatedUser, setUpdatedUser] = useState<User | null>(null)

  const handleSubmit = async () => {
    if (loading) return

    setLoading(true)
    setErrors({})

    try {
      const [status, updatedUser, errors] = await updateUser(user.id, { name, bio })

      if (status === ServerAction.Failure) {
        setErrors(errors)
        return
      }

      setUpdatedUser(updatedUser)
      setCurrentUser(updatedUser)
    } finally {
      setLoading(false)
    }
  }
  
  if (updatedUser) {
    return (
      <Dialog
        open
        onClose={closeModal}
      >
        <DialogTitle>Profile Updated</DialogTitle>
        <DialogDescription>Your profile has been updated</DialogDescription>
        <DialogActions>
          <Button onClick={closeModal}>Close</Button>
        </DialogActions>
      </Dialog>
    )
  }

  return (
    <Dialog
      open
      onClose={closeModal}
    >
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogDescription>Update your profile information</DialogDescription>
      <DialogBody>
        <Fieldset>
          <FieldGroup>
            <BaseError errors={errors} />

            <Field>
              <Label>Name</Label>
              <Input
                name="name"
                value={name}
                invalid={!!errors.name}
                onChange={(e) => setName(e.target.value)}
              />

              {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
            </Field>

            <Field>
              <Label>Bio</Label>
              <Description>This will be shown on your public collection pages. You can use Markdown.</Description>
              <Textarea
                rows={6}
                value={bio}
                invalid={!!errors.bio}
                onChange={(e) => setBio(e.target.value)}
              />
              
              {errors.bio && <ErrorMessage>{errors.bio}</ErrorMessage>}
            </Field>
          </FieldGroup>
        </Fieldset>
      </DialogBody>
      <DialogActions>
        <Button
          plain
          disabled={loading}
          onClick={closeModal}
        >
          Cancel
        </Button>
        <Button
          disabled={loading}
          onClick={handleSubmit}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}
