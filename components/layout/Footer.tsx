import Waves from "@/components/layout/Waves"

export default function Footer() {
  return (
    <div>
      <Waves wavesColor="fill-neutral-800" bgColor="bg-neutral-900" />

      <div className="py-12 bg-neutral-800">
        <div className="mx-4 md:mx-12 text-sm space-y-1">
          <p>
            Created by{" "}
            <a
              href="mailto:andrew@kodkod.me"
              className="font-semibold text-white hover:text-neutral-100 hover:underline"
            >
              Andrew Kodkod
            </a>
            {" "}as an Open Source project &rarr;{" "}
            <a
              href="https://github.com/kodkod-productions/uedirectory.com"
              className="font-semibold text-white hover:text-neutral-100 hover:underline"
            >
              View on GitHub
            </a>
          </p>
          <p>
            This website is not affiliated with the Epic Games Store or Epic Games, Inc.
          </p>
        </div>
      </div>
    </div>
  )
}
