import { FC, SyntheticEvent } from "react"
import { MarginProps, PaddingProps, PositionProps, RoundProps, RefType } from "@/mixins/types"
import { HeightProps, WidthProps } from "@/components/templates/mixins"

export type PillFlavour = "error" | "neutral" | "success" | "warning"
export type PillSize = "default" | "large" | "normal" | "small"

type OnClickType = (e: SyntheticEvent<HTMLButtonElement>) => void

export interface PillProps
  extends HeightProps,
    MarginProps,
    PaddingProps,
    PositionProps,
    RoundProps,
    WidthProps {
  background?: string
  borderColor?: string
  color?: string
  "data-testid"?: string
  flavour?: PillFlavour
  hollow?: boolean
  icon?: string
  iconSize?: string
  normal?: boolean
  onClick?: OnClickType
  ref?: RefType
  reverse?: boolean
  size?: PillSize
  textSize?: PillSize
  tiny?: boolean
  [s: string]: any
}

declare const Pill: FC<PillProps>

export { Pill }

export default Pill
