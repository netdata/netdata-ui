import { FC, ReactNode, SyntheticEvent } from "react"
import { MarginProps, PaddingProps, PositionProps, RoundProps, RefType } from "@/mixins/types"
import {
  AlignItemsProps,
  FlexibleProps,
  HeightProps,
  WidthProps,
} from "@/components/templates/mixins"

export type PillFlavour =
  | "error"
  | "critical"
  | "neutral"
  | "success"
  | "clear"
  | "warning"
  | "stale"
  | "muted"
  | "idleClear"
  | "idleError"
  | "idleWarning"
export type PillDot = boolean | "filled" | "hollow"
export type PillSize = "default" | "large" | "normal" | "small"

type OnClickType = (e: SyntheticEvent<HTMLButtonElement>) => void

export interface PillProps
  extends HeightProps, MarginProps, PaddingProps, PositionProps, RoundProps, WidthProps {
  background?: string
  borderColor?: string
  color?: string
  "data-testid"?: string
  dot?: PillDot
  filled?: boolean
  flavour?: PillFlavour
  hollow?: boolean
  icon?: string
  iconSize?: string
  normal?: boolean
  onClick?: OnClickType
  ref?: RefType
  reverse?: boolean
  semi?: boolean
  size?: PillSize
  textSize?: PillSize
  textProps?: { [s: string]: any }
  tiny?: boolean
  [s: string]: any
}

export interface StatusWordProps extends AlignItemsProps, FlexibleProps {
  children?: ReactNode
  color?: string
  "data-testid"?: string
  detail?: ReactNode
  dot?: "filled" | "hollow"
  tone?: PillFlavour
  [s: string]: any
}

export interface MarkCount {
  count: ReactNode
  dot?: "filled" | "hollow"
  label: string
  tone?: PillFlavour
}

export interface MarkCountsProps {
  counts: MarkCount[]
  "data-testid"?: string
  [s: string]: any
}

declare const Pill: FC<PillProps>
declare const StatusWord: FC<StatusWordProps>
declare const MarkCounts: FC<MarkCountsProps>

export { Pill, StatusWord, MarkCounts }

export default Pill
