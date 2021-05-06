import { FlexProps } from "../../templates/flex"
import { AlignProps, StretchProps } from "../mixins"

export interface DropProps extends FlexProps, AlignProps, StretchProps {
  target: object
  onClickOutside?: Function
  onEsc?: Function
  children: any
  canHideTarget?: boolean
  [key: string]: any
}

declare const Drop: React.FC<DropProps & JSX.IntrinsicElements["div"]>

export { Drop }

export default Drop
