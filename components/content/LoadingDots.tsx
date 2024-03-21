import { ComponentProps } from "react"

export type LoadingDotsProps = ComponentProps<"span">

export default function LoadingDots(props: LoadingDotsProps) {
  return (
    <span {...props}>
      <span className="animate-ping">.</span>
      <span
        className="animate-ping"
        style={{ animationDelay: "100ms" }}
      >.</span>
      <span
        className="animate-ping"
        style={{ animationDelay: "200ms" }}
      >.</span>
    </span>
  )
}
