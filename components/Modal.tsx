import { LazyMotion, m } from "framer-motion"
import { useHotkeys } from "react-hotkeys-hook"

const loadFeatures = () => import("@/utils/framerFeatures").then((res) => res.default)

export type ModalProps = {
  onClose: () => void
  children: React.ReactNode
}

export default function Modal({ onClose, children } : ModalProps) {
  useHotkeys("esc", onClose)

  return (
    <LazyMotion features={loadFeatures}>
      <div className="relative z-50">
        <m.div
          className="fixed inset-0 bg-neutral-800/75"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center py-8" onClick={onClose}>
            <m.div
              className="w-full max-w-4xl p-8 mx-auto bg-neutral-900 rounded-lg shadow-xl"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={(event) => event.stopPropagation()}
            >
              {children}
            </m.div>
          </div>
        </div>
      </div>
    </LazyMotion>
  )
}
