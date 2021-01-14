import { ReactNode } from "react"
import { DropProps } from "../drop"

export interface PopoverProps {
  plain?: boolean
  open?: boolean
  align?: "top" | "right" | "bottom" | "left"
  dropProps?: DropProps
  content: ReactNode | (() => ReactNode)
  children: any
  [key: string]: any
}

declare const Popover: React.FC<PopoverProps & JSX.IntrinsicElements["div"]>

export { Popover }

export default Popover
