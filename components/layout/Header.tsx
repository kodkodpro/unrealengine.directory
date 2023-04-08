import Link from "next/link"

export default function Header() {
  return (
    <div className="py-12 text-center">
      <Link
        href="/"
        className="text-4xl font-extrabold tracking-tighter"
      >
        Unreal Engine Directory

        <sup className="ml-1 inline-block -translate-y-2 rounded bg-blue-500 px-1.5 py-0.5 text-sm tracking-normal text-neutral-100">
          BETA
        </sup>
      </Link>
    </div>
  )
}
