import { FlexProps } from "../../templates/flex"
import { AlignProps, StretchProps } from "../mixins"

export interface DropProps extends FlexProps, AlignProps, StretchProps {
  backdrop?: boolean
  backdropProps?: any
  canHideTarget?: boolean
  children: any
  hideShadow?: boolean
  onClickOutside?: Function
  onEsc?: Function
  target: object
  [key: string]: any
}

declare const Drop: React.FC<DropProps & JSX.IntrinsicElements["div"]>

export { Drop }

export default Drop
