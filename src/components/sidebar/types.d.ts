type NodeT = import("react").ReactNode

interface Component {
  children?: NodeT
}

interface ComponentBox extends Component {
  isRight: boolean
}

interface SidebarBox {
  shadowSide: boolean
}
interface PortalSidebarbox extends SidebarBox {
  side: "left" | "right"
}
interface SidebarProps extends Component {
  info?: NodeT
  right?: boolean
}

interface PortalSidebarProps<T = any> extends Component {
  closeOnEsc?: boolean
  onClose?: (args?: T) => void
  right?: boolean
}
