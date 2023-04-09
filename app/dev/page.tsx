"use client"

import { useState } from "react"
import Button from "@/components/form/Button"
import Input from "@/components/form/Input"

export default function Dev() {
  const [collectionUrl, setCollectionUrl] = useState<string>("")

  const performRequest = async (url: string, data: any = {}) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      console.error(response)
      return
    }

    const result = await response.json()
    console.log(result)
  }

  return (
    <div className="flex flex-col h-screen items-center justify-center gap-8 p-24">
      <Button
        type="button"
        onClick={() => performRequest("/api/parse-categories")}
      >
        Parse Categories
      </Button>

      <div className="flex flex-row gap-2">
        <Input
          value={collectionUrl}
          onChangeText={setCollectionUrl}
        />

        <Button
          type="button"
          onClick={() => performRequest("/api/parse-collection", { collectionUrl })}
        >
          Parse Collection
        </Button>
      </div>
    </div>
  )
}
