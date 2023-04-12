"use client"

import { useState } from "react"
import Button from "@/components/form/Button"
import Input from "@/components/form/Input"

export default function Dev() {
  const [apiKey, setApiKey] = useState("")
  const [assetUrlOrEpicId, setAssetUrlOrEpicId] = useState("")

  const [collectionUrl, setCollectionUrl] = useState("")
  const [collectionSkip, setCollectionSkip] = useState("")
  const [collectionTake, setCollectionTake] = useState("")

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
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center gap-4 p-24">
      <Input
        label="API Key"
        value={apiKey}
        onChangeText={setApiKey}
        className="w-full"
      />

      <hr className="w-full border-neutral-800" />

      <div className="w-full">
        <Input
          label="Parse Collection"
          placeholder="URL"
          value={collectionUrl}
          onChangeText={setCollectionUrl}
          className="mb-2"
        />

        <div className="grid w-full grid-cols-3 gap-2">
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

      <hr className="w-full border-neutral-800" />

      <div className="w-full">
        <Input
          label="Parse Asset"
          placeholder="URL"
          value={assetUrlOrEpicId}
          onChangeText={setAssetUrlOrEpicId}
          className="mb-2"
        />

        <Button
          type="button"
          className="w-full"
          onClick={() => performRequest("/api/parse-asset", { assetUrlOrEpicId, force: true })}
        >
          Parse Asset
        </Button>
      </div>

      <hr className="w-full border-neutral-800" />

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
