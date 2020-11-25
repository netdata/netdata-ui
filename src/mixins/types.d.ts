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
