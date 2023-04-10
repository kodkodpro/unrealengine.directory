import Waves from "@/components/layout/Waves"

export default function Footer() {
  return (
    <div>
      <Waves wavesColor="fill-neutral-800" bgColor="bg-neutral-900" />

      <div className="py-12 bg-neutral-800">
        <div className="mx-4 md:mx-12 text-sm space-y-0.5">
          <p>
            Created by{" "}
            <a href="mailto:andrew@kodkod.me" className="font-medium text-neutral-100 mt-1 hover:text-neutral-200">
              Andrew Kodkod
            </a>
          </p>
          <p>
            This is an Open Source project &rarr;{" "}
            <a
              href="https://github.com/kodkod-productions/uedirectory.com"
              className="font-medium text-neutral-100 mt-1 hover:text-neutral-200"
            >
              View on GitHub
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
