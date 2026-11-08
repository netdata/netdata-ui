import React from "react"
import { ColorType, MarginProps } from "../../../mixins/types"

export interface PositionProps {
  position?:
    | "top-left"
    | "top"
    | "top-right"
    | "left"
    | "center"
    | "right"
    | "bottom-left"
    | "bottom"
    | "bottom-right"
}

export interface FullProps {
  full?: boolean | "vertical" | "horizontal"
}

export interface LayerProps extends MarginProps, FullProps, PositionProps {
  children?: React.ReactNode
  zIndex?: number | string
  backdrop?: boolean
  backdropContainerProps?: React.HTMLAttributes<HTMLDivElement> & {
    zIndex?: number | string
    "data-testid"?: string
  }
  backdropProps?: React.HTMLAttributes<HTMLDivElement> & {
    background?: ColorType
    backgroundOpacity?: number
    backdropBlur?: boolean | number | string
    "data-testid"?: string
  }
  onClickOutside?: Function
  onEsc?: Function
  borderShadow?: boolean
}

declare const Layer: React.FC<LayerProps & JSX.IntrinsicElements["div"]>

export { Layer }

export default Layer
