"use client"

import { useState } from "react"
import Button from "@/components/form/Button"
import Input from "@/components/form/Input"

export default function Dev() {
  const [apiKey, setApiKey] = useState<string>("")
  const [assetUrl, setAssetUrl] = useState<string>("")

  const [collectionUrl, setCollectionUrl] = useState<string>("")
  const [collectionSkip, setCollectionSkip] = useState<string>("")
  const [collectionTake, setCollectionTake] = useState<string>("")

  const performRequest = async (url: string, data: object = {}) => {
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
    <div className="flex-1 flex flex-col w-full max-w-4xl items-center justify-center gap-4 p-24 mx-auto">
      <Input
        label="API Key"
        value={apiKey}
        onChangeText={setApiKey}
        className="w-full"
      />

      <hr className="border-neutral-800 w-full" />

      <div className="w-full">
        <Input
          label="Parse Collection"
          placeholder="URL"
          value={collectionUrl}
          onChangeText={setCollectionUrl}
          className="mb-2"
        />

        <div className="w-full grid grid-cols-3 gap-2">
          <Input
            placeholder="Skip (optional)"
            type="number"
            value={collectionSkip}
            onChangeText={setCollectionSkip}
          />

          <Input
            placeholder="Limit (optional)"
            type="number"
            value={collectionTake}
            onChangeText={setCollectionTake}
          />

          <Button
            type="button"
            onClick={async () => {
              await performRequest("/api/parse-collection", {
                collectionUrl,
                skip: parseInt(collectionSkip) || undefined,
                take: parseInt(collectionTake) || undefined,
              })
            }}
          >
            Parse Collection
          </Button>
        </div>
      </div>

      <hr className="border-neutral-800 w-full" />

      <div className="w-full">
        <Input
          label="Parse Asset"
          placeholder="URL"
          value={assetUrl}
          onChangeText={setAssetUrl}
          className="mb-2"
        />

        <Button
          type="button"
          className="w-full"
          onClick={() => performRequest("/api/parse-asset", { assetUrl, force: true })}
        >
          Parse Asset
        </Button>
      </div>

      <hr className="border-neutral-800 w-full" />

      <Button
        type="button"
        onClick={() => {
          throw new Error("Test Error")
        }}
      >
        Send test error to Sentry
      </Button>
    </div>
  )
}
