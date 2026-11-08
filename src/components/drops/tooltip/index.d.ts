import { ReactNode, FC } from "react"
import { DropProps } from "../drop"

export type TooltipContent = ReactNode | { title?: ReactNode; description?: ReactNode }

export interface PopoverProps {
  appearance?: "inverse" | "surface"
  maxWidth?: number | string
  plain?: boolean
  open?: boolean
  align?: "top" | "right" | "bottom" | "left"
  dropProps?: DropProps
  content: TooltipContent | (() => TooltipContent)
  children: any
  allowHoverOnTooltip?: boolean
  [key: string]: any
}

declare const Popover: FC<PopoverProps & JSX.IntrinsicElements["div"]>

export { Popover }

export declare const TooltipInk: FC<{ children?: ReactNode }>

export default Popover
