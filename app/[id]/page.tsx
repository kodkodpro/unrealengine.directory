import { getAsset } from "@/app/[id]/data"

export type AssetPageProps = {
  params: {
    id: string
  }
}

export default async function AssetPage({ params: { id } }: AssetPageProps) {
  const asset = await getAsset(id)

  return (
    <div>
      <pre>{JSON.stringify(asset, null, 2)}</pre>
    </div>
  )
}
