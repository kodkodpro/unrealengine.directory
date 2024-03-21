import toast from "react-hot-toast"

export function toastSuccess(message: string) {
  toast.success(message)
}

export function toastError(message: string) {
  toast.error(message)
}
