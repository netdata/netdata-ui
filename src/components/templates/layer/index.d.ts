import { MarginProps } from "../../../mixins/types"

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
  backdrop?: boolean
  onClickOutside?: Function
  onEsc?: Function
  borderShadow?: boolean
}

declare const Layer: React.FC<LayerProps & JSX.IntrinsicElements["div"]>

export { Layer }

export default Layer
