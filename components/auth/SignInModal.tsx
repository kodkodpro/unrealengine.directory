import { ReactNode } from "react"
import SignInForm from "@/components/auth/SignInForm"
import { Dialog, DialogBody, DialogDescription, DialogTitle } from "@/components/catalyst/dialog"
import { closeModal } from "@/stores/modal"

export type SignInModalProps = {
  text?: ReactNode
}

export default function SignInModal({ text }: SignInModalProps) {
  return (
    <Dialog
      open
      onClose={closeModal}
    >
      <DialogTitle className="text-center sm:text-3xl sm:font-bold">Sign In</DialogTitle>
      <DialogDescription className="text-balance text-center">
        {text && (
          <>
            {text}
            <br />
          </>
        )}

        If you don&apos;t have an account, we&apos;ll create one for you automatically
      </DialogDescription>
      <DialogBody>
        <SignInForm />
      </DialogBody>
    </Dialog>
  )
}
