import { ReactNode } from "react"
import { DropProps } from "../drop"

export interface TooltipProps {
  plain?: boolean
  open?: boolean
  align?: "top" | "right" | "bottom" | "left"
  dropProps?: DropProps
  content: ReactNode | (() => ReactNode)
  children: any
  [key: string]: any
}

declare const Tooltip: React.FC<TooltipProps & JSX.IntrinsicElements["div"]>

export { Tooltip }

export default Tooltip
