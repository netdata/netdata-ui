import { ReactNode, FC } from "react"
import { DropProps } from "../drop"

export interface PopoverProps {
  plain?: boolean
  open?: boolean
  align?: "top" | "right" | "bottom" | "left"
  dropProps?: DropProps
  content: ReactNode | (() => ReactNode)
  children: any
  allowHoverOnTooltip?: boolean
  [key: string]: any
}

declare const Popover: FC<PopoverProps & JSX.IntrinsicElements["div"]>

export { Popover }

export default Popover
