"use client"

import { pluralize } from "@/utils/helpers/string"
import clsx from "clsx"
import { useState } from "react"
import Select from "@/components/form/Select"


export type AssetsListSortProps = {
  assetsCount: number
} & React.HTMLAttributes<HTMLDivElement>

export default function AssetsListSort({ assetsCount, className, ...props } : AssetsListSortProps) {


  return (
    <div
      className={clsx(
        "flex flex-row items-center gap-2",
        className,
      )}
      {...props}
    >

    </div>
  )
}
