import { MultiplierType, ColorType, DimensionsType } from "../../../mixins/types"

export interface AlignContentProps {
  alignContent?: "start" | "center" | "end" | "between" | "around" | "stretch"
}

export interface AlignItemsProps {
  alignItems?: "start" | "center" | "end" | "baseline" | "stretch"
}

type BorderSizeType = "all" | "horizontal" | "vertical" | "top" | "right" | "bottom" | "left"

export interface BorderProps {
  border?:
    | boolean
    | BorderSizeType
    | { side: BorderSizeType; color?: ColorType; size?: DimensionsType; type?: string }
}

export interface DirectionProps {
  column?: boolean
  columnReverse?: boolean
  rowReverse?: boolean
}

export interface FlexibleProps {
  flex?: boolean | number | "grow" | "shrink" | { grow: string | number; shrink: string | number }
  basis?: string
}

export interface GapProps {
  gap?: MultiplierType
  column?: boolean
  columnReverse?: boolean
}

export interface HeightProps {
  height?: DimensionsType
}

export interface JustifyContentProps {
  justifyContent?: "start" | "center" | "end" | "between" | "evenly" | "around" | "stretch"
}

export interface OverflowProps {
  overflow?: string | { vertical?: string; horizontal?: string }
}

export interface WidthProps {
  width?: DimensionsType
}

export interface WrapProps {
  flexWrap?: boolean | "reverse"
}
