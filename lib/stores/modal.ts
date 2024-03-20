import { ReactNode } from "react"
import { create } from "zustand"

type ModalStore = {
  isOpen: boolean
  component: ReactNode

  open: (component: ReactNode) => void
  close: () => void
}

const store = create<ModalStore>((set) => ({
  isOpen: false,
  component: null,

  open: (component: ReactNode) => set({ isOpen: true, component }),
  close: () => set({ isOpen: false, component: null }),
}))

export const useIsOpenModal = () => store((state) => state.isOpen)
export const useModalComponent = () => store((state) => state.component)

export const openModal = (component: ReactNode) => store.getState().open(component)
export const closeModal = () => store.getState().close()
