export interface StyledComponentProps {
  as?: any
}

export type CSSPropertiesValueType = number | string

export type DimensionsType =
  | CSSPropertiesValueType
  | { min?: CSSPropertiesValueType; max?: CSSPropertiesValueType }

export type MultiplierType = number

export type MarginValueType = MultiplierType | "auto"

export type ColorType = string[] | string

export type MarginType =
  | [MarginValueType]
  | [MarginValueType, MarginValueType]
  | [MarginValueType, MarginValueType, MarginValueType]
  | [MarginValueType, MarginValueType, MarginValueType, MarginValueType]

export type RefType = { [key: string]: Element }

export interface MarginProps {
  margin?: MarginType
}

export interface PaddingProps {
  padding?: MarginType
}

export interface CursorProps {
  cursor?:
    | "pointer"
    | "default"
    | "grab"
    | "move"
    | "none"
    | "text"
    | "wait"
    | "initial"
    | "inherit"
}

export interface OpacityProps {
  opacity?: "weak" | "medium" | "strong"
}

export interface AlignSelfProps {
  alignSelf?: "end" | "start" | "center" | "stretch"
}

export interface RoundProps {
  round?:
    | boolean
    | MultiplierType
    | {
        side?:
          | "top"
          | "left"
          | "bottom"
          | "right"
          | "top-left"
          | "top-right"
          | "bottom-left"
          | "bottom-right"
        size?: MultiplierType
      }
}

export interface ZIndexProps {
  zIndex?: number
}

export interface PositionProps {
  position?: "static" | "absolute" | "fixed" | "relative" | "sticky" | "initial" | "inherit"
}
