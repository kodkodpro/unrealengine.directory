import { notFound } from "next/navigation"
import AssetCardFull from "@/components/assets/AssetCardFull"
import { getAsset } from "@/lib/db/assets"

type AssetPageProps = {
  params: {
    id: string
  }
}

export default async function AssetPage({ params: { id } }: AssetPageProps) {
  const asset = await getAsset(id)
  if (!asset) return notFound()

  return (
    <div className="p-8">
      <AssetCardFull asset={asset} />
    </div>
  )
}
