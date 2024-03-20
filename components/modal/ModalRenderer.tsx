"use client"

import { AnimatePresence } from "framer-motion"
import { useIsOpenModal, useModalComponent } from "@/stores/modal"

export default function ModalRenderer() {
  const isOpen = useIsOpenModal()
  const component = useModalComponent()

  return (
    <AnimatePresence>
      {isOpen && component}
    </AnimatePresence>
  )
}
