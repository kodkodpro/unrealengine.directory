"use client"

import clsx from "clsx"


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
