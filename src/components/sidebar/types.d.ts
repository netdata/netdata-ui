import { ReactNode } from "react"

export interface Component {
  children?: ReactNode
}

export interface ComponentBoxT extends Component {
  isRight: boolean
}

export interface SidebarBoxT {
  shadowSide: boolean
}
export interface PortalSidebarboxT extends SidebarBoxT {
  side: "left" | "right"
}
export interface SidebarProps extends Component {
  info?: ReactNode
  right?: boolean
}

export interface PortalSidebarProps<T = any> extends Component {
  closeOnEsc?: boolean
  onClose?: (args?: T) => void
  right?: boolean
}
