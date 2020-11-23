import { CSSProperties } from "react"

export interface StyledComponentProps {
  as?: any
}

export type DimensionsType = CSSProperties | { min?: CSSProperties; max?: CSSProperties }

export type MultiplierType = number

export type ColorType = string[] | string

export type MarginType =
  | [MultiplierType]
  | [MultiplierType, MultiplierType]
  | [MultiplierType, MultiplierType, MultiplierType]
  | [MultiplierType, MultiplierType, MultiplierType, MultiplierType]

export interface MarginProps {
  margin?: MarginType
}

export interface PaddingProps {
  padding?: MarginType
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
