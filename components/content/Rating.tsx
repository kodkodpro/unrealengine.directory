import { StarIcon } from "@heroicons/react/24/solid"
import { pluralize } from "@/utils/helpers/string"

export type RatingProps = {
  score: number
  count: number
}

export default function Rating({ score, count } : RatingProps) {
  return (
    <div>
      <div className="relative mx-auto w-fit">
        {/* Render neutral stars */}
        <div className="mb-1.5 flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-8 w-8 ">
              <StarIcon className="h-full w-full text-neutral-400" />
            </div>
          ))}
        </div>

        {/* Render golden stars above neutral */}
        <div className="absolute left-0 top-0">
          <div className="mb-1.5 flex items-center gap-1 overflow-hidden" style={{ width: score * 20 + "%" }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-8 w-8">
                <StarIcon className="h-8 w-8 text-amber-500" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="flex items-center justify-center gap-1.5">
        <span className="font-semibold">{score.toFixed(2)}</span>
        <span className="inline-block h-1 w-1 rounded-full bg-neutral-400"></span>
        <span className="font-medium text-neutral-300">
          {count} {pluralize(count, "vote", "votes")}
        </span>
      </p>
    </div>
  )
}
