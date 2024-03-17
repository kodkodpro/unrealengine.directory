import Waves from "@/components/layout/Waves"

export default function Footer() {
  return (
    <div>
      <Waves wavesColor="fill-neutral-800" bgColor="bg-neutral-900" />

      <div className="bg-neutral-800 py-12">
        <div className="mx-4 space-y-1 text-sm md:mx-12">
          <p>
            Created by{" "}
            <a
              href="mailto:andrew@kodkod.me"
              className="font-semibold text-white hover:text-neutral-100 hover:underline"
            >
              Andrew Kodkod
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
