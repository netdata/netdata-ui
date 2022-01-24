import { FC } from "react"

export type PillFlavour = "error" | "neutral" | "success" | "warning"
export type PillSize = "default" | "large" | "normal" | "small"

export interface PillProps {
  background?: string
  color?: string
  flavour?: PillFlavour
  hollow?: boolean
  icon?: string
  iconSize?: string
  normal?: boolean
  reverse?: boolean
  size?: PillSize
  textSize?: PillSize
  tiny?: boolean
  [s: string]: any
}

declare const Pill: FC<PillProps>

export { Pill }

export default Pill
