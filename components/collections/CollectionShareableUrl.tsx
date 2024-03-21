import { GlobeAltIcon } from "@heroicons/react/24/outline"
import { Collection } from "@prisma/client"
import { Input } from "@/components/catalyst/input"
import { Strong, Text } from "@/components/catalyst/text"
import cn from "@/lib/utils/cn"
import { getBaseURL } from "@/lib/utils/string"

export type CollectionShareableUrlProps = {
  collection: Collection
  className?: string
}

export default function CollectionShareableUrl({ collection, className }: CollectionShareableUrlProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <Text><Strong>Shareable link</Strong></Text>
      <GlobeAltIcon className="-mt-px inline-block size-6" />

      <Input
        disabled
        value={`${getBaseURL()}/c/${collection.slug}`}
        className="w-96 select-all"
      />
    </div>
  )
}
