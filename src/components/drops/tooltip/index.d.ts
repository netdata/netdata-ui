import { FC } from "react"
import { PaddingProps, ZIndexProps } from "src/mixins/types"
import { DropProps } from "../drop"

export interface PopoverProps extends PaddingProps, ZIndexProps {
  align?: "top" | "right" | "bottom" | "left"
  allowHoverOnTooltip?: boolean
  animation?: boolean
  background?: string
  children: string | JSX.Element
  content?: string | JSX.Element
  disabled?: boolean
  dropProps?: DropProps
  icon?: string
  iconColor?: string
  isBasic?: boolean
  open?: boolean
  plain?: boolean
  small?: boolean
  title?: string | JSX.Element
  width?: string
  [key: string]: any
}

declare const Popover: FC<PopoverProps & JSX.IntrinsicElements["div"]>

export { Popover }

export default Popover
