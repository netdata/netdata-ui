type ReactNode = import("react").ReactNode

interface Component {
  children?: ReactNode
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
  info?: ReactNode
  right?: boolean
}

interface PortalSidebarProps<T = any> extends Component {
  closeOnEsc?: boolean
  onClose?: (args?: T) => void
  right?: boolean
}
