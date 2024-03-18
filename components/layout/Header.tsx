import Link from "next/link"
import Waves from "@/components/layout/Waves"
import UnrealEngineLogo from "@/components/UnrealEngineLogo"

export default function Header() {
  return (
    <div className="relative">
      <div className="bg-neutral-800 py-12 text-center">
        <Link
          href="/"
          className="text-4xl font-extrabold tracking-tighter text-white hover:text-neutral-100"
        >
          <UnrealEngineLogo className="mx-auto mb-4 inline-block h-12 w-12" />
          <br />
          Unreal Engine Directory
        </Link>
        <p className="mt-1 font-medium text-neutral-300">
          Like Unreal Engine Marketplace, but just a bit better
        </p>
      </div>

      <Waves wavesColor="fill-neutral-800" bgColor="bg-neutral-900" flip />
    </div>
  )
}
