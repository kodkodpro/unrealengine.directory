import LoadingDots from "@/components/content/LoadingDots"

export default function Loading() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <p className="font-medium">
        Loading your fantastic experience<LoadingDots />
      </p>
    </div>
  )
}
