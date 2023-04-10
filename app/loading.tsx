import LoadingDots from "@/components/content/LoadingDots"

export default function Loading() {
  return (
    <div className="flex items-center justify-center flex-1">
      <p className="font-medium">
        Loading your fantastic experience<LoadingDots />
      </p>
    </div>
  )
}
