"use client"

import { useState } from "react"
import Button from "@/components/form/Button"
import Input from "@/components/form/Input"

export default function Dev() {
  const [apiKey, setApiKey] = useState<string>("")
  const [assetUrl, setAssetUrl] = useState<string>("")
  const [collectionUrl, setCollectionUrl] = useState<string>("")

  const performRequest = async (url: string, data: any = {}) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      console.error(response)

      try {
        console.error(await response.json())
      } catch (err) {
        console.error(await response.text())
      }

      return
    }

    const result = await response.json()
    console.log(result)
  }

  return (
    <div className="flex-1 flex flex-col w-full max-w-3xlitems-center justify-center gap-4 p-24 mx-auto">
      <Input
        label="API Key"
        value={apiKey}
        onChangeText={setApiKey}
        className="w-full"
      />

      <hr className="border-neutral-800 w-full" />

      <div className="w-full grid grid-cols-3 gap-2">
        <Input
          placeholder="URL"
          value={collectionUrl}
          onChangeText={setCollectionUrl}
          className="col-span-2"
        />

        <Button
          type="button"
          onClick={() => performRequest("/api/parse-collection", { collectionUrl })}
        >
          Parse Collection
        </Button>
      </div>

      <div className="w-full grid grid-cols-3 gap-2">
        <Input
          placeholder="URL"
          value={assetUrl}
          onChangeText={setAssetUrl}
          className="col-span-2"
        />

        <Button
          type="button"
          onClick={() => performRequest("/api/parse-asset", { assetUrl })}
        >
          Parse Asset
        </Button>
      </div>
    </div>
  )
}
