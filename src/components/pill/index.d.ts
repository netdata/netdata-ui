import { FC, ReactNode, SyntheticEvent } from "react"
import {
  MarginProps,
  ColorType,
  PaddingProps,
  PositionProps,
  RoundProps,
  RefType,
} from "@/mixins/types"
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
export type PillDot = boolean | "filled" | "hollow" | "dashed" | "bar"
export type PillSize = "default" | "large" | "normal" | "small"

type OnClickType = (e: SyntheticEvent<HTMLButtonElement>) => void

export interface PillProps
  extends HeightProps, MarginProps, PaddingProps, PositionProps, RoundProps, WidthProps {
  appearance?: "subtle"
  background?: ColorType
  borderColor?: ColorType
  color?: ColorType
  "data-testid"?: string
  dot?: PillDot
  filled?: boolean
  flavour?: PillFlavour
  hollow?: boolean
  monospace?: boolean
  fontSize?: number | string
  fontWeight?: number | string
  lineHeight?: number | string
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
  wrapChildren?: boolean
  tiny?: boolean
  [s: string]: any
}

export interface StatusDotProps {
  color?: ColorType
  "data-testid"?: string
  dot?: PillDot
  size?: number
  tone?: PillFlavour
  [s: string]: any
}

export interface StatusWordProps extends AlignItemsProps, FlexibleProps {
  dotSize?: number
  children?: ReactNode
  color?: ColorType
  "data-testid"?: string
  detail?: ReactNode
  detailColor?: ColorType
  dot?: PillDot
  tone?: PillFlavour
  size?: "default" | "small"
  strong?: boolean
  [s: string]: any
}

export interface MarkCount {
  color?: ColorType
  dotSize?: number
  count: ReactNode
  dot?: "filled" | "hollow" | "dashed" | "bar"
  label: string
  tone?: PillFlavour
}

export interface MarkCountsProps extends MarginProps {
  counts: MarkCount[]
  "data-testid"?: string
  [s: string]: any
}

declare const Pill: FC<PillProps>
declare const StatusDot: FC<StatusDotProps>
declare const StatusWord: FC<StatusWordProps>
declare const MarkCounts: FC<MarkCountsProps>

export { Pill, StatusDot, StatusWord, MarkCounts }

export default Pill
