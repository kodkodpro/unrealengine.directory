import { XMarkIcon } from "@heroicons/react/24/solid"
import clsx from "clsx"
import { LazyMotion, m } from "framer-motion"
import { useHotkeys } from "react-hotkeys-hook"

const loadFeatures = () => import("@/utils/framerFeatures").then((res) => res.default)

export type ModalProps = {
  title?: string
  wide?: boolean
  onClose: () => void
  children: React.ReactNode
}

export default function Modal({ title, wide, onClose, children } : ModalProps) {
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
          <div
            className={clsx(
              "flex min-h-full items-center justify-center",
              wide ? "xl:py-8" : "md:py-8",
            )}
            onClick={onClose}
          >
            <m.div
              className={clsx(
                "mx-auto w-full bg-neutral-900 p-8 shadow-xl xl:p-12",
                wide ? "max-w-7xl xl:rounded-lg" : "max-w-3xl md:rounded-lg",
              )}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={(event) => event.stopPropagation()}
            >
              {title && (
                <div className="mb-4 flex items-center justify-between gap-4">
                  <h3 className="text-3xl font-semibold tracking-tighter">
                    {title}
                  </h3>
                  <button
                    className={clsx(
                      "text-neutral-400 transition-colors duration-200 hover:bg-neutral-800 hover:text-neutral-100",
                      "rounded-md p-2",
                    )}
                    onClick={onClose}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
              )}

              {children}
            </m.div>
          </div>
        </div>
      </div>
    </LazyMotion>
  )
}
