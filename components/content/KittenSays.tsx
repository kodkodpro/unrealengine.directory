import Image from "next/image"

export type KittenSaysProps = {
  text: string
}

export default function KittenSays({} : KittenSaysProps) {
  return (
    <>
      <Image
        src={`https://placekitten.com/1280/720?image=${Math.round(Math.random() * 15 + 1)}`}
        width={640}
        height={360}
        alt="Picture of a cat"
        className="mx-auto mb-4 rounded bg-neutral-800"
      />

      <p className="text-center text-2xl md:text-3xl xl:text-4xl font-semibold mb-1">
        <span className="text-neutral-600">&ldquo;</span>
        No results found
        <span className="text-neutral-600">&rdquo;</span>
      </p>

      <p className="text-center font-medium text-neutral-300 md:text-lg">
        &mdash; Kitten
      </p>
    </>
  )
}
