import Link from "next/link"
import Waves from "@/components/layout/Waves"
import UELogo from "@/components/UELogo"

export default function Header() {
  return (
    <div>
      <div className="py-12 text-center bg-neutral-800">
        <Link
          href="/"
          className="text-4xl font-extrabold tracking-tighter text-white hover:text-neutral-100"
        >
          <UELogo className="w-12 h-12 inline-block mx-auto mb-4" />
          <br />
          Unreal Engine Directory
        </Link>
        <p className="font-medium text-neutral-300 mt-1">
          Like Unreal Engine Marketplace, but better
        </p>
      </div>

      <Waves wavesColor="fill-neutral-800" bgColor="bg-neutral-900" flip />
    </div>
  )
}
