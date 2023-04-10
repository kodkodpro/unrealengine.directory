type ColorsWithShades =
  | "slate" | "gray" | "zinc" | "neutral" | "red" | "orange"
  | "yellow" | "lime" | "green" | "teal" | "cyan" | "sky"
  | "blue" | "indigo" | "violet" | "purple" | "fuchsia" | "pink" | "rose"

type Shades = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950

type Color = `${ColorsWithShades}-${Shades}` | "white" | "black" | "transparent"

export type TextColor = `text-${Color}`
export type FillColor = `fill-${Color}`
export type BackgroundColor = `bg-${Color}`

