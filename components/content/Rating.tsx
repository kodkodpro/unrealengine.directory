import { StarIcon } from "@heroicons/react/24/solid"
import { pluralize } from "@/utils/helpers/string"

export type RatingProps = {
  score: number
  count: number
}

export default function Rating({ score, count } : RatingProps) {
  return (
    <div>
      <div className="relative w-fit mx-auto">
        {/* Render neutral stars */}
        <div className="flex items-center gap-1 mb-1.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-8 w-8 ">
              <StarIcon className="w-full h-full text-neutral-400" />
            </div>
          ))}
        </div>

        {/* Render golden stars above neutral */}
        <div className="absolute top-0 left-0">
          <div className="flex items-center gap-1 mb-1.5 overflow-hidden" style={{ width: score * 20 + "%" }}>
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
        <span className="w-1 h-1 bg-neutral-400 rounded-full inline-block"></span>
        <span className="font-medium text-neutral-300">
          {count} {pluralize(count, "vote", "votes")}
        </span>
      </p>
    </div>
  )
}
