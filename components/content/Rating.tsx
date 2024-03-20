import { StarIcon } from "@heroicons/react/24/solid"
import { ComponentProps } from "react"
import { pluralize } from "@/lib/utils/string"

export type RatingProps = ComponentProps<"div"> & {
  score: number
  count: number
}

export default function Rating({ score, count, ...props }: RatingProps) {
  return (
    <div {...props}>
      <div className="relative mx-auto w-fit">
        {/* Render zinc stars */}
        <div className="mb-1.5 flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="size-8 "
            >
              <StarIcon className="size-full text-zinc-300 dark:text-zinc-700" />
            </div>
          ))}
        </div>

        {/* Render golden stars above zinc */}
        <div className="absolute left-0 top-0">
          <div
            className="mb-1.5 flex items-center gap-1 overflow-hidden"
            style={{ width: score * 20 + "%" }}
          >
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="size-8"
              >
                <StarIcon className="size-8 text-amber-500" />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <p className="flex items-center justify-center gap-1.5">
        <span className="font-semibold">{score.toFixed(2)}</span>
        <span className="inline-block size-1 rounded-full bg-zinc-400" />
        <span className="font-medium text-zinc-500 dark:text-zinc-300">
          {count} {pluralize(count, "vote", "votes")}
        </span>
      </p>
    </div>
  )
}
