import { BackgroundColor, FillColor } from "@/types/Tailwind"

export type WavesProps = {
  wavesColor: FillColor,
  bgColor: BackgroundColor,
  flip?: boolean,
}

export default function Waves({ wavesColor, bgColor, flip = false } : WavesProps) {
  return (
    <svg
      className={`relative h-[36px] w-full md:h-[72px] ${wavesColor} ${bgColor} ${flip && "rotate-180"}`}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 24 144 28"
      preserveAspectRatio="none"
      shapeRendering="auto"
    >
      <defs>
        <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"/>
      </defs>
      <g className="parallax">
        <use xlinkHref="#gentle-wave" x="48" y="0"/>
        <use xlinkHref="#gentle-wave" x="48" y="3"/>
        <use xlinkHref="#gentle-wave" x="48" y="5"/>
        <use xlinkHref="#gentle-wave" x="48" y="7"/>
      </g>
    </svg>
  )
}
