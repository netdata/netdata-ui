import { ReactNode } from "react"
import { FlexProps } from "../templates/flex"

export interface CollapsibleProps {
  open?: boolean
  duration?: number
  persist?: boolean
  children: ReactNode | (() => ReactNode)
  [rest: string]: any
}

declare const Collapsible: React.FC<CollapsibleProps & FlexProps & JSX.IntrinsicElements["div"]>

export { Collapsible }

export default Collapsible
